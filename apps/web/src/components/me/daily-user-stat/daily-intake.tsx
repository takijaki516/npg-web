import { Bot, Loader2, Info } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { cn } from "@/lib/utils";
import { honoClient } from "@/lib/hono";
import {
  type DailyMealsWithFoods,
  type DailyIntake,
  type Profile,
  GET_OR_CREATE_DAILY_INTAKE_QUERY_KEY,
} from "@/lib/queries";
import { useMealHoverStore } from "@/lib/zustand/meal-hover-store";
import { useFoodHoverStore } from "@/lib/zustand/food-hover-store";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface DailyIntakeProps {
  profile: Profile;
  currentLocalDateTime: string;
  dailyIntake: DailyIntake;
  dailyMealsWithFoods: DailyMealsWithFoods;
}

export function DailyIntake({
  profile,
  currentLocalDateTime,
  dailyIntake,
  dailyMealsWithFoods,
}: DailyIntakeProps) {
  const hoveredMealId = useMealHoverStore((state) => state.hoveredMealId);
  const hoveredFoodId = useFoodHoverStore((state) => state.hoveredFoodId);

  const queryClient = useQueryClient();

  const mutateIntake = useMutation({
    mutationFn: async () => {
      await honoClient.ai.intake.$post({
        json: {
          dateTime: currentLocalDateTime,
          timezone: profile.timezone,
          dailyIntakeId: dailyIntake.id,
        },
      });
    },
    onError: () => {
      // TODO: error handling
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: [GET_OR_CREATE_DAILY_INTAKE_QUERY_KEY],
      });
    },
  });

  const { goalCaloriesKcal, goalCarbohydratesG, goalFatG, goalProteinG } =
    dailyIntake;

  const intakeTotalKCal = dailyMealsWithFoods.reduce((acc, cur) => {
    return acc + cur.totalCaloriesKcal;
  }, 0);

  const intakeTotalCarbohydratesG = dailyMealsWithFoods.reduce((acc, cur) => {
    return acc + cur.totalCarbohydratesG;
  }, 0);

  const intakeTotalProteinG = dailyMealsWithFoods.reduce((acc, cur) => {
    return acc + cur.totalProteinG;
  }, 0);

  const intakeTotalFatG = dailyMealsWithFoods.reduce((acc, cur) => {
    return acc + cur.totalFatG;
  }, 0);

  return (
    <div className={cn("h-[148px] pt-2 sm:grid sm:grid-cols-5 sm:gap-2")}>
      <div className="grid grid-cols-6 sm:col-span-3">
        <div className="col-span-2 col-start-2 flex items-center">
          <div>현재/목표</div>
        </div>

        <div className="col-span-3 col-start-4 flex items-center justify-between">
          <div className="cursor-pointer rounded-md p-1 transition-colors hover:bg-muted">
            {mutateIntake.isPending ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              <Bot onClick={() => mutateIntake.mutate()} size={20} />
            )}
          </div>

          <Tooltip>
            <TooltipTrigger className="rounded-md p-1 transition-colors hover:bg-muted sm:hidden">
              <Info size={20} />
            </TooltipTrigger>
            <TooltipContent
              align="end"
              className="text-md flex max-h-[200px] max-w-[180px] overflow-y-auto rounded-md border border-background bg-muted p-2 text-muted-foreground"
            >
              {dailyIntake.llmDescription}
            </TooltipContent>
          </Tooltip>
        </div>

        <div className="col-span-full space-y-1 pt-1">
          <div className="grid grid-cols-6">
            <div className="col-span-1 whitespace-nowrap">칼로리</div>

            <div className="col-span-2 flex items-center gap-1">
              <span>{intakeTotalKCal ?? "0"}</span>
              <span>/</span>
              <span>{goalCaloriesKcal ?? "?"}Kcal</span>
            </div>

            <div
              className={cn(
                "col-span-3 h-5 overflow-hidden rounded-full bg-muted",
              )}
            >
              {goalCaloriesKcal && (
                <div className="flex h-full w-full items-center">
                  {dailyMealsWithFoods.map((meal) => {
                    const width =
                      (meal.totalCaloriesKcal / goalCaloriesKcal) * 100;

                    const isMealHovered = hoveredMealId === meal.id;

                    return (
                      <div
                        key={meal.id}
                        className={cn("flex h-full")}
                        style={{
                          width: `${width}%`,
                        }}
                      >
                        {meal.foods.map((food) => {
                          const width =
                            (food.foodCaloriesKcal / meal.totalCaloriesKcal) *
                            100;

                          const isFoodHovered = hoveredFoodId === food.id;

                          return (
                            <div
                              key={food.id}
                              className={cn(
                                "z-10 h-full bg-green-500 transition-colors",
                                isMealHovered && "bg-red-500",
                                isFoodHovered && "bg-red-600",
                              )}
                              style={{
                                width: `${width}%`,
                              }}
                            />
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-6 gap-1">
            <div className="col-span-1 whitespace-nowrap">탄수화물</div>

            <div className="col-span-2 flex items-center gap-1">
              <span>{intakeTotalCarbohydratesG ?? "0"}</span>
              <span>/</span>
              <span>{goalCarbohydratesG ?? "?"}g</span>
            </div>

            <div
              className={cn(
                "col-span-3 h-5 overflow-hidden rounded-full bg-muted",
              )}
            >
              {goalCarbohydratesG && (
                <div className="flex h-full w-full items-center">
                  {dailyMealsWithFoods.map((meal) => {
                    const width =
                      (meal.totalCarbohydratesG / goalCarbohydratesG) * 100;

                    const isMealHovered = hoveredMealId === meal.id;

                    return (
                      <div
                        key={meal.id}
                        className={cn("flex h-full")}
                        style={{
                          width: `${width}%`,
                        }}
                      >
                        {meal.foods.map((food) => {
                          const width =
                            (food.foodCarbohydratesG /
                              meal.totalCarbohydratesG) *
                            100;

                          const isFoodHovered = hoveredFoodId === food.id;

                          return (
                            <div
                              key={food.id}
                              className={cn(
                                "z-10 h-full bg-green-500 transition-colors",
                                isMealHovered && "bg-red-500",
                                isFoodHovered && "bg-red-600",
                              )}
                              style={{
                                width: `${width}%`,
                              }}
                            />
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-6">
            <div className="col-span-1 whitespace-nowrap">단백질</div>

            <div className="col-span-2 flex items-center gap-1">
              <span>{intakeTotalProteinG ?? "0"}</span>
              <span>/</span>
              <span>{goalProteinG ?? "?"}g</span>
            </div>

            <div
              className={cn(
                "col-span-3 h-5 overflow-hidden rounded-full bg-muted",
              )}
            >
              {goalProteinG && (
                <div className="flex h-full w-full items-center">
                  {dailyMealsWithFoods.map((meal) => {
                    const width = (meal.totalProteinG / goalProteinG) * 100;

                    const isMealHovered = hoveredMealId === meal.id;

                    return (
                      <div
                        key={meal.id}
                        className={cn("flex h-full")}
                        style={{
                          width: `${width}%`,
                        }}
                      >
                        {meal.foods.map((food) => {
                          const width =
                            (food.foodProteinG / meal.totalProteinG) * 100;

                          const isFoodHovered = hoveredFoodId === food.id;

                          return (
                            <div
                              key={food.id}
                              className={cn(
                                "z-10 h-full bg-green-500 transition-colors",
                                isMealHovered && "bg-red-500",
                                isFoodHovered && "bg-red-600",
                              )}
                              style={{
                                width: `${width}%`,
                              }}
                            />
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-6">
            <div className="col-span-1 whitespace-nowrap">지방</div>

            <div className="col-span-2 flex items-center gap-1">
              <span>{intakeTotalFatG ?? "0"}</span>
              <span>/</span>
              <span>{goalFatG ?? "?"}g</span>
            </div>

            <div
              className={cn(
                "col-span-3 h-5 overflow-hidden rounded-full bg-muted",
              )}
            >
              {goalFatG && (
                <div className="flex h-full w-full items-center">
                  {dailyMealsWithFoods.map((meal) => {
                    const width = (meal.totalFatG / goalFatG) * 100;

                    const isMealHovered = hoveredMealId === meal.id;

                    return (
                      <div
                        key={meal.id}
                        className={cn("flex h-full")}
                        style={{
                          width: `${width}%`,
                        }}
                      >
                        {meal.foods.map((food) => {
                          const width = (food.foodFatG / meal.totalFatG) * 100;

                          const isFoodHovered = hoveredFoodId === food.id;

                          return (
                            <div
                              key={food.id}
                              className={cn(
                                "z-10 h-full bg-green-500 transition-colors",
                                isMealHovered && "bg-red-500",
                                isFoodHovered && "bg-red-600",
                              )}
                              style={{
                                width: `${width}%`,
                              }}
                            />
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="hidden h-full min-h-0 overflow-y-auto whitespace-pre-wrap rounded-md border border-border p-1 sm:col-span-2 sm:flex">
        {dailyIntake.llmDescription}
      </div>
    </div>
  );
}
