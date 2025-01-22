import * as React from "react";
import { Loader2, Plus, Utensils } from "lucide-react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useRouteContext } from "@tanstack/react-router";
import { insertMealSchema } from "@repo/shared-schema";
import { toast } from "sonner";

import { useDateTimeStore } from "@/lib/zustand/time-store";
import {
  GET_DAILY_MEALS_WITH_FOODS_QUERY_KEY,
  insertMeal,
} from "@/lib/queries";
import { AddFoodDialog } from "./add-food-dialog";
import { SingleFood } from "./single-food";
import { TimePicker } from "@/components/time-picker";
import { InfoField } from "@/components/info-field";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function AddMealDialog() {
  const currentLocalDateTime = useDateTimeStore(
    (state) => state.currentDateTime,
  );

  const queryClient = useQueryClient();
  const { profile } = useRouteContext({
    from: "/(user)/_layout",
  });
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const mealForm = useForm<z.infer<typeof insertMealSchema>>({
    resolver: zodResolver(insertMealSchema),
    defaultValues: {
      localMealDateTime: currentLocalDateTime,
      totalCaloriesKcal: 0,
      totalCarbohydratesG: 0,
      totalProteinG: 0,
      totalFatG: 0,
      foods: [],
    },
  });

  const addMealMutation = useMutation({
    mutationFn: async (data: z.infer<typeof insertMealSchema>) =>
      await insertMeal(data),
    onSuccess: async (data) => {
      setIsDialogOpen(false);
      mealForm.reset();
      toast.success("식사 추가에 성공했습니다.");

      await queryClient.invalidateQueries({
        queryKey: [
          GET_DAILY_MEALS_WITH_FOODS_QUERY_KEY,
          data.mealTime.split(" ")[0],
        ],
      });
    },
    onError: () => {
      setIsDialogOpen(false);
      mealForm.reset();

      toast.error("식사 추가에 실패했습니다. 다시 시도해주세요.");
    },
  });

  React.useEffect(() => {
    const foodsArr = mealForm.getValues("foods");

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

    mealForm.setValue("totalCaloriesKcal", totalCalories);
    mealForm.setValue("totalCarbohydratesG", totalCarbohydrate);
    mealForm.setValue("totalFatG", totalFat);
    mealForm.setValue("totalProteinG", totalProtein);
  }, [mealForm, mealForm.watch("foods")]);

  React.useEffect(() => {
    mealForm.reset({
      localMealDateTime: currentLocalDateTime,
      totalCaloriesKcal: 0,
      totalCarbohydratesG: 0,
      totalProteinG: 0,
      totalFatG: 0,
      foods: [],
    });
  }, [mealForm, currentLocalDateTime]);

  const foodsArrForm = useFieldArray({
    control: mealForm.control,
    name: "foods",
  });

  function handleRemoveFood(foodIdx: number) {
    foodsArrForm.remove(foodIdx);
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger className="rounded-md p-1 transition-colors hover:bg-muted">
        <Plus />
      </DialogTrigger>

      <DialogContent
        onPointerDownOutside={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
        className="dialog-content"
      >
        <DialogTitle className="flex items-center gap-2">
          <Utensils size={20} />
          <div className="text-lg xs:text-2xl">
            {currentLocalDateTime.split(" ")[0]}
          </div>
        </DialogTitle>
        <DialogDescription className="sr-only">
          Add meal dialog
        </DialogDescription>

        <div className="flex flex-col gap-1">
          <div className="flex w-[180px] items-center justify-between gap-2 rounded-md bg-muted/50 px-2 py-1">
            <span className="whitespace-nowrap text-muted-foreground">
              식사 시간
            </span>

            <Controller
              name="localMealDateTime"
              control={mealForm.control}
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
              value={mealForm.watch("totalCaloriesKcal").toString()}
            />
            <InfoField
              label={"총 탄수화물"}
              value={mealForm.watch("totalCarbohydratesG").toString()}
            />
            <InfoField
              label={"총 지방"}
              value={mealForm.watch("totalFatG").toString()}
            />
            <InfoField
              label={"총 단백질"}
              value={mealForm.watch("totalProteinG").toString()}
            />
          </div>
        </div>

        <AddFoodDialog mealForm={mealForm} />

        <div className="flex flex-1 flex-col gap-2">
          {mealForm.watch("foods").map((foodItem, foodIdx) => {
            return (
              <SingleFood
                key={foodIdx}
                food={foodItem}
                removeFood={() => handleRemoveFood(foodIdx)}
              />
            );
          })}
        </div>

        <div className="flex justify-end gap-2">
          <Button variant={"secondary"} onClick={() => setIsDialogOpen(false)}>
            취소
          </Button>

          <Button
            disabled={addMealMutation.isPending}
            onClick={mealForm.handleSubmit((data) => {
              addMealMutation.mutate(data);
            })}
          >
            {addMealMutation.isPending ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              "추가"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
