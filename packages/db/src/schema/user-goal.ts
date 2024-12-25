import { pgTable, timestamp, uuid, text, real } from "drizzle-orm/pg-core";
import { user } from "./better-auth";

export const userGoals = pgTable("user_goals", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id")
    .references(() => user.id)
    .notNull(),

  weightKg: real("weight_kg").notNull(),
  bodyFatMassKg: real("body_fat_mass_kg").notNull(),
  skeletalMuscleMassKg: real("skeletal_muscle_mass_kg").notNull(),
  goalDescription: text("goal_description"),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
