import { Home } from "lucide-react";
import Link from "next/link";

import { supabaseServerClient } from "@/supabase-clients/server";
import { ThemeToggle } from "./theme-toggle";
import { UserDropdown } from "./user-dropdown";
import { Button } from "./ui/button";

export async function Navbar() {
  const supabase = await supabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <nav className="sticky top-0 flex w-full justify-center bg-background/80 py-4 backdrop-blur-lg">
      <div className="container flex items-center justify-between px-4">
        <Link href="/">
          <Home />
        </Link>

        <div className="flex items-center gap-4">
          {user ? (
            <UserDropdown align="end" />
          ) : (
            <Button variant={"outline"} asChild>
              <Link href="/login">로그인</Link>
            </Button>
          )}

          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
