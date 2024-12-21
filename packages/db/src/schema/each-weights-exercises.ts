import { pgTable, timestamp, uuid, real, text } from "drizzle-orm/pg-core";
import { profiles } from "./profiles";
import { dailyWeightsExercises } from "./daily-weights-exercises";

export const eachWeightsExercises = pgTable("each_weights_exercises", {
  id: uuid("id").primaryKey().defaultRandom(),
  profileId: uuid("profile_id")
    .references(() => profiles.id)
    .notNull(),

  weightsExerciseId: uuid("weights_exercise_id")
    .references(() => dailyWeightsExercises.id)
    .notNull(),

  workoutName: text("workout_name").notNull(),
  bodyPart: text("body_part").notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
