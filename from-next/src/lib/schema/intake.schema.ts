import { z } from "zod";

export const insertDailyGoalIntakeSchema = z.object({
  user_id: z.string().uuid(),
  user_email: z.string().email(),
  date: z.string(),

  goal_calories_kcal: z.number(),
  goal_carbohydrate_g: z.number(),
  goal_fat_g: z.number(),
  goal_protein_g: z.number(),
  
  llm_description: z.string(),
});
