"use client";

import { CookingPot, SearchX } from "lucide-react";
import { type DailyMealsWithFoods } from "@/supabase-utils/server-queries/meals";
import { AddMealDialog } from "../add-meals-dialog/add-meal-dialog";
import { type Database } from "@/lib/types/database.types";
import { DailyMeal } from "./daily-meal";

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
        <div className="flex gap-2">
          <div className="text-lg font-semibold">오늘의 식단</div>
          <CookingPot />
        </div>

        <AddMealDialog profile={profile} />
      </div>

      {dailyMealsData.length === 0 && (
        <div className="flex aspect-square w-full flex-col items-center justify-center gap-8 rounded-md border text-muted-foreground">
          <SearchX size={48} className="animate-[pulse_3s_infinite]" />
          <div>아직 등록된 음식이 없어요</div>
        </div>
      )}

      {dailyMealsData.length > 0 &&
        dailyMealsData.map((dailyMealItem) => {
          return (
            <DailyMeal key={dailyMealItem.id} dailyMealData={dailyMealItem} />
          );
        })}
    </div>
  );
}
