import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { eq } from "drizzle-orm";
import { createDb, profile as profileSchema } from "@repo/db";
import { alterTimezoneSchema } from "@repo/shared-schema";

import { AuthMiddlewareContext } from "../lib/auth-middleware";

export const usersRoute = new Hono<AuthMiddlewareContext>().post(
  "/timezone",
  zValidator("json", alterTimezoneSchema),
  async (c) => {
    const profile = c.get("profile")!;

    const { timezone } = c.req.valid("json");

    const db = createDb({
      DATABASE_URL: c.env.DATABASE_URL,
      NODE_ENV: c.env.NODE_ENV,
    });

    const res = await db
      .update(profileSchema)
      .set({ timezone })
      .where(eq(profileSchema.email, profile.email))
      .returning();

    if (!res[0]) {
      return c.json({ error: "Failed to update timezone" }, 500);
    }

    return c.json({ profile: res[0] }, 200);
  }
);
