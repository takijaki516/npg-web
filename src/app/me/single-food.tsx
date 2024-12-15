"use client";

import * as React from "react";
import { ChevronDown, ChevronRight, X } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { foodSchema, insertMealSchema } from "@/lib/schema/meal.schema";

interface SingleFoodProps {
  food: z.infer<typeof foodSchema>;
  mealForm: UseFormReturn<z.infer<typeof insertMealSchema>>;
}

export function SingleFood({ food, mealForm }: SingleFoodProps) {
  const [isCollapsibleOpen, setIsCollapsibleOpen] = React.useState(false);

  function onRemoveFood() {
    const foods = mealForm.getValues("foods");
    const newFoods = foods.filter((f) => f.food_name !== food.food_name);
    mealForm.setValue("foods", newFoods);
  }

  return (
    <Collapsible open={isCollapsibleOpen} onOpenChange={setIsCollapsibleOpen}>
      <CollapsibleTrigger className="flex w-full items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {isCollapsibleOpen ? <ChevronDown /> : <ChevronRight />}
          <span>{food.food_name}</span>
        </div>
      </CollapsibleTrigger>
      <button onClick={onRemoveFood} className="rounded-full hover:bg-red-500">
        <X className="text-red-500 hover:text-white" />
      </button>

      <CollapsibleContent className="flex items-center gap-2">
        <div>
          {/* TODO: 이미지 추가 */}
          image
        </div>

        <div className="flex items-center gap-2">
          <div>{food.calories}</div>
          <div>{food.carbohydrate}</div>
          <div>{food.protein}</div>
          <div>{food.fat}</div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
