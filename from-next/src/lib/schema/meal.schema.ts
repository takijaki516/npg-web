import { z } from "zod";
import { type Database } from "../types/database.types";

export const foodSchema = z.object({
  food_name: z.string(),
  calories: z.number(),
  fat: z.number(),
  protein: z.number(),
  carbohydrate: z.number(),

  pic_file: z.instanceof(File).optional().nullable(),
}) satisfies z.ZodType<
  Omit<
    Database["public"]["Tables"]["foods"]["Insert"],
    "meal_id" | "user_email"
  >
>;

export const insertMealSchema = z.object({
  user_email: z.string().email(),
  user_id: z.string().uuid(),

  meal_time: z.string(),
  total_calories: z.number(),
  total_carbohydrate: z.number(),
  total_fat: z.number(),
  total_protein: z.number(),

  foods: z.array(foodSchema),
}) satisfies z.ZodType<Database["public"]["Tables"]["meals"]["Insert"]>;

const foodWithoutPicSchema = foodSchema.omit({ pic_file: true }).extend({
  pic_url: z.string().optional(),
});

export const insertMealWithoutPicSchema = insertMealSchema.extend({
  foods: z.array(foodWithoutPicSchema),
});
