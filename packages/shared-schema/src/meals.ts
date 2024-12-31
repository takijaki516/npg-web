import { z } from "zod";

export const insertFoodSchema = z.object({
  foodName: z.string(),
  foodPic: z.string().optional().nullable(),
  foodPicFile: z.instanceof(File).optional().nullable(),

  foodCaloriesKcal: z.number(),
  foodCarbohydratesG: z.number(),
  foodProteinG: z.number(),
  foodFatG: z.number(),
});

export const insertMealSchema = z.object({
  profileEmail: z.string(),
  mealTime: z.string(),

  totalCaloriesKcal: z.number(),
  totalCarbohydratesG: z.number(),
  totalProteinG: z.number(),
  totalFatG: z.number(),

  foods: z.array(insertFoodSchema),
});
