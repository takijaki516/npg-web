import { honoClient } from "@/lib/hono";

export const getLatestHealthInfo = async () => {
  const res = await honoClient.user["latest-health-info"].$get();

  if (!res.ok) {
    throw new Error("failed to get latest health info");
  }

  const body = await res.json();

  return body.healthInfo;
};

export type HealthInfo = NonNullable<
  Awaited<ReturnType<typeof getLatestHealthInfo>>
>;
