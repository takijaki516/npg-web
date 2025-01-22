import { Hono } from "hono";
import { DateTime } from "luxon";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { healthInfos, profile as profileSchema, userGoals } from "@repo/db";
import { createDb, dailyIntakes } from "@repo/db";
import { and, desc, eq, gte, lt } from "drizzle-orm";
import {
  convertToRangeOfDayUTCTime,
  convertToTimezoneDateTime,
} from "@repo/utils";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateObject } from "ai";
import { calculateDailyIntakeWithAISchema } from "@repo/shared-schema";

import { intakeSystemPrompt, llmTargetSchema } from "../ai/calculate-intake";
import { AuthMiddlewareContext } from "../lib/auth-middleware";

export const intakeRoute = new Hono<AuthMiddlewareContext>()
  .get(
    "/daily",
    zValidator(
      "query",
      z.object({
        currentLocalDate: z.string(),
      })
    ),
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
        return c.json({ error: "Invalid date" }, 400);
      }

      const db = createDb({
        DATABASE_URL: c.env.DATABASE_URL,
        NODE_ENV: c.env.NODE_ENV,
      });

      const res = await db
        .select()
        .from(dailyIntakes)
        .where(
          and(
            eq(dailyIntakes.profileEmail, profile.email),
            gte(dailyIntakes.date, utcStartDateTime),
            lt(dailyIntakes.date, utcTomorrowStartDateTime)
          )
        )
        .orderBy(desc(dailyIntakes.date))
        .limit(1);

      if (!res[0]) {
        return c.json({ dailyIntake: null }, 200);
      }

      const { timezoneDateTime } = convertToTimezoneDateTime({
        utcDateTime: res[0].date,
        timezone: profile.timezone,
      });

      res[0].date = timezoneDateTime;

      return c.json({ dailyIntake: res[0] }, 200);
    }
  )
  .post(
    "/calculate-daily-intake",
    zValidator("json", calculateDailyIntakeWithAISchema),
    async (c) => {
      const user = c.get("user");
      const profile = c.get("profile");
      if (!user || !profile) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const { currentLocalDate } = c.req.valid("json");

      const db = createDb({
        DATABASE_URL: c.env.DATABASE_URL,
        NODE_ENV: c.env.NODE_ENV,
      });

      const currentLocalDateTimeInstance = DateTime.fromFormat(
        `${currentLocalDate} 00:00:00`,
        "yyyy-MM-dd HH:mm:ss",
        { zone: profile.timezone }
      );
      const localTwoWeeksBeforeDateTime = currentLocalDateTimeInstance.minus({
        weeks: 2,
      });
      const localTomorrowDateTime = currentLocalDateTimeInstance.plus({
        days: 1,
      });

      const utcCurrentDateTimeString = currentLocalDateTimeInstance
        .toUTC()
        .toFormat("yyyy-MM-dd HH:mm:ss");
      const utcTwoWeeksBeforeDateTimeString = localTwoWeeksBeforeDateTime
        .toUTC()
        .toFormat("yyyy-MM-dd HH:mm:ss");
      const utcTomorrowDateTimeString = localTomorrowDateTime
        .toUTC()
        .toFormat("yyyy-MM-dd HH:mm:ss");

      if (
        !utcCurrentDateTimeString ||
        !utcTwoWeeksBeforeDateTimeString ||
        !utcTomorrowDateTimeString
      ) {
        return c.json({ error: "Invalid date" }, 400);
      }

      const userData = await db.query.profile.findFirst({
        where: and(eq(profileSchema.email, profile.email)),
        with: {
          userGoals: {
            where: eq(userGoals.profileEmail, profile.email),
          },
          healthInfos: {
            orderBy: (healthInfos, { asc }) => [asc(healthInfos.createdAt)],
            where: and(
              gte(healthInfos.createdAt, utcTwoWeeksBeforeDateTimeString),
              lt(healthInfos.createdAt, utcCurrentDateTimeString),
              eq(healthInfos.profileEmail, profile.email)
            ),
          },
        },
      });

      // REVIEW:
      if (!userData) {
        return c.json({ error: "user not found" }, 401);
      }

      const systemPrompt = intakeSystemPrompt({
        startDateTime: utcCurrentDateTimeString,
        endDateTime: utcTomorrowDateTimeString,
        userLanguage: userData.language,
        userGoal: userData.userGoals,
        healthInfo: userData.healthInfos,
      });

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
                text: "내가 주어진 기간에 먹어야 하는 적정 칼로리, 탄수화물, 단백질, 지방은 얼마인가요?",
              },
            ],
          },
        ],
        schema: llmTargetSchema,
      });

      const {
        calories_for_today,
        carbohydrate_for_today,
        fat_for_today,
        protein_for_today,
        description,
      } = result.object;

      const [upsertedDailyIntake, _] = await Promise.all([
        db
          .insert(dailyIntakes)
          .values({
            profileEmail: profile.email,
            date: utcCurrentDateTimeString,
            goalCaloriesKcal: calories_for_today,
            goalCarbohydratesG: carbohydrate_for_today,
            goalFatG: fat_for_today,
            goalProteinG: protein_for_today,
            llmDescription: description,
          })
          .onConflictDoUpdate({
            target: [dailyIntakes.profileEmail, dailyIntakes.date],
            set: {
              goalCaloriesKcal: calories_for_today,
              goalCarbohydratesG: carbohydrate_for_today,
              goalFatG: fat_for_today,
              goalProteinG: protein_for_today,
              llmDescription: description,
            },
          })
          .returning(),
        db
          .update(dailyIntakes)
          .set({
            goalCaloriesKcal: calories_for_today,
            goalCarbohydratesG: carbohydrate_for_today,
            goalFatG: fat_for_today,
            goalProteinG: protein_for_today,
            llmDescription: description,
          })
          .where(
            and(
              eq(dailyIntakes.profileEmail, profile.email),
              gte(dailyIntakes.date, utcCurrentDateTimeString),
              lt(dailyIntakes.date, utcTomorrowDateTimeString)
            )
          )
          .returning(),
      ]);

      const { timezoneDateTime } = convertToTimezoneDateTime({
        utcDateTime: upsertedDailyIntake[0].date,
        timezone: profile.timezone,
      });

      upsertedDailyIntake[0].date = timezoneDateTime;

      return c.json({ dailyIntake: upsertedDailyIntake[0] }, 201);
    }
  );
