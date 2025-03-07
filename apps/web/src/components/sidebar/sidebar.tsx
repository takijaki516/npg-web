import { Home, Settings, ChartArea, Medal } from "lucide-react";
import { Link } from "@tanstack/react-router";

import { useDateTimeStore } from "@/lib/zustand/time-store";
import { NavUser } from "@/components/nav-user";
import { ModeToggle } from "@/components/mode-toggle";

export function Sidebar() {
  const currentDateTime = useDateTimeStore((state) => state.currentDateTime);
  const yearMonth = currentDateTime.split(" ")[0].slice(0, 7);

  return (
    <div className="sticky top-0 hidden h-dvh w-[60px] flex-col items-center justify-between overflow-hidden border-r border-border py-4 md:flex">
      <div className="flex w-full flex-col items-center gap-3 px-2">
        <Link
          preload={false}
          to="/me"
          className="flex cursor-pointer items-center justify-center rounded-md p-1.5 transition-colors hover:bg-accent/80"
        >
          <Home size={24} />
        </Link>

        <Link
          preload={false}
          to={`/info/$yearmonth`}
          params={{ yearmonth: yearMonth }}
          className="flex cursor-pointer items-center justify-center rounded-md p-1.5 transition-colors hover:bg-accent/80"
        >
          <ChartArea size={24} />
        </Link>

        <Link
          preload={false}
          to={`/goal`}
          className="flex cursor-pointer items-center justify-center rounded-md p-1.5 transition-colors hover:bg-accent/80"
        >
          <Medal size={24} />
        </Link>

        <Link
          preload={false}
          to="/setting"
          className="flex cursor-pointer items-center justify-center rounded-md p-1.5 transition-colors hover:bg-accent/80"
        >
          <Settings size={24} />
        </Link>
      </div>

      <div className="flex flex-col items-center justify-center gap-2">
        <ModeToggle align="start" side="right" />
        <NavUser />
      </div>
    </div>
  );
}
