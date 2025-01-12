import { Moon, Sun, LaptopMinimal } from "lucide-react";

import { cn } from "@/lib/utils";
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ModeToggleProps {
  align?: "start" | "end" | "center";
  side?: "top" | "right" | "bottom" | "left";
}

export function ModeToggle({
  align = "end",
  side = "bottom",
}: ModeToggleProps) {
  const { setTheme, theme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun
            size={24}
            className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
          />
          <Moon
            size={24}
            className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
          />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side={side} align={align} className="border-none">
        <div className="flex w-full items-center justify-around overflow-hidden rounded-md border border-border bg-background transition-colors">
          <div
            className={cn(
              "flex flex-1 cursor-pointer justify-center p-2 text-muted-foreground transition-colors hover:bg-muted/80 hover:text-primary",
              theme === "system" && "bg-muted text-primary",
            )}
            onClick={() => setTheme("system")}
          >
            <LaptopMinimal size={20} />
          </div>

          <div
            className={cn(
              "flex flex-1 cursor-pointer justify-center p-2 text-muted-foreground transition-colors hover:bg-muted/80 hover:text-primary",
              theme === "light" && "bg-muted text-primary",
            )}
            onClick={() => setTheme("light")}
          >
            <Sun size={20} />
          </div>

          <div
            className={cn(
              "flex flex-1 cursor-pointer justify-center p-2 text-muted-foreground transition-colors hover:bg-muted/80 hover:text-primary",
              theme === "dark" && "bg-muted text-primary",
            )}
            onClick={() => setTheme("dark")}
          >
            <Moon size={20} />
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
