"use client";

import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface DeleteButtonProps {
  onClick: () => void;
  className?: string;
}

export function DeleteButton({ onClick, className }: DeleteButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-full transition-colors hover:bg-red-500/80",
        className,
      )}
    >
      <X className="text-red-500/80 transition-colors hover:text-white/80" />
    </button>
  );
}
