import { tool, generateObject } from "ai";
import { z } from "zod";

import type { Database } from "@/lib/types/database.types";
import { supabaseServerClient } from "@/supabase-utils/server";
import { LLMStructureDailyExerciseDetailSchema } from "@/lib/schema/llm-exercise.schema";
import { googleWithProxy } from "./route";

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
    // REVIEW: optimize below queries, maybe study subquery
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
    const prompt = `You are an highly experienced multilingual personal trainer.

    You should generate a workout plan for user based on user's exercise history, user's goal, user's health info and user's request.

    You MUST follow user's request language!
    If user requests in Korean, you should generate workout plan in Korean.
    If user requests in English, you should generate workout plan in English.

    Part of user's information might be empty or user's information might not be enough to generate workout plan.
    If user's information is not sufficient to generate appropriate workout plan, you should just try your best to generate workout plan with the given information. In this case, maybe focusing on user's request might be helpful but don't forget to consider user's goal and user's health info as well.
    
    Also, after generating workout plan you should explain the purpose of the workout plan so user can understand it and perform it efficiently.
    User's information will be given in JSON format.


    ---
    EXAMPLE USER DATA

    


    EXAMPLE GENERATED WORKOUT PLAN

    

    ---

    

    ---
    USER DATA

    user's goal information:
    ${JSON.stringify(goal)}

    user's health information
    ${JSON.stringify(upToTwoWeeksUserHealthInfo)}

    user's exercise history
    ${JSON.stringify(upToTwoWeeksUserExerciseHistory)}    
    
    user's request
    ${user_request}
    
    ---


    YOU MUST GENERATE WORKOUT PLAN AND FOLLOW GIVEN STRUCTURE.
    THIS IS VERY IMPORTANT TASK FOR YOUR CUSTOMER.
    MAKE SURE TO FOLLOW GIVEN STRUCTURE.
    MAKE SURE TO FOLLOW USER'S REQUEST LANGUAGE.
    `;

    const generatedWorkoutResult = await generateObject({
      model: googleWithProxy("gemini-2.0-flash-exp"),
      system: "You generate three notifications for a messages app.",
      prompt,
      schema: LLMStructureDailyExerciseDetailSchema,
    });

    const workoutPlans = generatedWorkoutResult.toJsonResponse();

    return {
      response_type: "workout_plans",
      workout_plans: workoutPlans,
    };
  },
});
