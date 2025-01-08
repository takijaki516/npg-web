import { queryOptions } from "@tanstack/react-query";
import { honoClient } from "@/lib/hono";

export const GET_DAILY_WEIGHTS_EXERCISES_QUERY_KEY =
  "GET_DAILY_WEIGHTS_EXERCISES";

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
    queryKey: [GET_DAILY_WEIGHTS_EXERCISES_QUERY_KEY, currentLocalDateTime],
    queryFn: ({ queryKey }) =>
      getDailyWeightsExerciseWithAllInfos({
        currentLocalDateTime: queryKey[1],
        timezone,
      }),
    staleTime: Infinity,
  });
}

export type DailyWeightsExercisesWithAllInfos = NonNullable<
  Awaited<ReturnType<typeof getDailyWeightsExerciseWithAllInfos>>
>;

// delete query
export async function deleteDailyWeightsExerciseMutationFn({
  id,
}: {
  id: string;
}) {
  const res = await honoClient.weights.$delete({
    json: {
      id,
    },
  });

  if (!res.ok) {
    throw new Error("failed to delete daily weights exercise");
  }

  return res.json();
}
