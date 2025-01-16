import { Loader2 } from "lucide-react";

export function CalendarSkeleton() {
  return (
    <div className="flex w-full flex-1 items-center justify-center bg-muted/20">
      <Loader2 className="size-16 animate-spin" />
    </div>
  );
}
