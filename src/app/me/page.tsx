import { redirect } from "next/navigation";

import { getProfile } from "@/supabase-utils/server-queries/auth";

export default async function MePage() {
  const profile = await getProfile();

  if (!profile) {
    return null;
  }

  const localDate = new Date().toLocaleDateString("sv-SE");

  return redirect(`/me/${localDate}`);
}
