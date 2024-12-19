import * as React from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

import { type Database } from "../../../../from-next/src/lib/types/database.types";
import { foodSchema, insertMealSchema } from "@/lib/schemas/meal.schema";
import { FoodImage } from "../../../../from-next/src/components/food/food-image";
import { FoodDetail } from "../../../../from-next/src/components/food/food-detail";
import { DeleteButton } from "../../../../from-next/src/components/delete-button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../../../../from-next/src/components/ui/collapsible";

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
