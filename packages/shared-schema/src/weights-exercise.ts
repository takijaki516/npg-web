import { z } from "zod";
import { WEIGHT_BODY_PARTS } from "./exercise.types";

export const insertEachWeightsExercisesSetInfoSchema = z.object({
  reps: z.number(),
  weightKg: z.number(),
  setNumber: z.number(),
});

export const insertEachWeightsExerciseSchema = z.object({
  bodyPart: z.enum(WEIGHT_BODY_PARTS),
  workoutName: z.string(),

  weightsWorkoutsSets: z.array(insertEachWeightsExercisesSetInfoSchema),
});

export const insertDailyWeightsExerciseSchema = z.object({
  profileEmail: z.string(),
  timezone: z.string(),
  startTime: z.string(),
  durationMinutes: z.number(),

  weightsWorkouts: z.array(insertEachWeightsExerciseSchema),
});
