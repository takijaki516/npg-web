import { Bot, Loader2 } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { cn } from "@/lib/utils";
import { honoClient } from "@/lib/hono";
import type { DailyMealsWithFoods, DailyIntake, Profile } from "@/lib/queries";
import { useMealHoverStore } from "@/lib/zustand/meal-hover-store";
import { useFoodHoverStore } from "@/lib/zustand/food-hover-store";

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
    onMutate: async () => {
      // TODO: snapshot previous intake
    },
    onError: () => {
      // TODO: error handling
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["dailyIntake"],
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
    <div className={cn("grid auto-rows-min grid-cols-5 gap-2 pt-2")}>
      <div className="col-span-3 grid h-fit grid-cols-7">
        <div className="col-span-2 col-start-2 flex items-center">
          <div>cur/goal</div>
        </div>

        <div className="col-span-1 col-start-4 flex h-fit cursor-pointer items-center">
          <div className="rounded-full p-2 hover:bg-muted">
            {mutateIntake.isPending ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              <Bot onClick={() => mutateIntake.mutate()} size={20} />
            )}
          </div>
        </div>

        <div className="col-span-full space-y-1.5">
          <div className="grid grid-cols-7 items-center gap-2">
            <div className="col-span-1 w-16 whitespace-nowrap">칼로리</div>

            <div className="w-26 col-span-2 flex gap-1">
              <span>{intakeTotalKCal ?? "0"}</span>
              <span>/</span>
              <span>{goalCaloriesKcal ?? "?"}</span>
              <span>Kcal</span>
            </div>

            {goalCaloriesKcal && (
              <div
                className={cn(
                  "col-span-4 h-5 flex-1 overflow-hidden rounded-full bg-muted",
                )}
              >
                <div className="flex h-full w-full items-center">
                  {dailyMealsWithFoods.map((meal) => {
                    const width =
                      (meal.totalCaloriesKcal / goalCaloriesKcal) * 100;

                    const isMealHovered = hoveredMealId === meal.id;

                    return (
                      <div
                        key={meal.id}
                        className={cn("flex h-full bg-red-500")}
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
                                "z-10 h-full bg-green-500",
                                isMealHovered && "bg-red-400",
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
              </div>
            )}
          </div>

          <div className="grid grid-cols-7 items-center gap-2">
            <div className="col-span-1 w-16 whitespace-nowrap">탄수화물</div>

            <div className="w-26 col-span-2 flex gap-1">
              <span>{intakeTotalCarbohydratesG ?? "0"}</span>
              <span>/</span>
              <span>{goalCarbohydratesG ?? "?"}</span>
              <span>g</span>
            </div>

            {goalCarbohydratesG && (
              <div
                className={cn(
                  "col-span-4 h-5 flex-1 overflow-hidden rounded-full bg-muted",
                )}
              >
                <div className="flex h-full w-full items-center">
                  {dailyMealsWithFoods.map((meal) => {
                    const width =
                      (meal.totalCarbohydratesG / goalCarbohydratesG) * 100;

                    return (
                      <div
                        key={meal.id}
                        className={cn("flex h-full bg-green-500")}
                        style={{
                          width: `${width}%`,
                        }}
                      >
                        {meal.foods.map((food) => {
                          const width =
                            (food.foodCarbohydratesG /
                              meal.totalCarbohydratesG) *
                            100;

                          return (
                            <div
                              key={food.id}
                              className="h-full bg-green-500"
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
              </div>
            )}
          </div>

          <div className="grid grid-cols-7 items-center gap-2">
            <div className="col-span-1 w-16 whitespace-nowrap">단백질</div>

            <div className="w-26 col-span-2 flex gap-1">
              <span>{intakeTotalProteinG ?? "0"}</span>
              <span>/</span>
              <span>{goalProteinG ?? "?"}</span>
              <span>g</span>
            </div>

            {goalProteinG && (
              <div
                className={cn(
                  "col-span-4 h-5 flex-1 overflow-hidden rounded-full bg-muted",
                )}
              >
                <div className="flex h-full w-full items-center">
                  {dailyMealsWithFoods.map((meal) => {
                    const width = (meal.totalProteinG / goalProteinG) * 100;

                    return (
                      <div
                        key={meal.id}
                        className={cn("flex h-full bg-green-500")}
                        style={{
                          width: `${width}%`,
                        }}
                      >
                        {meal.foods.map((food) => {
                          const width =
                            (food.foodProteinG / meal.totalProteinG) * 100;

                          return (
                            <div
                              key={food.id}
                              className="h-full bg-green-500"
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
              </div>
            )}
          </div>

          <div className="grid grid-cols-7 items-center gap-2">
            <div className="col-span-1 w-16 whitespace-nowrap">지방</div>

            <div className="w-26 col-span-2 flex gap-1">
              <span>{intakeTotalFatG ?? "0"}</span>
              <span>/</span>
              <span>{goalFatG ?? "?"}</span>
              <span>g</span>
            </div>

            {goalFatG && (
              <div
                className={cn(
                  "col-span-4 h-5 flex-1 overflow-hidden rounded-full bg-muted",
                )}
              >
                <div className="flex h-full w-full items-center">
                  {dailyMealsWithFoods.map((meal) => {
                    const width = (meal.totalFatG / goalFatG) * 100;

                    return (
                      <div
                        key={meal.id}
                        className={cn("flex h-full bg-green-500")}
                        style={{
                          width: `${width}%`,
                        }}
                      >
                        {meal.foods.map((food) => {
                          const width = (food.foodFatG / meal.totalFatG) * 100;

                          return (
                            <div
                              key={food.id}
                              className="h-full bg-green-500"
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
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="col-span-2 max-h-fit min-h-0 overflow-y-auto whitespace-pre-wrap rounded-md border border-border p-1">
        {dailyIntake.llmDescription}
      </div>
    </div>
  );
}
