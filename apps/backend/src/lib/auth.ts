import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { customSession } from "better-auth/plugins";
import type { Context } from "hono";
import { eq } from "drizzle-orm";
import {
  account,
  createDb,
  session,
  user,
  verification,
  profile,
} from "@repo/db";

import type { AppContext } from "../app";

export function initBetterAuth(env: Context<AppContext>["env"]) {
  const db = createDb({
    DATABASE_URL: env.DATABASE_URL,
    NODE_ENV: env.NODE_ENV,
  });

  return betterAuth({
    session: {
      cookieCache: {
        enabled: true,
        maxAge: 5 * 60,
      },
    },
    emailAndPassword: {
      enabled: true,
    },
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
    secret: env.BETTER_AUTH_SECRET,
    trustedOrigins: [env.ALLOWED_ORIGIN],
    plugins: [
      customSession(async ({ user, session }) => {
        const profileRes = await db
          .select()
          .from(profile)
          .where(eq(profile.email, user.email))
          .limit(1);

        if (!profileRes[0]) {
          throw new Error("Profile not found");
        }

        return {
          user,
          session,
          profile: profileRes[0],
        };
      }),
    ],
  });
}

export type Auth = ReturnType<typeof initBetterAuth>;
