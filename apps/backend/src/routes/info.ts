import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { and, gte, lt } from "drizzle-orm";
import { createDb, dailyWeightsExercises, healthInfos, meals } from "@repo/db";
import {
  convertToRangeOfDayUTCTime,
  convertToRangeOfMonthUTCTime,
  convertToTimezoneDate,
  convertToUTCTime,
  getDatesKeyObject,
} from "@repo/utils";

import { authMiddleware, AuthMiddlewareContext } from "../lib/auth-middleware";

export const infosRoute = new Hono<AuthMiddlewareContext>()
  .use(authMiddleware)
  .get(
    "/monthly",
    zValidator(
      "query",
      z.object({ localYearMonth: z.string(), timeZone: z.string() })
    ),
    async (c) => {
      const user = c.get("user");

      if (!user) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const { localYearMonth, timeZone } = c.req.valid("query");
      const { startDateTime, endDateTime } = convertToRangeOfMonthUTCTime({
        localYearMonth,
        timeZone,
      });

      if (!startDateTime || !endDateTime) {
        return c.json({ error: "Invalid startDateTime or endDateTime" }, 400);
      }

      const db = createDb({
        DATABASE_URL: c.env.DATABASE_URL,
        NODE_ENV: c.env.NODE_ENV,
      });

      const exerciseRes = await db.query.dailyWeightsExercises.findMany({
        where: and(
          gte(dailyWeightsExercises.startTime, startDateTime),
          lt(dailyWeightsExercises.startTime, endDateTime)
        ),
      });

      const mealRes = await db.query.meals.findMany({
        where: and(
          gte(meals.mealTime, startDateTime),
          lt(meals.mealTime, endDateTime)
        ),
      });

      const exercisesByDate: Record<
        string,
        Array<(typeof exerciseRes)[number]>
      > = {};

      exerciseRes.forEach((exercise) => {
        const timezoneDate = convertToTimezoneDate({
          utcDateTime: exercise.startTime,
          timezone: timeZone,
        });

        if (!exercisesByDate[timezoneDate]) {
          exercisesByDate[timezoneDate] = [];
        }

        exercisesByDate[timezoneDate].push(exercise);
      });

      const mealsByDate: Record<string, Array<(typeof mealRes)[number]>> = {};

      mealRes.forEach((meal) => {
        const timezoneDate = convertToTimezoneDate({
          utcDateTime: meal.mealTime,
          timezone: timeZone,
        });

        if (!mealsByDate[timezoneDate]) {
          mealsByDate[timezoneDate] = [];
        }

        mealsByDate[timezoneDate].push(meal);
      });

      return c.json({ exercisesByDate, mealsByDate });
    }
  )
  .get(
    "/daily",
    zValidator(
      "query",
      z.object({ localDate: z.string(), timeZone: z.string() })
    ),
    async (c) => {
      const user = c.get("user");

      if (!user) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const { localDate, timeZone } = c.req.valid("query");
      const { startUTCTimeOfDay, endUTCTimeOfDay } = convertToRangeOfDayUTCTime(
        {
          localDateTime: localDate,
          timeZone,
        }
      );

      if (!startUTCTimeOfDay || !endUTCTimeOfDay) {
        return c.json(
          { error: "Invalid startUTCTimeOfDay or endUTCTimeOfDay" },
          400
        );
      }

      const db = createDb({
        DATABASE_URL: c.env.DATABASE_URL,
        NODE_ENV: c.env.NODE_ENV,
      });

      const exerciseRes = await db.query.dailyWeightsExercises.findMany({
        where: and(
          gte(dailyWeightsExercises.startTime, startUTCTimeOfDay),
          lt(dailyWeightsExercises.startTime, endUTCTimeOfDay)
        ),
        with: {
          eachWeightsExercises: {
            with: {
              weightsSetInfo: true,
            },
          },
        },
      });

      const mealRes = await db.query.meals.findMany({
        where: and(
          gte(meals.mealTime, startUTCTimeOfDay),
          lt(meals.mealTime, endUTCTimeOfDay)
        ),
        with: {
          foods: true,
        },
      });

      return c.json({ exercises: exerciseRes, meals: mealRes });
    }
  )
  .get(
    "/range-health",
    zValidator(
      "query",
      z.object({
        startLocalDate: z.string(),
        endLocalDate: z.string(),
      })
    ),
    async (c) => {
      const user = c.get("user");
      const profile = c.get("profile");

      if (!user || !profile) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const { startLocalDate, endLocalDate } = c.req.valid("query");

      const { utcDateTime: startUTCLocalDateTime } = convertToUTCTime({
        localDateTime: `${startLocalDate} 00:00:00`,
        timeZone: profile.timezone,
      });

      const { utcDateTime: endUTCLocalDateTime } = convertToUTCTime({
        localDateTime: `${endLocalDate} 23:59:59`,
        timeZone: profile.timezone,
      });

      if (!startUTCLocalDateTime || !endUTCLocalDateTime) {
        return c.json(
          { error: "Invalid startUTCLocalDateTime or endUTCLocalDateTime" },
          400
        );
      }

      const db = createDb({
        DATABASE_URL: c.env.DATABASE_URL,
        NODE_ENV: c.env.NODE_ENV,
      });

      const healthInfosRes = await db.query.healthInfos.findMany({
        where: and(
          gte(healthInfos.measuredDate, startUTCLocalDateTime),
          lt(healthInfos.measuredDate, endUTCLocalDateTime)
        ),
        columns: {
          weightKg: true,
          measuredDate: true,
        },
        orderBy: (healthInfos, { asc }) => [asc(healthInfos.measuredDate)],
      });

      const formattedHealthInfos = getDatesKeyObject(
        startLocalDate,
        endLocalDate,
        { weightKg: 0 }
      );

      healthInfosRes.reduce((acc, healthInfo) => {
        const localDate = convertToTimezoneDate({
          utcDateTime: healthInfo.measuredDate,
          timezone: profile.timezone,
        });

        acc[localDate] = {
          weightKg: healthInfo.weightKg ?? 0,
        };

        return acc;
      }, formattedHealthInfos);

      return c.json({ healthInfos: formattedHealthInfos });
    }
  );
