import * as React from "react";

import { Database } from "@/lib/types/database.types";
import { supabaseServerClient } from "../server";

export const getUser = React.cache(async () => {
  const supabase = await supabaseServerClient<Database>();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
});

export const getProfile = React.cache(async () => {
  const supabase = await supabaseServerClient<Database>();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", user.id)
    .limit(1)
    .single();

  return data;
});
