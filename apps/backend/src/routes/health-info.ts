import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { and, desc, eq, gte, lt, lte } from "drizzle-orm";
import { createDb, healthInfos } from "@repo/db";
import { insertHealthInfoSchema } from "@repo/shared-schema";
import {
  convertToRangeOfDayUTCTime,
  convertToTimezoneDateTime,
  convertToUTCTime,
  getDatesKeyObject,
} from "@repo/utils";

import { AuthMiddlewareContext } from "../lib/auth-middleware";

export const healthInfosRoute = new Hono<AuthMiddlewareContext>()
  .post("/", zValidator("json", insertHealthInfoSchema), async (c) => {
    const profile = c.get("profile")!;

    const body = c.req.valid("json");

    const { utcStartDateTime, utcTomorrowStartDateTime } =
      convertToRangeOfDayUTCTime({
        localDate: body.measuredDate,
        timezone: profile.timezone,
      });

    const { utcDateTime: utcMeasuredDateTime } = convertToUTCTime({
      localDateTime: `${body.measuredDate} 00:00:00`,
      timezone: profile.timezone,
    });

    if (
      !utcStartDateTime ||
      !utcTomorrowStartDateTime ||
      !utcMeasuredDateTime
    ) {
      return c.json({ error: "Invalid measured date" }, 400);
    }

    body.measuredDate = utcMeasuredDateTime;

    const db = createDb(c.env);

    try {
      const [_, res] = await Promise.all([
        db
          .update(healthInfos)
          .set({
            weightKg: body.weightKg,
            heightCm: body.heightCm,
            age: body.age,
            bodyFatMassKg: body.bodyFatMassKg,
            skeletalMuscleMassKg: body.skeletalMuscleMassKg,
          })
          .where(
            and(
              eq(healthInfos.profileEmail, profile.email),
              gte(healthInfos.measuredDate, utcStartDateTime),
              lt(healthInfos.measuredDate, utcTomorrowStartDateTime)
            )
          ),
        db
          .insert(healthInfos)
          .values({
            profileEmail: profile.email,
            ...body,
          })
          .onConflictDoUpdate({
            target: [healthInfos.profileEmail, healthInfos.measuredDate],
            set: {
              ...body,
            },
          })
          .returning(),
      ]);

      const insertedHealthInfo = res[0];
      const { timezoneDateTime } = convertToTimezoneDateTime({
        utcDateTime: insertedHealthInfo.measuredDate,
        timezone: profile.timezone,
      });
      insertedHealthInfo.measuredDate = timezoneDateTime;

      return c.json({ healthInfo: insertedHealthInfo }, 201);
    } catch (err) {
      console.error(err);
      return c.json({ error: "Failed to insert health info" }, 500);
    }
  })
  .get("/d/:date", async (c) => {
    const profile = c.get("profile")!;

    const date = c.req.param("date");

    const { utcStartDateTime, utcTomorrowStartDateTime } =
      convertToRangeOfDayUTCTime({
        localDate: date,
        timezone: profile.timezone,
      });

    if (!utcStartDateTime || !utcTomorrowStartDateTime) {
      return c.json({ error: "Invalid date" }, 400);
    }

    const db = createDb(c.env);

    const res = await db
      .select()
      .from(healthInfos)
      .where(
        and(
          eq(healthInfos.profileEmail, profile.email),
          gte(healthInfos.measuredDate, utcStartDateTime),
          lt(healthInfos.measuredDate, utcTomorrowStartDateTime)
        )
      )
      .orderBy(desc(healthInfos.measuredDate))
      .limit(1);

    const healthInfo = res[0];

    if (!healthInfo) {
      return c.json({ healthInfo: null }, 404);
    }

    const { timezoneDateTime } = convertToTimezoneDateTime({
      utcDateTime: healthInfo.measuredDate,
      timezone: profile.timezone,
    });

    healthInfo.measuredDate = timezoneDateTime;

    return c.json({ healthInfo }, 200);
  })
  .get("/latest-health-info", async (c) => {
    const profile = c.get("profile")!;

    const db = createDb({
      DATABASE_URL: c.env.DATABASE_URL,
      NODE_ENV: c.env.NODE_ENV,
    });

    const res = await db
      .select()
      .from(healthInfos)
      .where(eq(healthInfos.profileEmail, profile.email))
      .orderBy(desc(healthInfos.measuredDate))
      .limit(1);

    const healthInfo = res[0];

    if (!healthInfo) {
      return c.json({ healthInfo: null }, 404);
    }

    const { timezoneDateTime } = convertToTimezoneDateTime({
      utcDateTime: healthInfo.measuredDate,
      timezone: profile.timezone,
    });

    healthInfo.measuredDate = timezoneDateTime;

    return c.json({ healthInfo }, 200);
  })
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
      const profile = c.get("profile")!;

      const { startLocalDate, endLocalDate } = c.req.valid("query");

      const { utcDateTime: startUTCLocalDateTime } = convertToUTCTime({
        localDateTime: `${startLocalDate} 00:00:00`,
        timezone: profile.timezone,
      });

      const { utcDateTime: endUTCLocalDateTime } = convertToUTCTime({
        localDateTime: `${endLocalDate} 23:59:59`,
        timezone: profile.timezone,
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
          lte(healthInfos.measuredDate, endUTCLocalDateTime),
          eq(healthInfos.profileEmail, profile.email)
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
        const { timezoneDateTime } = convertToTimezoneDateTime({
          utcDateTime: healthInfo.measuredDate,
          timezone: profile.timezone,
        });

        const justDate = timezoneDateTime.split(" ")[0];

        acc[justDate] = {
          weightKg: healthInfo.weightKg ?? 0,
        };

        return acc;
      }, formattedHealthInfos);

      return c.json({ healthInfos: formattedHealthInfos }, 200);
    }
  );
