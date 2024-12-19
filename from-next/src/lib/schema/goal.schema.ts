import { z } from "zod";
import type { Database } from "../types/database.types";

export const insertUserGoalSchema = z.object({
  user_email: z.string(),
  user_id: z.string().uuid(),

  height_cm: z.number().optional(),
  weight_kg: z.number().optional(),
  body_fat_mass_kg: z.number().optional(),
  skeletal_muscle_mass_kg: z.number().optional(),
  goal_description: z.string().optional(),
}) satisfies z.ZodType<Database["public"]["Tables"]["user_goals"]["Insert"]>;

export const updateUserGoalSchema = insertUserGoalSchema.partial();
