import { Hono } from "hono";
import { z } from "zod";
import { DateTime } from "luxon";
import { zValidator } from "@hono/zod-validator";
import { and, asc, eq, gte, lt } from "drizzle-orm";
import {
  createDb,
  createPoolDb,
  dailyWeightsExercises,
  eachWeightsExercises,
  weightsSetInfo,
} from "@repo/db";
import { insertDailyWorkoutSchema } from "@repo/shared-schema";
import {
  convertToRangeOfDayUTCTime,
  convertToTimezoneDateTime,
  convertToUTCTime,
} from "@repo/utils";

import { AuthMiddlewareContext } from "../lib/auth-middleware";

export const workoutsRoute = new Hono<AuthMiddlewareContext>()
  .get(
    "/daily-weights",
    zValidator("query", z.object({ currentLocalDate: z.string() })),
    async (c) => {
      const user = c.get("user");
      const profile = c.get("profile");
      if (!user || !profile) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const { currentLocalDate } = c.req.valid("query");

      const { utcStartDateTime, utcTomorrowStartDateTime } =
        convertToRangeOfDayUTCTime({
          localDate: currentLocalDate,
          timezone: profile.timezone,
        });

      if (!utcStartDateTime || !utcTomorrowStartDateTime) {
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
          gte(dailyWeightsExercises.startTime, utcStartDateTime),
          lt(dailyWeightsExercises.startTime, utcTomorrowStartDateTime),
          eq(dailyWeightsExercises.profileEmail, user.email)
        ),
        orderBy: [asc(dailyWeightsExercises.startTime)],
      });

      res.forEach((weight) => {
        const { timezoneDateTime } = convertToTimezoneDateTime({
          utcDateTime: weight.startTime,
          timezone: profile.timezone,
        });

        weight.startTime = timezoneDateTime;
      });

      return c.json({ weights: res }, 200);
    }
  )
  .post("/", zValidator("json", insertDailyWorkoutSchema), async (c) => {
    const user = c.get("user");
    const profile = c.get("profile");
    if (!user || !profile) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const { startTime, weightsWorkouts, durationMinutes } = c.req.valid("json");

    const db = createPoolDb({
      DATABASE_URL: c.env.DATABASE_URL,
      NODE_ENV: c.env.NODE_ENV,
    });

    try {
      const insertedWeights = await db.transaction(async (tx) => {
        const { utcDateTime: startUTCTime } = convertToUTCTime({
          localDateTime: startTime,
          timezone: profile.timezone,
        });
        const profileEmail = profile.email;

        const insertedWeights = await tx
          .insert(dailyWeightsExercises)
          .values({
            profileEmail: profileEmail,
            startTime: startUTCTime,
            durationMinutes: durationMinutes,
          })
          .returning();

        if (!insertedWeights[0]) {
          throw new Error("Failed to insert daily weights");
        }

        await Promise.all(
          weightsWorkouts.map(async (weightsWorkout) => {
            const insertedWorkout = await tx
              .insert(eachWeightsExercises)
              .values({
                profileEmail: profileEmail,
                weightsExerciseId: insertedWeights[0].id,
                bodyPart: weightsWorkout.bodyPart,
                workoutName: weightsWorkout.workoutName,
              })
              .returning();

            if (!insertedWorkout[0]) {
              throw new Error("Failed to insert each weights");
            }

            await Promise.all(
              weightsWorkout.weightsWorkoutsSets.map(
                async (weightsWorkoutSet, idx) => {
                  await tx.insert(weightsSetInfo).values({
                    profileEmail: profileEmail,
                    eachWeightsExerciseId: insertedWorkout[0].id,
                    reps: weightsWorkoutSet.reps,
                    weight: weightsWorkoutSet.weightKg,
                    setNumber: idx + 1,
                  });
                }
              )
            );
          })
        );

        return insertedWeights[0];
      });

      const { timezoneDateTime } = convertToTimezoneDateTime({
        utcDateTime: insertedWeights.startTime,
        timezone: profile.timezone,
      });

      insertedWeights.startTime = timezoneDateTime;

      return c.json({ weights: insertedWeights }, 201);
    } catch (error) {
      return c.json({ message: "Failed to insert weights" }, 500);
    }
  })
  .put("/", zValidator("json", insertDailyWorkoutSchema), async (c) => {
    const user = c.get("user");
    const profile = c.get("profile");
    if (!user || !profile) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const { id, ...rest } = c.req.valid("json");
    if (!id) {
      return c.json({ error: "exerciseId is required" }, 400);
    }

    const db = createPoolDb({
      DATABASE_URL: c.env.DATABASE_URL,
      NODE_ENV: c.env.NODE_ENV,
    });

    const utcCurrentDateTime = DateTime.now()
      .toUTC()
      .toFormat("yyyy-MM-dd HH:mm:ss");

    try {
      const updatedWeights = await db.transaction(async (tx) => {
        const { utcDateTime } = convertToUTCTime({
          localDateTime: rest.startTime,
          timezone: profile.timezone,
        });
        rest.startTime = utcDateTime;

        const updatedWeights = await tx
          .update(dailyWeightsExercises)
          .set({
            durationMinutes: rest.durationMinutes,
            startTime: rest.startTime,
            updatedAt: utcCurrentDateTime,
          })
          .where(eq(dailyWeightsExercises.id, id))
          .returning();

        if (!updatedWeights[0]) {
          throw new Error("Failed to update daily weights");
        }

        await db
          .delete(eachWeightsExercises)
          .where(
            eq(eachWeightsExercises.weightsExerciseId, updatedWeights[0].id)
          );

        await Promise.all(
          rest.weightsWorkouts.map(async (weightsWorkout) => {
            const insertedWorkout = await tx
              .insert(eachWeightsExercises)
              .values({
                profileEmail: profile.email,
                weightsExerciseId: updatedWeights[0].id,
                bodyPart: weightsWorkout.bodyPart,
                workoutName: weightsWorkout.workoutName,
              })
              .returning();

            if (!insertedWorkout[0]) {
              throw new Error("Failed to insert each weights");
            }

            await Promise.all(
              weightsWorkout.weightsWorkoutsSets.map(
                async (weightsWorkoutSet, idx) => {
                  await tx.insert(weightsSetInfo).values({
                    profileEmail: profile.email,
                    eachWeightsExerciseId: insertedWorkout[0].id,
                    reps: weightsWorkoutSet.reps,
                    weight: weightsWorkoutSet.weightKg,
                    setNumber: idx + 1,
                  });
                }
              )
            );
          })
        );

        return updatedWeights[0];
      });

      const { timezoneDateTime } = convertToTimezoneDateTime({
        utcDateTime: updatedWeights.startTime,
        timezone: profile.timezone,
      });

      updatedWeights.startTime = timezoneDateTime;

      return c.json({ weights: updatedWeights }, 200);
    } catch (error) {
      return c.json({ message: "Failed to update weights" }, 500);
    }
  })
  .delete("/", zValidator("json", z.object({ id: z.string() })), async (c) => {
    const user = c.get("user");
    const profile = c.get("profile");
    if (!user || !profile) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const { id } = c.req.valid("json");

    const db = createDb({
      DATABASE_URL: c.env.DATABASE_URL,
      NODE_ENV: c.env.NODE_ENV,
    });

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
