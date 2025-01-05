import * as React from "react";

import { cn } from "@/lib/utils";

interface BentoGridProps {
  children: React.ReactNode;
  className?: string;
}

export function BentoGrid({ children, className }: BentoGridProps) {
  return <div className={cn(className)}>{children}</div>;
}

interface BentoGridItemProps {
  children: React.ReactNode;
  className?: string;
}

export function BentoGridItem({ children, className }: BentoGridItemProps) {
  return (
    <div className={cn("border border-border", className)}>{children}</div>
  );
}
