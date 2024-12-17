import { z } from "zod";

export const LLMContextHealthInfoSchema = z.object({
  user_email: z.string().email(),
  measured_date: z.string().datetime(),
  height_cm: z.number(),
  weight_kg: z.number(),
  age: z.number(),
  body_fat_mass_kg: z.number().optional(),
  skeletal_muscle_mass_kg: z.number().optional(),
});

export const LLMContextUserGoalSchema = z.object({
  user_email: z.string().email(),
  height_cm: z.number().optional(),
  weight_kg: z.number().optional(),
  body_fat_mass_kg: z.number().optional(),
  skeletal_muscle_mass_kg: z.number().optional(),
  goal_description: z.string().optional(),
});
