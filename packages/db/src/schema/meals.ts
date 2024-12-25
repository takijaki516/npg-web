import { pgTable, timestamp, uuid, real, text } from "drizzle-orm/pg-core";
import { user } from "./better-auth";

export const meals = pgTable("meals", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id")
    .references(() => user.id)
    .notNull(),

  mealTime: timestamp("meal_time").notNull(),

  totalCaloriesKcal: real("total_calories_kcal").notNull(),
  totalCarbohydratesG: real("total_carbohydrates_g").notNull(),
  totalProteinG: real("total_protein_g").notNull(),
  totalFatG: real("total_fat_g").notNull(),

  llmDescription: text("llm_description"),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
