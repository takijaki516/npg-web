import { queryOptions } from "@tanstack/react-query";
import { honoClient } from "@/lib/hono";

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
    queryKey: ["dailyIntake"],
    queryFn: () => getOrCreateDailyIntake({ currentLocalDateTime, timezone }),
    staleTime: 1000 * 60 * 5,
  });
}

export type DailyIntake = NonNullable<
  Awaited<ReturnType<typeof getOrCreateDailyIntake>>
>;
