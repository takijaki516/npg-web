import { z } from "zod";
import type { Database } from "@/lib/types/database.types";

export const insertExerciseSetSchema = z.object({
  reps: z.number(),
  kg: z.number(),
  user_email: z.string(),
  user_id: z.string().uuid(),
  each_weights_exercises_id: z.string().uuid(),
}) satisfies z.ZodType<
  Database["public"]["Tables"]["each_weights_exercises_set_info"]["Insert"]
>;

export const insertWeightsExerciseSchema = z.object({
  workout_name: z.string(),
  duration: z.number(),
  user_email: z.string(),
  user_id: z.string().uuid(),
  weights_exercises_id: z.string().uuid(),
}) satisfies z.ZodType<
  Database["public"]["Tables"]["each_weights_exercises"]["Insert"]
>;

export const insertDailyWeightsExerciseSchema = z.object({
  user_email: z.string(),
  user_id: z.string().uuid(),
  part: z.string(),
  calories_burned: z.number(),
  duration: z.number(),
  start_time: z.string(),
  end_time: z.string(),
}) satisfies z.ZodType<
  Database["public"]["Tables"]["daily_weights_exercises"]["Insert"]
>;

export const insertDailyCardioExerciseSchema = z.object({
  user_email: z.string(),
  user_id: z.string().uuid(),
  start_time: z.string(),
  end_time: z.string(),
  duration: z.number(),
  calories_burned: z.number(),
  cardio_name: z.string(),
  distance: z.number().optional(),
}) satisfies z.ZodType<
  Database["public"]["Tables"]["daily_cardio_exercises"]["Insert"]
>;
