import { z } from "zod";
import type { Database } from "../types/database.types";

export const insertHealthInfoSchema = z.object({
  user_email: z.string(),
  user_id: z.string().uuid(),

  date: z.string(),
  height_cm: z.number().refine((n) => n > 0, "Height cannot be zero"),
  weight_kg: z.number().refine((n) => n > 0, "Weight cannot be zero"),
  age: z.number().refine((n) => n > 0, "Age cannot be zero"),

  body_fat_mass_kg: z
    .number()
    .transform((n) => (n === 0 ? undefined : n))
    .optional(),
  skeletal_muscle_mass_kg: z
    .number()
    .transform((n) => (n === 0 ? undefined : n))
    .optional(),
}) satisfies z.ZodType<Database["public"]["Tables"]["health_info"]["Insert"]>;
