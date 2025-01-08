import { Home } from "lucide-react";
import { Link } from "@tanstack/react-router";

import type { AuthClient } from "@/lib/better-auth";
import { UserDropdown } from "./user-dropdown";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./mode-toggle";

interface NavbarProps {
  profile?: AuthClient["$Infer"]["Session"]["profile"] | null | undefined;
  session?: AuthClient["$Infer"]["Session"]["session"] | null | undefined;
}

export function Navbar({ profile, session }: NavbarProps) {
  return (
    <nav className="sticky top-0 flex w-full justify-center bg-background/80 py-4 backdrop-blur-lg">
      <div className="container flex w-full max-w-3xl items-center justify-between px-4">
        <Link href="/">
          <Home />
        </Link>

        <div className="flex items-center gap-4">
          {session && profile ? (
            <UserDropdown profile={profile} align="end" />
          ) : (
            <Button variant={"outline"} asChild>
              <Link href="/login">로그인</Link>
            </Button>
          )}

          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}
