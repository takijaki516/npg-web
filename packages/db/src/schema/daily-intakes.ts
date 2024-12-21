import { pgTable, timestamp, uuid, real, text } from "drizzle-orm/pg-core";
import { profiles } from "./profiles";

export const dailyIntakes = pgTable("daily_intakes", {
  id: uuid("id").primaryKey().defaultRandom(),
  profileId: uuid("profile_id")
    .references(() => profiles.id)
    .notNull(),

  date: timestamp("date").notNull(),
  intakeCaloriesKcal: real("intake_calories_kcal").notNull(),
  intakeCarbohydratesG: real("intake_carbohydrates_g").notNull(),
  intakeProteinG: real("intake_protein_g").notNull(),
  intakeFatG: real("intake_fat_g").notNull(),

  goalCaloriesKcal: real("goal_calories_kcal").notNull(),
  goalCarbohydratesG: real("goal_carbohydrates_g").notNull(),
  goalProteinG: real("goal_protein_g").notNull(),
  goalFatG: real("goal_fat_g").notNull(),

  llmDescription: text("llm_description"),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
