import { pgTable, timestamp, uuid, real, text } from "drizzle-orm/pg-core";
import { profiles } from "./profiles";

export const meals = pgTable("meals", {
  id: uuid("id").primaryKey().defaultRandom(),
  profileId: uuid("profile_id")
    .references(() => profiles.id)
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
