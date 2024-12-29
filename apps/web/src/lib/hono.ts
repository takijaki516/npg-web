import { hcWithType } from "@repo/backend/hc";

export const honoClient = hcWithType("http://localhost:8787", {
  fetch: (req: RequestInfo | URL, init?: RequestInit) =>
    fetch(req, {
      ...init,
      credentials: "include",
    }),
});
