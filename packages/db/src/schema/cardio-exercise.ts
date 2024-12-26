import { pgTable, text, timestamp, uuid, smallint } from "drizzle-orm/pg-core";

import { user } from "./auth";

export const dailyCardioExercises = pgTable("daily_cardio_exercises", {
  id: uuid().defaultRandom().primaryKey().notNull(),
  userId: text("user_id")
    .references(() => user.id)
    .notNull(),

  exerciseName: text("exercise_name").notNull(),

  startTime: timestamp("start_time", { mode: "string" }).notNull(),
  endTime: timestamp("end_time", { mode: "string" }),
  durationMinutes: smallint("duration_minutes"),

  createdAt: timestamp("created_at", { mode: "string" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "string" }).defaultNow().notNull(),
});
