import type { Database } from "@/lib/types/database.types";
import { supabaseServerClient } from "../server";

export const getDailyWeightsExerciseWithAllInfos = async (
  utcStartOfRange: string,
  utcEndOfRange: string,
) => {
  const supabase = await supabaseServerClient<Database>();

  const res = await supabase
    .from("daily_weights_exercises")
    .select(
      `
      *,
      each_weights_exercises (
        *,
        each_weights_exercises_set_info(*)
      )
      `,
    )
    .gte("start_time", utcStartOfRange)
    .lt("start_time", utcEndOfRange)
    .order("start_time", { ascending: true });

  if (!res.data) {
    return null;
  }

  return res.data;
};

export type DailyWeightsExercisesWithAllInfos = NonNullable<
  Awaited<ReturnType<typeof getDailyWeightsExerciseWithAllInfos>>
>;
