import * as React from "react";
import { Clock, CookingPot } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useDateTimeStore } from "@/lib/zustand/time-store";
import {
  GET_DAILY_MEALS_WITH_FOODS_QUERY_KEY,
  deleteMealMutationFn,
  type DailyMealsWithFoods,
  type Profile,
} from "@/lib/queries";
import { useMealHoverStore } from "@/lib/zustand/meal-hover-store";
import { useFoodHoverStore } from "@/lib/zustand/food-hover-store";
import { cn, getCurrentTimeInTimezone, utcToLocalTime } from "@/lib/utils";
import { DailyFood } from "./daily-food";
import { InfoField } from "@/components/info-field";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { DeleteButton } from "@/components/delete-button";

interface DailyMealProps {
  profile: Profile;
  dailyMealData: DailyMealsWithFoods[number];
}

export function DailyMeal({ dailyMealData, profile }: DailyMealProps) {
  const currentLocalTime = utcToLocalTime({
    utcTime: dailyMealData.mealTime,
    timezone: profile.timezone,
  });
  const [hh, mm] = currentLocalTime.split(" ")[1].split(":");

  const dailyFoods = dailyMealData.foods.slice(0, 3);

  const setCurrentDateTime = useDateTimeStore(
    (state) => state.setCurrentDateTime,
  );
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const setHoveredMealId = useMealHoverStore((state) => state.setHoveredMealId);
  const setHoveredFoodId = useFoodHoverStore((state) => state.setHoveredFoodId);

  const queryClient = useQueryClient();

  const deleteMealMutation = useMutation({
    mutationFn: (id: string) => deleteMealMutationFn({ id }),
    onSettled: async () => {
      const currentTime = getCurrentTimeInTimezone(profile.timezone);
      setCurrentDateTime(currentTime);

      await queryClient.invalidateQueries({
        queryKey: [GET_DAILY_MEALS_WITH_FOODS_QUERY_KEY, currentTime],
      });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <div
        className={cn(
          "flex cursor-pointer flex-col gap-2 rounded-md border border-border p-2 transition-colors hover:bg-muted/40",
        )}
        onMouseEnter={() => setHoveredMealId(dailyMealData.id)}
        onMouseLeave={() => setHoveredMealId(null)}
        onClick={() => setIsDialogOpen(true)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Clock className="size-5" />
            <span>{`${hh}:${mm}`}</span>
          </div>

          <DeleteButton
            onClick={() => {
              deleteMealMutation.mutate(dailyMealData.id);
            }}
            isPending={deleteMealMutation.isPending}
          />
        </div>

        <div className="flex h-[140px] gap-4">
          <div className="flex h-full w-fit flex-col gap-1">
            <InfoField
              label={profile.language === "ko" ? "총칼로리" : "Total Calories"}
              value={dailyMealData.totalCaloriesKcal.toString()}
            />
            <InfoField
              label={profile.language === "ko" ? "총탄수화물" : "Total Carbs"}
              value={dailyMealData.totalCarbohydratesG.toString()}
            />
            <InfoField
              label={profile.language === "ko" ? "총단백질" : "Total Protein"}
              value={dailyMealData.totalProteinG.toString()}
            />
            <InfoField
              label={profile.language === "ko" ? "총지방" : "Total Fat"}
              value={dailyMealData.totalFatG.toString()}
            />
          </div>

          <div className="flex h-full w-28 flex-col gap-2 overflow-y-auto">
            {dailyFoods.map((food) => {
              return (
                <div
                  className={cn(
                    "relative flex aspect-square w-full items-center justify-center rounded-md border border-border/50 bg-background transition-colors",
                    "hover:border-primary/20",
                  )}
                  key={food.id}
                  onMouseEnter={() => setHoveredFoodId(food.id)}
                  onMouseLeave={() => setHoveredFoodId(null)}
                >
                  {food.foodPic ? (
                    <img
                      className="aspect-square w-full object-contain"
                      src={`https://coach247.taekgogo.com/${food.foodPic}`}
                      alt={food.foodName}
                    />
                  ) : (
                    <CookingPot size={40} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* TODO: */}
      <DialogContent className="flex max-h-[calc(100dvh-80px)] w-full max-w-xl flex-col gap-2 overflow-y-auto">
        <DialogTitle>음식들</DialogTitle>

        {dailyMealData.foods.map((eachFood) => {
          return <DailyFood key={eachFood.id} food={eachFood} />;
        })}
      </DialogContent>
    </Dialog>
  );
}
