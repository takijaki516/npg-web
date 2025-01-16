import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { eq } from "drizzle-orm";
import { createDb, profile as profileSchema } from "@repo/db";
import { alterTimezoneSchema } from "@repo/shared-schema";

import { AuthMiddlewareContext } from "../lib/auth-middleware";

export const usersRoute = new Hono<AuthMiddlewareContext>()
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
      .from(profileSchema)
      .where(eq(profileSchema.email, user.email));

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
  .post("/timezone", zValidator("json", alterTimezoneSchema), async (c) => {
    const user = c.get("user");
    const profile = c.get("profile");
    if (!user || !profile) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const { timezone } = c.req.valid("json");

    const db = createDb({
      DATABASE_URL: c.env.DATABASE_URL,
      NODE_ENV: c.env.NODE_ENV,
    });

    const res = await db
      .update(profileSchema)
      .set({ timezone })
      .where(eq(profileSchema.email, user.email))
      .returning();

    if (!res[0]) {
      return c.json({ error: "Failed to update timezone" }, 500);
    }

    return c.json({ profile: res[0] }, 200);
  });
