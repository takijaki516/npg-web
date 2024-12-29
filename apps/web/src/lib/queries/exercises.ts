import { queryOptions } from "@tanstack/react-query";
import { honoClient } from "@/lib/hono";

const getDailyWeightsExerciseWithAllInfos = async ({
  utcStartOfRange,
  utcEndOfRange,
}: {
  utcStartOfRange: string;
  utcEndOfRange: string;
}) => {
  const res = await honoClient.weights["daily-weights"].$get({
    query: {
      startUtcDateTime: utcStartOfRange,
      endUtcDateTime: utcEndOfRange,
    },
  });

  if (!res.ok) {
    throw new Error("failed to get daily weights exercises");
  }

  const body = await res.json();

  return body.weights;
};

export function getDailyWeightsExerciseOptions({
  utcStartOfRange,
  utcEndOfRange,
}: {
  utcStartOfRange: string;
  utcEndOfRange: string;
}) {
  return queryOptions({
    queryKey: ["dailyWeightsExercises"],
    queryFn: () =>
      getDailyWeightsExerciseWithAllInfos({
        utcStartOfRange,
        utcEndOfRange,
      }),
    staleTime: 5000,
  });
}

export type DailyWeightsExercisesWithAllInfos = NonNullable<
  Awaited<ReturnType<typeof getDailyWeightsExerciseWithAllInfos>>
>;
