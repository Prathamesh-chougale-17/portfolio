"use client";

import { useCallback, useRef, type MouseEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { flushSync } from "react-dom";

type AnimatedLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
};

export const AnimatedLink = ({
  href,
  children,
  className,
  ...props
}: AnimatedLinkProps) => {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const router = useRouter();

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
      className={className}
      {...props}
    >
      {children}
    </Link>
  );
};
