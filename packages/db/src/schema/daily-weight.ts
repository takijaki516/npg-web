import { relations } from "drizzle-orm";
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
  durationMinutes: smallint("duration_minutes"),

  createdAt: timestamp("created_at", { mode: "string" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "string" }).defaultNow().notNull(),
});

export const dailyWeightsExercisesRelations = relations(
  dailyWeightsExercises,
  ({ many, one }) => ({
    eachWeightsExercises: many(eachWeightsExercises),
    profile: one(profile, {
      fields: [dailyWeightsExercises.profileEmail],
      references: [profile.email],
    }),
  })
);

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

export const eachWeightsExercisesRelations = relations(
  eachWeightsExercises,
  ({ many, one }) => ({
    weightsSetInfo: many(weightsSetInfo),
    dailyWeightsExercise: one(dailyWeightsExercises, {
      fields: [eachWeightsExercises.weightsExerciseId],
      references: [dailyWeightsExercises.id],
    }),
    profile: one(profile, {
      fields: [eachWeightsExercises.profileEmail],
      references: [profile.email],
    }),
  })
);

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
  setNumber: smallint("set_number").notNull(),

  createdAt: timestamp("created_at", { mode: "string" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "string" }).defaultNow().notNull(),
});

export const weightsSetInfoRelations = relations(weightsSetInfo, ({ one }) => ({
  eachWeightsExercise: one(eachWeightsExercises, {
    fields: [weightsSetInfo.eachWeightsExerciseId],
    references: [eachWeightsExercises.id],
  }),
  profile: one(profile, {
    fields: [weightsSetInfo.profileEmail],
    references: [profile.email],
  }),
}));
