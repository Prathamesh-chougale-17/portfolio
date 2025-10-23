"use client";

import { useEffect } from "react";
import PWA_CONFIG from "@/pwa.config";

/**
 * PWA Registration Component
 * Registers the service worker when the app loads
 * Works with both Webpack and Turbopack
 */
export function PWARegister() {
  useEffect(() => {
    // Skip registration in development if configured
    if (PWA_CONFIG.disable) {
      console.log("PWA is disabled in development mode");
      return;
    }

    // Check if service workers are supported
    if (
      typeof window !== "undefined" &&
      "serviceWorker" in navigator &&
      window.workbox !== undefined
    ) {
      const wb = window.workbox;

      // Add event listeners for service worker lifecycle
      wb.addEventListener("installed", (event: any) => {
        console.log(
          `Service worker installed: ${
            event.isUpdate ? "Updated" : "First time"
          }`
        );
      });

      wb.addEventListener("controlling", () => {
        console.log("Service worker is now controlling the page");
        // Reload page to ensure all assets are from the service worker
        window.location.reload();
      });

      wb.addEventListener("activated", (event: any) => {
        if (!event.isUpdate) {
          console.log("Service worker activated for the first time!");
          // Show install prompt or notification
        } else {
          console.log("Service worker updated!");
        }
      });

      // Register the service worker
      wb.register()
        .then((registration: ServiceWorkerRegistration) => {
          console.log(
            "Service worker registered successfully:",
            registration.scope
          );
        })
        .catch((error: Error) => {
          console.error("Service worker registration failed:", error);
        });
    } else if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      // Fallback registration without workbox
      navigator.serviceWorker
        .register(PWA_CONFIG.sw.filename, { scope: PWA_CONFIG.sw.scope })
        .then((registration) => {
          console.log("Service worker registered:", registration.scope);

          // Check for updates
          registration.addEventListener("updatefound", () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener("statechange", () => {
                if (
                  newWorker.state === "installed" &&
                  navigator.serviceWorker.controller
                ) {
                  console.log("New service worker available");
                  // Optionally show update notification
                }
              });
            }
          });
        })
        .catch((error) => {
          console.error("Service worker registration failed:", error);
        });
    } else {
      console.log("Service workers are not supported in this browser");
    }
  }, []);

  return null;
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    workbox: any;
  }
}
