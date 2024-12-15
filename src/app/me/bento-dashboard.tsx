import { type Database } from "@/lib/types/database.types";
import {
  type DailyMealsWithFoods,
  type DailyWeightsExercisesWithAllInfos,
} from "@/supabase-utils/server-queries";
import { BentoGrid, BentoGridItem } from "@/components/bento-grid";
import { DailyExercisesCard } from "@/components/daily-exercises/daily-exercises";
import { DailyMealsCard } from "@/components/daily-meals/daily-meals";
import { DailyUserStat } from "@/components/daily-user-stat/daily-user-stat";

interface BentoDashboardProps {
  displayDate: string;
  userGoal: Database["public"]["Tables"]["user_goals"]["Row"];
  dailyExercisesData: DailyWeightsExercisesWithAllInfos;
  dailyMealsData: DailyMealsWithFoods;
  profile: Database["public"]["Tables"]["profiles"]["Row"];
}

export function BentoDashboard({
  displayDate,
  userGoal,
  dailyExercisesData,
  dailyMealsData,
  profile,
}: BentoDashboardProps) {
  return (
    <BentoGrid className="grid w-full gap-4 md:grid-cols-2">
      <BentoGridItem className="rounded-xl p-4 md:col-span-full">
        <DailyUserStat profile={profile} date={displayDate} />
      </BentoGridItem>

      <BentoGridItem className="hidden rounded-xl p-4 md:inline-block">
        <DailyExercisesCard
          dailyExercisesData={dailyExercisesData}
          profile={profile}
        />
      </BentoGridItem>

      <BentoGridItem className="hidden rounded-xl p-4 md:inline-block">
        <DailyMealsCard dailyMealsData={dailyMealsData} profile={profile} />
      </BentoGridItem>

      <BentoGridItem className="md:hidden">MobileBottomGrid</BentoGridItem>
    </BentoGrid>
  );
}
