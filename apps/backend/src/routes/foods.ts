import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { deleteFoodSchema } from "@repo/shared-schema";
import { createDb, foods } from "@repo/db";

import { AuthMiddlewareContext } from "../lib/auth-middleware";
import { eq } from "drizzle-orm";

export const foodsRoute = new Hono<AuthMiddlewareContext>().delete(
  "/",
  zValidator("json", deleteFoodSchema),
  async (c) => {
    const user = c.get("user");
    const profile = c.get("profile");
    if (!user || !profile) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const { foodId } = c.req.valid("json");

    const db = createDb({
      DATABASE_URL: c.env.DATABASE_URL,
      NODE_ENV: c.env.NODE_ENV,
    });

    try {
      await db.delete(foods).where(eq(foods.id, foodId));

      return c.json({ message: "Successfully deleted food with foodId" }, 200);
    } catch (error) {
      return c.json({ error: "Failed to delete food with foodId" }, 500);
    }
  }
);
