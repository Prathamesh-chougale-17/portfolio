"use client";

import { useCallback, useRef, type MouseEvent } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { flushSync } from "react-dom";
import { cn } from "@/lib/utils";

type AnimatedLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  activeClassName?: string;
  showActiveIndicator?: boolean;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
  style?: React.CSSProperties;
};

export const AnimatedLink = ({
  href,
  children,
  className,
  activeClassName,
  showActiveIndicator = true,
  ...props
}: AnimatedLinkProps) => {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  // Check if this link is active
  const isActive =
    pathname === href || (href !== "/" && pathname.startsWith(href));

  const handleClick = useCallback(
    async (e: MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();

      if (!linkRef.current) {
        router.push(href);
        return;
      }

      // Check if View Transitions API is supported
      if (!document.startViewTransition) {
        router.push(href);
        return;
      }

      const { top, left, width, height } =
        linkRef.current.getBoundingClientRect();
      const x = left + width / 2;
      const y = top + height / 2;
      const maxRadius = Math.hypot(
        Math.max(left, window.innerWidth - left),
        Math.max(top, window.innerHeight - top)
      );

      const transition = document.startViewTransition(() => {
        flushSync(() => {
          router.push(href);
        });
      });

      await transition.ready;

      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${maxRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 1000,
          easing: "ease-in-out",
          pseudoElement: "::view-transition-new(root)",
        }
      );
    },
    [href, router]
  );

  return (
    <Link
      ref={linkRef}
      href={href}
      onClick={handleClick}
      className={cn(
        "relative group",
        className,
        isActive && (activeClassName || "text-foreground font-semibold")
      )}
      {...props}
    >
      {children}
      {showActiveIndicator && (
        <>
          {/* Active indicator - bottom border with gradient */}
          <span
            className={cn(
              "absolute -bottom-1 left-0 h-0.5 bg-linear-to-r from-primary via-purple-500 to-primary transition-all duration-300",
              isActive ? "w-full" : "w-0 group-hover:w-full"
            )}
          />
          {/* Glow effect on active */}
          <span
            className={cn(
              "absolute inset-0 -z-10 blur-xl opacity-0 transition-opacity duration-300",
              isActive && "opacity-20 bg-primary"
            )}
          />
        </>
      )}
    </Link>
  );
};
