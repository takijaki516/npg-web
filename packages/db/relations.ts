import { relations } from "drizzle-orm/relations";
import {
  user,
  account,
  session,
  dailyCardioExercises,
  dailyIntakes,
  dailyWeightsExercises,
  eachWeightsExercises,
  foods,
  meals,
  healthInfos,
  userGoals,
  weightsSetInfo,
} from "./schema";

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}));

export const userRelations = relations(user, ({ many }) => ({
  accounts: many(account),
  sessions: many(session),
  dailyCardioExercises: many(dailyCardioExercises),
  dailyIntakes: many(dailyIntakes),
  dailyWeightsExercises: many(dailyWeightsExercises),
  eachWeightsExercises: many(eachWeightsExercises),
  foods: many(foods),
  meals: many(meals),
  healthInfos: many(healthInfos),
  userGoals: many(userGoals),
  weightsSetInfos: many(weightsSetInfo),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}));

export const dailyCardioExercisesRelations = relations(
  dailyCardioExercises,
  ({ one }) => ({
    user: one(user, {
      fields: [dailyCardioExercises.userId],
      references: [user.id],
    }),
  })
);

export const dailyIntakesRelations = relations(dailyIntakes, ({ one }) => ({
  user: one(user, {
    fields: [dailyIntakes.userId],
    references: [user.id],
  }),
}));

export const dailyWeightsExercisesRelations = relations(
  dailyWeightsExercises,
  ({ one, many }) => ({
    user: one(user, {
      fields: [dailyWeightsExercises.userId],
      references: [user.id],
    }),
    eachWeightsExercises: many(eachWeightsExercises),
  })
);

export const eachWeightsExercisesRelations = relations(
  eachWeightsExercises,
  ({ one, many }) => ({
    user: one(user, {
      fields: [eachWeightsExercises.userId],
      references: [user.id],
    }),
    dailyWeightsExercise: one(dailyWeightsExercises, {
      fields: [eachWeightsExercises.weightsExerciseId],
      references: [dailyWeightsExercises.id],
    }),
    weightsSetInfos: many(weightsSetInfo),
  })
);

export const foodsRelations = relations(foods, ({ one }) => ({
  user: one(user, {
    fields: [foods.userId],
    references: [user.id],
  }),
  meal: one(meals, {
    fields: [foods.mealId],
    references: [meals.id],
  }),
}));

export const mealsRelations = relations(meals, ({ one, many }) => ({
  foods: many(foods),
  user: one(user, {
    fields: [meals.userId],
    references: [user.id],
  }),
}));

export const healthInfosRelations = relations(healthInfos, ({ one }) => ({
  user: one(user, {
    fields: [healthInfos.userId],
    references: [user.id],
  }),
}));

export const userGoalsRelations = relations(userGoals, ({ one }) => ({
  user: one(user, {
    fields: [userGoals.userId],
    references: [user.id],
  }),
}));

export const weightsSetInfoRelations = relations(weightsSetInfo, ({ one }) => ({
  user: one(user, {
    fields: [weightsSetInfo.userId],
    references: [user.id],
  }),
  eachWeightsExercise: one(eachWeightsExercises, {
    fields: [weightsSetInfo.eachWeightsExerciseId],
    references: [eachWeightsExercises.id],
  }),
}));
