import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constant";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = SITE_URL;

  return {
    // Rules for all bots, with Google specifically mentioned
    rules: {
      userAgent: "*",
      allow: "/",
      // No disallow rules since we want complete access
    },
    // Link to your sitemap - helps Google discover all pages
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
