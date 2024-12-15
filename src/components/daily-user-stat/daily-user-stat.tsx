"use client";

import { type Database } from "@/lib/types/database.types";
import { BicepsFlexed } from "lucide-react";

interface DailyUserStatProps {
  profile: Database["public"]["Tables"]["profiles"]["Row"];
  date: string;
}

export function DailyUserStat({ profile, date }: DailyUserStatProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="text-lg font-semibold">{date}</div>

      <div className="flex items-center justify-between"></div>
    </div>
  );
}
