import { pgTable, timestamp, uuid, text } from "drizzle-orm/pg-core";
import { dailyWeightsExercises } from "./daily-weights-exercises";
import { user } from "./better-auth";

export const eachWeightsExercises = pgTable("each_weights_exercises", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id")
    .references(() => user.id)
    .notNull(),

  weightsExerciseId: uuid("weights_exercise_id")
    .references(() => dailyWeightsExercises.id)
    .notNull(),

  workoutName: text("workout_name").notNull(),
  bodyPart: text("body_part").notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
