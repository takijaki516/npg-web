import { useSuspenseQuery } from "@tanstack/react-query";
import { DateTime } from "luxon";

import { getProfileOptions } from "@/lib/queries";
import { BentoGrid, BentoGridItem } from "@/components/me/bento-grid";
import { DailyUserStat } from "./daily-user-stat/daily-user-stat";
import { DailyExercisesCard } from "./daily-exercises/daily-exercises";
import { DailyMealsCard } from "./daily-meals/daily-meals";

export function BentoDashboard() {
  const { data: profile } = useSuspenseQuery(getProfileOptions);

  const currentLocalDateTime = DateTime.now()
    .setZone(profile.timezone)
    .toFormat("yyyy-MM-dd HH:mm:ss");

  return (
    <BentoGrid className="grid w-full gap-4 md:grid-cols-2">
      <BentoGridItem className="rounded-xl md:col-span-full">
        <DailyUserStat
          profile={profile}
          currentLocalDateTime={currentLocalDateTime}
        />
      </BentoGridItem>

      <BentoGridItem className="hidden rounded-xl md:inline-block">
        <DailyExercisesCard
          profile={profile}
          currentLocalDateTime={currentLocalDateTime}
        />
      </BentoGridItem>

      <BentoGridItem className="hidden rounded-xl md:inline-block">
        <DailyMealsCard
          profile={profile}
          currentLocalDateTime={currentLocalDateTime}
        />
      </BentoGridItem>

      <BentoGridItem className="md:hidden">MobileBottomGrid</BentoGridItem>
    </BentoGrid>
  );
}
