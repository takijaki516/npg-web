import type { Auth } from "better-auth";
import { createMiddleware } from "hono/factory";

import { initBetterAuth } from "./auth";

export const authMiddleware = createMiddleware(async (c, next) => {
  const auth: Auth = initBetterAuth(c);
  const session = await auth.api.getSession({ headers: c.req.headers });
});
