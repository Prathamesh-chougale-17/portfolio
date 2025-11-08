import { SITE_URL } from "@/lib/constant";

export function generatePersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Prathamesh Chougale",
    url: SITE_URL,
    image: `${SITE_URL}/profile.webp`,
    jobTitle: "Software Engineer",
    worksFor: {
      "@type": "Organization",
      name: "RDM",
      url: "https://rdmtoken.com",
    },
    description:
      "Full-stack software engineer specializing in React, Next.js, and TypeScript. Winner of Smart India Hackathon and HSBC Hackathon 2024.",
    sameAs: [
      "https://github.com/Prathamesh-chougale-17",
      "https://www.linkedin.com/in/prathamesh-chougale-519333237",
      "https://twitter.com/prathamesh_7717",
    ],
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "Your University", // Update this
    },
    knowsAbout: [
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "MongoDB",
      "Web Development",
      "Full Stack Development",
    ],
    award: ["Smart India Hackathon Winner", "HSBC Hackathon 2024 Winner"],
  };
}

export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Prathamesh Chougale - Software Engineer",
    url: SITE_URL,
    description:
      "Portfolio website of Prathamesh Chougale, a full-stack software engineer specializing in React, Next.js, and TypeScript.",
    author: {
      "@type": "Person",
      name: "Prathamesh Chougale",
    },
    inLanguage: "en-US",
  };
}

export function generateProjectSchema(project: {
  title: string;
  description: string;
  liveLink?: string;
  githubLink?: string;
  image?: string;
  tags: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.title,
    description: project.description,
    url: project.liveLink,
    applicationCategory: "WebApplication",
    screenshot: project.image ? `${SITE_URL}${project.image}` : undefined,
    keywords: project.tags.join(", "),
    ...(project.githubLink && {
      codeRepository: project.githubLink,
    }),
    creator: {
      "@type": "Person",
      name: "Prathamesh Chougale",
    },
  };
}

export function generateBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}

export function generateProfilePageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    dateCreated: "2024-01-01T00:00:00Z", // Update with actual date
    dateModified: new Date().toISOString(),
    mainEntity: generatePersonSchema(),
  };
}
