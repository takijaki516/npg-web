import { createMiddleware } from "hono/factory";
import type { User, Session } from "better-auth/types";

import { initBetterAuth } from "./auth";
import type { AppContext } from "../app";

export type AuthMiddlewareContext = {
  Variables: {
    user: User | null;
    session: Session | null;
  };
  Bindings: AppContext["Bindings"];
};

export const authMiddleware = createMiddleware<AuthMiddlewareContext>(
  async (c, next) => {
    const auth = initBetterAuth(c.env);

    const session = await auth.api.getSession({ headers: c.req.raw.headers });

    if (!session) {
      c.set("user", null);
      c.set("session", null);
      return next();
    }

    c.set("user", session.user);
    c.set("session", session.session);
    return next();
  }
);
