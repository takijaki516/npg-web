import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import type { Context } from "hono";
import type { AppContext } from "../app";

import {
  profile,
  account,
  createDb,
  session,
  user,
  verification,
} from "@repo/db";

export function initBetterAuth(env: Context<AppContext>["env"]) {
  const db = createDb({
    DATABASE_URL: env.DATABASE_URL,
    NODE_ENV: env.NODE_ENV,
  });

  return betterAuth({
    database: drizzleAdapter(db, {
      provider: "pg",
      schema: {
        user,
        verification,
        account,
        session,
      },
    }),
    databaseHooks: {
      user: {
        create: {
          after: async (user) => {
            await db.insert(profile).values({
              email: user.email,
              image: user.image,
            });
          },
        },
      },
    },
    socialProviders: {
      google: {
        clientId: env.GOOGLE_CLIENT_ID,
        clientSecret: env.GOOGLE_CLIENT_SECRET,
      },
    },
    baseURL: env.BETTER_AUTH_URL,
    secret: env.BETTER_AUTH_SECRET,
    trustedOrigins: ["http://localhost:5173"],
  });
}

export type Auth = ReturnType<typeof initBetterAuth>;
