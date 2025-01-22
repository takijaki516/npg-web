import { customSessionClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import { type Auth } from "@repo/backend/auth";

export const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_API_URL,
  plugins: [customSessionClient<Auth>()],
});

export type AuthClient = typeof authClient;
