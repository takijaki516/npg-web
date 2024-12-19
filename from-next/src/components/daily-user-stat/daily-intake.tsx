"use client";

import * as React from "react";
import { ChartNoAxesCombined } from "lucide-react";

import { type Database } from "../../lib/types/database.types";
import { type DailyMealsWithFoods } from "../../supabase-utils/server-queries";
import { InfoField } from "./daily-user-stat";
import { cn } from "../../lib/utils";

export interface DailyIntakeData {
  calories: number;
  carbohydrates: number;
  protein: number;
  fat: number;
}

interface DailyIntakeProps {
  profile: Database["public"]["Tables"]["profiles"]["Row"];
  dailyMealsData: DailyMealsWithFoods;
  className?: string;
  dailyIntakeData: DailyIntakeData;
}

export function DailyIntake({
  profile,
  dailyMealsData,
  className,
  dailyIntakeData,
}: DailyIntakeProps) {
  const totalCalories = dailyMealsData.reduce(
    (acc, meal) => acc + (meal.total_calories ?? 0),
    0,
  );
  const totalCarbs = dailyMealsData.reduce(
    (acc, meal) => acc + (meal.total_carbohydrate ?? 0),
    0,
  );
  const totalProtein = dailyMealsData.reduce(
    (acc, meal) => acc + (meal.total_protein ?? 0),
    0,
  );
  const totalFat = dailyMealsData.reduce(
    (acc, meal) => acc + (meal.total_fat ?? 0),
    0,
  );

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div className="flex h-8 items-center gap-2">
        <ChartNoAxesCombined size={22} />

        <div className="text-center font-semibold">
          {profile.language === "ko" ? "섭취량" : "Intake"}
        </div>
      </div>

      <InfoField
        label="칼로리"
        value={`${totalCalories.toString()}kcal`}
        className="h-9"
      />
      <InfoField
        label="탄수화물"
        value={`${totalCarbs.toString()}g`}
        className="h-9"
      />
      <InfoField
        label="단백질"
        value={`${totalProtein.toString()}g`}
        className="h-9"
      />
      <InfoField
        label="지방"
        value={`${totalFat.toString()}g`}
        className="h-9"
      />
    </div>
  );
}
