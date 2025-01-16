import * as React from "react";

import { BentoGrid, BentoGridItem } from "@/components/me/bento-grid";
import { DailyUserStat } from "./daily-user-stat/daily-user-stat";
import { DailyExercisesSection } from "@/components/exercises/daily-exercises-section";
import { DailyMealsSection } from "@/components/meals/daily-meals-section";
import { MobileBentoGrid } from "./mobile-bento-grid";
import { DailyUserStatSkeleton } from "@/components/skeletons/daily-user-stat-skeleton";
import { DailyMealsSkeleton } from "@/components/skeletons/daily-meals-skeleton";
import { DailyExercisesSkeleton } from "@/components/skeletons/daily-exercises-skeleton";
import { DailyMobileSkeleton } from "@/components/skeletons/daily-mobile-skeleton";

export function BentoDashboard() {
  return (
    <BentoGrid className="grid h-full w-full flex-1 grid-rows-[auto_1fr] gap-1 xs:gap-2 sm:grid-cols-2 sm:gap-4">
      <BentoGridItem className="col-span-full h-fit rounded-md border">
        <React.Suspense fallback={<DailyUserStatSkeleton />}>
          <DailyUserStat />
        </React.Suspense>
      </BentoGridItem>

      <BentoGridItem className="hidden overflow-y-auto rounded-md p-2 sm:flex sm:flex-col">
        <React.Suspense fallback={<DailyExercisesSkeleton />}>
          <DailyExercisesSection />
        </React.Suspense>
      </BentoGridItem>

      <BentoGridItem className="hidden overflow-y-auto rounded-md p-2 sm:flex sm:flex-col">
        <React.Suspense fallback={<DailyMealsSkeleton />}>
          <DailyMealsSection />
        </React.Suspense>
      </BentoGridItem>

      <React.Suspense fallback={<DailyMobileSkeleton />}>
        <MobileBentoGrid
          className="flex flex-col overflow-y-auto rounded-md p-2 sm:hidden"
          exercises={<DailyExercisesSection />}
          meals={<DailyMealsSection />}
        />
      </React.Suspense>
    </BentoGrid>
  );
}
