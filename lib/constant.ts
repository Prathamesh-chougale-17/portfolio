// Centralized application constants
// Keep non-sensitive values here. Secrets still belong in env variables.

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://prathamesh-chougale.vercel.app";

export const MANIFEST_ROUTE = "/manifest.json";

export const OG_IMAGE = "/icons/og-image.png";

export const ICONS = {
  favicon32: "/icons/favicon-32x32.png",
  favicon16: "/icons/favicon-16x16.png",
  appleTouch: "/icons/apple-touch-icon.png",
  android192: "/icons/android-chrome-192x192.png",
  android512: "/icons/android-chrome-512x512.png",
};

export const APP = {
  name: "Prathamesh Chougale - Software Engineer",
  shortName: "Prathamesh C.",
  description:
    "Full-stack software engineer specializing in React, Next.js, and TypeScript. Winner of Smart India Hackathon and HSBC Hackathon 2024.",
  themeColor: "#000000",
  backgroundColor: "#000000",
  lang: "en",
  startUrl: "/",
  scope: "/",
};

// PWA/service worker constants. Note: public/sw.js is a static file and cannot import TS modules,
// but keeping these here is helpful for server-side code and future builds.
export const CACHE_NAME = "portfolio-v1";
export const STATIC_ASSETS = [
  "/",
  "/about",
  "/projects",
  "/contact",
  "/offline",
];

export const SITEMAP = {
  defaultChangeFreq: "weekly",
  defaultPriority: 0.8,
};

export default {
  SITE_URL,
  MANIFEST_ROUTE,
  ICONS,
  APP,
  CACHE_NAME,
  STATIC_ASSETS,
};
