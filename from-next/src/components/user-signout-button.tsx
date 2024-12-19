"use client";

import { supabaseClient } from "../supabase-utils/client";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export function UserSignoutButton() {
  const router = useRouter();
  const supabase = supabaseClient();

  return (
    <button
      onClick={() => {
        supabase.auth.signOut();
        router.push("/");
      }}
      className="flex cursor-pointer items-center gap-2"
    >
      <LogOut className="size-4" />
      로그아웃
    </button>
  );
}
