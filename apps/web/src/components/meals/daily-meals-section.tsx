import { useSuspenseQuery } from "@tanstack/react-query";

import { useDateTimeStore } from "@/lib/zustand/time-store";
import { cn } from "@/lib/utils";
import { getDailyMealsWithFoodsOptions } from "@/lib/queries";
import { DailyMeals } from "./daily-meals";
import { AddMealDialog } from "./add-meal-dialog";

interface DailyMealsSectionProps {
  className?: string;
}

export function DailyMealsSection({ className }: DailyMealsSectionProps) {
  const currentLocalDateTime = useDateTimeStore(
    (state) => state.currentDateTime,
  );
  const currentLocalDate = currentLocalDateTime.split(" ")[0];

  const { data: dailyMealsWithFoods } = useSuspenseQuery(
    getDailyMealsWithFoodsOptions({
      currentLocalDate,
    }),
  );

  return (
    <div className={cn("flex h-full flex-1 flex-col gap-1", className)}>
      <div className="flex items-center justify-between">
        <div className="text-lg font-semibold">식단</div>

        <AddMealDialog />
      </div>

      <DailyMeals dailyMealsWithFoods={dailyMealsWithFoods} />
    </div>
  );
}
