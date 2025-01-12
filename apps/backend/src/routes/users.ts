import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { and, desc, eq, gte, lt } from "drizzle-orm";
import { convertToRangeOfDayUTCTime, convertToUTCTime } from "@repo/utils";
import {
  createDb,
  dailyIntakes,
  healthInfos,
  profile,
  userGoals,
} from "@repo/db";

import { authMiddleware, AuthMiddlewareContext } from "../lib/auth-middleware";

export const usersRoute = new Hono<AuthMiddlewareContext>()
  .use(authMiddleware)
  .get("/profile", async (c) => {
    const user = c.get("user");
    if (!user) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const db = createDb({
      DATABASE_URL: c.env.DATABASE_URL,
      NODE_ENV: c.env.NODE_ENV,
    });

    const res = await db
      .select()
      .from(profile)
      .where(eq(profile.email, user.email));

    if (!res[0]) {
      return c.json({ error: "Profile not found" }, 404);
    }

    return c.json(
      {
        profile: res[0],
      },
      200
    );
  })
  .get("/goal", async (c) => {
    const user = c.get("user");
    if (!user) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const db = createDb({
      DATABASE_URL: c.env.DATABASE_URL,
      NODE_ENV: c.env.NODE_ENV,
    });

    const res = await db
      .select()
      .from(userGoals)
      .where(eq(userGoals.profileEmail, user.email));

    return c.json({ goal: res[0] }, 200);
  })
  .post("/goal", async (c) => {
    const user = c.get("user");
    if (!user) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const db = createDb({
      DATABASE_URL: c.env.DATABASE_URL,
      NODE_ENV: c.env.NODE_ENV,
    });

    const res = await db
      .insert(userGoals)
      .values({
        profileEmail: user.email,
      })
      .returning();

    if (!res[0]) {
      return c.json({ error: "Failed to create goal" }, 500);
    }

    return c.json({ goal: res[0] }, 200);
  })
  .get(
    "/daily-intake",
    zValidator(
      "query",
      z.object({
        currentLocalDateTime: z.string(),
        timezone: z.string(),
      })
    ),
    async (c) => {
      const user = c.get("user");
      if (!user) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      // this is in UTC
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

      let res = await db
        .select()
        .from(dailyIntakes)
        .where(
          and(
            eq(dailyIntakes.profileEmail, user.email),
            gte(dailyIntakes.date, startUTCTimeOfDay),
            lt(dailyIntakes.date, endUTCTimeOfDay)
          )
        )
        .orderBy(desc(dailyIntakes.date))
        .limit(1);

      if (!res[0]) {
        const { utcDateTime } = convertToUTCTime({
          localDateTime: currentLocalDateTime,
          timeZone: timezone,
        });

        if (!utcDateTime) {
          return c.json({ error: "Failed to get UTC time" }, 500);
        }

        res = await db
          .insert(dailyIntakes)
          .values({
            profileEmail: user.email,
            date: utcDateTime,
          })
          .returning();
      }

      return c.json({ dailyIntake: res[0] }, 200);
    }
  )
  .get("/latest-health-info", async (c) => {
    const user = c.get("user");

    if (!user) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const db = createDb({
      DATABASE_URL: c.env.DATABASE_URL,
      NODE_ENV: c.env.NODE_ENV,
    });

    const res = await db
      .select()
      .from(healthInfos)
      .where(eq(healthInfos.profileEmail, user.email))
      .orderBy(desc(healthInfos.measuredDate))
      .limit(1);

    return c.json({ healthInfo: res[0] ?? null }, 200);
  });
