import { pgTable, timestamp, uuid, text, smallint } from "drizzle-orm/pg-core";
import { user } from "./better-auth";

export const dailyCardioExercises = pgTable("daily_cardio_exercises", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id")
    .references(() => user.id)
    .notNull(),

  startTime: timestamp("start_time").notNull(),
  endTime: timestamp("end_time").notNull(),
  durationMinutes: smallint("duration_minutes").notNull(),

  exerciseName: text("exercise_name").notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
