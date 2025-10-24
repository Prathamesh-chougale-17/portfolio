import type { MetadataRoute } from "next";
import { APP, ICONS } from "@/lib/constant";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: APP.name,
    short_name: APP.shortName,
    description: APP.description,
    start_url: APP.startUrl,
    display: "standalone",
    background_color: APP.backgroundColor,
    theme_color: APP.themeColor,
    orientation: "portrait-primary",
    scope: APP.scope,
    lang: APP.lang,
    icons: [
      {
        src: ICONS.android192,
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: ICONS.android512,
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: ICONS.android192,
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: ICONS.android512,
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    categories: ["business", "productivity", "utilities"],
  };
}
