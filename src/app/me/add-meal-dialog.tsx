"use client";

import * as React from "react";
import { Plus, Utensils } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { DateTime } from "luxon";
import { v4 as uuidv4 } from "uuid";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { type Database } from "@/lib/types/database.types";
import { AddFoodDialog } from "./add-food-dialog";
import {
  insertMealSchema,
  insertMealWithoutPicSchema,
} from "@/lib/schema/meal.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SingleFood } from "./single-food";
import { supabaseClient } from "@/supabase-utils/client";

interface AddMealDialogProps {
  className?: string;
  profile: Database["public"]["Tables"]["profiles"]["Row"];
  localDate: string;
}

export function AddMealDialog({
  className,
  profile,
  localDate,
}: AddMealDialogProps) {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const currentLocalTime = DateTime.now();

  const mealForm = useForm<z.infer<typeof insertMealSchema>>({
    resolver: zodResolver(insertMealSchema),
    defaultValues: {
      user_email: profile.user_email,
      user_id: profile.user_id!,

      meal_time: currentLocalTime.toFormat("yyyy-MM-dd HH:mm:ss"),
      total_calories: 0,
      total_carbohydrate: 0,
      total_fat: 0,
      total_protein: 0,
      foods: [],
    },
  });

  async function mealSubmitHandler(values: z.infer<typeof insertMealSchema>) {
    // loop through foods and add image

    const foodsWithPic = await Promise.all(
      values.foods.map(async (food) => {
        if (!food.pic_file) {
          return {
            ...food,
          };
        }

        const fileUUID = uuidv4();
        const fileType = food.pic_file.type;

        const res = await fetch("/api/s3-presign", {
          method: "POST",
          body: JSON.stringify({
            fileUUID,
            fileType,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const presignedUrl = await res.json();

        await fetch(presignedUrl.url, {
          method: "PUT",
          body: food.pic_file,
          headers: {
            "Content-Type": food.pic_file.type,
          },
        });

        return {
          ...food,
          pic_url: `https://${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/${fileUUID}`,
          pic_file: undefined,
        };
      }),
    );

    values.foods = foodsWithPic;

    const utcMealTime = DateTime.fromFormat(
      values.meal_time,
      "yyyy-MM-dd HH:mm:ss",
      {
        zone: "Asia/Seoul",
      },
    )
      .toUTC()
      .toSQL();

    if (!utcMealTime) {
      // TODO: proper error handle
      return;
    }

    values.meal_time = utcMealTime;

    const valuesWithoutPic = insertMealWithoutPicSchema.safeParse(values);

    if (!valuesWithoutPic.success) {
      // TODO: proper error handle
      return;
    }

    console.log(
      "🚀 ~ file: add-meal-dialog.tsx:138 ~ mealSubmitHandler ~ valuesWithoutPic.data;:",
      valuesWithoutPic.data,
    );

    // add to supabase
    const supabase = supabaseClient<Database>();
    const res = await supabase.rpc("add_meals", {
      body: valuesWithoutPic.data,
    });

    console.log(res);
  }

  React.useEffect(() => {
    const foodsArr = mealForm.watch("foods");
    const totalCalories = foodsArr.reduce((acc, food) => {
      return acc + food.calories;
    }, 0);
    const totalCarbohydrate = foodsArr.reduce((acc, food) => {
      return acc + food.carbohydrate;
    }, 0);
    const totalFat = foodsArr.reduce((acc, food) => {
      return acc + food.fat;
    }, 0);
    const totalProtein = foodsArr.reduce((acc, food) => {
      return acc + food.protein;
    }, 0);

    mealForm.setValue("total_calories", totalCalories);
    mealForm.setValue("total_carbohydrate", totalCarbohydrate);
    mealForm.setValue("total_fat", totalFat);
    mealForm.setValue("total_protein", totalProtein);
  }, [mealForm.watch("foods")]);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant={"outline"} className={cn(className)}>
          <Plus className="h-9 w-9" />
        </Button>
      </DialogTrigger>

      <DialogContent
        onPointerDownOutside={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
        className="flex max-h-dvh w-full max-w-xl flex-col gap-4 overflow-y-auto"
      >
        <DialogTitle className="flex items-center gap-2">
          <Utensils />
          <div className="text-2xl">{localDate}</div>
        </DialogTitle>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <div className="flex items-center gap-2">
            <Label className="w-20 whitespace-nowrap text-center">
              식사 시간
            </Label>
            <Input type="text" {...mealForm.register("meal_time")} />
          </div>

          <div className="flex items-center gap-2">
            <span className="w-20 whitespace-nowrap text-center">
              총 칼로리
            </span>
            <div>{mealForm.watch("total_calories")}</div>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-20 whitespace-nowrap text-center">
              총 탄수화물
            </span>
            <div>{mealForm.watch("total_carbohydrate")}</div>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-20 whitespace-nowrap text-center">총 지방</span>
            <div>{mealForm.watch("total_fat")}</div>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-20 whitespace-nowrap text-center">
              총 단백질
            </span>
            <div>{mealForm.watch("total_protein")}</div>
          </div>
        </div>

        <div className="flex flex-col gap-4 rounded-md border p-4">
          <AddFoodDialog mealForm={mealForm} />

          <div className="flex max-h-[300px] flex-col gap-4 overflow-y-auto pr-4">
            {mealForm.getValues("foods").length > 0 &&
              mealForm.getValues("foods").map((foodItem) => {
                return (
                  <SingleFood
                    key={foodItem.food_name}
                    food={foodItem}
                    mealForm={mealForm}
                  />
                );
              })}
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button onClick={mealForm.handleSubmit(mealSubmitHandler)}>
            추가
          </Button>
          <Button onClick={() => setIsDialogOpen(false)}>취소</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export interface S3PresignRequest {
  fileUUID: string;
  fileType: string;
}
