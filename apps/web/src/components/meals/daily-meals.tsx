import { SearchX } from "lucide-react";

import type { DailyMealsWithFoods } from "@/lib/queries";
import { DailyMeal } from "./daily-meal";

interface DailyMealsProps {
  dailyMealsWithFoods: DailyMealsWithFoods;
}

export function DailyMeals({ dailyMealsWithFoods }: DailyMealsProps) {
  if (dailyMealsWithFoods.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-8 rounded-md border p-2 text-muted-foreground">
        <SearchX size={48} className="animate-[pulse_3s_infinite]" />

        <div>등록된 음식이 없어요</div>
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
          />
        );
      })}
    </div>
  );
}
