import { tool, generateObject } from "ai";
import { z } from "zod";

import type { Database } from "@/lib/types/database.types";
import { supabaseServerClient } from "@/supabase-utils/server";
import { openai } from "@ai-sdk/openai";

// prompts for this tools
// If you just created a new workout plan, explain the purpose of the workout plan so user can understand it and perform it efficiently.

export const genWorkoutTool = tool({
  description:
    "Generate a user customized workout plan based on user's past record and user's goal",
  parameters: z.object({
    user_request: z.string().describe("User's request"),
  }),
  execute: async ({ user_request }) => {
    const supabase = await supabaseServerClient<Database>();

    // RLS가 설정되어 있어 user email를 넘기지 않아도 되긴함.
    // REVIEW: maybe study subquery
    const goalRes = supabase.from("user_goals").select("*").limit(1).single();
    const upTotwoWeeksUserHealthInfoRes = supabase
      .from("health_info")
      .select("*")
      .gte(
        "created_at",
        new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
      );
    const upToTwoWeeksUserExerciseHistoryRes = supabase
      .from("llm_daily_exercies")
      .select("*")
      .gte(
        "created_at",
        new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
      );

    const [goal, upToTwoWeeksUserHealthInfo, upToTwoWeeksUserExerciseHistory] =
      await Promise.all([
        goalRes,
        upTotwoWeeksUserHealthInfoRes,
        upToTwoWeeksUserExerciseHistoryRes,
      ]);

    // TODO: call another LLM to generate workout plans

    // 1. prompt engineering
    // 1-1. get user exercise history
    // 1-2. get user request
    // 1-3. get user's goal
    // 1-4. get user's health info
    const prompt = ``;

    const generatedWorkoutResult = await generateObject({
      model: openai("gpt-4o-mini"),
      system: "You generate three notifications for a messages app.",
      prompt,
      schema: z.object({
        notifications: z.array(
          z.object({
            name: z.string().describe("Name of a fictional person."),
            message: z.string().describe("Do not use emojis or links."),
            minutesAgo: z.number(),
          }),
        ),
      }),
    });

    const workoutPlans = generatedWorkoutResult.toJsonResponse();

    return {
      response_type: "workout_plans",
      workout_plans: workoutPlans,
    };
  },
});
