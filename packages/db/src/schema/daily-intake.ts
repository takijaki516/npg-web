import { pgTable, text, timestamp, uuid, real } from "drizzle-orm/pg-core";

import { user } from "./auth";

export const dailyIntakes = pgTable("daily_intakes", {
  id: uuid().defaultRandom().primaryKey().notNull(),
  userId: text("user_id")
    .references(() => user.id)
    .notNull(),

  date: timestamp({ mode: "string" }).notNull(),

  intakeCaloriesKcal: real("intake_calories_kcal"),
  intakeCarbohydratesG: real("intake_carbohydrates_g"),
  intakeProteinG: real("intake_protein_g"),
  intakeFatG: real("intake_fat_g"),

  llmDescription: text("llm_description"),

  goalCaloriesKcal: real("goal_calories_kcal").notNull(),
  goalCarbohydratesG: real("goal_carbohydrates_g").notNull(),
  goalProteinG: real("goal_protein_g").notNull(),
  goalFatG: real("goal_fat_g").notNull(),

  createdAt: timestamp("created_at", { mode: "string" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "string" }).defaultNow().notNull(),
});
