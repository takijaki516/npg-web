import { NextResponse } from "next/server";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateObject } from "ai";
import { z } from "zod";
import { DateTime } from "luxon";

import { fetchWithProxy } from "../../../lib/proxy-fetcher";

export const googleWithProxy = createGoogleGenerativeAI({
  fetch: fetchWithProxy,
});

import { supabaseServerClient } from "../../../supabase-utils/server";
import { type Database } from "../../../lib/types/database.types";
import { DayTargetIntakeBody } from "../../../components/daily-user-stat/daily-goal-intake";
import {
  convertToRangeOfDayUTCTime,
  convertToRangeOfSpecificDayUTCTime,
} from "../../../lib/utils";

export async function POST(req: Request) {
  try {
    const { current_date }: DayTargetIntakeBody = await req.json();

    const supabase = await supabaseServerClient<Database>();
    const { data } = await supabase.auth.getUser();
    if (!data.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", data.user.id)
      .limit(1)
      .single();

    if (!profile || !profile.user_id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const localDate = DateTime.fromFormat(current_date, "yyyy-MM-dd").setZone(
      profile.timezone
    );
    const twoWeeksAgoLocalDate = localDate.minus({ weeks: 2 });

    const {
      startDateTime: startUTCTimeOfTwoWeeksAgo,
      endDateTime: endUTCTime,
    } = convertToRangeOfSpecificDayUTCTime({
      startLocalDate: localDate.toFormat("yyyy-MM-dd"),
      endLocalDate: twoWeeksAgoLocalDate.toFormat("yyyy-MM-dd"),
      timeZone: profile.timezone,
    });

    // prepare prompt
    const userGoal = await supabase
      .from("user_goals")
      .select(
        "user_email, weight_kg, body_fat_mass_kg, skeletal_muscle_mass_kg, goal_description"
      )
      .limit(1)
      .single();

    const healthInfo = await supabase
      .from("health_info")
      .select(
        "user_email, measured_date, height_cm, weight_kg, body_fat_mass_kg, skeletal_muscle_mass_kg, age"
      )
      .order("measured_date", { ascending: false })
      .limit(1)
      .single();

    const mealInfo = await supabase
      .from("meals")
      .select(
        `
      user_email,
      meal_time,
      total_calories,
      total_carbohydrate,
      total_fat,
      total_protein,
      foods(calories, food_name, protein, fat, carbohydrate)
      `
      )
      .gte("meal_time", startUTCTimeOfTwoWeeksAgo)
      .lt("meal_time", endUTCTime)
      .order("meal_time", { ascending: true })
      .limit(1)
      .single();

    const systemPrompt = getSystemPrompt({
      userGoal,
      healthInfo,
      mealInfo,
      userLanguage: profile.language,
      currentLocalDate: current_date,
      timeZone: profile.timezone,
    });

    const userPrompt =
      profile.language === "ko"
        ? "내가 주어진 기간에 먹어야 하는 적정 칼로리, 탄수화물, 단백질, 지방은 얼마인가요?"
        : "What is my appropriate target intake for given time range?";

    const result = await generateObject({
      model: googleWithProxy("gemini-2.0-flash-exp"),
      system: systemPrompt,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: userPrompt,
            },
          ],
        },
      ],
      schema: llmTargetSchema,
    });

    return result.toJsonResponse();
  } catch (error) {
    console.log("🚀 ~ file: route.ts:21 ~ POST ~ error:", error);
  }
}

function getSystemPrompt({
  userGoal,
  healthInfo,
  mealInfo,
  userLanguage,
  currentLocalDate,
  timeZone,
}: {
  userGoal: any;
  healthInfo: any;
  mealInfo: any;
  userLanguage: string;
  currentLocalDate: string;
  timeZone: string;
}) {
  const { startTimeOfDay: startUTCTimeOfDay, endTimeOfDay: endUTCTimeOfDay } =
    convertToRangeOfDayUTCTime({
      localDate: currentLocalDate,
      timeZone,
    });

  const SYSTEM_PROMPT = `
You are an expert in nutrition and health.
You are given the user's goal, health information, and meal history information data.
You are asked to calculate the appropriate user's target intake based on given data for specific time range.

Every time is in UTC time.

---
USER DATA START

**USER GOAL**
${JSON.stringify(userGoal, null, 2)}

**USER HEALTH INFORMATION DATA**
${JSON.stringify(healthInfo, null, 2)}

**USER MEAL HISTORY DATA**
${JSON.stringify(mealInfo, null, 2)}

USER DATA END
---

Calculate the appropriate target intake for the time range from ${startUTCTimeOfDay} to ${endUTCTimeOfDay}.
Provide an appropriate explanation how you calculated the target intake so that the user can understand.
Here is example of explanations,
- "Your information data shows that you are a person who is trying to lose weight. So, your target intake should be lower than your average intake"
- "You did not provide sufficient information about your goal. So, Here is the general target intake for your age and gender."


Generate the response in ${userLanguage} language.
Use the JSON schema for the response!
`;

  return SYSTEM_PROMPT;
}

export const llmTargetSchema = z.object({
  calories_for_today: z.number().describe("The total calories for today"),
  carbohydrate_for_today: z
    .number()
    .describe("The total carbohydrate grams for today"),
  protein_for_today: z.number().describe("The total protein grams for today"),
  fat_for_today: z.number().describe("The total fat grams for today"),
  description: z.string().describe("The description of the target intake"),
});
