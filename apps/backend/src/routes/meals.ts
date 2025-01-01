import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { and, asc, eq, gte, lt } from "drizzle-orm";
import { createDb, createPoolDb, foods, meals } from "@repo/db";
import { insertMealSchema } from "@repo/shared-schema";
import { convertToRangeOfDayUTCTime, convertToUTCTime } from "@repo/utils";

import { authMiddleware, AuthMiddlewareContext } from "../lib/auth-middleware";

export const mealsRoute = new Hono<AuthMiddlewareContext>()
  .use(authMiddleware)
  .get(
    "/",
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

      const res = await db.query.meals.findMany({
        with: {
          foods: true,
        },
        where: and(
          gte(meals.mealTime, startUTCTimeOfDay),
          lt(meals.mealTime, endUTCTimeOfDay),
          eq(meals.profileEmail, user.email)
        ),
        orderBy: [asc(meals.mealTime)],
      });

      return c.json({ meals: res }, 200);
    }
  )
  .post("/", zValidator("json", insertMealSchema), async (c) => {
    const user = c.get("user");
    if (!user) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const db = createPoolDb({
      DATABASE_URL: c.env.DATABASE_URL,
      NODE_ENV: c.env.NODE_ENV,
    });

    const values = c.req.valid("json");

    await db.transaction(async (tx) => {
      const { utcDateTime } = convertToUTCTime({
        localDateTime: values.localMealDateTime,
        timeZone: values.timezone,
      });

      if (!utcDateTime) {
        throw new Error("failed to convert meal time to utc");
      }

      const meal = await tx
        .insert(meals)
        .values({
          profileEmail: user.email,
          mealTime: utcDateTime,

          totalCaloriesKcal: values.totalCaloriesKcal,
          totalCarbohydratesG: values.totalCarbohydratesG,
          totalProteinG: values.totalProteinG,
          totalFatG: values.totalFatG,
        })
        .returning();

      await tx.insert(foods).values(
        values.foods.map((food) => {
          return {
            profileEmail: user.email,
            mealId: meal[0].id,

            foodName: food.foodName,
            foodPic: food.foodPic,

            foodCaloriesKcal: food.foodCaloriesKcal,
            foodCarbohydratesG: food.foodCarbohydratesG,
            foodProteinG: food.foodProteinG,
            foodFatG: food.foodFatG,
          };
        })
      );
    });

    return c.json({ message: "meal added" }, 201);
  });
