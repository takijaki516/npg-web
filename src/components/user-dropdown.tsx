import { User2 } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import type { User } from "@supabase/supabase-js";

interface UserDropdownProps {
  user?: User;
  align: "start" | "center" | "end";
}

export function UserDropdown({ align }: UserDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="size-9">
          <User2 className="size-5" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align={align}>
        <DropdownMenuLabel>Appearance</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem>Status Bar</DropdownMenuItem>
        <DropdownMenuItem>Activity Bar</DropdownMenuItem>
        <DropdownMenuItem>Panel</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
