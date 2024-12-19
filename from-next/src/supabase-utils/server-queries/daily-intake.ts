import { supabaseServerClient } from "../server";
import type { Database } from "../../lib/types/database.types";

export const getOrCreateDailyIntake = async (
  userEmail: string,
  userId: string,
  utcStartOfRange: string,
  utcEndOfRange: string,
) => {
  const supabase = await supabaseServerClient<Database>();

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
      return null;
    }

    return insertedData;
  }

  return data;
};
