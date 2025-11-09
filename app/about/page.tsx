import type { Metadata } from "next";
import AboutClient from "@/components/about/about-client";
import { JsonLd } from "@/components/json-ld";
import { OG_IMAGE, SITE_URL } from "@/lib/constant";
import { generateProfilePageSchema } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "About Me",
  description:
    "Learn more about Prathamesh Chougale - Full-stack Software Engineer with expertise in React, Next.js, TypeScript, and Node.js. Winner of Smart India Hackathon and HSBC Hackathon 2024.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Prathamesh Chougale | Software Engineer",
    description:
      "Full-stack Software Engineer with expertise in React, Next.js, TypeScript. Winner of Smart India Hackathon and HSBC Hackathon 2024.",
    url: `${SITE_URL}/about`,
    siteName: "Prathamesh Chougale",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "About Prathamesh Chougale",
      },
    ],
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Prathamesh Chougale | Software Engineer",
    description:
      "Full-stack Software Engineer with expertise in React, Next.js, TypeScript.",
    images: [OG_IMAGE],
  },
};

export default function AboutPage() {
  return (
    <>
      <JsonLd data={generateProfilePageSchema()} />
      <AboutClient />
    </>
  );
}
