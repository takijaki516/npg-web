import * as React from "react";
import { Loader2, Settings, Utensils } from "lucide-react";
import { z } from "zod";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { insertMealSchema } from "@repo/shared-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouteContext } from "@tanstack/react-router";
import { toast } from "sonner";

import {
  GET_DAILY_MEALS_WITH_FOODS_QUERY_KEY,
  updateMeal,
  type DailyMealsWithFoods,
} from "@/lib/queries";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { InfoField } from "@/components/info-field";
import { TimePicker } from "@/components/time-picker";
import { SingleFood } from "./single-food";
import { AddFoodDialog } from "./add-food-dialog";

interface ModifyMealDialogProps {
  dailyMealWithFood: DailyMealsWithFoods[number];
}

export function ModifyMealDialog({ dailyMealWithFood }: ModifyMealDialogProps) {
  const queryClient = useQueryClient();
  const { profile } = useRouteContext({
    from: "/(user)/_layout",
  });
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const modifyMealForm = useForm<z.infer<typeof insertMealSchema>>({
    resolver: zodResolver(insertMealSchema),
    defaultValues: {
      mealId: dailyMealWithFood.id,
      localMealDateTime: dailyMealWithFood.mealTime,
      totalCaloriesKcal: dailyMealWithFood.totalCaloriesKcal,
      totalCarbohydratesG: dailyMealWithFood.totalCarbohydratesG,
      totalProteinG: dailyMealWithFood.totalProteinG,
      totalFatG: dailyMealWithFood.totalFatG,
      foods: dailyMealWithFood.foods.map((food) => ({
        foodName: food.foodName,
        foodPic: food.foodPic,
        foodCaloriesKcal: food.foodCaloriesKcal,
        foodCarbohydratesG: food.foodCarbohydratesG,
        foodProteinG: food.foodProteinG,
        foodFatG: food.foodFatG,
      })),
    },
  });

  const updateMealMutation = useMutation({
    mutationFn: updateMeal,
    onSuccess: async (data) => {
      setIsDialogOpen(false);
      modifyMealForm.reset();
      toast.success("식사 수정에 성공했습니다.");

      await queryClient.invalidateQueries({
        queryKey: [
          GET_DAILY_MEALS_WITH_FOODS_QUERY_KEY,
          data.mealTime.split(" ")[0],
        ],
      });
    },
    onError: () => {
      setIsDialogOpen(false);
      modifyMealForm.reset();

      toast.error("식사 수정에 실패했습니다. 다시 시도해주세요.");
    },
  });

  React.useEffect(() => {
    const foodsArr = modifyMealForm.getValues("foods");

    const totalCalories = foodsArr.reduce((acc, food) => {
      return acc + food.foodCaloriesKcal;
    }, 0);
    const totalCarbohydrate = foodsArr.reduce((acc, food) => {
      return acc + food.foodCarbohydratesG;
    }, 0);
    const totalFat = foodsArr.reduce((acc, food) => {
      return acc + food.foodFatG;
    }, 0);
    const totalProtein = foodsArr.reduce((acc, food) => {
      return acc + food.foodProteinG;
    }, 0);

    modifyMealForm.setValue("totalCaloriesKcal", totalCalories);
    modifyMealForm.setValue("totalCarbohydratesG", totalCarbohydrate);
    modifyMealForm.setValue("totalFatG", totalFat);
    modifyMealForm.setValue("totalProteinG", totalProtein);
  }, [modifyMealForm, modifyMealForm.watch("foods")]);

  const foodsArrForm = useFieldArray({
    control: modifyMealForm.control,
    name: "foods",
  });

  const handleRemoveFood = React.useCallback(
    (foodIdx: number) => {
      foodsArrForm.remove(foodIdx);
    },
    [foodsArrForm],
  );

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(v) => {
        if (!v) {
          modifyMealForm.reset();
        }
        setIsDialogOpen(v);
      }}
    >
      <DialogTrigger
        className="rounded-md p-1 transition-colors hover:bg-muted"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsDialogOpen(true);
        }}
      >
        <Settings />
      </DialogTrigger>

      <DialogContent
        onPointerDownOutside={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
        className="dialog-content"
      >
        <DialogTitle className="flex items-center gap-2">
          <Utensils />
          <div className="text-2xl">
            {dailyMealWithFood.mealTime.split(" ")[0]}
          </div>
        </DialogTitle>

        <div className="flex flex-col gap-2">
          <div className="flex w-fit cursor-pointer items-center gap-1 rounded-lg bg-muted/50 px-3 py-1">
            <span className="flex items-center gap-1 whitespace-nowrap text-muted-foreground">
              식사 시간
            </span>

            <Controller
              name="localMealDateTime"
              control={modifyMealForm.control}
              render={({ field }) => {
                return (
                  <TimePicker
                    value={field.value}
                    setValue={field.onChange}
                    timezone={profile.timezone}
                  />
                );
              }}
            />
          </div>

          <div className="grid w-fit grid-cols-2 gap-1">
            <InfoField
              label={"총 칼로리"}
              value={modifyMealForm.watch("totalCaloriesKcal").toString()}
            />
            <InfoField
              label={"총 탄수화물"}
              value={modifyMealForm.watch("totalCarbohydratesG").toString()}
            />
            <InfoField
              label={"총 지방"}
              value={modifyMealForm.watch("totalFatG").toString()}
            />
            <InfoField
              label={"총 단백질"}
              value={modifyMealForm.watch("totalProteinG").toString()}
            />
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-4 rounded-md border p-4">
          <AddFoodDialog mealForm={modifyMealForm} />

          <div className="flex max-h-[300px] flex-col gap-4 overflow-y-auto">
            {modifyMealForm.watch("foods").map((foodItem, foodIdx) => {
              return (
                <SingleFood
                  key={foodIdx}
                  food={foodItem}
                  removeFood={() => {
                    handleRemoveFood(foodIdx);
                  }}
                />
              );
            })}
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="secondary" onClick={() => setIsDialogOpen(false)}>
            취소
          </Button>
          <Button
            disabled={updateMealMutation.isPending}
            onClick={modifyMealForm.handleSubmit((data) => {
              updateMealMutation.mutate(data);
            })}
          >
            {updateMealMutation.isPending ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              "수정"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
