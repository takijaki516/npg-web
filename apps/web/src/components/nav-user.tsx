import * as React from "react";
import { LogOut } from "lucide-react";
import { useSuspenseQuery } from "@tanstack/react-query";

import { getProfileOptions } from "@/lib/queries";
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
  const { data: profile } = useSuspenseQuery(getProfileOptions);

  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="size-12 rounded-lg">
            <AvatarImage src={profile.image ?? undefined} alt={profile.email} />
            <AvatarFallback className="rounded-lg">CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
          side={"right"}
          align="end"
          sideOffset={4}
        >
          <DropdownMenuLabel className="p-0 font-normal">
            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage
                  src={profile.image ?? undefined}
                  alt={profile.email}
                />

                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>

              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{profile.email}</span>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem className="cursor-pointer bg-red-500 hover:bg-red-600 focus:bg-red-600">
            <LogOut />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </React.Suspense>
  );
}
