import { CookingPot, SearchX } from "lucide-react";
import { getRouteApi } from "@tanstack/react-router";

import { AddMealDialog } from "../add-meals-dialog/add-meal-dialog";
import { DailyMeal } from "./daily-meal";

export function DailyMealsCard() {
  const routeApi = getRouteApi("/(user)/_layout/me");
  const { profile, dailyMealsWithFoods } = routeApi.useLoaderData();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <CookingPot />
          <div className="text-lg font-semibold">
            {profile.language === "ko" ? "오늘의 식단" : "Today's Meal"}
          </div>
        </div>

        <AddMealDialog profile={profile} />
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
