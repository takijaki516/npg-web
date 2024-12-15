"use client";

import * as React from "react";
import { RotateCw, Plus, ImageUp, X, Bot, Check } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { useFieldArray, type UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { insertMealSchema } from "@/lib/schema/meal.schema";
import { llmCalorieResponseSchema } from "@/app/api/calories/route";
import { type Database } from "@/lib/types/database.types";

interface AddFoodDialogProps {
  mealForm: UseFormReturn<z.infer<typeof insertMealSchema>>;
  profile: Database["public"]["Tables"]["profiles"]["Row"];
}

export function AddFoodDialog({ mealForm, profile }: AddFoodDialogProps) {
  const [isFoodDialogOpen, setIsFoodDialogOpen] = React.useState(false);
  const [foodImageFile, setFoodImageFile] = React.useState<File>();
  const [isLLMLoading, setIsLLMLoading] = React.useState(false);

  //
  const [foodName, setFoodName] = React.useState("");
  const [foodCalories, setFoodCalories] = React.useState(0);
  const [foodCarbohydrates, setFoodCarbohydrates] = React.useState(0);
  const [foodProteins, setFoodProteins] = React.useState(0);
  const [foodFats, setFoodFats] = React.useState(0);

  const onDrop = React.useCallback((acceptedFiles: File[]) => {
    setFoodImageFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles: 1,
    maxSize: 1024 * 1024 * 10,
    multiple: false,
  });

  const foodsArrForm = useFieldArray({
    control: mealForm.control,
    name: "foods",
  });

  function handleAddFood() {
    if (
      !foodName ||
      !foodCalories ||
      !foodCarbohydrates ||
      !foodProteins ||
      !foodFats
    ) {
      toast.error(
        profile.language === "ko"
          ? "모든 정보를 입력해주세요. AI를 활용해 보세요 편리하게 추가할 수 있어요"
          : "Please fill in all information. You can easily add it using AI",
      );
      return;
    }

    foodsArrForm.append({
      food_name: foodName,
      calories: foodCalories,
      carbohydrate: foodCarbohydrates,
      protein: foodProteins,
      fat: foodFats,
      pic_file: foodImageFile,
    });

    // reset
    setFoodName("");
    setFoodCalories(0);
    setFoodCarbohydrates(0);
    setFoodProteins(0);
    setFoodFats(0);
    setFoodImageFile(undefined);

    // close dialog
    setIsFoodDialogOpen(false);
  }

  async function onLLMCalorieQuerySubmit() {
    if (!foodImageFile) return;
    setIsLLMLoading(true);

    const formData = new FormData();
    formData.append("image", foodImageFile);

    const res = await fetch("/api/calories", {
      method: "POST",
      body: formData,
    });

    const data: z.infer<typeof llmCalorieResponseSchema> = await res.json();

    setIsLLMLoading(false);
    setFoodName(data.foodName);
    setFoodCalories(data.calories);
    setFoodCarbohydrates(data.carbohydrate);
    setFoodProteins(data.protein);
    setFoodFats(data.fat);
  }

  return (
    <Dialog open={isFoodDialogOpen} onOpenChange={setIsFoodDialogOpen}>
      <DialogTrigger asChild>
        <Button variant={"outline"} className="flex items-center">
          <Plus className="h-9 w-9" />
          {profile.language === "ko" ? "음식 추가" : "Add Food"}
        </Button>
      </DialogTrigger>

      <DialogContent
        onPointerDownOutside={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
        className="flex max-h-[calc(100dvh-80px)] w-full max-w-xl flex-col gap-4 overflow-y-auto"
      >
        <DialogTitle>
          {profile.language === "ko" ? "음식 추가" : "Add Food"}
        </DialogTitle>

        <div className="flex w-full flex-col items-center gap-2">
          {foodImageFile ? (
            <div className="relative flex h-60 w-60 items-center">
              <img
                src={URL.createObjectURL(foodImageFile)}
                className="size-full object-contain"
              />

              <button
                onClick={() => {
                  setFoodImageFile(undefined);
                }}
                className="absolute right-0 top-0 rounded-lg bg-red-600/40 p-1 hover:bg-red-600"
              >
                <X className="size-4" />
              </button>

              <Button
                className="absolute bottom-0 right-0 h-10 w-10 animate-pulse"
                variant={"secondary"}
                onClick={onLLMCalorieQuerySubmit}
              >
                {isLLMLoading ? (
                  <RotateCw className="animate-spin" />
                ) : (
                  <Bot size={50} />
                )}
              </Button>
            </div>
          ) : (
            <div
              className="flex h-60 w-60 cursor-pointer items-center justify-center rounded-md border border-border bg-muted/40"
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              <ImageUp className="size-12" />
            </div>
          )}

          <div className="grid w-full max-w-lg grid-cols-1 gap-2 py-2 sm:grid-cols-2">
            <div className="flex items-center gap-1">
              <Label className="w-16 break-keep text-center">
                {profile.language === "ko" ? "이름" : "Name"}
              </Label>
              <Input
                value={foodName}
                onChange={(e) => setFoodName(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-1">
              <Label className="w-16 break-keep text-center">
                {profile.language === "ko" ? "칼로리" : "Calories"}
              </Label>
              <Input
                value={foodCalories}
                onChange={(e) => setFoodCalories(Number(e.target.value))}
              />
            </div>

            <div className="flex items-center gap-1">
              <Label className="w-16 break-keep text-center">
                {profile.language === "ko" ? "탄수화물" : "Carbs"}
              </Label>
              <Input
                value={foodCarbohydrates}
                onChange={(e) => setFoodCarbohydrates(Number(e.target.value))}
              />
            </div>

            <div className="flex items-center gap-1">
              <Label className="w-16 break-keep text-center">
                {profile.language === "ko" ? "단백질" : "Protein"}
              </Label>
              <Input
                value={foodProteins}
                onChange={(e) => setFoodProteins(Number(e.target.value))}
              />
            </div>

            <div className="flex items-center gap-1">
              <Label className="w-16 break-keep text-center">
                {profile.language === "ko" ? "지방" : "Fat"}
              </Label>
              <Input
                value={foodFats}
                onChange={(e) => setFoodFats(Number(e.target.value))}
              />
            </div>
          </div>

          <Button className="w-full max-w-lg" onClick={handleAddFood}>
            <Check />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
