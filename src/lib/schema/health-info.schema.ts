import { z } from "zod";
import type { Database } from "@/lib/types/database.types";

export const insertHealthInfoSchema = z.object({
  user_email: z.string(),
  user_id: z.string().uuid(),
  date: z.string(),
  height: z.number().refine((n) => n > 0, "Height cannot be zero"),
  weight: z.number().refine((n) => n > 0, "Weight cannot be zero"),
  age: z.number().refine((n) => n > 0, "Age cannot be zero"),
  body_fat_mass: z
    .number()
    .transform((n) => (n === 0 ? undefined : n))
    .optional(),
  skeletal_muscle_mass: z
    .number()
    .transform((n) => (n === 0 ? undefined : n))
    .optional(),
}) satisfies z.ZodType<Database["public"]["Tables"]["health_info"]["Insert"]>;
