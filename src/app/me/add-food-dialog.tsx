"use client";

import * as React from "react";
import { Plus, ImageUp, X, Bot, Check } from "lucide-react";
import { useDropzone } from "react-dropzone";

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
  localDate?: string;
}

export function AddFoodDialog({ localDate }: AddFoodDialogProps) {
  const [isFoodDialogOpen, setIsFoodDialogOpen] = React.useState(false);
  const [foodImageFile, setFoodImageFile] = React.useState<File>();

  const [foodName, setFoodName] = React.useState("");
  const [foodCalories, setFoodCalories] = React.useState(0);
  const [foodCarbohydrates, setFoodCarbohydrates] = React.useState(0);
  const [foodProteins, setFoodProteins] = React.useState(0);
  const [foodFats, setFoodFats] = React.useState(0);

  const onDrop = React.useCallback((acceptedFiles: File[]) => {
    setFoodImageFile(acceptedFiles[0]);
  }, []);
  const [llmGeneratedFoodInfo, setLlmGeneratedFoodInfo] = React.useState<any>();

  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    onDrop,
    maxFiles: 1,
    maxSize: 1024 * 1024 * 10,
    multiple: false,
  });

  async function onLLMCalorieQuerySubmit() {
    if (!foodImageFile) return;

    const formData = new FormData();
    formData.append("image", foodImageFile);

    const res = await fetch("/api/calories", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    console.log(data);

    setLlmGeneratedFoodInfo(data);
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
        className="flex max-h-dvh w-full max-w-3xl flex-col overflow-y-auto"
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

              <Button
                className="absolute bottom-0 right-0 h-10 w-10 animate-pulse"
                variant={"secondary"}
                onClick={onLLMCalorieQuerySubmit}
              >
                <Bot size={50} />
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

          <div className="grid w-full max-w-lg grid-cols-1 gap-2 p-2 sm:grid-cols-2">
            <div className="flex items-center gap-1">
              <Label className="w-16 break-keep text-center">이름</Label>
              <Input />
            </div>

            <div className="flex items-center gap-1">
              <Label className="w-16 break-keep text-center">칼로리</Label>
              <Input className="" />
            </div>

            <div className="flex items-center gap-1">
              <Label className="w-16 break-keep text-center">탄수화물</Label>
              <Input />
            </div>

            <div className="flex items-center gap-1">
              <Label className="w-16 break-keep text-center">단백질</Label>
              <Input />
            </div>

            <div className="flex items-center gap-1">
              <Label className="w-16 break-keep text-center">지방</Label>
              <Input />
            </div>
          </div>

          <Button className="w-full max-w-lg">
            <Check />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
