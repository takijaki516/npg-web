import { hcWithType } from "@repo/backend/hc";

export const honoClient = hcWithType(import.meta.env.VITE_API_URL, {
  fetch: (req: RequestInfo | URL, init?: RequestInit) =>
    fetch(req, {
      ...init,
      credentials: "include",
    }),
});
