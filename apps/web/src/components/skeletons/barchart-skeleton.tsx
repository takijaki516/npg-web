import { Loader2 } from "lucide-react";

export function BarChartSkeleton() {
  return (
    <div className="flex h-full min-h-[180px] w-full flex-1 items-center justify-center bg-muted/20">
      <Loader2 className="size-16 animate-spin" />
    </div>
  );
}
