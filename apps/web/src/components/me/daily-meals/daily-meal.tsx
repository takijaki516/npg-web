import * as React from "react";
import { Clock, X } from "lucide-react";
import { DateTime } from "luxon";

import type { DailyMealsWithFoods, Profile } from "@/lib/queries";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { DailyFood } from "./daily-food";
import { FoodDetailInfoField } from "@/components/food/food-detail";
import { useMealHoverStore } from "@/lib/zustand/meal-hover-store";
import { useFoodHoverStore } from "@/lib/zustand/food-hover-store";

interface DailyMealProps {
  dailyMealData: DailyMealsWithFoods[number];
  profile: Profile;
}

export function DailyMeal({ dailyMealData, profile }: DailyMealProps) {
  const utcTime = DateTime.fromFormat(
    dailyMealData.mealTime,
    "yyyy-MM-dd HH:mm:ss",
    { zone: "utc" },
  );
  const currentLocalTime = utcTime.setZone(profile.timezone);
  const dailyFoods = dailyMealData.foods.slice(0, 3);

  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const setHoveredMealId = useMealHoverStore((state) => state.setHoveredMealId);
  const setHoveredFoodId = useFoodHoverStore((state) => state.setHoveredFoodId);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <div
        className={cn(
          "flex cursor-pointer flex-col gap-2 rounded-md border border-border p-2 hover:bg-muted/40",
        )}
        onMouseEnter={() => setHoveredMealId(dailyMealData.id)}
        onMouseLeave={() => setHoveredMealId(null)}
        onClick={() => setIsDialogOpen(true)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Clock className="size-5" />
            <span>{currentLocalTime.toFormat("HH:mm")}</span>
          </div>

          <button className="rounded-full hover:bg-red-500">
            <X className="text-red-500 hover:text-white" />
          </button>
        </div>

        <div className="flex h-[140px] gap-4">
          <div className="flex h-full w-fit flex-col gap-1">
            <FoodDetailInfoField
              label={profile.language === "ko" ? "총칼로리" : "Total Calories"}
              value={dailyMealData.totalCaloriesKcal.toString()}
            />
            <FoodDetailInfoField
              label={profile.language === "ko" ? "총탄수화물" : "Total Carbs"}
              value={dailyMealData.totalCarbohydratesG.toString()}
            />
            <FoodDetailInfoField
              label={profile.language === "ko" ? "총단백질" : "Total Protein"}
              value={dailyMealData.totalProteinG.toString()}
            />
            <FoodDetailInfoField
              label={profile.language === "ko" ? "총지방" : "Total Fat"}
              value={dailyMealData.totalFatG.toString()}
            />
          </div>

          <div className="flex h-full w-28 flex-col gap-2 overflow-y-auto">
            {dailyFoods.map((food) => {
              return (
                <div
                  className="aspect-square w-full bg-pink-300"
                  key={food.id}
                  onMouseEnter={() => setHoveredFoodId(food.id)}
                  onMouseLeave={() => setHoveredFoodId(null)}
                >
                  {food.foodName}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <DialogContent>
        {dailyMealData.foods.map((eachFood) => {
          return (
            <DailyFood key={eachFood.id} food={eachFood} profile={profile} />
          );
        })}
      </DialogContent>
    </Dialog>
  );
}
