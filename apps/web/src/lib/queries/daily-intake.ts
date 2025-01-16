import { queryOptions } from "@tanstack/react-query";
import { z } from "zod";
import { honoClient } from "@/lib/hono";
import { calculateDailyIntakeWithAISchema } from "@repo/shared-schema";

export const GET_DAILY_INTAKE_QUERY_KEY = "GET_DAILY_INTAKE";

// NOTE: if not found, return null
const getDailyIntake = async ({
  currentLocalDate,
}: {
  currentLocalDate: string;
}) => {
  const res = await honoClient.intakes.daily.$get({
    query: {
      currentLocalDate,
    },
  });

  if (!res.ok) {
    throw new Error("failed to get daily intake");
  }

  const { dailyIntake } = await res.json();

  return dailyIntake;
};

export function getDailyIntakeOptions({
  currentLocalDate,
}: {
  currentLocalDate: string;
}) {
  return queryOptions({
    queryKey: [GET_DAILY_INTAKE_QUERY_KEY, currentLocalDate],
    queryFn: ({ queryKey }) =>
      getDailyIntake({ currentLocalDate: queryKey[1] }),
    staleTime: Infinity,
  });
}

export type DailyIntake = NonNullable<
  Awaited<ReturnType<typeof getDailyIntake>>
>;

// generate daily intake with ai
export async function calculateDailyIntakeWithAI({
  currentLocalDate,
}: z.infer<typeof calculateDailyIntakeWithAISchema>) {
  const res = await honoClient.intakes["calculate-daily-intake"].$post({
    json: {
      currentLocalDate,
    },
  });

  if (!res.ok) {
    throw new Error("failed to calculate daily intake with ai");
  }

  const { dailyIntake } = await res.json();
  return dailyIntake;
}
