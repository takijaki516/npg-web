import { type QueryData } from "@supabase/supabase-js";

import type { Database } from "@/lib/types/database.types";
import { supabaseServerClient } from "../server";

interface GetDailyTrackerOptions {
  date: string;
  profile: Database["public"]["Tables"]["profiles"]["Row"];
}

export const getAllUserDailyDatas = async ({
  date,
  profile,
}: GetDailyTrackerOptions) => {
  if (!profile.user_id) {
    return null;
  }

  const supabase = await supabaseServerClient<Database>();
};
