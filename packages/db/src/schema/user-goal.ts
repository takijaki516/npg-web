import { relations } from "drizzle-orm";
import { pgTable, uuid, text, real, timestamp } from "drizzle-orm/pg-core";
import { profile } from "./profile";

export const userGoals = pgTable("user_goals", {
  id: uuid().defaultRandom().primaryKey().notNull(),
  profileEmail: text("profile_email")
    .references(() => profile.email)
    .unique()
    .notNull(),

  weightKg: real("weight_kg"),
  bodyFatMassKg: real("body_fat_mass_kg"),
  skeletalMuscleMassKg: real("skeletal_muscle_mass_kg"),
  goalDescription: text("goal_description"),

  createdAt: timestamp("created_at", { mode: "string" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "string" }).defaultNow().notNull(),
});

export const userGoalsRelations = relations(userGoals, ({ one }) => ({
  profile: one(profile, {
    fields: [userGoals.profileEmail],
    references: [profile.email],
  }),
}));
