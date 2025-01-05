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
    queryKey: [GET_DAILY_MEALS_WITH_FOODS_QUERY_KEY],
    queryFn: () =>
      getDailyMealsWithFoods({
        currentLocalDateTime,
        timezone,
      }),
    staleTime: 1000 * 60 * 10,
  });
}

export type DailyMealsWithFoods = NonNullable<
  Awaited<ReturnType<typeof getDailyMealsWithFoods>>
>;
