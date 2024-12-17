import { Home } from "lucide-react";
import { Link } from "@tanstack/react-router";

// import { ThemeToggle } from "./theme-toggle";
import { UserDropdown } from "./user-dropdown";
import { Button } from "./ui/button";
import { type Database } from "@/lib/types/database.types";

interface NavbarProps {
  profile: Database["public"]["Tables"]["profiles"]["Row"] | null;
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
              <Link href="/login">로그인</Link>
            </Button>
          )}

          {/* <ThemeToggle /> */}
        </div>
      </div>
    </nav>
  );
}
