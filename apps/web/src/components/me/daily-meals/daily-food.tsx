import type { DailyMealsWithFoods } from "@/lib/queries";
import { InfoField } from "@/components/info-field";
import { FoodImage } from "@/components/food/food-image";

interface DailyFoodProps {
  food: DailyMealsWithFoods[number]["foods"][number];
}

export function DailyFood({ food }: DailyFoodProps) {
  return (
    <div className="flex h-[148px] gap-2">
      <FoodImage
        src={`https://coach247.taekgogo.com/cdn-cgi/image/width=110,quality=70/${food.foodPic}`}
        className="h-[148px] w-[148px]"
      />

      <div className="flex h-min flex-col justify-center gap-1 text-sm">
        <div className="break-keep font-semibold">{food.foodName}</div>

        <InfoField
          label={"칼로리"}
          value={food.foodCaloriesKcal.toString()}
          className="break-keep"
        />
        <InfoField
          label={"탄수화물"}
          value={food.foodCarbohydratesG.toString()}
          className="break-keep"
        />
        <InfoField
          label={"단백질"}
          value={food.foodProteinG.toString()}
          className="break-keep"
        />
        <InfoField
          label={"지방"}
          value={food.foodFatG.toString()}
          className="break-keep"
        />
      </div>
    </div>
  );
}
