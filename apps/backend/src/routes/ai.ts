import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { generateObject } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { DateTime } from "luxon";
import { and, eq, gte, lt } from "drizzle-orm";

import { createDb, dailyIntakes, meals, profile } from "@repo/db";
import { authMiddleware, AuthMiddlewareContext } from "../lib/auth-middleware";
import { intakeSystemPrompt, llmTargetSchema } from "../ai/gen-intake";
import {
  CALCULATE_CALORIE_PROMPT,
  llmCalorieResponseSchema,
} from "../ai/calculate-calorie";

export const aiRoute = new Hono<AuthMiddlewareContext>()
  .use(authMiddleware)
  .post(
    "/intake",
    zValidator(
      "json",
      z.object({
        dateTime: z.string(),
        timezone: z.string(),
        dailyIntakeId: z.string(),
      })
    ),
    async (c) => {
      const user = c.get("user");
      if (!user) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const { dateTime, timezone, dailyIntakeId } = c.req.valid("json");

      const db = createDb({
        DATABASE_URL: c.env.DATABASE_URL,
        NODE_ENV: c.env.NODE_ENV,
      });

      let currentDate = dateTime.split(/[T ]/)[0];

      const currentDateTime = DateTime.fromFormat(
        currentDate,
        "yyyy-MM-dd"
      ).setZone(timezone);

      const twoWeeksBeforeDateTime = currentDateTime.minus({ weeks: 2 });
      const tomorrowDateTime = currentDateTime.plus({ days: 1 });

      const currentDateTimeString = currentDateTime.toUTC().toSQL();
      const twoWeeksBeforeDateTimeString = twoWeeksBeforeDateTime
        .toUTC()
        .toSQL();
      const tomorrowDateTimeString = tomorrowDateTime.toUTC().toSQL();

      if (
        !currentDateTimeString ||
        !twoWeeksBeforeDateTimeString ||
        !tomorrowDateTimeString
      ) {
        return c.json({ error: "Invalid date" }, 400);
      }

      const userData = await db.query.profile.findFirst({
        where: and(eq(profile.email, user.email)),
        with: {
          userGoals: true,
          // NOTE: just for test
          healthInfos: {
            orderBy: (healthInfos, { desc }) => [desc(healthInfos.createdAt)],
            limit: 1,
          },
          // NOTE: just for test
          meals: {
            where: and(
              gte(meals.mealTime, twoWeeksBeforeDateTimeString),
              lt(meals.mealTime, currentDateTimeString)
            ),
            orderBy: (meals, { asc }) => [asc(meals.mealTime)],
            limit: 1,
          },
        },
      });

      if (!userData) {
        return c.json({ error: "User not found" }, 404);
      }

      const systemPrompt = intakeSystemPrompt({
        startDateTime: currentDateTimeString,
        endDateTime: tomorrowDateTimeString,
        userLanguage: userData.language,
        userGoal: userData?.userGoals,
        healthInfo: userData?.healthInfos,
        mealInfo: userData?.meals,
      });

      const userPrompt =
        userData.language === "ko"
          ? "내가 주어진 기간에 먹어야 하는 적정 칼로리, 탄수화물, 단백질, 지방은 얼마인가요?"
          : "What is my appropriate target intake for given time range?";

      const google = createGoogleGenerativeAI({
        apiKey: c.env.GOOGLE_GENERATIVE_AI_API_KEY,
      });

      const result = await generateObject({
        model: google("gemini-2.0-flash-exp"),
        system: systemPrompt,
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: userPrompt,
              },
            ],
          },
        ],
        schema: llmTargetSchema,
      });

      const {
        calories_for_today,
        carbohydrate_for_today,
        description,
        fat_for_today,
        protein_for_today,
      } = result.object;

      const updatedDailyIntake = await db
        .update(dailyIntakes)
        .set({
          goalCaloriesKcal: calories_for_today,
          goalCarbohydratesG: carbohydrate_for_today,
          goalFatG: fat_for_today,
          goalProteinG: protein_for_today,
          llmDescription: description,
        })
        .where(and(eq(dailyIntakes.id, dailyIntakeId)))
        .returning();

      return c.json({ updatedDailyIntake }, 201);
    }
  )
  .post("/calc-calorie", async (c) => {
    const user = c.get("user");
    if (!user) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const formData = await c.req.formData();
    const image = formData.get("image") as File;
    const userLanguage = formData.get("language") as string;

    const userRequest =
      userLanguage === "ko"
        ? "이미지에 있는 음식의 이름, 칼로리, 단백질, 지방, 탄수화물을 계산해줘"
        : "Calculate the name, calories, protein, fat, and carbohydrate of the foods in the image";

    const google = createGoogleGenerativeAI({
      apiKey: c.env.GOOGLE_GENERATIVE_AI_API_KEY,
    });

    const result = await generateObject({
      model: google("gemini-2.0-flash-exp"),
      system: CALCULATE_CALORIE_PROMPT,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: userRequest,
            },
            {
              type: "image",
              image: await image.arrayBuffer(),
            },
          ],
        },
      ],
      schema: llmCalorieResponseSchema,
    });

    return result.toJsonResponse();
  });
