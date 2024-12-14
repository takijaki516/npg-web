import type { Database } from "@/lib/types/database.types";
import { supabaseServerClient } from "../server";

export const getDailyMealsWithFoods = async (
  utcStartOfRange: string,
  utcEndOfRange: string,
) => {
  const supabase = await supabaseServerClient<Database>();

  const res = await supabase
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

  if (!res.data) {
    return null;
  }

  return res.data;
};

export type DailyMealsWithFoods = NonNullable<
  Awaited<ReturnType<typeof getDailyMealsWithFoods>>
>;
