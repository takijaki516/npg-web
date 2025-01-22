import * as React from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { z } from "zod";
import { insertFoodSchema } from "@repo/shared-schema";

import { FoodImage } from "./food-image";
import { InfoField } from "@/components/info-field";
import { DeleteButton } from "@/components/delete-button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface SingleFoodProps {
  food: z.infer<typeof insertFoodSchema>;
  removeFood: () => void;
}

export function SingleFood({ food, removeFood }: SingleFoodProps) {
  const [isCollapsibleOpen, setIsCollapsibleOpen] = React.useState(false);
  const [foodPicUrl, setFoodPicUrl] = React.useState<string>();

  React.useEffect(() => {
    if (food.foodPicFile) {
      setFoodPicUrl(URL.createObjectURL(food.foodPicFile));
    } else {
      setFoodPicUrl(
        `${import.meta.env.VITE_R2_URL}/image/width=110,quality=70/${food.foodPic}`,
      );
    }

    return () => {
      if (food.foodPicFile && foodPicUrl) {
        URL.revokeObjectURL(foodPicUrl);
      }
    };
  }, [food.foodPic, food.foodPicFile]);

  return (
    <Collapsible open={isCollapsibleOpen} onOpenChange={setIsCollapsibleOpen}>
      <div className="flex items-center gap-4">
        <CollapsibleTrigger asChild className="flex items-center">
          <div className="flex cursor-pointer items-center gap-2">
            {isCollapsibleOpen ? <ChevronDown /> : <ChevronRight />}
            <span>{food.foodName}</span>
          </div>
        </CollapsibleTrigger>

        <DeleteButton dialog={!!food.foodId} deleteFunction={removeFood} />
      </div>

      <CollapsibleContent className="ml-3 mt-1 flex items-center gap-2 border-l pl-4">
        <FoodImage src={foodPicUrl} className="size-32" />

        <div className="flex h-full flex-col justify-center gap-1 text-sm">
          <InfoField
            label={"칼로리"}
            value={food.foodCaloriesKcal.toString()}
          />
          <InfoField
            label={"탄수화물"}
            value={food.foodCarbohydratesG.toString()}
          />
          <InfoField label={"단백질"} value={food.foodProteinG.toString()} />
          <InfoField label={"지방"} value={food.foodFatG.toString()} />
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
