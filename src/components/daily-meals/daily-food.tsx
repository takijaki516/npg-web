"use client";

import * as React from "react";
import { ChevronDown, ChevronRight, X } from "lucide-react";

import { type DailyMealsWithFoods } from "@/supabase-utils/server-queries";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { FoodImage } from "../food/food-image";
import { FoodDetail } from "../food/food-detail";
import { S3GetObjPresignResponse } from "@/app/api/s3-get-presign/route";

interface DailyFoodProps {
  food: DailyMealsWithFoods[number]["foods"][number];
}

export function DailyFood({ food }: DailyFoodProps) {
  const [isCollapsibleOpen, setIsCollapsibleOpen] = React.useState(false);
  const [imageUrl, setImageUrl] = React.useState(food.pic_url ?? "");

  React.useEffect(() => {
    const getPresignedUrl = async () => {
      if (imageUrl) {
        const res = await fetch("/api/s3-get-presign", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fileUUID: imageUrl,
          }),
        });

        const data: S3GetObjPresignResponse = await res.json();
        console.log(
          "🚀 ~ file: daily-food.tsx:38 ~ getPresignedUrl ~ data:",
          data,
        );

        setImageUrl(data.url);
      }
    };

    getPresignedUrl();
  }, []);

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
