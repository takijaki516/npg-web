import { queryOptions } from "@tanstack/react-query";
import { honoClient } from "@/lib/hono";

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

  console.log("🚀 ~ file: meals.ts:17 ~ res:", res);

  if (!res.ok) {
    throw new Error("failed to get daily meals with foods");
  }

  const body = await res.json();

  return body.meals;
};

export const DAILY_MEALS_WITH_FOODS_QUERY_KEY =
  "DAILY_MEALS_WITH_FOODS_QUERY_KEY";

export function getDailyMealsWithFoodsOptions({
  currentLocalDateTime,
  timezone,
}: {
  currentLocalDateTime: string;
  timezone: string;
}) {
  return queryOptions({
    queryKey: [DAILY_MEALS_WITH_FOODS_QUERY_KEY],
    queryFn: () =>
      getDailyMealsWithFoods({
        currentLocalDateTime,
        timezone,
      }),
    staleTime: 1000 * 60 * 5,
  });
}

export type DailyMealsWithFoods = NonNullable<
  Awaited<ReturnType<typeof getDailyMealsWithFoods>>
>;
