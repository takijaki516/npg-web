import { queryOptions } from "@tanstack/react-query";
import { honoClient } from "@/lib/hono";

const getDailyMealsWithFoods = async ({
  utcStartOfRange,
  utcEndOfRange,
}: {
  utcStartOfRange: string;
  utcEndOfRange: string;
}) => {
  const res = await honoClient.meals.$get({
    query: {
      startUtcDateTime: utcStartOfRange,
      endUtcDateTime: utcEndOfRange,
    },
  });

  if (!res.ok) {
    throw new Error("failed to get daily meals with foods");
  }

  const body = await res.json();

  return body.meals;
};

export function getDailyMealsWithFoodsOptions({
  utcStartOfRange,
  utcEndOfRange,
}: {
  utcStartOfRange: string;
  utcEndOfRange: string;
}) {
  return queryOptions({
    queryKey: ["dailyMealsWithFoods"],
    queryFn: () => getDailyMealsWithFoods({ utcStartOfRange, utcEndOfRange }),
  });
}

export type DailyMealsWithFoods = NonNullable<
  Awaited<ReturnType<typeof getDailyMealsWithFoods>>
>;
