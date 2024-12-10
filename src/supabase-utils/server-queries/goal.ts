import { Database } from "@/lib/types/database.types";
import * as React from "react";
import { supabaseServerClient } from "../server";

export const getOrCreateGoal = React.cache(
  async (email: string, userId: string) => {
    const supabase = await supabaseServerClient<Database>();
    const { data } = await supabase
      .from("user_goals")
      .select("*")
      .eq("user_email", email)
      .limit(1)
      .single();

    if (!data) {
      const { data: newGoalData } = await supabase
        .from("user_goals")
        .insert({ user_email: email, user_id: userId })
        .select("*")
        .single();

      return newGoalData;
    }

    return data;
  },
);
