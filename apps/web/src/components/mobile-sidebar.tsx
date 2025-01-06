import {
  PanelLeft,
  BicepsFlexed,
  Home,
  Settings2,
  Utensils,
  Sun,
  Moon,
  LaptopMinimal,
  LogOut,
} from "lucide-react";
import { Link } from "@tanstack/react-router";

import { useIsMobile } from "@/lib/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { type Profile } from "@/lib/queries";
import { useTheme } from "./theme-provider";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const NAVS = [
  {
    title: "운동",
    url: "/me/exercise",
    icon: BicepsFlexed,
    isActive: true,
  },
  {
    title: "식단",
    url: "/me/meals",
    icon: Utensils,
  },
  {
    title: "설정",
    url: "/me/settings",
    icon: Settings2,
  },
];

interface MobileSidebarProps {
  profile: Profile;
}

export function MobileSidebar({}: MobileSidebarProps) {
  const isMobile = useIsMobile();
  const { setTheme, theme } = useTheme();

  if (!isMobile) return null;

  return (
    <Sheet>
      <SheetTrigger>
        <PanelLeft />
      </SheetTrigger>
      <SheetContent
        side="left"
        className="flex w-[180px] flex-col justify-between pb-6 pt-10"
      >
        <div className="flex w-full flex-col items-start gap-1 px-2">
          <SheetHeader>
            <SheetTitle className="hidden">Sidebar</SheetTitle>
          </SheetHeader>
          <Link
            href="/me"
            className="flex w-full cursor-pointer items-center gap-2 rounded-md p-1.5 transition-colors hover:bg-accent/80"
          >
            <Home size={24} />
            <div>메인 화면</div>
          </Link>

          {NAVS.map((nav) => (
            <Link
              key={nav.title}
              href={nav.url}
              className="flex w-full cursor-pointer items-center gap-2 rounded-md p-1.5 transition-colors hover:bg-accent/80"
            >
              <nav.icon size={24} />
              <div>{nav.title}</div>
            </Link>
          ))}
        </div>

        <div className="flex w-full flex-col items-start justify-center gap-2 overflow-hidden">
          <div className="flex w-full items-center justify-around overflow-hidden rounded-full bg-muted/40 transition-colors">
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

          <div
            className={cn(
              "group flex w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-full border-[1.5px] border-border bg-muted/40 py-1.5",
            )}
          >
            <LogOut
              size={20}
              className="transition-colors group-hover:text-red-600/80"
            />
            로그아웃
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
