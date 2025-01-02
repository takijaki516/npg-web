import * as React from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { insertFoodSchema, insertMealSchema } from "@repo/shared-schema";

import { type Profile } from "@/lib/queries";
import { FoodImage } from "@/components/food/food-image";
import { FoodDetailInfoField } from "@/components/food/food-detail";
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
      <div className="flex items-center gap-4">
        <CollapsibleTrigger asChild className="flex items-center">
          <div className="flex cursor-pointer items-center gap-2">
            {isCollapsibleOpen ? <ChevronDown /> : <ChevronRight />}
            <span>{food.foodName}</span>
          </div>
        </CollapsibleTrigger>

        <DeleteButton onClick={onRemoveFood} />
      </div>

      <CollapsibleContent className="ml-3 mt-1 flex items-center gap-2 border-l pl-4">
        <div className="aspect-square h-32">
          <FoodImage src={foodPicUrl} />
        </div>

        <div className="flex h-full flex-col justify-center gap-1 text-sm">
          <FoodDetailInfoField
            label={profile.language === "ko" ? "칼로리" : "Calories"}
            value={food.foodCaloriesKcal.toString()}
          />
          <FoodDetailInfoField
            label={profile.language === "ko" ? "탄수화물" : "Carbs"}
            value={food.foodCarbohydratesG.toString()}
          />
          <FoodDetailInfoField
            label={profile.language === "ko" ? "단백질" : "Protein"}
            value={food.foodProteinG.toString()}
          />
          <FoodDetailInfoField
            label={profile.language === "ko" ? "지방" : "Fat"}
            value={food.foodFatG.toString()}
          />
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
