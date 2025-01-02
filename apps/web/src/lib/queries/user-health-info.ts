import { queryOptions } from "@tanstack/react-query";
import { honoClient } from "@/lib/hono";

const getLatestHealthInfo = async () => {
  const res = await honoClient.user["latest-health-info"].$get();

  if (!res.ok) {
    throw new Error("failed to get latest health info");
  }

  const body = await res.json();

  return body.healthInfo;
};

export const getLatestHealthInfoOptions = queryOptions({
  queryKey: ["latest-health-info"],
  queryFn: getLatestHealthInfo,
  staleTime: 1000 * 60 * 5,
});

export type HealthInfo = NonNullable<
  Awaited<ReturnType<typeof getLatestHealthInfo>>
>;
