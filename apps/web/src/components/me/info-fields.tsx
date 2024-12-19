import { cn } from "@/lib/utils";

export function InfoField({
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
        "flex items-center gap-1 rounded-lg bg-muted/50 px-3 py-1",
        className,
      )}
    >
      <span className="min-w-20 whitespace-nowrap text-muted-foreground">
        {label}
      </span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
