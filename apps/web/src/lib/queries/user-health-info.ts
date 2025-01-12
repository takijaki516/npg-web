import { queryOptions } from "@tanstack/react-query";
import { honoClient } from "@/lib/hono";

export const GET_LATEST_HEALTH_INFO_QUERY_KEY = "LATEST_HEALTH_INFO";

const getLatestHealthInfo = async () => {
  const res = await honoClient.user["latest-health-info"].$get();

  if (!res.ok) {
    throw new Error("failed to get latest health info");
  }

  const body = await res.json();

  return body.healthInfo;
};

export const getLatestHealthInfoOptions = queryOptions({
  queryKey: [GET_LATEST_HEALTH_INFO_QUERY_KEY],
  queryFn: getLatestHealthInfo,
  staleTime: Infinity,
});

export type HealthInfo = NonNullable<
  Awaited<ReturnType<typeof getLatestHealthInfo>>
>;

export const GET_RANGE_HEALTH_INFO_QUERY_KEY = "RANGE_HEALTH_INFO";

const getRangeHealthInfo = async ({
  startDate,
  endDate,
}: {
  startDate: string;
  endDate: string;
}) => {
  const res = await honoClient.info["range-health"].$get({
    query: { startLocalDate: startDate, endLocalDate: endDate },
  });

  if (!res.ok) {
    throw new Error("failed to get range health info");
  }

  const body = await res.json();

  return body.healthInfos;
};

export function getRangeHealthInfoOptions({
  startDate,
  endDate,
}: {
  startDate: string;
  endDate: string;
}) {
  return queryOptions({
    queryKey: [GET_RANGE_HEALTH_INFO_QUERY_KEY, startDate, endDate],
    queryFn: ({ queryKey }) =>
      getRangeHealthInfo({
        startDate: queryKey[1],
        endDate: queryKey[2],
      }),
    staleTime: Infinity,
  });
}

export type RangeHealthInfo = NonNullable<
  Awaited<ReturnType<typeof getRangeHealthInfo>>
>;
