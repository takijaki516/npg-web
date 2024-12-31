import { z } from "zod";
import { TOTAL_WEIGHT_WORKOUTS, WEIGHT_BODY_PARTS } from "./exercise.types";

export const insertEachWeightsExercisesSetInfoSchema = z.object({
  reps: z.number(),
  weightKg: z.number(),
  setNumber: z.number(),
});

export const insertEachWeightsExerciseSchema = z.object({
  workoutName: z.enum(TOTAL_WEIGHT_WORKOUTS),
  bodyPart: z.enum(WEIGHT_BODY_PARTS),

  weightsWorkoutsSets: z.array(insertEachWeightsExercisesSetInfoSchema),
});

export const insertDailyWeightsExerciseSchema = z.object({
  profileEmail: z.string(),
  timezone: z.string(),
  startTime: z.string(),
  durationMinutes: z.number(),

  weightsWorkouts: z.array(insertEachWeightsExerciseSchema),
});
