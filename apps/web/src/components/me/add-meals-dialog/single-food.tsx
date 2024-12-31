import * as React from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { insertFoodSchema, insertMealSchema } from "@repo/shared-schema";

import { type Profile } from "@/lib/queries";
import { FoodImage } from "@/components/food/food-image";
import { FoodDetail } from "@/components/food/food-detail";
import { DeleteButton } from "@/components/delete-button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface SingleFoodProps {
  food: z.infer<typeof insertFoodSchema>;
  mealForm: UseFormReturn<z.infer<typeof insertMealSchema>>;
  profile: Profile;
}

export function SingleFood({ food, mealForm, profile }: SingleFoodProps) {
  const [isCollapsibleOpen, setIsCollapsibleOpen] = React.useState(false);

  function onRemoveFood() {
    const foods = mealForm.getValues("foods");
    const newFoods = foods.filter((f) => f.foodName !== food.foodName);
    mealForm.setValue("foods", newFoods);
  }

  const foodPicUrl = food.foodPicFile
    ? URL.createObjectURL(food.foodPicFile)
    : "";

  return (
    <Collapsible open={isCollapsibleOpen} onOpenChange={setIsCollapsibleOpen}>
      <div className="flex w-full items-center justify-between">
        <CollapsibleTrigger className="flex w-full items-center gap-4">
          <div className="flex w-full items-center gap-2">
            {isCollapsibleOpen ? <ChevronDown /> : <ChevronRight />}
            <span>{food.foodName}</span>
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
          name={food.foodName}
          calories={food.foodCaloriesKcal}
          carbohydrate={food.foodCarbohydratesG}
          protein={food.foodProteinG}
          fat={food.foodFatG}
        />
      </CollapsibleContent>
    </Collapsible>
  );
}
