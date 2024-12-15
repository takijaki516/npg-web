"use client";

import { CookingPot, SearchX } from "lucide-react";

import { type DailyMealsWithFoods } from "@/supabase-utils/server-queries/meals";
import { AddMealDialog } from "@/components/add-meals-dialog/add-meal-dialog";
import { type Database } from "@/lib/types/database.types";
import { DailyMeal } from "./daily-meal";

interface DailyMealsCardProps {
  className?: string;
  dailyMealsData: DailyMealsWithFoods;
  profile: Database["public"]["Tables"]["profiles"]["Row"];
}

export function DailyMealsCard({
  dailyMealsData,
  profile,
}: DailyMealsCardProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <CookingPot />
          <div className="text-lg font-semibold">
            {profile.language === "ko" ? "오늘의 식단" : "Today's Meal"}
          </div>
        </div>

        <AddMealDialog profile={profile} />
      </div>

      {dailyMealsData.length === 0 && (
        <div className="flex aspect-square w-full flex-col items-center justify-center gap-8 rounded-md border text-muted-foreground">
          <SearchX size={48} className="animate-[pulse_3s_infinite]" />
          <div>
            {profile.language === "ko"
              ? "아직 등록된 음식이 없어요"
              : "No food registered yet"}
          </div>
        </div>
      )}

      {dailyMealsData.length > 0 &&
        dailyMealsData.map((dailyMealItem) => {
          return (
            <DailyMeal
              key={dailyMealItem.id}
              dailyMealData={dailyMealItem}
              profile={profile}
            />
          );
        })}
    </div>
  );
}
