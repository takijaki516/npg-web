import { queryOptions } from "@tanstack/react-query";

import { honoClient } from "@/lib/hono";

export const GET_USER_GOAL_QUERY_KEY = "USER_GOAL";

const getOrCreateGoal = async () => {
  const res = await honoClient.goals.$get();

  if (!res.ok) {
    throw new Error("failed to get goal");
  }

  const body = await res.json();

  if (!body.goal) {
    const newGoalRes = await honoClient.goals.$post({
      json: {
        weightKg: 0,
        bodyFatMassKg: 0,
        skeletalMuscleMassKg: 0,
        goalDescription: "",
      },
    });

    if (!newGoalRes.ok) {
      throw new Error("failed to create goal");
    }

    const newGoalBody = await newGoalRes.json();

    return newGoalBody.goal;
  }

  return body.goal;
};

export const getOrCreateGoalOptions = queryOptions({
  queryKey: [GET_USER_GOAL_QUERY_KEY],
  queryFn: getOrCreateGoal,
  staleTime: Infinity,
});

export type UserGoal = NonNullable<Awaited<ReturnType<typeof getOrCreateGoal>>>;
