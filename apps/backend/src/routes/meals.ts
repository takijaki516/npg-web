import { Hono } from "hono";
import { z } from "zod";
import { DateTime } from "luxon";
import { zValidator } from "@hono/zod-validator";
import { and, asc, eq, gte, lt } from "drizzle-orm";
import { createDb, createPoolDb, foods, meals } from "@repo/db";
import {
  aiCalcFoodCalorieSchema,
  insertMealSchema,
  llmCalorieResponseSchema,
} from "@repo/shared-schema";
import {
  convertToRangeOfDayUTCTime,
  convertToTimezoneDateTime,
  convertToUTCTime,
} from "@repo/utils";
import { generateObject } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";

import { AuthMiddlewareContext } from "../lib/auth-middleware";
import { CALCULATE_CALORIE_PROMPT } from "../ai/calculate-calorie";

export const mealsRoute = new Hono<AuthMiddlewareContext>()
  .get(
    "/daily-meals",
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

      const res = await db.query.meals.findMany({
        with: {
          foods: true,
        },
        where: and(
          gte(meals.mealTime, utcStartDateTime),
          lt(meals.mealTime, utcTomorrowStartDateTime),
          eq(meals.profileEmail, profile.email)
        ),
        orderBy: [asc(meals.mealTime)],
      });

      res.forEach((meal) => {
        const { timezoneDateTime } = convertToTimezoneDateTime({
          utcDateTime: meal.mealTime,
          timezone: profile.timezone,
        });

        meal.mealTime = timezoneDateTime;
      });

      return c.json({ meals: res }, 200);
    }
  )
  .post("/", zValidator("json", insertMealSchema), async (c) => {
    const user = c.get("user");
    const profile = c.get("profile");
    if (!user || !profile) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const values = c.req.valid("json");

    const db = createPoolDb({
      DATABASE_URL: c.env.DATABASE_URL,
      NODE_ENV: c.env.NODE_ENV,
    });

    try {
      const insertedMeal = await db.transaction(async (tx) => {
        const { utcDateTime } = convertToUTCTime({
          localDateTime: values.localMealDateTime,
          timezone: profile.timezone,
        });

        if (!utcDateTime) {
          throw new Error("Failed to convert meal time");
        }

        const meal = await tx
          .insert(meals)
          .values({
            profileEmail: profile.email,
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

        return meal[0];
      });

      const { timezoneDateTime } = convertToTimezoneDateTime({
        utcDateTime: insertedMeal.mealTime,
        timezone: profile.timezone,
      });

      insertedMeal.mealTime = timezoneDateTime;

      return c.json({ meal: insertedMeal }, 201);
    } catch (error) {
      return c.json({ message: "Failed to insert meal" }, 500);
    }
  })
  .put("/", zValidator("json", insertMealSchema), async (c) => {
    const user = c.get("user");
    const profile = c.get("profile");
    if (!user || !profile) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const values = c.req.valid("json");
    const { mealId, ...restMeal } = values;
    if (!mealId) {
      return c.json({ error: "Meal id is required" }, 400);
    }

    const db = createPoolDb({
      DATABASE_URL: c.env.DATABASE_URL,
      NODE_ENV: c.env.NODE_ENV,
    });

    const utcCurrentDateTime = DateTime.now()
      .toUTC()
      .toFormat("yyyy-MM-dd HH:mm:ss");

    try {
      const updatedMeal = await db.transaction(async (tx) => {
        const { utcDateTime } = convertToUTCTime({
          localDateTime: values.localMealDateTime,
          timezone: profile.timezone,
        });

        if (!utcDateTime) {
          throw new Error("Failed to convert meal time");
        }

        const updatedMeal = await tx
          .update(meals)
          .set({
            mealTime: utcDateTime,
            totalCaloriesKcal: restMeal.totalCaloriesKcal,
            totalCarbohydratesG: restMeal.totalCarbohydratesG,
            totalFatG: restMeal.totalFatG,
            totalProteinG: restMeal.totalProteinG,

            updatedAt: utcCurrentDateTime,
          })
          .where(eq(meals.id, mealId))
          .returning();

        if (!updatedMeal[0]) {
          throw new Error("Failed to update meal");
        }

        // delete all foods and insert new foods
        await tx.delete(foods).where(eq(foods.mealId, updatedMeal[0].id));

        await tx.insert(foods).values(
          values.foods.map((food) => {
            return {
              profileEmail: user.email,
              mealId: updatedMeal[0].id,

              foodName: food.foodName,
              foodPic: food.foodPic,

              foodCaloriesKcal: food.foodCaloriesKcal,
              foodCarbohydratesG: food.foodCarbohydratesG,
              foodProteinG: food.foodProteinG,
              foodFatG: food.foodFatG,
            };
          })
        );

        return updatedMeal[0];
      });

      const { timezoneDateTime } = convertToTimezoneDateTime({
        timezone: profile.timezone,
        utcDateTime: updatedMeal.mealTime,
      });

      updatedMeal.mealTime = timezoneDateTime;

      return c.json({ meal: updatedMeal }, 200);
    } catch (error) {
      return c.json({ message: "Failed to update meal" }, 500);
    }
  })
  .post(
    "/ai-calc-food-calorie",
    zValidator("form", aiCalcFoodCalorieSchema),
    async (c) => {
      const user = c.get("user");
      const profile = c.get("profile");
      if (!user || !profile) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const { foodImage } = c.req.valid("form");

      const google = createGoogleGenerativeAI({
        apiKey: c.env.GOOGLE_GENERATIVE_AI_API_KEY,
      });

      const result = await generateObject({
        model: google("gemini-2.0-flash-001"),
        system: CALCULATE_CALORIE_PROMPT,
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "이미지에 있는 음식의 이름, 칼로리, 단백질, 지방, 탄수화물을 계산해줘",
              },
              {
                type: "image",
                image: await foodImage.arrayBuffer(),
              },
            ],
          },
        ],
        schema: llmCalorieResponseSchema,
      });

      return result.toJsonResponse();
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
      .delete(meals)
      .where(and(eq(meals.id, id), eq(meals.profileEmail, user.email)))
      .returning({ id: meals.id });

    if (result.length === 0) {
      return c.json({ error: "Weights not found" }, 404);
    }

    return c.json({ message: "Weights deleted successfully" }, 200);
  });
