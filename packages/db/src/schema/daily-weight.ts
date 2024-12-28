import {
  pgTable,
  uuid,
  text,
  timestamp,
  smallint,
  real,
} from "drizzle-orm/pg-core";

import { profile } from "./profile";

export const dailyWeightsExercises = pgTable("daily_weights_exercises", {
  id: uuid().defaultRandom().primaryKey().notNull(),
  profileEmail: text("profile_email")
    .references(() => profile.email)
    .notNull(),

  startTime: timestamp("start_time", { mode: "string" }).notNull(),
  endTime: timestamp("end_time", { mode: "string" }),

  createdAt: timestamp("created_at", { mode: "string" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "string" }).defaultNow().notNull(),
});

export const eachWeightsExercises = pgTable("each_weights_exercises", {
  id: uuid().defaultRandom().primaryKey().notNull(),
  profileEmail: text("profile_email")
    .references(() => profile.email)
    .notNull(),
  weightsExerciseId: uuid("weights_exercise_id")
    .references(() => dailyWeightsExercises.id)
    .notNull(),

  workoutName: text("workout_name").notNull(),
  bodyPart: text("body_part").notNull(),

  createdAt: timestamp("created_at", { mode: "string" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "string" }).defaultNow().notNull(),
});

export const weightsSetInfo = pgTable("weights_set_info", {
  id: uuid().defaultRandom().primaryKey().notNull(),
  profileEmail: text("profile_email")
    .references(() => profile.email)
    .notNull(),
  eachWeightsExerciseId: uuid("each_weights_exercise_id")
    .references(() => eachWeightsExercises.id)
    .notNull(),

  reps: smallint().notNull(),
  weight: real().notNull(),

  createdAt: timestamp("created_at", { mode: "string" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "string" }).defaultNow().notNull(),
});
