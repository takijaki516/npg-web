import * as React from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

import type { DailyMealsWithFoods, Profile } from "@/lib/queries";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { FoodImage } from "@/components/food/food-image";
import { FoodDetail } from "@/components/food/food-detail";

interface DailyFoodProps {
  food: DailyMealsWithFoods[number]["foods"][number];
  profile: Profile;
}

export function DailyFood({ food, profile }: DailyFoodProps) {
  const [isCollapsibleOpen, setIsCollapsibleOpen] = React.useState(false);
  const [imageUrl, setImageUrl] = React.useState(food.foodPic ?? "");

  return (
    <Collapsible open={isCollapsibleOpen} onOpenChange={setIsCollapsibleOpen}>
      <CollapsibleTrigger className="flex w-full items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {isCollapsibleOpen ? <ChevronDown /> : <ChevronRight />}
          <span>{food.foodName}</span>
        </div>
      </CollapsibleTrigger>

      <CollapsibleContent className="ml-3 mt-1 flex items-center gap-2 border-l pl-4">
        <div className="w-32">
          <FoodImage src={imageUrl ?? ""} />
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

export interface S3GetObjPresignRequest {
  fileUUID: string;
}
