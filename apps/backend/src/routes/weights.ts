import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { and, asc, eq, gte, lt } from "drizzle-orm";
import { DateTime } from "luxon";
import {
  createDb,
  createPoolDb,
  dailyWeightsExercises,
  eachWeightsExercises,
  weightsSetInfo,
} from "@repo/db";
import { insertDailyWeightsExerciseSchema } from "@repo/shared-schema";
import { convertToRangeOfDayUTCTime } from "@repo/utils";

import { authMiddleware, AuthMiddlewareContext } from "../lib/auth-middleware";

export const weightsRoute = new Hono<AuthMiddlewareContext>()
  .use(authMiddleware)
  .get(
    "/daily-weights",
    zValidator(
      "query",
      z.object({ currentLocalDateTime: z.string(), timezone: z.string() })
    ),
    async (c) => {
      const user = c.get("user");
      if (!user) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const { currentLocalDateTime, timezone } = c.req.valid("query");

      const { startUTCTimeOfDay, endUTCTimeOfDay } = convertToRangeOfDayUTCTime(
        {
          localDateTime: currentLocalDateTime,
          timeZone: timezone,
        }
      );

      if (!startUTCTimeOfDay || !endUTCTimeOfDay) {
        return c.json(
          { error: "Failed to get start and end time of day" },
          500
        );
      }

      const db = createDb({
        DATABASE_URL: c.env.DATABASE_URL,
        NODE_ENV: c.env.NODE_ENV,
      });

      const res = await db.query.dailyWeightsExercises.findMany({
        with: {
          eachWeightsExercises: {
            with: {
              weightsSetInfo: true,
            },
          },
        },
        where: and(
          gte(dailyWeightsExercises.startTime, startUTCTimeOfDay),
          lt(dailyWeightsExercises.startTime, endUTCTimeOfDay),
          eq(dailyWeightsExercises.profileEmail, user.email)
        ),
        orderBy: [asc(dailyWeightsExercises.startTime)],
      });

      return c.json({ weights: res }, 200);
    }
  )
  .post(
    "/",
    zValidator("json", insertDailyWeightsExerciseSchema),
    async (c) => {
      const user = c.get("user");

      if (!user) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const {
        profileEmail,
        startTime,
        timezone,
        weightsWorkouts,
        durationMinutes,
      } = c.req.valid("json");

      const db = createPoolDb({
        DATABASE_URL: c.env.DATABASE_URL,
        NODE_ENV: c.env.NODE_ENV,
      });

      await db.transaction(async (tx) => {
        const startUTCTime = DateTime.fromFormat(
          startTime,
          "yyyy-MM-dd HH:mm:ss"
        )
          .setZone(timezone)
          .toUTC()
          .toSQL();

        if (!startUTCTime) {
          throw new Error("Invalid start time");
        }

        const insertedWeights = await tx
          .insert(dailyWeightsExercises)
          .values({
            profileEmail: profileEmail,
            startTime: startUTCTime,
            durationMinutes: durationMinutes,
          })
          .returning();

        weightsWorkouts.forEach(async (weightsWorkout) => {
          const insertedWorkout = await tx
            .insert(eachWeightsExercises)
            .values({
              profileEmail: profileEmail,
              weightsExerciseId: insertedWeights[0].id,
              bodyPart: weightsWorkout.bodyPart,
              workoutName: weightsWorkout.workoutName,
            })
            .returning();

          weightsWorkout.weightsWorkoutsSets.forEach(
            async (weightsWorkoutSet) => {
              await tx.insert(weightsSetInfo).values({
                profileEmail: profileEmail,
                eachWeightsExerciseId: insertedWorkout[0].id,
                reps: weightsWorkoutSet.reps,
                weight: weightsWorkoutSet.weightKg,
                setNumber: weightsWorkoutSet.setNumber,
              });
            }
          );
        });
      });

      return c.json({ message: "Weights inserted successfully" }, 200);
    }
  )
  .delete("/", zValidator("json", z.object({ id: z.string() })), async (c) => {
    const user = c.get("user");

    if (!user) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const { id } = c.req.valid("json");

    const db = createDb({
      DATABASE_URL: c.env.DATABASE_URL,
      NODE_ENV: c.env.NODE_ENV,
    });

    // TODO: add cascade delete
    const result = await db
      .delete(dailyWeightsExercises)
      .where(
        and(
          eq(dailyWeightsExercises.id, id),
          eq(dailyWeightsExercises.profileEmail, user.email)
        )
      )
      .returning({ id: dailyWeightsExercises.id });

    if (result.length === 0) {
      return c.json({ error: "Weights not found" }, 404);
    }

    return c.json({ message: "Weights deleted successfully" }, 200);
  });
