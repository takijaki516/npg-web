import * as React from "react";
import { supabaseServerClient } from "../server";
import type { Database } from "@/lib/types/database.types";

export const getLatestHealthInfo = React.cache(async (email: string) => {
  const supabase = await supabaseServerClient<Database>();

  const { data } = await supabase
    .from("health_info")
    .select("*")
    .eq("user_email", email)
    .order("date", { ascending: false })
    .limit(1)
    .single();

  // console.log(
  //   "🚀 ~ file: health-info.ts:15 ~ getLatestHealthInfo ~ data:",
  //   data,
  // );

  return data;
});
