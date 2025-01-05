import { queryOptions } from "@tanstack/react-query";
import { honoClient } from "@/lib/hono";

export const GET_OR_CREATE_DAILY_INTAKE_QUERY_KEY =
  "GET_OR_CREATE_DAILY_INTAKE";

const getOrCreateDailyIntake = async ({
  currentLocalDateTime,
  timezone,
}: {
  currentLocalDateTime: string;
  timezone: string;
}) => {
  const res = await honoClient.user["daily-intake"].$get({
    query: {
      currentLocalDateTime: currentLocalDateTime,
      timezone: timezone,
    },
  });

  if (!res.ok) {
    throw new Error("failed to get daily intake");
  }

  const body = await res.json();

  return body.dailyIntake;
};

export function getOrCreateDailyIntakeOptions({
  currentLocalDateTime,
  timezone,
}: {
  currentLocalDateTime: string;
  timezone: string;
}) {
  return queryOptions({
    queryKey: [GET_OR_CREATE_DAILY_INTAKE_QUERY_KEY],
    queryFn: () => getOrCreateDailyIntake({ currentLocalDateTime, timezone }),
    staleTime: 1000 * 60 * 10,
  });
}

export type DailyIntake = NonNullable<
  Awaited<ReturnType<typeof getOrCreateDailyIntake>>
>;
