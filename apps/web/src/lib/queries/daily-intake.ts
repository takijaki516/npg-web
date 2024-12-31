import { honoClient } from "@/lib/hono";

export const getOrCreateDailyIntake = async ({
  currentLocalDateTime,
  timezone,
}: {
  currentLocalDateTime: string;
  timezone: string;
}) => {
  console.log(
    "🚀 ~ file: daily-intake.ts:10 ~ currentLocalDateTime:",
    currentLocalDateTime,
  );
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

export type DailyIntake = NonNullable<
  Awaited<ReturnType<typeof getOrCreateDailyIntake>>
>;
