import { Hono } from "hono";
import { eq } from "drizzle-orm";
import { createDb, userGoals } from "@repo/db";

import { AuthMiddlewareContext } from "../lib/auth-middleware";
import { zValidator } from "@hono/zod-validator";
import { insertGoalSchema } from "@repo/shared-schema";

export const goalRoute = new Hono<AuthMiddlewareContext>()
  .get("", async (c) => {
    const user = c.get("user");
    const profile = c.get("profile");
    if (!user || !profile) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const db = createDb({
      DATABASE_URL: c.env.DATABASE_URL,
      NODE_ENV: c.env.NODE_ENV,
    });

    const res = await db
      .select()
      .from(userGoals)
      .where(eq(userGoals.profileEmail, user.email))
      .limit(1);

    if (!res[0]) {
      return c.json({ error: "Goal not found" }, 404);
    }

    return c.json({ goal: res[0] }, 200);
  })
  .post("/", zValidator("json", insertGoalSchema), async (c) => {
    const user = c.get("user");
    const profile = c.get("profile");
    if (!user || !profile) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const body = c.req.valid("json");

    const db = createDb({
      DATABASE_URL: c.env.DATABASE_URL,
      NODE_ENV: c.env.NODE_ENV,
    });

    const res = await db
      .insert(userGoals)
      .values({
        profileEmail: profile.email,
        ...body,
      })
      .onConflictDoUpdate({
        target: userGoals.profileEmail,
        set: body,
      })
      .returning();

    if (!res[0]) {
      return c.json({ error: "Failed to create goal" }, 500);
    }

    return c.json({ goal: res[0] }, 201);
  });
