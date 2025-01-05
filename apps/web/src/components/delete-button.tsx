import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface DeleteButtonProps {
  onClick: () => void;
  className?: string;
}

export function DeleteButton({ onClick, className }: DeleteButtonProps) {
  return (
    <button onClick={onClick} className={cn(className)}>
      <X className="text-red-500/60 transition-colors hover:text-red-500" />
    </button>
  );
}
