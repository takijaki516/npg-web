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
    <div
      className={cn(
        "group relative flex flex-col",
        "[box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
        "transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
        className,
      )}
    >
      {children}
    </div>
  );
}
