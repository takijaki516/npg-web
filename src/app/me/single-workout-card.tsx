import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card";
import type { Database } from "@/lib/types/database.types";

export function SingleWorkoutCard({
  exercise,
  idx,
}: {
  exercise: Database["public"]["Tables"]["exercises"]["Row"];
  idx: number;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{idx + 1} 번째 운동</CardTitle>
      </CardHeader>

      <CardContent>
        <div>
          <span>운동 시간</span>
          <span>{exercise.start_time}</span>
        </div>
      </CardContent>
    </Card>
  );
}
