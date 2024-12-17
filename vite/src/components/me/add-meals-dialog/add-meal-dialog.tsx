import * as React from "react";
import { Clock, Plus, Utensils } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { DateTime } from "luxon";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";
import { useRouter } from "@tanstack/react-router";
import { zodResolver } from "@hookform/resolvers/zod";

import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";
import { type Database } from "@/lib/types/database.types";
import {
  insertMealSchema,
  insertMealWithoutPicSchema,
} from "@/lib/schemas/meal.schema";
import { AddFoodDialog } from "./add-food-dialog";
import { SingleFood } from "./single-food";
import { TimePicker } from "@/components/time-picker";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface AddMealDialogProps {
  className?: string;
  profile: Database["public"]["Tables"]["profiles"]["Row"];
}

export function AddMealDialog({ className, profile }: AddMealDialogProps) {
  const currentLocalTime = DateTime.now().setZone(profile.timezone);
  const localDate = currentLocalTime.toFormat("yyyy-MM-dd");

  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [selectedHour, setSelectedHour] = React.useState(
    currentLocalTime.hour.toString().padStart(2, "0"),
  );
  const [selectedMinute, setSelectedMinute] = React.useState(
    currentLocalTime.minute.toString().padStart(2, "0"),
  );

  const [isTimePickerOpen, setIsTimePickerOpen] = React.useState(false);

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

  function handleNowClick() {
    const currentLocalTime = DateTime.now().setZone(profile.timezone);
    setSelectedHour(currentLocalTime.hour.toString().padStart(2, "0"));
    setSelectedMinute(currentLocalTime.minute.toString().padStart(2, "0"));
    setIsTimePickerOpen(false);
  }

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
          pic_url: fileUUID,
          pic_file: undefined,
        };
      }),
    );

    values.foods = foodsWithPic;

    const utcMealTime = DateTime.fromFormat(
      values.meal_time,
      "yyyy-MM-dd HH:mm:ss",
      {
        zone: profile.timezone,
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
      toast.error(
        profile.language === "ko"
          ? "모든 정보를 입력해주세요."
          : "Please fill in all information.",
      );
      // TODO: proper error handle
      return;
    }

    const res = await supabase.rpc("add_meals", {
      body: valuesWithoutPic.data,
    });

    if (res.error) {
      // TODO: proper error handle
      return;
    }

    router.invalidate();
    mealForm.reset();
    toast.success(
      profile.language === "ko" ? "식단 추가 완료" : "Meal added successfully",
    );
    setIsDialogOpen(false);
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

  React.useEffect(() => {
    mealForm.setValue(
      "meal_time",
      `${localDate} ${selectedHour}:${selectedMinute}:00`,
    );
  }, [selectedHour, selectedMinute]);

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
        className="flex max-h-[calc(100dvh-80px)] w-full max-w-xl flex-col gap-4 overflow-y-auto"
      >
        <DialogTitle className="flex items-center gap-2">
          <Utensils />
          <div className="text-2xl">{localDate}</div>
        </DialogTitle>

        <div className="grid grid-cols-1 gap-2 xs:grid-cols-2">
          <div className="flex cursor-pointer items-center gap-1 rounded-lg bg-muted/50 px-3 py-1">
            <span className="peer flex items-center gap-1 whitespace-nowrap text-muted-foreground">
              {profile.language === "ko" ? "식사 시간" : "Meal Time"}
            </span>

            <TimePicker
              userLanguage={profile.language}
              selectedHour={selectedHour}
              selectedMinute={selectedMinute}
              setSelectedHour={setSelectedHour}
              setSelectedMinute={setSelectedMinute}
              isTimePickerOpen={isTimePickerOpen}
              setIsTimePickerOpen={setIsTimePickerOpen}
            />

            <button
              className="rounded-md p-1 text-muted-foreground hover:bg-background/80"
              onClick={handleNowClick}
            >
              <Clock className="h-4 w-4 text-gray-400" />
            </button>
          </div>

          <InfoField
            label={profile.language === "ko" ? "총 칼로리" : "Total Calories"}
            value={mealForm.watch("total_calories").toFixed().toString()}
          />

          <InfoField
            label={profile.language === "ko" ? "총 탄수화물" : "Total Carbs"}
            value={mealForm.watch("total_carbohydrate").toFixed().toString()}
          />

          <InfoField
            label={profile.language === "ko" ? "총 지방" : "Total Fat"}
            value={mealForm.watch("total_fat").toFixed().toString()}
          />

          <InfoField
            label={profile.language === "ko" ? "총 단백질" : "Total Protein"}
            value={mealForm.watch("total_protein").toFixed().toString()}
          />
        </div>

        <div className="flex flex-1 flex-col gap-4 rounded-md border p-4">
          <AddFoodDialog mealForm={mealForm} profile={profile} />

          <div className="flex max-h-[300px] flex-col gap-4 overflow-y-auto">
            {mealForm.getValues("foods").length > 0 &&
              mealForm.getValues("foods").map((foodItem) => {
                return (
                  <SingleFood
                    key={foodItem.food_name}
                    food={foodItem}
                    mealForm={mealForm}
                    profile={profile}
                  />
                );
              })}
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button onClick={mealForm.handleSubmit(mealSubmitHandler)}>
            {profile.language === "ko" ? "추가" : "Add"}
          </Button>
          <Button onClick={() => setIsDialogOpen(false)}>
            {profile.language === "ko" ? "취소" : "Cancel"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export interface S3PresignRequest {
  fileUUID: string;
  fileType: string;
}

function InfoField({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center gap-1 rounded-lg bg-muted/50 px-3 py-1">
      <span className="min-w-20 whitespace-nowrap text-muted-foreground">
        {label}
      </span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
