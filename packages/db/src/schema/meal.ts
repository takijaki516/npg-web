import { relations } from "drizzle-orm";
import { pgTable, uuid, text, real, timestamp } from "drizzle-orm/pg-core";
import { profile } from "./profile";

export const foods = pgTable("foods", {
  id: uuid().defaultRandom().primaryKey().notNull(),
  profileEmail: text("profile_email")
    .references(() => profile.email)
    .notNull(),
  mealId: uuid("meal_id")
    .references(() => meals.id, { onDelete: "cascade" })
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

export const foodsRelations = relations(foods, ({ one }) => ({
  profile: one(profile, {
    fields: [foods.profileEmail],
    references: [profile.email],
  }),
  meal: one(meals, {
    fields: [foods.mealId],
    references: [meals.id],
  }),
}));

export const meals = pgTable("meals", {
  id: uuid().defaultRandom().primaryKey().notNull(),
  profileEmail: text("profile_email")
    .references(() => profile.email)
    .notNull(),

  mealTime: timestamp("meal_time", { mode: "string" }).notNull(),

  totalCaloriesKcal: real("total_calories_kcal").notNull(),
  totalCarbohydratesG: real("total_carbohydrates_g").notNull(),
  totalProteinG: real("total_protein_g").notNull(),
  totalFatG: real("total_fat_g").notNull(),

  createdAt: timestamp("created_at", { mode: "string" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "string" }).defaultNow().notNull(),
});

export const mealsRelations = relations(meals, ({ one, many }) => ({
  profile: one(profile, {
    fields: [meals.profileEmail],
    references: [profile.email],
  }),
  foods: many(foods),
}));
