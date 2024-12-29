import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

import { user } from "./auth";
import { userGoals } from "./user-goal";
import { healthInfos } from "./health-info";
import { foods, meals } from "./meal";
import {
  dailyWeightsExercises,
  eachWeightsExercises,
  weightsSetInfo,
} from "./daily-weight";
import { dailyIntakes } from "./daily-intake";
import { dailyCardioExercises } from "./cardio-exercise";

export const profile = pgTable("profile", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email")
    .references(() => user.email)
    .unique()
    .notNull(),

  image: text(),
  timezone: text().default("Asia/Seoul").notNull(),
  language: text().default("ko").notNull(),

  createdAt: timestamp({ mode: "string" }).defaultNow().notNull(),
  updatedAt: timestamp({ mode: "string" }).defaultNow().notNull(),
});

export const profileRelations = relations(profile, ({ one, many }) => ({
  user: one(user, {
    fields: [profile.email],
    references: [user.email],
  }),
  userGoals: many(userGoals),
  healthInfos: many(healthInfos),
  dailyIntakes: many(dailyIntakes),

  meals: many(meals),
  foods: many(foods),

  dailyWeightsExercises: many(dailyWeightsExercises),
  eachWeightsExercises: many(eachWeightsExercises),
  weightsSetInfo: many(weightsSetInfo),

  cardioExercises: many(dailyCardioExercises),
}));
