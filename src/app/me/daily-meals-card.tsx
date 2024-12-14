import { type DailyMealsWithFoods } from "@/supabase-utils/server-queries/meals";
import { AddMealDialog } from "./add-meal-dialog";

interface DailyMealsCardProps {
  className?: string;
  dailyMealsData: DailyMealsWithFoods;
}

export function DailyMealsCard({ dailyMealsData }: DailyMealsCardProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>오늘의 식단</div>

        <AddMealDialog />
      </div>

      {dailyMealsData.length === 0 && <div>아직 등록된 음식이 없어요</div>}
    </div>
  );
}
