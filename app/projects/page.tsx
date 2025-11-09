import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import ProjectsClient from "@/components/project/projects-client";
import { OG_IMAGE, SITE_URL } from "@/lib/constant";
import { generateProjectSchema } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore Prathamesh Chougale's portfolio of full-stack web applications, including Smart India Hackathon and HSBC Hackathon winning projects. Built with React, Next.js, TypeScript, Node.js, and more.",
  alternates: {
    canonical: `${SITE_URL}/projects`,
  },
  openGraph: {
    title: "Projects | Prathamesh Chougale",
    description:
      "Full-stack web applications portfolio featuring award-winning hackathon projects and innovative solutions using modern web technologies.",
    url: `${SITE_URL}/projects`,
    siteName: "Prathamesh Chougale",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Prathamesh Chougale Projects",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects | Prathamesh Chougale",
    description:
      "Full-stack web applications portfolio featuring award-winning hackathon projects.",
    images: [OG_IMAGE],
  },
};

export default function ProjectPage() {
  // Featured projects for structured data
  const featuredProjects = [
    {
      title: "Smart India Hackathon Project",
      description:
        "Winner of Smart India Hackathon - innovative solution for government problem statement",
      liveLink: `${SITE_URL}/projects`,
      tags: ["React", "Next.js", "TypeScript", "Node.js"],
    },
    {
      title: "HSBC Hackathon 2024 Project",
      description:
        "Winner of HSBC Hackathon 2024 - financial technology solution",
      liveLink: `${SITE_URL}/projects`,
      tags: ["React", "TypeScript", "Node.js"],
    },
  ];

  return (
    <>
      {featuredProjects.map((project) => (
        <JsonLd data={generateProjectSchema(project)} key={project.title} />
      ))}
      <ProjectsClient />
    </>
  );
}
