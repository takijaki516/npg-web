import * as React from "react";
import { useRouteContext } from "@tanstack/react-router";
import { useDateTimeStore } from "@/lib/zustand/time-store";

import { BentoGrid, BentoGridItem } from "@/components/me/bento-grid";
import { DailyUserStat } from "./daily-user-stat/daily-user-stat";
import { DailyExercisesCard } from "./daily-exercises/daily-exercises";
import { DailyMealsCard } from "./daily-meals/daily-meals";

export function BentoDashboard() {
  const { profile } = useRouteContext({ from: "/(user)/_layout" });
  const currentLocalDateTime = useDateTimeStore(
    (state) => state.currentDateTime,
  );

  return (
    <BentoGrid className="grid w-full gap-4 md:grid-cols-2">
      <BentoGridItem className="rounded-xl md:col-span-full">
        <React.Suspense fallback={<div>Loading...</div>}>
          <DailyUserStat
            profile={profile}
            currentLocalDateTime={currentLocalDateTime}
          />
        </React.Suspense>
      </BentoGridItem>

      <BentoGridItem className="hidden rounded-xl md:inline-block">
        <React.Suspense fallback={<div>Loading...</div>}>
          <DailyExercisesCard
            profile={profile}
            currentLocalDateTime={currentLocalDateTime}
          />
        </React.Suspense>
      </BentoGridItem>

      <BentoGridItem className="hidden rounded-xl md:inline-block">
        <React.Suspense fallback={<div>Loading...</div>}>
          <DailyMealsCard
            profile={profile}
            currentLocalDateTime={currentLocalDateTime}
          />
        </React.Suspense>
      </BentoGridItem>

      <BentoGridItem className="md:hidden">MobileBottomGrid</BentoGridItem>
    </BentoGrid>
  );
}
