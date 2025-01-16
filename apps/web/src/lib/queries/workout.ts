import { queryOptions } from "@tanstack/react-query";
import { z } from "zod";
import { insertDailyWorkoutSchema } from "@repo/shared-schema";

import { honoClient } from "@/lib/hono";

export const GET_DAILY_WORKOUT_QUERY_KEY = "GET_DAILY_WORKOUT";

const getDailyWorkout = async ({
  currentLocalDate,
}: {
  currentLocalDate: string;
}) => {
  const res = await honoClient.workouts["daily-weights"].$get({
    query: {
      currentLocalDate,
    },
  });

  if (!res.ok) {
    throw new Error("failed to get daily weights exercises");
  }

  const body = await res.json();

  return body.weights;
};

export function getDailyWorkoutOptions({
  currentLocalDate,
}: {
  currentLocalDate: string;
}) {
  return queryOptions({
    queryKey: [GET_DAILY_WORKOUT_QUERY_KEY, currentLocalDate],
    queryFn: ({ queryKey }) =>
      getDailyWorkout({
        currentLocalDate: queryKey[1],
      }),
    staleTime: Infinity,
  });
}

export type DailyWorkout = NonNullable<
  Awaited<ReturnType<typeof getDailyWorkout>>
>;

// insert query
export async function insertWorkout(
  data: z.infer<typeof insertDailyWorkoutSchema>,
) {
  const res = await honoClient.workouts.$post({
    json: data,
  });

  if (!res.ok) {
    throw new Error("Failed to insert workouts");
  }

  const { weights } = await res.json();

  return weights;
}

// update query
export async function updateWorkout(
  data: z.infer<typeof insertDailyWorkoutSchema>,
) {
  const res = await honoClient.workouts.$put({
    json: data,
  });

  if (!res.ok) {
    throw new Error("Failed to update workouts");
  }

  const { weights } = await res.json();

  return weights;
}

// delete query
export async function deleteWorkout({ id }: { id: string }) {
  const res = await honoClient.workouts.$delete({
    json: {
      id,
    },
  });

  if (!res.ok) {
    throw new Error("failed to delete daily weights exercise");
  }

  return res.json();
}
