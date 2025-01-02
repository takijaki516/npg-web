import { cn } from "@/lib/utils";

export function FoodDetailInfoField({
  label,
  value,
  className,
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-1 rounded-lg bg-muted/50 px-3 py-1",
        className,
      )}
    >
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
