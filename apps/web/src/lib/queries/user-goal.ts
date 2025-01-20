import { queryOptions } from "@tanstack/react-query";
import { z } from "zod";
import { modifyGoalSchema } from "@repo/shared-schema";

import { honoClient } from "@/lib/hono";
export const GET_USER_GOAL_QUERY_KEY = "USER_GOAL";

const getOrCreateGoal = async () => {
  const res = await honoClient.goals.$get();

  if (res.status === 401) {
    throw new Error("failed to get goal");
  }

  const { goal } = await res.json();

  if (!goal) {
    const newGoalRes = await honoClient.goals.$post({
      json: {
        weightKg: 0,
        bodyFatMassKg: 0,
        skeletalMuscleMassKg: 0,
      },
    });

    if (!newGoalRes.ok) {
      throw new Error("failed to create goal");
    }

    const { goal: newGoal } = await newGoalRes.json();

    return newGoal;
  }

  return goal;
};

export const getOrCreateGoalOptions = queryOptions({
  queryKey: [GET_USER_GOAL_QUERY_KEY],
  queryFn: getOrCreateGoal,
  staleTime: Infinity,
});

export type UserGoal = NonNullable<Awaited<ReturnType<typeof getOrCreateGoal>>>;

export async function modifyGoal(data: z.infer<typeof modifyGoalSchema>) {
  const res = await honoClient.goals.$patch({ json: data });
  if (!res.ok) {
    throw new Error("failed to modify goal");
  }
  const { goal } = await res.json();

  return goal;
}
