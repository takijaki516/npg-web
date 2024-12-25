import { pgTable, timestamp, uuid, text } from "drizzle-orm/pg-core";
import { user } from "./better-auth";

export const dailyWeightsExercises = pgTable("daily_weights_exercises", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id")
    .references(() => user.id)
    .notNull(),

  startTime: timestamp("start_time").notNull(),
  endTime: timestamp("end_time"),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
