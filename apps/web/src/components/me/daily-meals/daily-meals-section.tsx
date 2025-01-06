import { useSuspenseQuery } from "@tanstack/react-query";

import { getDailyMealsWithFoodsOptions, type Profile } from "@/lib/queries";
import { DailyMeals } from "./daily-meals";
import { AddMealDialog } from "../add-meals-dialog/add-meal-dialog";

interface DailyMealsSectionProps {
  profile: Profile;
  currentLocalDateTime: string;
  className?: string;
}

export function DailyMealsSection({
  profile,
  currentLocalDateTime,
}: DailyMealsSectionProps) {
  const { data: dailyMealsWithFoods } = useSuspenseQuery(
    getDailyMealsWithFoodsOptions({
      currentLocalDateTime,
      timezone: profile.timezone,
    }),
  );

  return (
    <div className="flex h-full flex-col gap-1">
      <div className="flex items-center justify-between px-1">
        <div className="text-lg font-semibold">오늘의 식단</div>

        <AddMealDialog
          profile={profile}
          currentLocalDateTime={currentLocalDateTime}
        />
      </div>

      <DailyMeals dailyMealsWithFoods={dailyMealsWithFoods} profile={profile} />
    </div>
  );
}
