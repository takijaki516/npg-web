import * as React from "react";
import { useRouteContext } from "@tanstack/react-router";
import { useDateTimeStore } from "@/lib/zustand/time-store";

import { BentoGrid, BentoGridItem } from "@/components/me/bento-grid";
import { DailyUserStat } from "./daily-user-stat/daily-user-stat";
import { DailyExercisesCard } from "./daily-exercises/daily-exercises";
import { DailyMealsCard } from "./daily-meals/daily-meals";
import { MobileBentoGrid } from "./mobile-bento-grid";

export function BentoDashboard() {
  const { profile } = useRouteContext({ from: "/(user)/_layout" });
  const currentLocalDateTime = useDateTimeStore(
    (state) => state.currentDateTime,
  );

  return (
    <BentoGrid className="grid h-full w-full grid-rows-[auto_1fr] gap-4 sm:grid-cols-2">
      <BentoGridItem className="h-fit rounded-md border sm:col-span-full">
        <React.Suspense fallback={<div>Loading...</div>}>
          <DailyUserStat
            profile={profile}
            currentLocalDateTime={currentLocalDateTime}
          />
        </React.Suspense>
      </BentoGridItem>

      <BentoGridItem className="hidden overflow-y-auto rounded-md sm:inline-block">
        <React.Suspense fallback={<div>Loading...</div>}>
          <DailyExercisesCard
            profile={profile}
            currentLocalDateTime={currentLocalDateTime}
          />
        </React.Suspense>
      </BentoGridItem>

      <BentoGridItem className="hidden overflow-y-auto rounded-md sm:inline-block">
        <React.Suspense fallback={<div>Loading...</div>}>
          <DailyMealsCard
            profile={profile}
            currentLocalDateTime={currentLocalDateTime}
          />
        </React.Suspense>
      </BentoGridItem>

      <MobileBentoGrid
        className="overflow-y-auto rounded-md sm:hidden"
        exercises={
          <React.Suspense fallback={<div>Loading...</div>}>
            <DailyExercisesCard
              profile={profile}
              currentLocalDateTime={currentLocalDateTime}
            />
          </React.Suspense>
        }
        meals={
          <React.Suspense fallback={<div>Loading...</div>}>
            <DailyMealsCard
              profile={profile}
              currentLocalDateTime={currentLocalDateTime}
            />
          </React.Suspense>
        }
      />
    </BentoGrid>
  );
}
