import { CookingPot, SearchX } from "lucide-react";
import { useSuspenseQuery } from "@tanstack/react-query";

import { getDailyMealsWithFoodsOptions, type Profile } from "@/lib/queries";
import { DailyMeal } from "./daily-meal";
import { AddMealDialog } from "../add-meals-dialog/add-meal-dialog";

interface DailyMealsCardProps {
  profile: Profile;
  currentLocalDateTime: string;
}

export function DailyMealsCard({
  profile,
  currentLocalDateTime,
}: DailyMealsCardProps) {
  const { data: dailyMealsWithFoods } = useSuspenseQuery(
    getDailyMealsWithFoodsOptions({
      currentLocalDateTime,
      timezone: profile.timezone,
    }),
  );

  return (
    <div className="flex flex-col gap-1 rounded-md border border-border p-2">
      <div className="flex items-center justify-between">
        <div className="flex gap-1">
          <CookingPot />
          <div className="text-lg font-semibold">
            {profile.language === "ko" ? "오늘의 식단" : "Today's Meal"}
          </div>
        </div>

        <AddMealDialog
          profile={profile}
          currentLocalDateTime={currentLocalDateTime}
        />
      </div>

      {dailyMealsWithFoods.length === 0 && (
        <div className="flex aspect-square w-full flex-col items-center justify-center gap-8 rounded-md border text-muted-foreground">
          <SearchX size={48} className="animate-[pulse_3s_infinite]" />
          <div>
            {profile.language === "ko"
              ? "아직 등록된 음식이 없어요"
              : "No food registered yet"}
          </div>
        </div>
      )}

      {dailyMealsWithFoods.length > 0 &&
        dailyMealsWithFoods.map((dailyMealItem) => {
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
