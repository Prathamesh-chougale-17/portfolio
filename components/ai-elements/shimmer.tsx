"use client";

import type { ElementType } from "react";
import { cn } from "@/lib/utils";

export type TextShimmerProps = {
  children: string;
  as?: ElementType;
  className?: string;
  duration?: number;
};

export function Shimmer({
  children,
  as: Component = "p",
  className,
  duration = 2,
}: TextShimmerProps) {
  return (
    <Component
      className={cn(
        "relative animate-shimmer bg-linear-to-r bg-size-[200%_100%] bg-clip-text text-transparent",
        "from-foreground via-foreground/40 to-foreground",
        className
      )}
      style={
        {
          "--duration": `${duration}s`,
          animationDuration: "var(--duration)",
        } as React.CSSProperties
      }
    >
      {children}
    </Component>
  );
}
