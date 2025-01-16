import { relations } from "drizzle-orm";
import {
  pgTable,
  text,
  timestamp,
  uuid,
  real,
  uniqueIndex,
} from "drizzle-orm/pg-core";

import { profile } from "./profile";

export const dailyIntakes = pgTable(
  "daily_intakes",
  {
    id: uuid().defaultRandom().primaryKey().notNull(),
    profileEmail: text("profile_email")
      .references(() => profile.email)
      .unique()
      .notNull(),

    date: timestamp({ mode: "string" }).notNull(),

    intakeCaloriesKcal: real("intake_calories_kcal"),
    intakeCarbohydratesG: real("intake_carbohydrates_g"),
    intakeProteinG: real("intake_protein_g"),
    intakeFatG: real("intake_fat_g"),

    llmDescription: text("llm_description"),

    goalCaloriesKcal: real("goal_calories_kcal"),
    goalCarbohydratesG: real("goal_carbohydrates_g"),
    goalProteinG: real("goal_protein_g"),
    goalFatG: real("goal_fat_g"),

    createdAt: timestamp("created_at", { mode: "string" })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" })
      .defaultNow()
      .notNull(),
  },
  (t) => [
    uniqueIndex("daily_intakes_profile_email_date_unique").on(
      t.profileEmail,
      t.date
    ),
  ]
);

export const dailyIntakesRelations = relations(dailyIntakes, ({ one }) => ({
  profile: one(profile, {
    fields: [dailyIntakes.profileEmail],
    references: [profile.email],
  }),
}));
