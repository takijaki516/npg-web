import { Home } from "lucide-react";
import Link from "next/link";

import { ThemeToggle } from "./theme-toggle";
import { UserDropdown } from "./user-dropdown";
import { Button } from "./ui/button";
import { getProfile } from "../supabase-utils/server-queries/auth";

export async function Navbar() {
  const profile = await getProfile();

  return (
    <nav className="sticky top-0 flex w-full justify-center bg-background/80 py-4 backdrop-blur-lg">
      <div className="container flex items-center justify-between px-4">
        <Link href="/">
          <Home />
        </Link>

        <div className="flex items-center gap-4">
          {profile ? (
            <UserDropdown align="end" profile={profile} />
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
