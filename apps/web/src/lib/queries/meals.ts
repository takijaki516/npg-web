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
    queryKey: ["dailyMealsWithFoods"],
    queryFn: () =>
      getDailyMealsWithFoods({
        currentLocalDateTime,
        timezone,
      }),
  });
}

export type DailyMealsWithFoods = NonNullable<
  Awaited<ReturnType<typeof getDailyMealsWithFoods>>
>;
