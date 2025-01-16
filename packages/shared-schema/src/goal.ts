import { z } from "zod";

export const insertGoalSchema = z.object({
  weightKg: z.number().optional(),
  bodyFatMassKg: z.number().optional(),
  skeletalMuscleMassKg: z.number().optional(),
  goalDescription: z.string().optional(),
});
