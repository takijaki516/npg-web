import { supabase } from "@/lib/supabase";

export const getDailyMealsWithFoods = async ({
  utcStartOfRange,
  utcEndOfRange,
}: {
  utcStartOfRange: string;
  utcEndOfRange: string;
}) => {
  const { data, error } = await supabase
    .from("meals")
    .select(
      `
      *,
      foods (*)
      `,
    )
    .gte("meal_time", utcStartOfRange)
    .lt("meal_time", utcEndOfRange)
    .order("meal_time", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export type DailyMealsWithFoods = NonNullable<
  Awaited<ReturnType<typeof getDailyMealsWithFoods>>
>;
