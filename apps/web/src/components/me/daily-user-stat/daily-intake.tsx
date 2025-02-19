import { Bot } from "lucide-react";

import { cn } from "@/lib/utils";
import { type DailyMealsWithFoods, type DailyIntake } from "@/lib/queries";
import { useMealHoverStore } from "@/lib/zustand/meal-hover-store";
import { useFoodHoverStore } from "@/lib/zustand/food-hover-store";

import { LLMDescriptionAlertDialog } from "./llm-description-alert-dialog";
import { GenerateCalorieAlertDialog } from "./generate-calorie-alert-dialog";

interface DailyIntakeProps {
  dailyIntake: DailyIntake | null;
  dailyMealsWithFoods: DailyMealsWithFoods;
}

export function DailyIntake({
  dailyIntake,
  dailyMealsWithFoods,
}: DailyIntakeProps) {
  const hoveredMealId = useMealHoverStore((state) => state.hoveredMealId);
  const hoveredFoodId = useFoodHoverStore((state) => state.hoveredFoodId);

  const { goalCaloriesKcal, goalCarbohydratesG, goalFatG, goalProteinG } =
    dailyIntake ?? {};

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
    <div className={cn("min-h-[148px] pt-2 sm:grid sm:grid-cols-5 sm:gap-2")}>
      <div className="grid grid-cols-6 sm:col-span-3">
        <div className="col-span-2 col-start-2 flex items-center truncate">
          <div>현재/목표</div>
        </div>

        <div className="col-span-3 col-start-4 flex items-center justify-between">
          <GenerateCalorieAlertDialog>
            <Bot className="animate-bounce-slow" />
          </GenerateCalorieAlertDialog>

          {dailyIntake?.llmDescription && (
            <LLMDescriptionAlertDialog
              llmDescription={dailyIntake?.llmDescription}
            />
          )}
        </div>

        <div className="col-span-full space-y-1 pt-1">
          <div className="grid grid-cols-6">
            <div className="col-span-1 truncate">칼로리</div>

            <div className="col-span-2 flex flex-wrap items-center truncate">
              <span>{intakeTotalKCal ?? "0"}</span>
              <span>/</span>
              <span className="truncate">{goalCaloriesKcal ?? "?"}kcal</span>
            </div>

            <div
              className={cn(
                "col-span-3 h-5 overflow-hidden rounded-full",
                goalCaloriesKcal
                  ? "bg-muted"
                  : "border border-dashed border-border bg-background",
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

          <div className="grid grid-cols-6">
            <div className="col-span-1 truncate">탄수화물</div>

            <div className="col-span-2 flex flex-wrap items-center truncate">
              <span>{intakeTotalCarbohydratesG ?? "0"}</span>
              <span>/</span>
              <span>{goalCarbohydratesG ?? "?"}g</span>
            </div>

            <div
              className={cn(
                "col-span-3 h-5 overflow-hidden rounded-full",
                goalCaloriesKcal
                  ? "bg-muted"
                  : "border border-dashed border-border bg-background",
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
            <div className="col-span-1 truncate">단백질</div>

            <div className="col-span-2 flex flex-wrap items-center truncate">
              <span>{intakeTotalProteinG ?? "0"}</span>
              <span>/</span>
              <span>{goalProteinG ?? "?"}g</span>
            </div>

            <div
              className={cn(
                "col-span-3 h-5 overflow-hidden rounded-full",
                goalCaloriesKcal
                  ? "bg-muted"
                  : "border border-dashed border-border bg-background",
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
            <div className="col-span-1 truncate">지방</div>

            <div className="col-span-2 flex flex-wrap items-center truncate">
              <span>{intakeTotalFatG ?? "0"}</span>
              <span>/</span>
              <span>{goalFatG ?? "?"}g</span>
            </div>

            <div
              className={cn(
                "col-span-3 h-5 overflow-hidden rounded-full",
                goalCaloriesKcal
                  ? "bg-muted"
                  : "border border-dashed border-border bg-background",
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

      <div className="hidden h-[140px] overflow-y-auto whitespace-pre-wrap rounded-md border border-border p-1 text-muted-foreground sm:col-span-2 sm:flex">
        {dailyIntake?.llmDescription ? (
          dailyIntake.llmDescription
        ) : (
          <div className="flex w-full items-center justify-center text-center">
            AI를 사용해 오늘의 <br /> 목표 칼로리를 생성해보세요
          </div>
        )}
      </div>
    </div>
  );
}
