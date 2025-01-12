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
import { insertHealthInfoSchema } from "@repo/shared-schema";

export const healthInfosRoute = new Hono<AuthMiddlewareContext>()
  .use(authMiddleware)
  .post("/", zValidator("json", insertHealthInfoSchema), async (c) => {
    const user = c.get("user");
    const profile = c.get("profile");

    if (!user || !profile) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const body = c.req.valid("json");

    const { utcDateTime: utcMeasuredDate } = convertToUTCTime({
      localDateTime: `${body.measuredDate} 00:00:00`,
      timeZone: profile.timezone,
    });

    if (!utcMeasuredDate) {
      return c.json({ error: "Invalid measured date" }, 400);
    }

    body.measuredDate = utcMeasuredDate;

    const db = createDb(c.env);

    await db.insert(healthInfos).values({
      profileEmail: profile.email,
      ...body,
    });

    return c.json({ message: "Health info inserted" }, 200);
  });
