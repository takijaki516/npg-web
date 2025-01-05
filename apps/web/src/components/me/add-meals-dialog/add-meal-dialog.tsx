import * as React from "react";
import { Loader2, Plus, Utensils } from "lucide-react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { insertMealSchema } from "@repo/shared-schema";

import {
  GET_DAILY_MEALS_WITH_FOODS_QUERY_KEY,
  type Profile,
} from "@/lib/queries";
import { honoClient } from "@/lib/hono";
import { AddFoodDialog } from "./add-food-dialog";
import { SingleFood } from "./single-food";
import { TimePicker } from "@/components/time-picker";
import { InfoField } from "@/components/info-field";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface AddMealDialogProps {
  profile: Profile;
  currentLocalDateTime: string;
}

export function AddMealDialog({
  profile,
  currentLocalDateTime,
}: AddMealDialogProps) {
  const justDate = currentLocalDateTime.split(" ")[0];

  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const mealForm = useForm<z.infer<typeof insertMealSchema>>({
    resolver: zodResolver(insertMealSchema),
    defaultValues: {
      profileEmail: profile.email,
      localMealDateTime: currentLocalDateTime,
      timezone: profile.timezone,
      totalCaloriesKcal: 0,
      totalCarbohydratesG: 0,
      totalProteinG: 0,
      totalFatG: 0,
      foods: [],
    },
  });

  // TODO: add error handling
  const mutateMeal = useMutation({
    mutationFn: mealSubmitHandler,
    onMutate: async () => {
      console.log(mealForm.watch());
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: [GET_DAILY_MEALS_WITH_FOODS_QUERY_KEY],
      });

      setIsDialogOpen(false);
      mealForm.reset();
    },
  });

  async function mealSubmitHandler(values: z.infer<typeof insertMealSchema>) {
    // loop through foods and add image
    const foodsWithPic = await Promise.all(
      values.foods.map(async (food) => {
        if (!food.foodPicFile) {
          return {
            ...food,
          };
        }

        const fileUUID = uuidv4();
        const fileType = food.foodPicFile.type;

        const presignedRes = await honoClient.presign.$post({
          json: {
            key: fileUUID,
            action: "PUT",
            fileType,
          },
        });

        // TODO: proper error handle
        if (!presignedRes.ok) {
          throw new Error("failed to presign");
        }

        const presignedBody = await presignedRes.json();

        // TODO: proper error handle
        if (!presignedBody.url) {
          throw new Error("failed to presign");
        }

        await fetch(presignedBody.url, {
          method: "PUT",
          body: food.foodPicFile,
          headers: {
            "Content-Type": fileType,
          },
        });

        return {
          ...food,
          foodPic: presignedBody.key,
          foodPicFile: undefined,
        };
      }),
    );

    values.foods = foodsWithPic;

    const res = await honoClient.meals.$post({
      json: values,
    });

    if (!res.ok) {
      // TODO: proper error handle
      throw new Error("failed to add meal");
    }
  }

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

  const foodsArrForm = useFieldArray({
    control: mealForm.control,
    name: "foods",
  });

  function handleRemoveFood(foodIdx: number) {
    foodsArrForm.remove(foodIdx);
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger className="rounded-full p-1 hover:bg-muted">
        <Plus />
      </DialogTrigger>

      <DialogContent
        onPointerDownOutside={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
        className="flex max-h-[calc(100dvh-80px)] w-full max-w-xl flex-col gap-4 overflow-y-auto"
      >
        <DialogTitle className="flex items-center gap-2">
          <Utensils />
          <div className="text-2xl">{justDate}</div>
        </DialogTitle>

        <div className="flex flex-col gap-2">
          <div className="flex w-fit cursor-pointer items-center gap-1 rounded-lg bg-muted/50 px-3 py-1">
            <span className="flex items-center gap-1 whitespace-nowrap text-muted-foreground">
              식사 시간
            </span>

            <Controller
              name="localMealDateTime"
              control={mealForm.control}
              render={({ field }) => (
                <TimePicker
                  value={field.value}
                  setValue={field.onChange}
                  userLanguage={profile.language}
                  timezone={profile.timezone}
                />
              )}
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

        <div className="flex flex-1 flex-col gap-4 rounded-md border p-4">
          <AddFoodDialog mealForm={mealForm} profile={profile} />

          <div className="flex max-h-[300px] flex-col gap-4 overflow-y-auto">
            {mealForm.watch("foods").map((foodItem, foodIdx) => {
              return (
                <SingleFood
                  key={foodIdx}
                  food={foodItem}
                  foodIdx={foodIdx}
                  removeFood={handleRemoveFood}
                />
              );
            })}
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button
            disabled={mutateMeal.isPending}
            onClick={mealForm.handleSubmit((data) => {
              mutateMeal.mutate(data);
            })}
          >
            {mutateMeal.isPending ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              "추가"
            )}
          </Button>
          <Button onClick={() => setIsDialogOpen(false)}>취소</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
