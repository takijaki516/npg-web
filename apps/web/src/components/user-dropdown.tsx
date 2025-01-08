import { User2 } from "lucide-react";
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

      <DropdownMenuContent align={align} className="w-full max-w-40 space-y-1">
        <DropdownMenuLabel className="truncate">
          {profile.email}
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="cursor-pointer">
          <Link href={"/me"} className="flex items-center gap-2">
            <User2 className="size-4" />내 페이지
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem className="">
          <UserSignoutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
