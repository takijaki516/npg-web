import { pgTable, uuid, text, real, timestamp } from "drizzle-orm/pg-core";
import { user } from "./auth";

export const foods = pgTable("foods", {
  id: uuid().defaultRandom().primaryKey().notNull(),
  userId: text("user_id")
    .references(() => user.id)
    .notNull(),
  mealId: uuid("meal_id")
    .references(() => meals.id)
    .notNull(),

  foodName: text("food_name").notNull(),
  foodPic: text("food_pic"),

  foodCaloriesKcal: real("food_calories_kcal").notNull(),
  foodCarbohydratesG: real("food_carbohydrates_g").notNull(),
  foodProteinG: real("food_protein_g").notNull(),
  foodFatG: real("food_fat_g").notNull(),

  createdAt: timestamp("created_at", { mode: "string" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "string" }).defaultNow().notNull(),
});

export const meals = pgTable("meals", {
  id: uuid().defaultRandom().primaryKey().notNull(),
  userId: text("user_id")
    .references(() => user.id)
    .notNull(),

  mealTime: timestamp("meal_time", { mode: "string" }).notNull(),

  totalCaloriesKcal: real("total_calories_kcal").notNull(),
  totalCarbohydratesG: real("total_carbohydrates_g").notNull(),
  totalProteinG: real("total_protein_g").notNull(),
  totalFatG: real("total_fat_g").notNull(),

  llmDescription: text("llm_description"),

  createdAt: timestamp("created_at", { mode: "string" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "string" }).defaultNow().notNull(),
});
