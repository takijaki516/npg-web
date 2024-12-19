"use client";

import { Clock, Settings, X } from "lucide-react";
import { DateTime } from "luxon";

import { type DailyMealsWithFoods } from "../../supabase-utils/server-queries";
import { DailyFood } from "./daily-food";
import { type Database } from "../../lib/types/database.types";

interface DailyMealProps {
  dailyMealData: DailyMealsWithFoods[number];
  profile: Database["public"]["Tables"]["profiles"]["Row"];
}

export function DailyMeal({ dailyMealData, profile }: DailyMealProps) {
  const localTime = DateTime.fromISO(dailyMealData.meal_time, {
    zone: profile.timezone,
  }).toFormat("HH:mm");

  return (
    <div className="flex flex-col gap-2 rounded-md border px-2 py-4">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Clock className="size-5" />

          <span>{localTime}</span>
        </div>

        <div className="flex items-center gap-2">
          <button>
            <Settings className="size-5" />
          </button>

          <button className="rounded-full hover:bg-red-500">
            <X className="text-red-500 hover:text-white" />
          </button>
        </div>
      </div>

      {dailyMealData.foods.map((eachFood) => {
        return (
          <DailyFood key={eachFood.id} food={eachFood} profile={profile} />
        );
      })}
    </div>
  );
}
