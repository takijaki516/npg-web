import { z } from "zod";

export const upsertDailyIntakeSchema = z.object({
  date: z.string(),
  calories: z.number(),
  protein: z.number(),
  fat: z.number(),
  carbs: z.number(),
});

export const calculateDailyIntakeWithAISchema = z.object({
  currentLocalDate: z.string(),
});
