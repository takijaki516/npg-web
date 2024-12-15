interface FoodDetailProps {
  name: string;
  calories: number;
  carbohydrate: number;
  protein: number;
  fat: number;
}

export function FoodDetail({
  name,
  calories,
  carbohydrate,
  protein,
  fat,
}: FoodDetailProps) {
  return (
    <div className="flex flex-col gap-1 text-sm">
      <div className="flex items-center justify-between gap-1 rounded-lg bg-muted/50 px-3 py-1">
        <span className="text-muted-foreground">칼로리</span>
        <span className="font-medium">{calories}</span>
      </div>

      <div className="flex items-center justify-between gap-1 rounded-lg bg-muted/50 px-3 py-1">
        <span className="text-muted-foreground">탄수화물</span>
        <span className="font-medium">{carbohydrate}</span>
      </div>

      <div className="flex items-center justify-between gap-1 rounded-lg bg-muted/50 px-3 py-1">
        <span className="text-muted-foreground">단백질</span>
        <span className="font-medium">{protein}</span>
      </div>

      <div className="flex items-center justify-between gap-1 rounded-lg bg-muted/50 px-3 py-1">
        <span className="text-muted-foreground">지방</span>
        <span className="font-medium">{fat}</span>
      </div>
    </div>
  );
}
