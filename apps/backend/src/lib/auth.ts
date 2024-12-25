import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { type Context } from "hono";
import { Bindings } from "../index";
import { neon, drizzle } from "@repo/db";

export function initBetterAuth(c: Context<{ Bindings: Bindings }>) {
  const sql = neon(c.env.DATABASE_URL);
  const db = drizzle(sql);

  return betterAuth({
    database: drizzleAdapter(db, {
      provider: "pg",
    }),
    emailAndPassword: {
      enabled: true,
    },
    socialProviders: {
      google: {
        clientId: c.env.GOOGLE_CLIENT_ID,
        clientSecret: c.env.GOOGLE_CLIENT_SECRET,
      },
    },
  });
}
