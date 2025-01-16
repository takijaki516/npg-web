import { z } from "zod";

export const insertFoodSchema = z.object({
  foodId: z.string().optional().nullable(),

  foodName: z.string(),
  foodPic: z.string().optional().nullable(),
  foodPicFile: z.instanceof(File).optional().nullable(),

  foodCaloriesKcal: z.number(),
  foodCarbohydratesG: z.number(),
  foodProteinG: z.number(),
  foodFatG: z.number(),
});

export const insertMealSchema = z.object({
  mealId: z.string().optional().nullable(),

  localMealDateTime: z.string(),

  totalCaloriesKcal: z.number(),
  totalCarbohydratesG: z.number(),
  totalProteinG: z.number(),
  totalFatG: z.number(),

  foods: z.array(insertFoodSchema),
});

export const aiCalcFoodCalorieSchema = z.object({
  foodImage: z.instanceof(File),
});

export const llmCalorieResponseSchema = z.object({
  foodName: z
    .string()
    .describe(
      "The name of the foods in image, If there are multiple foods, list them all"
    ),
  calories: z.number().describe("The total calories of the foods in image"),
  protein: z.number().describe("The total protein of the foods in image"),
  fat: z.number().describe("The total fat of the foods in image"),
  carbohydrate: z
    .number()
    .describe("The total carbohydrate of the foods in image"),
});
