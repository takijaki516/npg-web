import { z } from "zod";

import {
  CARDIO_WORKOUT_NAMES,
  TOTAL_WEIGHT_WORKOUTS,
  WEIGHT_BODY_PARTS,
} from "../types/exercise.types";

export const LLMStructureWeightsExercisesSetInfoSchema = z.object({
  reps: z.number().describe("number of reps for each set"),
  kg: z.number().describe("weight in kg for each set"),
});

export const LLMStructureWeightsExercisesSchema = z.object({
  workout_name: z
    .enum(TOTAL_WEIGHT_WORKOUTS)
    .describe("name of the weights workout"),
  body_part: z
    .enum(WEIGHT_BODY_PARTS)
    .describe("body part of the weights workout"),

  weights_exercises_set_info: z
    .array(LLMStructureWeightsExercisesSetInfoSchema)
    .describe("sets info for this weights workout"),
});

export const LLMStructureDailyCardioExerciseSchema = z.object({
  duration_minutes: z
    .number()
    .describe("duration of the cardio workout in minutes"),
  cardio_name: z
    .enum(CARDIO_WORKOUT_NAMES)
    .describe("name of the cardio workout"),
});

export const LLMStructureDailyExerciseDetailSchema = z.object({
  exercise_date: z.string().datetime(),
  exercise_detail: z.array(
    z.discriminatedUnion("exercise_type", [
      z.object({
        exercise_type: z.literal("weights"),
        weights_exercises: z.array(LLMStructureWeightsExercisesSchema),
      }),
      z.object({
        exercise_type: z.literal("cardio"),
        cardio_exercises: LLMStructureDailyCardioExerciseSchema,
      }),
    ]),
  ),
});
