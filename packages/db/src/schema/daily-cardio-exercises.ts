import { pgTable, timestamp, uuid, text, smallint } from "drizzle-orm/pg-core";
import { profiles } from "./profiles";

export const dailyCardioExercises = pgTable("daily_cardio_exercises", {
  id: uuid("id").primaryKey().defaultRandom(),
  profileId: uuid("profile_id")
    .references(() => profiles.id)
    .notNull(),

  startTime: timestamp("start_time").notNull(),
  endTime: timestamp("end_time").notNull(),
  durationMinutes: smallint("duration_minutes").notNull(),

  exerciseName: text("exercise_name").notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
