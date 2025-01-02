import { customSessionClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import { type Auth } from "@repo/backend/auth";

export const authClient = createAuthClient({
  baseURL: "http://localhost:8787",
  plugins: [customSessionClient<Auth>()],
});

export type AuthClient = typeof authClient;
