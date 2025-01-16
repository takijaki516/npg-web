import * as React from "react";
import { RotateCw, Plus, ImageUp, X, Check } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { useFieldArray, type UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { insertMealSchema } from "@repo/shared-schema";

import { aiCalcFoodCalorie } from "@/lib/queries";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface AddFoodDialogProps {
  mealForm: UseFormReturn<z.infer<typeof insertMealSchema>>;
}

interface FoodInfo {
  foodName: string;
  foodCalories: number;
  foodCarbohydrates: number;
  foodProteins: number;
  foodFats: number;
}

export function AddFoodDialog({ mealForm }: AddFoodDialogProps) {
  const [isFoodDialogOpen, setIsFoodDialogOpen] = React.useState(false);
  const [foodImageFile, setFoodImageFile] = React.useState<File>();
  const [isLLMLoading, setIsLLMLoading] = React.useState(false);

  const [foodInfo, setFoodInfo] = React.useState<FoodInfo>({
    foodName: "",
    foodCalories: 0,
    foodCarbohydrates: 0,
    foodProteins: 0,
    foodFats: 0,
  });

  // calculate calories on image drop
  const onDrop = React.useCallback(async (acceptedFiles: File[]) => {
    if (!acceptedFiles[0]) return;

    setFoodImageFile(acceptedFiles[0]);
    setIsLLMLoading(true);

    const formData = new FormData();
    formData.append("foodImage", acceptedFiles[0]);

    const data = await aiCalcFoodCalorie({
      foodImage: acceptedFiles[0],
    });

    setIsLLMLoading(false);

    setFoodInfo({
      foodCalories: data.calories,
      foodCarbohydrates: data.carbohydrate,
      foodProteins: data.protein,
      foodFats: data.fat,
      foodName: data.foodName,
    });
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
    foodsArrForm.append({
      foodName: foodInfo.foodName,
      foodCaloriesKcal: foodInfo.foodCalories,
      foodCarbohydratesG: foodInfo.foodCarbohydrates,
      foodProteinG: foodInfo.foodProteins,
      foodFatG: foodInfo.foodFats,
      foodPicFile: foodImageFile,
    });

    // close dialog
    setIsFoodDialogOpen(false);

    // reset field
    setFoodInfo({
      foodName: "",
      foodCalories: 0,
      foodCarbohydrates: 0,
      foodProteins: 0,
      foodFats: 0,
    });
    setFoodImageFile(undefined);
  }

  return (
    <Dialog open={isFoodDialogOpen} onOpenChange={setIsFoodDialogOpen}>
      <DialogTrigger asChild>
        <Button variant={"outline"} className="flex items-center">
          <Plus className="h-9 w-9" />
          음식 추가
        </Button>
      </DialogTrigger>

      <DialogContent
        onPointerDownOutside={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
        className="dialog-content !h-auto"
      >
        <DialogTitle>음식 추가</DialogTitle>

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
            </div>
          ) : (
            <div
              className="flex h-60 w-60 cursor-pointer flex-col items-center justify-center gap-2 rounded-md border border-border bg-muted/40"
              {...getRootProps()}
            >
              <input {...getInputProps()} />

              <ImageUp className="size-12" />
              <div className="w-40 text-center">
                음식 이미지를 업로드해주세요. 칼로리 계산을 위해 필요해요
              </div>
            </div>
          )}

          <div className="grid w-full max-w-lg grid-cols-1 gap-2 py-2 sm:grid-cols-2">
            <div className="flex items-center gap-1">
              <Label className="w-16 break-keep text-center">이름</Label>

              {isLLMLoading ? (
                <RotateCw className="animate-spin text-muted-foreground" />
              ) : (
                <Input
                  value={foodInfo.foodName}
                  onChange={(e) =>
                    setFoodInfo({ ...foodInfo, foodName: e.target.value })
                  }
                />
              )}
            </div>

            <div className="flex items-center gap-1">
              <Label className="w-16 break-keep text-center">칼로리</Label>

              {isLLMLoading ? (
                <RotateCw className="animate-spin text-muted-foreground" />
              ) : (
                <Input
                  value={foodInfo.foodCalories}
                  onChange={(e) =>
                    setFoodInfo({
                      ...foodInfo,
                      foodCalories: Number(e.target.value),
                    })
                  }
                />
              )}
            </div>

            <div className="flex items-center gap-1">
              <Label className="w-16 break-keep text-center">탄수화물</Label>

              {isLLMLoading ? (
                <RotateCw className="animate-spin text-muted-foreground" />
              ) : (
                <Input
                  value={foodInfo.foodCarbohydrates}
                  onChange={(e) =>
                    setFoodInfo({
                      ...foodInfo,
                      foodCarbohydrates: Number(e.target.value),
                    })
                  }
                />
              )}
            </div>

            <div className="flex items-center gap-1">
              <Label className="w-16 break-keep text-center">단백질</Label>

              {isLLMLoading ? (
                <RotateCw className="animate-spin text-muted-foreground" />
              ) : (
                <Input
                  value={foodInfo.foodProteins}
                  onChange={(e) =>
                    setFoodInfo({
                      ...foodInfo,
                      foodProteins: Number(e.target.value),
                    })
                  }
                />
              )}
            </div>

            <div className="flex items-center gap-1">
              <Label className="w-16 break-keep text-center">지방</Label>

              {isLLMLoading ? (
                <RotateCw className="animate-spin text-muted-foreground" />
              ) : (
                <Input
                  value={foodInfo.foodFats}
                  onChange={(e) =>
                    setFoodInfo({
                      ...foodInfo,
                      foodFats: Number(e.target.value),
                    })
                  }
                />
              )}
            </div>
          </div>

          <Button
            className="w-full max-w-lg"
            onClick={handleAddFood}
            disabled={isLLMLoading}
          >
            {isLLMLoading ? (
              <RotateCw className="animate-spin text-muted-foreground" />
            ) : (
              <Check />
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
