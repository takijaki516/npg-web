import { type Database } from "@/lib/types/database.types";

interface FoodDetailProps {
  profile: Database["public"]["Tables"]["profiles"]["Row"];
  name: string;
  calories: number;
  carbohydrate: number;
  protein: number;
  fat: number;
}

export function FoodDetail({
  profile,
  calories,
  carbohydrate,
  protein,
  fat,
}: FoodDetailProps) {
  return (
    <div className="flex flex-col gap-1 text-sm">
      <div className="flex items-center justify-between gap-1 rounded-lg bg-muted/50 px-3 py-1">
        <span className="text-muted-foreground">
          {profile.language === "ko" ? "칼로리" : "Calories"}
        </span>
        <span className="font-medium">{calories}</span>
      </div>

      <div className="flex items-center justify-between gap-1 rounded-lg bg-muted/50 px-3 py-1">
        <span className="text-muted-foreground">
          {profile.language === "ko" ? "탄수화물" : "Carbs"}
        </span>
        <span className="font-medium">{carbohydrate}</span>
      </div>

      <div className="flex items-center justify-between gap-1 rounded-lg bg-muted/50 px-3 py-1">
        <span className="text-muted-foreground">
          {profile.language === "ko" ? "단백질" : "Protein"}
        </span>
        <span className="font-medium">{protein}</span>
      </div>

      <div className="flex items-center justify-between gap-1 rounded-lg bg-muted/50 px-3 py-1">
        <span className="text-muted-foreground">
          {profile.language === "ko" ? "지방" : "Fat"}
        </span>
        <span className="font-medium">{fat}</span>
      </div>
    </div>
  );
}
