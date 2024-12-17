import { supabase } from "@/lib/supabase";

export const getOrCreateGoal = async ({
  email,
  userId,
}: {
  email: string;
  userId: string;
}) => {
  const { data } = await supabase
    .from("user_goals")
    .select("*")
    .eq("user_email", email)
    .limit(1)
    .single();

  if (!data) {
    const { data: newGoalData, error } = await supabase
      .from("user_goals")
      .insert({ user_email: email, user_id: userId })
      .select("*")
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return newGoalData;
  }

  return data;
};
