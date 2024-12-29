import { honoClient } from "../hono";

export const getOrCreateGoal = async () => {
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

export type UserGoal = NonNullable<Awaited<ReturnType<typeof getOrCreateGoal>>>;
