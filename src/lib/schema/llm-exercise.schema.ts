import { z } from "zod";
import {
  CARDIO_DIFFICULTY_LEVELS,
  type CardioExercise,
  type ExerciseDetail,
  type WeightExercise,
} from "@/lib/types/exercise.types";

const weightExerciseSchema = z
  .object({
    name: z.object({
      ko: z.string(),
      en: z.string(),
    }),
    set_infos: z.array(
      z.object({
        set_number: z.number(),
        reps: z.number(),
        weight: z.number(),
      }),
    ),
  })
  .strict() satisfies z.ZodType<WeightExercise>;

const cardioExerciseSchema = z
  .object({
    name: z.object({
      ko: z.string(),
      en: z.string(),
    }),
    difficulty: z.enum(CARDIO_DIFFICULTY_LEVELS),
  })
  .strict() satisfies z.ZodType<CardioExercise>;

const exerciseDetailSchema = z.discriminatedUnion("exercise_type", [
  z
    .object({
      exercise_type: z.literal("weights"),
      weights_exercises: z.array(weightExerciseSchema),
    })
    .strict(),
  z
    .object({
      exercise_type: z.literal("cardio"),
      cardio_exercises: z.array(cardioExerciseSchema),
    })
    .strict(),
]) satisfies z.ZodType<ExerciseDetail>;

export const addExerciseSchema = z
  .object({
    daily_tracker_id: z.string().uuid(),
    difficulty: z.string().nullable().optional(),
    end_time: z.string(),
    start_time: z.string(),
    exercise_detail: exerciseDetailSchema,
    user_email: z.string().email(),
    user_id: z.string().uuid(),
  })
  .strict();
