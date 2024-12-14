import { type Database } from "@/lib/types/database.types";
import {
  type DailyMealsWithFoods,
  type DailyWeightsExercisesWithAllInfos,
} from "@/supabase-utils/server-queries";
import { BentoGrid, BentoGridItem } from "@/components/bento-grid";
import { DailyExercisesCard } from "./daily-exercises";
import { DailyMealsCard } from "./daily-meals";

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
      <BentoGridItem className="rounded-xl md:col-span-full">
        <div className="flex flex-col gap-4 p-4">
          <div className="flex items-center justify-between">{displayDate}</div>
          <div>{userGoal.user_email}</div>
        </div>
      </BentoGridItem>

      <BentoGridItem className="hidden rounded-xl p-4 md:inline-block">
        <DailyExercisesCard
          localWorkoutDate={displayDate}
          dailyExercisesData={dailyExercisesData}
          profile={profile}
        />
      </BentoGridItem>

      <BentoGridItem className="hidden rounded-xl p-4 md:inline-block">
        <DailyMealsCard
          localDate={displayDate}
          dailyMealsData={dailyMealsData}
          profile={profile}
        />
      </BentoGridItem>

      <BentoGridItem className="md:hidden">MobileBottomGrid</BentoGridItem>
    </BentoGrid>
  );
}
