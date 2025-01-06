import { LogOut } from "lucide-react";
import { useRouteContext } from "@tanstack/react-router";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function NavUser() {
  const { profile } = useRouteContext({ from: "/(user)/_layout" });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-md p-1 hover:bg-accent/80">
        <Avatar className="size-10 cursor-pointer rounded-md">
          <AvatarImage
            src={profile.image ?? undefined}
            alt={profile.email}
            className="size-full"
          />
          <AvatarFallback className="rounded-md">CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
        side={"right"}
        align="end"
        sideOffset={4}
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 truncate px-1 py-1.5 text-left text-sm font-semibold">
            {profile.email}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem className="cursor-pointer bg-red-600/60 hover:bg-red-600/80 focus:bg-red-600/80">
          <LogOut />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
