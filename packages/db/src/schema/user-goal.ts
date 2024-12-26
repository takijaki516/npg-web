import { pgTable, uuid, text, real, timestamp } from "drizzle-orm/pg-core";
import { user } from "./auth";

export const userGoals = pgTable("user_goals", {
  id: uuid().defaultRandom().primaryKey().notNull(),
  userId: text("user_id")
    .references(() => user.id)
    .notNull(),

  weightKg: real("weight_kg"),
  bodyFatMassKg: real("body_fat_mass_kg"),
  skeletalMuscleMassKg: real("skeletal_muscle_mass_kg"),

  goalDescription: text("goal_description"),

  createdAt: timestamp("created_at", { mode: "string" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "string" }).defaultNow().notNull(),
});
