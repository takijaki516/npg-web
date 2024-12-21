import { pgTable, timestamp, uuid } from "drizzle-orm/pg-core";
import { profiles } from "./profiles";

export const dailyWeightsExercises = pgTable("daily_weights_exercises", {
  id: uuid("id").primaryKey().defaultRandom(),
  profileId: uuid("profile_id")
    .references(() => profiles.id)
    .notNull(),

  startTime: timestamp("start_time").notNull(),
  endTime: timestamp("end_time"),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
