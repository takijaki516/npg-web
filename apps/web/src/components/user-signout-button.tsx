import { LogOut } from "lucide-react";
import { useRouter } from "@tanstack/react-router";

import { supabase } from "@/lib/supabase";

export function UserSignoutButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => {
        //
        supabase.auth.signOut();
        router.navigate({
          href: "/",
        });
      }}
      className="flex cursor-pointer items-center gap-2"
    >
      <LogOut className="size-4" />
      로그아웃
    </button>
  );
}
