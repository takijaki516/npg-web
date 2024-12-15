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
import { FoodImage } from "../food/food-image";
import { FoodDetail } from "../food/food-detail";
import { DeleteButton } from "../delete-button";
import { type Database } from "@/lib/types/database.types";

interface SingleFoodProps {
  food: z.infer<typeof foodSchema>;
  mealForm: UseFormReturn<z.infer<typeof insertMealSchema>>;
  profile: Database["public"]["Tables"]["profiles"]["Row"];
}

export function SingleFood({ food, mealForm, profile }: SingleFoodProps) {
  const [isCollapsibleOpen, setIsCollapsibleOpen] = React.useState(false);

  function onRemoveFood() {
    const foods = mealForm.getValues("foods");
    const newFoods = foods.filter((f) => f.food_name !== food.food_name);
    mealForm.setValue("foods", newFoods);
  }

  const foodPicUrl = food.pic_file ? URL.createObjectURL(food.pic_file) : "";

  return (
    <Collapsible open={isCollapsibleOpen} onOpenChange={setIsCollapsibleOpen}>
      <div className="flex w-full items-center justify-between">
        <CollapsibleTrigger className="flex w-full items-center gap-4">
          <div className="flex w-full items-center gap-2">
            {isCollapsibleOpen ? <ChevronDown /> : <ChevronRight />}
            <span>{food.food_name}</span>
          </div>
        </CollapsibleTrigger>

        <DeleteButton onClick={onRemoveFood} />
      </div>

      <CollapsibleContent className="ml-3 mt-1 flex items-center gap-2 border-l pl-4">
        <div className="w-32">
          <FoodImage src={foodPicUrl} />
        </div>

        <FoodDetail
          profile={profile}
          name={food.food_name ?? ""}
          calories={food.calories ?? 0}
          carbohydrate={food.carbohydrate ?? 0}
          protein={food.protein ?? 0}
          fat={food.fat ?? 0}
        />
      </CollapsibleContent>
    </Collapsible>
  );
}
