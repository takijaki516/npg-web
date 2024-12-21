import { pgTable, timestamp, uuid, real, text } from "drizzle-orm/pg-core";
import { profiles } from "./profiles";
import { meals } from "./meals";

export const foods = pgTable("foods", {
  id: uuid("id").primaryKey().defaultRandom(),
  profileId: uuid("profile_id")
    .references(() => profiles.id)
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

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
