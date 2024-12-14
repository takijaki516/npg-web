import { z } from "zod";
import type { Database } from "@/lib/types/database.types";
import {
  CARDIO_WORKOUT_NAMES,
  TOTAL_WEIGHT_WORKOUTS,
  WEIGHT_BODY_PARTS,
} from "../types/exercise.types";

export const insertEachWeightsExercisesSetInfoSchema = z.object({
  user_email: z.string(),
  user_id: z.string().uuid(),

  reps: z.number(),
  kg: z.number(),
  set_number: z.number(),
  // each_weights_exercises_id: z.string().uuid().optional(),
}) satisfies z.ZodType<
  Omit<
    Database["public"]["Tables"]["each_weights_exercises_set_info"]["Insert"],
    "each_weights_exercises_id"
  >
>;

export const insertEachWeightsExerciseSchema = z.object({
  user_email: z.string(),
  user_id: z.string().uuid(),

  body_part: z.enum(WEIGHT_BODY_PARTS),
  workout_name: z.enum(TOTAL_WEIGHT_WORKOUTS),
  // weights_exercises_id: z.string().uuid(),

  weights_workouts_sets: z.array(insertEachWeightsExercisesSetInfoSchema),
}) satisfies z.ZodType<
  Omit<
    Database["public"]["Tables"]["each_weights_exercises"]["Insert"],
    "weights_exercises_id"
  >
>;

export const insertDailyWeightsExerciseSchema = z.object({
  user_email: z.string(),
  user_id: z.string().uuid(),

  start_time: z.string(),
  end_time: z.string().optional(),

  weights_workouts: z.array(insertEachWeightsExerciseSchema),
}) satisfies z.ZodType<
  Database["public"]["Tables"]["daily_weights_exercises"]["Insert"]
>;

export const insertDailyCardioExerciseSchema = z.object({
  user_email: z.string(),
  user_id: z.string().uuid(),

  start_time: z.string(),
  end_time: z.string(),
  duration_minutes: z.number(),
  cardio_name: z.enum(CARDIO_WORKOUT_NAMES),
}) satisfies z.ZodType<
  Database["public"]["Tables"]["daily_cardio_exercises"]["Insert"]
>;
