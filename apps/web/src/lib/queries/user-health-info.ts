import { queryOptions } from "@tanstack/react-query";
import { z } from "zod";
import { insertHealthInfoSchema } from "@repo/shared-schema";

import { honoClient } from "@/lib/hono";

export const GET_LATEST_HEALTH_INFO_QUERY_KEY = "LATEST_HEALTH_INFO";

const getLatestHealthInfo = async () => {
  const res = await honoClient.healthinfos["latest-health-info"].$get();

  if (!res.ok) {
    return null;
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
  const res = await honoClient.healthinfos["range-health"].$get({
    query: { startLocalDate: startDate, endLocalDate: endDate },
  });

  if (!res.ok) {
    return null;
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

export const GET_SPECIFIC_HEALTH_INFO_QUERY_KEY = "SPECIFIC_HEALTH_INFO";

const getSpecificHealthInfo = async ({ localDate }: { localDate: string }) => {
  const res = await honoClient.healthinfos.d[":date"].$get({
    param: { date: localDate },
  });

  if (!res.ok) {
    return null;
  }

  const body = await res.json();

  return body.healthInfo;
};

export function getSpecificHealthInfoOptions({
  localDate,
}: {
  localDate: string;
}) {
  return queryOptions({
    queryKey: [GET_SPECIFIC_HEALTH_INFO_QUERY_KEY, localDate],
    queryFn: ({ queryKey }) =>
      getSpecificHealthInfo({ localDate: queryKey[1] }),
    staleTime: Infinity,
  });
}

export type SpecificHealthInfo = NonNullable<
  Awaited<ReturnType<typeof getSpecificHealthInfo>>
>;

// mutation
export async function insertHealthInfo(
  data: z.infer<typeof insertHealthInfoSchema>,
) {
  const res = await honoClient.healthinfos.$post({
    json: data,
  });

  if (!res.ok) {
    throw new Error("Failed to insert health info");
  }

  const body = await res.json();

  return body.healthInfo;
}
