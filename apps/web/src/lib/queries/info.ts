import { queryOptions } from "@tanstack/react-query";
import { honoClient } from "@/lib/hono";

export const GET_MONTHLY_INFO_QUERY_KEY = "GET_MONTHLY_INFO";

const getMonthlyInfo = async ({
  localYearMonth,
}: {
  localYearMonth: string;
}) => {
  const res = await honoClient.infos["monthly"].$get({
    query: { localYearMonth },
  });

  if (!res.ok) {
    throw new Error("failed to get monthly info");
  }

  const body = await res.json();

  return body;
};

export function getMonthlyInfoOptions({
  localYearMonth,
}: {
  localYearMonth: string;
}) {
  return queryOptions({
    queryKey: [GET_MONTHLY_INFO_QUERY_KEY, localYearMonth],
    queryFn: ({ queryKey }) => getMonthlyInfo({ localYearMonth: queryKey[1] }),
    staleTime: Infinity,
  });
}

export type MonthlyInfo = NonNullable<
  Awaited<ReturnType<typeof getMonthlyInfo>>
>;
