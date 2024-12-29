import { User2, Settings } from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { Profile } from "@/lib/queries";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { UserSignoutButton } from "./user-signout-button";

interface UserDropdownProps {
  align: "start" | "center" | "end";
  profile: Profile;
}

export function UserDropdown({ align, profile }: UserDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="size-9">
          <User2 className="size-5" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align={align} className="space-y-1">
        <DropdownMenuLabel>Hello, {profile.email}</DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <Link href={"/me"} className="flex items-center gap-2">
            <User2 className="size-4" />
            My Page
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Link href="/settings" className="flex items-center gap-2">
            <Settings className="size-4" />
            Settings
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem className="bg-destructive/50 focus:bg-destructive">
          <UserSignoutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
