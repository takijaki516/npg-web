import { z } from "zod";

export const deleteFoodSchema = z.object({
  foodId: z.string(),
});
