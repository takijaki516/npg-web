import { CookingPot, SearchX } from "lucide-react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { DateTime } from "luxon";

import {
  getDailyMealsWithFoodsOptions,
  getProfileOptions,
} from "@/lib/queries";
import { DailyMeal } from "./daily-meal";
import { convertToRangeOfDayUTCTime } from "@/lib/utils";

export function DailyMealsCard() {
  const { data: profile } = useSuspenseQuery(getProfileOptions);

  // get current local date time
  const currentLocalDateTime = DateTime.now()
    .setZone(profile.timezone)
    .toFormat("yyyy-MM-dd");

  const { utcStartTimeOfDay, utcEndTimeOfDay } = convertToRangeOfDayUTCTime({
    localDate: currentLocalDateTime,
    timeZone: profile.timezone,
  });

  if (!utcStartTimeOfDay || !utcEndTimeOfDay) {
    throw new Error("failed to get start and end time of day");
  }

  const { data: dailyMealsWithFoods } = useSuspenseQuery(
    getDailyMealsWithFoodsOptions({
      utcStartOfRange: utcStartTimeOfDay,
      utcEndOfRange: utcEndTimeOfDay,
    }),
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <CookingPot />
          <div className="text-lg font-semibold">
            {profile.language === "ko" ? "오늘의 식단" : "Today's Meal"}
          </div>
        </div>

        {/* <AddMealDialog profile={profile} /> */}
      </div>

      {dailyMealsWithFoods.length === 0 && (
        <div className="flex aspect-square w-full flex-col items-center justify-center gap-8 rounded-md border text-muted-foreground">
          <SearchX size={48} className="animate-[pulse_3s_infinite]" />
          <div>
            {profile.language === "ko"
              ? "아직 등록된 음식이 없어요"
              : "No food registered yet"}
          </div>
        </div>
      )}

      {dailyMealsWithFoods.length > 0 &&
        dailyMealsWithFoods.map((dailyMealItem) => {
          return (
            <DailyMeal
              key={dailyMealItem.id}
              dailyMealData={dailyMealItem}
              profile={profile}
            />
          );
        })}
    </div>
  );
}
