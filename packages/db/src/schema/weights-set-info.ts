import { pgTable, timestamp, uuid, real, smallint } from "drizzle-orm/pg-core";
import { profiles } from "./profiles";
import { eachWeightsExercises } from "./each-weights-exercises";

export const weightsSetInfo = pgTable("weights_set_info", {
  id: uuid("id").primaryKey().defaultRandom(),
  profileId: uuid("profile_id")
    .references(() => profiles.id)
    .notNull(),

  eachWeightsExerciseId: uuid("each_weights_exercise_id")
    .references(() => eachWeightsExercises.id)
    .notNull(),

  reps: smallint("reps").notNull(),
  weight: real("weight").notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
