import { supabase } from "@/lib/supabase";

export const getDailyWeightsExerciseWithAllInfos = async ({
  utcStartOfRange,
  utcEndOfRange,
}: {
  utcStartOfRange: string;
  utcEndOfRange: string;
}) => {
  const { data, error } = await supabase
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

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export type DailyWeightsExercisesWithAllInfos = NonNullable<
  Awaited<ReturnType<typeof getDailyWeightsExerciseWithAllInfos>>
>;
