import { SearchX } from "lucide-react";

import type { DailyMealsWithFoods, Profile } from "@/lib/queries";
import { DailyMeal } from "./daily-meal";

interface DailyMealsProps {
  dailyMealsWithFoods: DailyMealsWithFoods;
  profile: Profile;
}

export function DailyMeals({ dailyMealsWithFoods, profile }: DailyMealsProps) {
  if (dailyMealsWithFoods.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-8 rounded-md border p-2 text-muted-foreground">
        <SearchX size={48} className="animate-[pulse_3s_infinite]" />

        <div>아직 등록된 음식이 없어요</div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-4">
      {dailyMealsWithFoods.map((dailyMealWithFood) => {
        return (
          <DailyMeal
            key={dailyMealWithFood.id}
            dailyMealData={dailyMealWithFood}
            profile={profile}
          />
        );
      })}
    </div>
  );
}
