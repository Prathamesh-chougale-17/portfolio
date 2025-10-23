"use client";

import { useEffect } from "react";

/**
 * PWA Registration Component
 * Following Next.js official PWA documentation
 * https://nextjs.org/docs/app/guides/progressive-web-apps
 */
export function PWARegister() {
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      "serviceWorker" in navigator &&
      process.env.NODE_ENV === "production"
    ) {
      // Register service worker
      navigator.serviceWorker
        .register("/sw.js", {
          scope: "/",
          updateViaCache: "none",
        })
        .then((registration) => {
          console.log("[PWA] Service worker registered:", registration.scope);

          // Check for updates
          registration.addEventListener("updatefound", () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener("statechange", () => {
                if (
                  newWorker.state === "installed" &&
                  navigator.serviceWorker.controller
                ) {
                  console.log("[PWA] New service worker available");
                  // Optionally show update notification to user
                }
              });
            }
          });
        })
        .catch((error) => {
          console.error("[PWA] Service worker registration failed:", error);
        });
    }
  }, []);

  return null;
}
