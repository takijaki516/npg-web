import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Database } from "@/lib/types/database.types";

export function SingleMealCard({
  meal,
  idx,
}: {
  meal: Database["public"]["Tables"]["meals"]["Row"];
  idx: number;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{idx + 1} 번째 식사</CardTitle>
      </CardHeader>
      <CardContent>{meal.date}</CardContent>
    </Card>
  );
}
