import { supabase } from "@/lib/supabase";

export const getLatestHealthInfo = async ({ email }: { email: string }) => {
  const { data, error } = await supabase
    .from("health_info")
    .select("*")
    .eq("user_email", email)
    .order("measured_date", { ascending: false })
    .limit(1)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
