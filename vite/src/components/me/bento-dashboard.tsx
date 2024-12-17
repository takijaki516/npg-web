import { BentoGrid, BentoGridItem } from "@/components/me/bento-grid";
import { DailyUserStat } from "./daily-user-stat/daily-user-stat";
import { DailyExercisesCard } from "./daily-exercises/daily-exercises";
import { DailyMealsCard } from "./daily-meals/daily-meals";

export function BentoDashboard() {
  return (
    <BentoGrid className="grid w-full gap-4 md:grid-cols-2">
      <BentoGridItem className="rounded-xl p-4 md:col-span-full">
        <DailyUserStat />
      </BentoGridItem>

      <BentoGridItem className="hidden rounded-xl p-4 md:inline-block">
        <DailyExercisesCard />
      </BentoGridItem>

      <BentoGridItem className="hidden rounded-xl p-4 md:inline-block">
        <DailyMealsCard />
      </BentoGridItem>

      <BentoGridItem className="md:hidden">MobileBottomGrid</BentoGridItem>
    </BentoGrid>
  );
}
