"use client";

import type { ElementType } from "react";
import { cn } from "@/lib/utils";

export type TextShimmerProps = {
  children: string;
  as?: ElementType;
  className?: string;
  duration?: number;
  spread?: number;
};

export function Shimmer({
  children,
  as: Component = "p",
  className,
  duration = 2,
  spread = 2,
}: TextShimmerProps) {
  return (
    <Component
      className={cn(
        "relative inline-block bg-size-[250%_100%,auto] bg-clip-text text-transparent",
        "bg-[linear-gradient(90deg,#0000_calc(50%-var(--spread)),#fff,#0000_calc(50%+var(--spread)))], [background-repeat:no-repeat,padding-box]",
        "shimmer-bg animate-shimmer",
        className
      )}
      style={
        {
          "--spread": `${(children?.length ?? 0) * spread}px`,
          "--duration": `${duration}s`,
          backgroundImage:
            "linear-gradient(90deg,#0000_calc(50%-var(--spread)),#fff,#0000_calc(50%+var(--spread)))",
          animationDuration: "var(--duration)",
        } as React.CSSProperties
      }
    >
      {children}
    </Component>
  );
}
