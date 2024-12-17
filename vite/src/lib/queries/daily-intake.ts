import { supabase } from "@/lib/supabase";

export const getOrCreateDailyIntake = async ({
  userEmail,
  userId,
  utcStartOfRange,
  utcEndOfRange,
}: {
  userEmail: string;
  userId: string;
  utcStartOfRange: string;
  utcEndOfRange: string;
}) => {
  const { data } = await supabase
    .from("daily_intakes")
    .select("*")
    .eq("user_email", userEmail)
    .gte("date", utcStartOfRange)
    .lt("date", utcEndOfRange)
    .limit(1)
    .single();

  if (!data) {
    const { data: insertedData, error } = await supabase
      .from("daily_intakes")
      .insert({
        user_email: userEmail,
        user_id: userId,
        date: utcStartOfRange,
      })
      .select("*")
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return insertedData;
  }

  return data;
};
