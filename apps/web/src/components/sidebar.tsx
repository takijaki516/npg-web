import { BicepsFlexed, Home, Settings2, Utensils } from "lucide-react";
import { Link } from "@tanstack/react-router";

import { NavUser } from "./nav-user";
import { ModeToggle } from "./mode-toggle";

const NAVS = [
  {
    title: "운동",
    url: "/exercise",
    icon: BicepsFlexed,
  },
  {
    title: "식단",
    url: "/meal",
    icon: Utensils,
  },
  {
    title: "설정",
    url: "/setting",
    icon: Settings2,
  },
];

export function Sidebar() {
  return (
    <div className="sticky top-0 hidden h-dvh w-[60px] flex-col items-center justify-between overflow-hidden border-r border-border py-4 md:flex">
      <div className="flex w-full flex-col items-center gap-3 px-2">
        <Link
          preload={false}
          href="/me"
          className="flex cursor-pointer items-center justify-center rounded-md p-1.5 transition-colors hover:bg-accent/80"
        >
          <Home size={24} />
        </Link>

        {NAVS.map((nav) => (
          <Link
            preload={false}
            key={nav.title}
            href={nav.url}
            className="flex cursor-pointer items-center justify-center rounded-md p-1.5 transition-colors hover:bg-accent/80"
          >
            <nav.icon size={24} />
          </Link>
        ))}
      </div>

      <div className="flex flex-col items-center justify-center gap-2">
        <ModeToggle />
        <NavUser />
      </div>
    </div>
  );
}
