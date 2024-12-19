import * as React from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

import { type DailyMealsWithFoods } from "@/lib/queries";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../../../../from-next/src/components/ui/collapsible";
import { FoodImage } from "../../../../from-next/src/components/food/food-image";
import { FoodDetail } from "../../../../from-next/src/components/food/food-detail";
// import { S3GetObjPresignResponse } from "@/app/api/s3-get-presign/route";
import { type Database } from "../../../../from-next/src/lib/types/database.types";

interface DailyFoodProps {
  food: DailyMealsWithFoods[number]["foods"][number];
  profile: Database["public"]["Tables"]["profiles"]["Row"];
}

export function DailyFood({ food, profile }: DailyFoodProps) {
  const [isCollapsibleOpen, setIsCollapsibleOpen] = React.useState(false);
  const [imageUrl, setImageUrl] = React.useState(food.pic_url ?? "");

  // React.useEffect(() => {
  //   const getPresignedUrl = async () => {
  //     if (imageUrl) {
  //       const res = await fetch("/api/s3-get-presign", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           fileUUID: imageUrl,
  //         }),
  //       });

  //       const data: S3GetObjPresignResponse = await res.json();

  //       setImageUrl(data.url);
  //     }
  //   };

  //   getPresignedUrl();
  // }, []);

  return (
    <Collapsible open={isCollapsibleOpen} onOpenChange={setIsCollapsibleOpen}>
      <CollapsibleTrigger className="flex w-full items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {isCollapsibleOpen ? <ChevronDown /> : <ChevronRight />}
          <span>{food.food_name}</span>
        </div>
      </CollapsibleTrigger>

      <CollapsibleContent className="ml-3 mt-1 flex items-center gap-2 border-l pl-4">
        <div className="w-32">
          <FoodImage src={imageUrl ?? ""} />
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

export interface S3GetObjPresignRequest {
  fileUUID: string;
}
