import { z } from "zod";

export const insertEachWeightsExercisesSetInfoSchema = z.object({
  reps: z.number(),
  weightKg: z.number(),
});

export const insertEachWeightsExerciseSchema = z.object({
  bodyPart: z.string(), // REVIEW: make it enum?
  workoutName: z.string(),

  weightsWorkoutsSets: z.array(insertEachWeightsExercisesSetInfoSchema),
});

export const insertDailyWorkoutSchema = z.object({
  id: z.string().optional().nullable(),
  startTime: z.string(),
  durationMinutes: z.number(),

  weightsWorkouts: z.array(insertEachWeightsExerciseSchema),
});
