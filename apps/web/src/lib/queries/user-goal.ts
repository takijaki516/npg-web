import { queryOptions } from "@tanstack/react-query";
import { honoClient } from "@/lib/hono";

const getOrCreateGoal = async () => {
  const res = await honoClient.user.goal.$get();

  if (!res.ok) {
    throw new Error("failed to get goal");
  }

  const body = await res.json();

  if (!body.goal) {
    const newGoalRes = await honoClient.user.goal.$post();

    if (!newGoalRes.ok) {
      throw new Error("failed to create goal");
    }

    const newGoalBody = await newGoalRes.json();

    return newGoalBody.goal;
  }

  return body.goal;
};

export const getOrCreateGoalOptions = queryOptions({
  queryKey: ["user-goal"],
  queryFn: getOrCreateGoal,
  staleTime: 1000 * 60 * 10,
});

export type UserGoal = NonNullable<Awaited<ReturnType<typeof getOrCreateGoal>>>;
