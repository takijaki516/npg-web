import {
  PanelLeft,
  Home,
  Settings,
  Sun,
  Moon,
  LaptopMinimal,
  LogOut,
  ChartArea,
} from "lucide-react";
import { Link, useRouter } from "@tanstack/react-router";

import { authClient } from "@/lib/better-auth";
import { useDateTimeStore } from "@/lib/zustand/time-store";
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

export interface MobileSidebarProps {
  profile: Profile;
}

export function MobileSidebar() {
  const isMobile = useIsMobile();
  const { setTheme, theme } = useTheme();
  const router = useRouter();
  const currentDateTime = useDateTimeStore((state) => state.currentDateTime);
  const yearMonth = currentDateTime.split(" ")[0].slice(0, 7);

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
            preload={false}
            href="/me"
            className="flex w-full cursor-pointer items-center gap-2 rounded-md p-1.5 transition-colors hover:bg-accent/80"
          >
            <Home size={24} />
            <span>메인</span>
          </Link>

          <Link
            preload={false}
            href={`/info/${yearMonth}`}
            className="flex w-full cursor-pointer items-center gap-2 rounded-md p-1.5 transition-colors hover:bg-accent/80"
          >
            <ChartArea size={24} />
            <span>기록</span>
          </Link>

          <Link
            preload={false}
            href="/setting"
            className="flex w-full cursor-pointer items-center gap-2 rounded-md p-1.5 transition-colors hover:bg-accent/80"
          >
            <Settings size={24} />
            <span>설정</span>
          </Link>
        </div>

        <div className="flex w-full flex-col items-start justify-center gap-2 overflow-hidden">
          {/* mobile dark mode */}
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

          {/* logout button */}
          <div
            className={cn(
              "group flex w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-full border-[1.5px] border-border bg-muted/40 py-1.5",
            )}
            onClick={async () => {
              await authClient.signOut({
                fetchOptions: {
                  onSuccess: () => {
                    router.navigate({
                      href: "/",
                    });
                  },
                },
              });
            }}
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
