"use client";

import { Expand } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type DailyMealsWithFoods } from "@/supabase-utils/server-queries/meals";
import { AddMealDialog } from "./add-meal-dialog";
import { type Database } from "@/lib/types/database.types";

interface DailyMealsCardProps {
  className?: string;
  dailyMealsData: DailyMealsWithFoods;
  profile: Database["public"]["Tables"]["profiles"]["Row"];
  localDate: string;
}

export function DailyMealsCard({
  dailyMealsData,
  profile,
  localDate,
}: DailyMealsCardProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>오늘의 식단</div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Expand />
          </Button>

          <AddMealDialog localDate={localDate} profile={profile} />
        </div>
      </div>

      {dailyMealsData.length === 0 && <div>아직 등록된 음식이 없어요</div>}
    </div>
  );
}
