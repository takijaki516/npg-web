import { X, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface DeleteButtonProps {
  onClick: () => void;
  className?: string;
  isPending?: boolean;
}

export function DeleteButton({
  onClick,
  className,
  isPending,
}: DeleteButtonProps) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className={cn("", className)}
      disabled={isPending}
    >
      {isPending ? (
        <Loader2 className="animate-spin" />
      ) : (
        <X className="text-red-500/60 transition-colors hover:text-red-500" />
      )}
    </button>
  );
}
