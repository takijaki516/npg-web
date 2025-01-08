import { queryOptions } from "@tanstack/react-query";
import { honoClient } from "@/lib/hono";

export const GET_DAILY_MEALS_WITH_FOODS_QUERY_KEY = "DAILY_MEALS_WITH_FOODS";

const getDailyMealsWithFoods = async ({
  currentLocalDateTime,
  timezone,
}: {
  currentLocalDateTime: string;
  timezone: string;
}) => {
  const res = await honoClient.meals.$get({
    query: {
      currentLocalDateTime,
      timezone,
    },
  });

  if (!res.ok) {
    throw new Error("failed to get daily meals with foods");
  }

  const body = await res.json();

  return body.meals;
};

export function getDailyMealsWithFoodsOptions({
  currentLocalDateTime,
  timezone,
}: {
  currentLocalDateTime: string;
  timezone: string;
}) {
  return queryOptions({
    queryKey: [GET_DAILY_MEALS_WITH_FOODS_QUERY_KEY, currentLocalDateTime],
    queryFn: ({ queryKey }) =>
      getDailyMealsWithFoods({
        currentLocalDateTime: queryKey[1],
        timezone,
      }),
    staleTime: Infinity,
  });
}

export type DailyMealsWithFoods = NonNullable<
  Awaited<ReturnType<typeof getDailyMealsWithFoods>>
>;

// delete meal
export async function deleteMealMutationFn({ id }: { id: string }) {
  const res = await honoClient.meals.$delete({
    json: { id },
  });

  if (!res.ok) {
    throw new Error("failed to delete meal");
  }

  return res.json();
}
