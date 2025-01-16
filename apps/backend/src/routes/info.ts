import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { and, gte, lt } from "drizzle-orm";
import { createDb, dailyWeightsExercises, meals } from "@repo/db";
import {
  convertToRangeOfMonthUTCTime,
  convertToTimezoneDateTime,
} from "@repo/utils";

import { AuthMiddlewareContext } from "../lib/auth-middleware";

export const infosRoute = new Hono<AuthMiddlewareContext>().get(
  "/monthly",
  zValidator("query", z.object({ localYearMonth: z.string() })),
  async (c) => {
    const user = c.get("user");
    const profile = c.get("profile");
    if (!user || !profile) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const { localYearMonth } = c.req.valid("query");
    const { utcStartDateTime, utcNextMonthStartDateTime } =
      convertToRangeOfMonthUTCTime({
        localYearMonth,
        timezone: profile.timezone,
      });

    if (!utcStartDateTime || !utcNextMonthStartDateTime) {
      return c.json({ error: "Invalid startDateTime or endDateTime" }, 400);
    }

    const db = createDb({
      DATABASE_URL: c.env.DATABASE_URL,
      NODE_ENV: c.env.NODE_ENV,
    });

    const [exerciseRes, mealRes] = await Promise.all([
      db.query.dailyWeightsExercises.findMany({
        where: and(
          gte(dailyWeightsExercises.startTime, utcStartDateTime),
          lt(dailyWeightsExercises.startTime, utcNextMonthStartDateTime)
        ),
      }),
      db.query.meals.findMany({
        where: and(
          gte(meals.mealTime, utcStartDateTime),
          lt(meals.mealTime, utcNextMonthStartDateTime)
        ),
      }),
    ]);

    const exercisesByDate: Record<
      string,
      Array<(typeof exerciseRes)[number]>
    > = {};

    exerciseRes.forEach((exercise) => {
      const { timezoneDateTime } = convertToTimezoneDateTime({
        utcDateTime: exercise.startTime,
        timezone: profile.timezone,
      });

      const justDate = timezoneDateTime.split(" ")[0];

      if (!exercisesByDate[justDate]) {
        exercisesByDate[justDate] = [];
      }

      exercisesByDate[justDate].push(exercise);
    });

    const mealsByDate: Record<string, Array<(typeof mealRes)[number]>> = {};

    mealRes.forEach((meal) => {
      const { timezoneDateTime } = convertToTimezoneDateTime({
        utcDateTime: meal.mealTime,
        timezone: profile.timezone,
      });

      const justDate = timezoneDateTime.split(" ")[0];

      if (!mealsByDate[justDate]) {
        mealsByDate[justDate] = [];
      }

      mealsByDate[justDate].push(meal);
    });

    return c.json({ exercisesByDate, mealsByDate }, 200);
  }
);
