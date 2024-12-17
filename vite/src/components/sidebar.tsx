import {
  Bot,
  Bike,
  CalendarDays,
  Home,
  Settings2,
  Utensils,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { Database } from "@/lib/types/database.types";

import { NavUser } from "./nav-user";

const NAVS = [
  {
    title: "코치",
    url: "/me/coach",
    icon: Bot,
  },
  {
    title: "운동",
    url: "/me/exercises",
    icon: Bike,
    isActive: true,
  },
  {
    title: "식단",
    url: "/me/meals",
    icon: Utensils,
  },
  {
    title: "일정",
    url: "/me/schedule",
    icon: CalendarDays,
  },
  {
    title: "설정",
    url: "/me/settings",
    icon: Settings2,
  },
];

interface AppSidebarProps {
  profile: Database["public"]["Tables"]["profiles"]["Row"];
}

export function AppSidebar({ profile }: AppSidebarProps) {
  return (
    <div className="sticky top-0 hidden h-dvh w-[90px] flex-col items-center justify-between overflow-hidden bg-sidebar py-4 md:flex">
      <div className="flex w-full flex-col items-center px-2">
        <Link
          href="/me"
          className="flex w-full cursor-pointer items-center justify-center rounded-xl py-4 hover:bg-sidebar-accent"
        >
          <Home />
        </Link>

        <ul className="flex w-full flex-col items-center space-y-2 pt-6">
          {NAVS.map((nav) => (
            <li
              key={nav.title}
              className="flex w-full cursor-pointer items-center justify-center rounded-xl py-2 hover:bg-sidebar-accent"
            >
              <Link href={nav.url}>
                <nav.icon />
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <NavUser profile={profile} />
    </div>
  );
}
