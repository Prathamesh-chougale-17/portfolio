import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  // Define your website URL - replace with your actual domain
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

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
