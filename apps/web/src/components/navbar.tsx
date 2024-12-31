import { Home } from "lucide-react";
import { Link } from "@tanstack/react-router";

import { UserDropdown } from "./user-dropdown";
import { Button } from "@/components/ui/button";
import type { Profile } from "@/lib/queries";
import { ModeToggle } from "./mode-toggle";

interface NavbarProps {
  profile?: Profile | null | undefined;
}

export function Navbar({ profile }: NavbarProps) {
  return (
    <nav className="sticky top-0 flex w-full justify-center bg-background/80 py-4 backdrop-blur-lg">
      <div className="container flex items-center justify-between px-4">
        <Link href="/">
          <Home />
        </Link>

        <div className="flex items-center gap-4">
          {profile ? (
            <UserDropdown profile={profile} align="end" />
          ) : (
            <Button variant={"outline"} asChild>
              <Link href="/login">Login</Link>
            </Button>
          )}

          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}
