import * as React from "react";
import { useRouteContext } from "@tanstack/react-router";
import { useDateTimeStore } from "@/lib/zustand/time-store";

import { BentoGrid, BentoGridItem } from "@/components/me/bento-grid";
import { DailyUserStat } from "./daily-user-stat/daily-user-stat";
import { DailyExercisesSection } from "./daily-exercises/daily-exercises-section";
import { DailyMealsSection } from "./daily-meals/daily-meals-section";
import { MobileBentoGrid } from "./mobile-bento-grid";
import { DailyUserStatSkeleton } from "@/components/skeletons/daily-user-stat-skeleton";
import { DailyMealsSkeleton } from "@/components/skeletons/daily-meals-skeleton";
import { DailyExercisesSkeleton } from "@/components/skeletons/daily-exercises-skeleton";
import { DailyMobileSkeleton } from "@/components/skeletons/daily-mobile-skeleton";

export function BentoDashboard() {
  const { profile } = useRouteContext({ from: "/(user)/_layout" });
  const currentLocalDateTime = useDateTimeStore(
    (state) => state.currentDateTime,
  );

  return (
    <BentoGrid className="grid h-full w-full grid-rows-[auto_1fr] gap-4 sm:grid-cols-2">
      <BentoGridItem className="col-span-full h-fit rounded-md border">
        <React.Suspense fallback={<DailyUserStatSkeleton />}>
          <DailyUserStat
            profile={profile}
            currentLocalDateTime={currentLocalDateTime}
          />
        </React.Suspense>
      </BentoGridItem>

      <BentoGridItem className="hidden min-h-60 overflow-y-auto rounded-md p-2 sm:inline-block">
        <React.Suspense fallback={<DailyExercisesSkeleton />}>
          <DailyExercisesSection
            profile={profile}
            currentLocalDateTime={currentLocalDateTime}
          />
        </React.Suspense>
      </BentoGridItem>

      <BentoGridItem className="hidden min-h-60 overflow-y-auto rounded-md p-2 sm:inline-block">
        <React.Suspense fallback={<DailyMealsSkeleton />}>
          <DailyMealsSection
            profile={profile}
            currentLocalDateTime={currentLocalDateTime}
          />
        </React.Suspense>
      </BentoGridItem>

      <React.Suspense fallback={<DailyMobileSkeleton />}>
        <MobileBentoGrid
          className="min-h-60 overflow-y-auto rounded-md p-2 sm:hidden"
          exercises={
            <DailyExercisesSection
              profile={profile}
              currentLocalDateTime={currentLocalDateTime}
            />
          }
          meals={
            <DailyMealsSection
              profile={profile}
              currentLocalDateTime={currentLocalDateTime}
            />
          }
        />
      </React.Suspense>
    </BentoGrid>
  );
}
