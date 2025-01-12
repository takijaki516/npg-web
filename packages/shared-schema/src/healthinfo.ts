import { z } from "zod";

export const insertHealthInfoSchema = z.object({
  measuredDate: z.string(),

  heightCm: z.number().optional().nullable(),
  weightKg: z.number().optional().nullable(),
  bodyFatMassKg: z.number().optional().nullable(),
  skeletalMuscleMassKg: z.number().optional().nullable(),

  age: z.number().optional().nullable(),
});
