import * as React from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

import type { DailyMealsWithFoods, Profile } from "@/lib/queries";
import { FoodImage } from "@/components/food/food-image";
import { InfoField } from "@/components/info-field";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface DailyFoodProps {
  food: DailyMealsWithFoods[number]["foods"][number];
  profile: Profile;
}

export function DailyFood({ food, profile }: DailyFoodProps) {
  const [isCollapsibleOpen, setIsCollapsibleOpen] = React.useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [imageUrl, _setImageUrl] = React.useState(food.foodPic ?? "");

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

        <div className="flex flex-col gap-1 text-sm">
          <InfoField
            label={profile.language === "ko" ? "칼로리" : "Calories"}
            value={food.foodCaloriesKcal.toString()}
          />
          <InfoField
            label={profile.language === "ko" ? "탄수화물" : "Carbs"}
            value={food.foodCarbohydratesG.toString()}
          />
          <InfoField
            label={profile.language === "ko" ? "단백질" : "Protein"}
            value={food.foodProteinG.toString()}
          />
          <InfoField
            label={profile.language === "ko" ? "지방" : "Fat"}
            value={food.foodFatG.toString()}
          />
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
