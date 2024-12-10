import { z } from "zod";
import type { Database } from "@/lib/types/database.types";

export const insertUserGoalSchema = z.object({
  user_email: z.string(),
  user_id: z.string().uuid(),
  height: z.number().optional(),
  weight: z.number().optional(),
  body_fat_mass: z.number().optional(),
  skeletal_muscle_mass: z.number().optional(),
  pledge: z.string().optional(),
}) satisfies z.ZodType<Database["public"]["Tables"]["user_goals"]["Insert"]>;

export const updateUserGoalSchema = insertUserGoalSchema.partial();
