import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { and, asc, eq, gte, lt } from "drizzle-orm";
import { DateTime } from "luxon";
import { createDb, foods, meals, profile } from "@repo/db";
import { insertMealSchema } from "@repo/shared-schema";
import { convertToRangeOfDayUTCTime } from "@repo/utils";

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

    const db = createDb({
      DATABASE_URL: c.env.DATABASE_URL,
      NODE_ENV: c.env.NODE_ENV,
    });

    const values = c.req.valid("json");

    await db.transaction(async (tx) => {
      const profileRes = await tx
        .select()
        .from(profile)
        .where(eq(profile.email, user.email))
        .limit(1);

      if (!profileRes) {
        throw new Error("profile not found");
      }

      const mealUTCTime = DateTime.fromFormat(
        values.mealTime,
        "yyyy-MM-dd HH:mm:ss"
      )
        .setZone(profileRes[0].timezone)
        .toUTC()
        .toSQL();

      // REVIEW: stop transaction
      if (!mealUTCTime) {
        throw new Error("failed to convert meal time to utc");
      }

      const meal = await tx
        .insert(meals)
        .values({
          profileEmail: profileRes[0].email,
          mealTime: mealUTCTime,

          totalCaloriesKcal: values.totalCaloriesKcal,
          totalCarbohydratesG: values.totalCarbohydratesG,
          totalProteinG: values.totalProteinG,
          totalFatG: values.totalFatG,
        })
        .returning();

      await tx.insert(foods).values(
        values.foods.map((food) => {
          return {
            profileEmail: profileRes[0].email,
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
