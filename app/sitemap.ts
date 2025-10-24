import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constant";

export default function sitemap(): MetadataRoute.Sitemap {
  // Use centralized site URL
  const baseUrl = SITE_URL;

  // Get current date for lastModified
  const currentDate = new Date().toISOString();

  return [
    {
      url: `${baseUrl}/`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/offline`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    // You can add dynamic routes here as well
    // For example, if you have project details pages:
    // {
    //   url: `${baseUrl}/projects/project-1`,
    //   lastModified: currentDate,
    //   changeFrequency: 'monthly',
    //   priority: 0.7,
    // },
  ];
}
