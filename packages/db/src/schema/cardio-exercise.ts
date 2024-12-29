import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, uuid, smallint } from "drizzle-orm/pg-core";

import { profile } from "./profile";

export const dailyCardioExercises = pgTable("daily_cardio_exercises", {
  id: uuid().defaultRandom().primaryKey().notNull(),
  profileEmail: text("profile_email")
    .references(() => profile.email)
    .notNull(),

  exerciseName: text("exercise_name").notNull(),

  startTime: timestamp("start_time", { mode: "string" }).notNull(),
  endTime: timestamp("end_time", { mode: "string" }),
  durationMinutes: smallint("duration_minutes"),

  createdAt: timestamp("created_at", { mode: "string" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "string" }).defaultNow().notNull(),
});

export const dailyCardioExercisesRelations = relations(
  dailyCardioExercises,
  ({ one }) => ({
    profile: one(profile, {
      fields: [dailyCardioExercises.profileEmail],
      references: [profile.email],
    }),
  })
);
