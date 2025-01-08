import * as React from "react";
import { RotateCw, Plus, ImageUp, X, Check } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { useFieldArray, type UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { insertMealSchema } from "@repo/shared-schema";

import { type Profile } from "@/lib/queries";
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
  profile: Profile;
}

export function AddFoodDialog({ mealForm, profile }: AddFoodDialogProps) {
  const [isFoodDialogOpen, setIsFoodDialogOpen] = React.useState(false);
  const [foodImageFile, setFoodImageFile] = React.useState<File>();
  const [isLLMLoading, setIsLLMLoading] = React.useState(false);

  const [foodName, setFoodName] = React.useState("");
  const [foodCalories, setFoodCalories] = React.useState(0);
  const [foodCarbohydrates, setFoodCarbohydrates] = React.useState(0);
  const [foodProteins, setFoodProteins] = React.useState(0);
  const [foodFats, setFoodFats] = React.useState(0);

  // calculate calories on image drop
  const onDrop = React.useCallback(
    async (acceptedFiles: File[]) => {
      if (!acceptedFiles[0]) return;

      setFoodImageFile(acceptedFiles[0]);

      setIsLLMLoading(true);

      const formData = new FormData();
      formData.append("image", acceptedFiles[0]);
      formData.append("language", profile.language);

      const res = await fetch("http://localhost:8787/ai/calc-calorie", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      const data = await res.json();

      setIsLLMLoading(false);

      setFoodName(data.foodName);
      setFoodCalories(data.calories);
      setFoodCarbohydrates(data.carbohydrate);
      setFoodProteins(data.protein);
      setFoodFats(data.fat);
    },
    [profile.language],
  );

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
      !foodFats ||
      !foodImageFile
    ) {
      toast.error(
        "모든 정보를 입력해주세요. AI를 활용해 보세요 편리하게 추가할 수 있어요",
      );

      return;
    }

    foodsArrForm.append({
      foodName: foodName,
      foodCaloriesKcal: foodCalories,
      foodCarbohydratesG: foodCarbohydrates,
      foodProteinG: foodProteins,
      foodFatG: foodFats,
      foodPicFile: foodImageFile,
    });

    // close dialog
    setIsFoodDialogOpen(false);

    // reset field
    setFoodName("");
    setFoodCalories(0);
    setFoodCarbohydrates(0);
    setFoodProteins(0);
    setFoodFats(0);
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
        className="flex max-h-[calc(100dvh-80px)] w-full max-w-xl flex-col gap-4 overflow-y-auto rounded-md"
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
                  value={foodName}
                  onChange={(e) => setFoodName(e.target.value)}
                />
              )}
            </div>

            <div className="flex items-center gap-1">
              <Label className="w-16 break-keep text-center">칼로리</Label>

              {isLLMLoading ? (
                <RotateCw className="animate-spin text-muted-foreground" />
              ) : (
                <Input
                  value={foodCalories}
                  onChange={(e) => setFoodCalories(Number(e.target.value))}
                />
              )}
            </div>

            <div className="flex items-center gap-1">
              <Label className="w-16 break-keep text-center">탄수화물</Label>

              {isLLMLoading ? (
                <RotateCw className="animate-spin text-muted-foreground" />
              ) : (
                <Input
                  value={foodCarbohydrates}
                  onChange={(e) => setFoodCarbohydrates(Number(e.target.value))}
                />
              )}
            </div>

            <div className="flex items-center gap-1">
              <Label className="w-16 break-keep text-center">단백질</Label>

              {isLLMLoading ? (
                <RotateCw className="animate-spin text-muted-foreground" />
              ) : (
                <Input
                  value={foodProteins}
                  onChange={(e) => setFoodProteins(Number(e.target.value))}
                />
              )}
            </div>

            <div className="flex items-center gap-1">
              <Label className="w-16 break-keep text-center">지방</Label>

              {isLLMLoading ? (
                <RotateCw className="animate-spin text-muted-foreground" />
              ) : (
                <Input
                  value={foodFats}
                  onChange={(e) => setFoodFats(Number(e.target.value))}
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
