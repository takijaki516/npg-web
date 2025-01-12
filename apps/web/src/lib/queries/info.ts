import { queryOptions } from "@tanstack/react-query";
import { honoClient } from "@/lib/hono";

export const GET_MONTHLY_INFO_QUERY_KEY = "GET_MONTHLY_INFO";

const getMonthlyInfo = async ({
  localYearMonth,
  timezone,
}: {
  localYearMonth: string;
  timezone: string;
}) => {
  const res = await honoClient.info["monthly"].$get({
    query: { localYearMonth, timeZone: timezone },
  });

  if (!res.ok) {
    throw new Error("failed to get monthly info");
  }

  const body = await res.json();

  return body;
};

export function getMonthlyInfoOptions({
  localYearMonth,
  timezone,
}: {
  localYearMonth: string;
  timezone: string;
}) {
  return queryOptions({
    queryKey: [GET_MONTHLY_INFO_QUERY_KEY, localYearMonth],
    queryFn: ({ queryKey }) =>
      getMonthlyInfo({ localYearMonth: queryKey[1], timezone }),
    staleTime: Infinity,
  });
}

export type MonthlyInfo = NonNullable<
  Awaited<ReturnType<typeof getMonthlyInfo>>
>;

export const GET_DAILY_INFO_QUERY_KEY = "GET_DAILY_INFO";

const getDailyInfo = async ({
  localDate,
  timezone,
}: {
  localDate: string;
  timezone: string;
}) => {
  const res = await honoClient.info["daily"].$get({
    query: { localDate, timeZone: timezone },
  });

  if (!res.ok) {
    throw new Error("failed to get daily info");
  }

  const body = await res.json();

  return body;
};

export function getDailyInfoOptions({
  localDate,
  timezone,
}: {
  localDate: string;
  timezone: string;
}) {
  return queryOptions({
    queryKey: [GET_DAILY_INFO_QUERY_KEY, localDate],
    queryFn: ({ queryKey }) =>
      getDailyInfo({ localDate: queryKey[1], timezone }),
    staleTime: Infinity,
  });
}

export type DailyInfo = NonNullable<Awaited<ReturnType<typeof getDailyInfo>>>;
