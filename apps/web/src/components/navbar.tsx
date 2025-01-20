import { Home } from "lucide-react";
import { Link, useLocation } from "@tanstack/react-router";

import type { AuthClient } from "@/lib/better-auth";
import { cn } from "@/lib/utils";
import { UserDropdown } from "./user-dropdown";
import { ModeToggle } from "./mode-toggle";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  profile?: AuthClient["$Infer"]["Session"]["profile"] | null | undefined;
}

export function Navbar({ profile }: NavbarProps) {
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/signup";

  return (
    <nav className="sticky top-0 flex w-full justify-center bg-background/80 py-4 backdrop-blur-lg">
      <div
        className={cn(
          "container flex w-full max-w-3xl items-center px-4",
          isAuthPage ? "justify-between" : "justify-end",
        )}
      >
        <Link
          href="/"
          className={cn(
            "cursor-pointer",
            isAuthPage ? "inline-block" : "hidden",
          )}
        >
          <Home />
        </Link>

        <div className="flex items-center gap-4">
          {profile ? (
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
