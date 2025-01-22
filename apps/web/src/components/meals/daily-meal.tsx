import * as React from "react";
import { Clock, CookingPot, Loader2, ScanSearch } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";
import {
  GET_DAILY_MEALS_WITH_FOODS_QUERY_KEY,
  deleteMealMutationFn,
  type DailyMealsWithFoods,
} from "@/lib/queries";
import { useMealHoverStore } from "@/lib/zustand/meal-hover-store";
import { useFoodHoverStore } from "@/lib/zustand/food-hover-store";
import { cn } from "@/lib/utils";
import { DeleteButton } from "@/components/delete-button";
import { DailyFood } from "./daily-food";
import { ModifyMealDialog } from "./modify-meal-dialog";
import { InfoField } from "@/components/info-field";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface DailyMealProps {
  dailyMealData: DailyMealsWithFoods[number];
}

export function DailyMeal({ dailyMealData }: DailyMealProps) {
  const dailyFoods = dailyMealData.foods.slice(0, 3);

  const mealDate = dailyMealData.mealTime.split(" ")[1];
  const [hh, mm] = mealDate.split(":");

  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const setHoveredMealId = useMealHoverStore((state) => state.setHoveredMealId);
  const setHoveredFoodId = useFoodHoverStore((state) => state.setHoveredFoodId);

  const queryClient = useQueryClient();

  const deleteMealMutation = useMutation({
    mutationFn: async (id: string) => await deleteMealMutationFn({ id }),
    onError: () => {
      toast.error("식단 삭제에 실패했어요. 다시 시도해주세요.");
    },
    onSuccess: async () => {
      toast.success("식단 삭제에 성공했어요.");
      await queryClient.invalidateQueries({
        queryKey: [
          GET_DAILY_MEALS_WITH_FOODS_QUERY_KEY,
          dailyMealData.mealTime.split(" ")[0],
        ],
      });
    },
  });

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <div
        className={cn(
          "relative flex flex-col gap-2 overflow-y-auto rounded-md border border-border p-2 transition-colors hover:bg-muted/40",
        )}
        onMouseEnter={() => setHoveredMealId(dailyMealData.id)}
        onMouseLeave={() => setHoveredMealId(null)}
      >
        {deleteMealMutation.isPending && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted/90 p-4">
            <Loader2 className="animate-spin text-primary" size={30} />
          </div>
        )}

        <div className="absolute right-2 top-2">
          <DeleteButton
            dialog={true}
            deleteFunction={() => {
              deleteMealMutation.mutate(dailyMealData.id);
            }}
          />
        </div>

        <div className="flex flex-1 flex-col gap-2">
          <div className="flex items-center gap-1">
            <div className="flex items-center gap-1">
              <Clock className="size-5" />
              <span>{`${hh}:${mm}`}</span>
            </div>

            <DialogTrigger
              className="rounded-md p-1 transition-colors hover:bg-muted"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsDialogOpen(true);
              }}
            >
              <ScanSearch />
            </DialogTrigger>

            <ModifyMealDialog dailyMealWithFood={dailyMealData} />
          </div>

          <div className="flex h-[140px] gap-4">
            <div className="flex h-full w-fit flex-col gap-1">
              <InfoField
                label={"총칼로리"}
                value={dailyMealData.totalCaloriesKcal.toString()}
                className=""
              />
              <InfoField
                label={"총탄수화물"}
                value={dailyMealData.totalCarbohydratesG.toString()}
              />
              <InfoField
                label={"총단백질"}
                value={dailyMealData.totalProteinG.toString()}
              />
              <InfoField
                label={"총지방"}
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
                        src={`${import.meta.env.VITE_R2_URL}/width=110,quality=70/${food.foodPic}`}
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
      </div>

      <DialogContent className="flex max-h-[calc(100dvh-80px)] w-full max-w-xl flex-col gap-2 overflow-y-auto">
        <DialogTitle>음식들</DialogTitle>

        {dailyMealData.foods.map((eachFood) => {
          return <DailyFood key={eachFood.id} food={eachFood} />;
        })}
      </DialogContent>
    </Dialog>
  );
}
