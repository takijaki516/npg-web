import { queryOptions } from "@tanstack/react-query";
import { honoClient } from "@/lib/hono";

const getDailyWeightsExerciseWithAllInfos = async ({
  currentLocalDateTime,
  timezone,
}: {
  currentLocalDateTime: string;
  timezone: string;
}) => {
  const res = await honoClient.weights["daily-weights"].$get({
    query: {
      currentLocalDateTime,
      timezone,
    },
  });

  if (!res.ok) {
    throw new Error("failed to get daily weights exercises");
  }

  const body = await res.json();

  return body.weights;
};

export function getDailyWeightsExerciseOptions({
  currentLocalDateTime,
  timezone,
}: {
  currentLocalDateTime: string;
  timezone: string;
}) {
  return queryOptions({
    queryKey: ["dailyWeightsExercises"],
    queryFn: () =>
      getDailyWeightsExerciseWithAllInfos({
        currentLocalDateTime,
        timezone,
      }),
    staleTime: 5000,
  });
}

export type DailyWeightsExercisesWithAllInfos = NonNullable<
  Awaited<ReturnType<typeof getDailyWeightsExerciseWithAllInfos>>
>;
