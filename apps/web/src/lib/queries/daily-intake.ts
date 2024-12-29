import { honoClient } from "@/lib/hono";

export const getOrCreateDailyIntake = async ({
  utcStartOfRange,
  utcEndOfRange,
}: {
  utcStartOfRange: string;
  utcEndOfRange: string;
}) => {
  const res = await honoClient.user["daily-intake"].$get({
    query: {
      startDate: utcStartOfRange,
      endDate: utcEndOfRange,
    },
  });

  if (!res.ok) {
    throw new Error("failed to get daily intake");
  }

  const body = await res.json();

  if (!body.dailyIntake) {
    const newDailyIntakeRes = await honoClient.user["daily-intake"].$post({
      json: {
        date: utcStartOfRange,
      },
    });

    if (!newDailyIntakeRes.ok) {
      throw new Error("failed to create daily intake");
    }

    const newDailyIntakeBody = await newDailyIntakeRes.json();

    return newDailyIntakeBody.dailyIntake;
  }

  return body.dailyIntake;
};

export type DailyIntake = NonNullable<
  Awaited<ReturnType<typeof getOrCreateDailyIntake>>
>;
