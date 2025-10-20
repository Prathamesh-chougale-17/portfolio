import { Icons } from "@/components/icons";
import { entype } from "@/types/en";
export const en: entype = {
  leetcode_username: "prathameshchougale17",
  navItems: [
    { title: "Home", href: "/" },
    { title: "Projects", href: "/projects" },
    { title: "About", href: "/about" },
    { title: "Contact", href: "/contact" },
  ],
  hero: {
    name: "Prathamesh Chougale",
    image: "/profile.jpg",
    title: "Software Engineer",
    company: "RDM",
    companyLink: "https://rdmtoken.com",
    description:
      "Full-stack developer skilled in React, Next.js, and TypeScript. Passionate about building performant, accessible, and scalable web applications with real-world impact.",
  },
  achievements: [
    {
      title: "Smart India Hackathon Winner",
      description:
        "Secured Rank 1 in the Smart India Hackathon for developing an innovative real-world solution under national evaluation.",
      Icon: Icons.trophy,
    },
    {
      title: "HSBC Hackathon Winner 2024",
      description:
        "Won HSBC Hackathon 2024 by developing a high-impact web-based solution addressing financial workflow challenges.",
      Icon: Icons.award,
    },
    {
      title: "Open Source Contributor",
      description:
        "Contributed to popular open-source repositories such as Next.js SaaS Starter (12k+ stars), enhancing production-grade SaaS development tools.",
      Icon: Icons.gitHub,
    },
  ],
  projectsPage: {
    title: "My Projects",
    subtitle: "Showcasing My Creative Work",
    description:
      "Explore my portfolio of projects that combine creativity, engineering, and real-world problem solving using React, Next.js, and AI technologies.",
  },
  projects: [
    {
      title: "Oorja AI",
      description:
        "A wellness platform offering personalized mental and physical health assessments. Integrated AI features for personalized recommendations and interactive learning.",
      tags: ["Next.js", "Next auth", "Shadcn", "MongoDB"],
      liveLink: "https://oorjaai.vercel.app",
      image: "/projects/oorja.png",
      featured: true,
    },
    {
      title: "Swaad Link",
      description:
        "A full-stack web app for booking personal chefs with real-time availability, Chef Profiles, and advanced search/filtering.",
      tags: ["React.js", "Clerk", "Node.js", "Express.js", "MongoDB"],
      githubLink: "https://github.com/Prathamesh-chougale-17/swaadLink",
      liveLink: "https://swaadlink.vercel.app",
      image: "/projects/swaadlink.png",
      featured: false,
    },
    {
      title: "Health Vault",
      description:
        "Digital health record platform using Next.js and Clerk, enabling patients to store, retrieve, and manage health data efficiently.",
      tags: ["Next.js", "Sanity", "MongoDB", "Clerk"],
      githubLink: "https://github.com/Prathamesh-chougale-17/health-vault",
      liveLink: "https://health-vault.vercel.app",
      image: "/projects/health-vault.png",
      featured: false,
    },
    {
      title: "Next.js SaaS Starter Contributions",
      description:
        "Open-source contributions to Next.js SaaS Starter (12.3k+ stars) — improving developer experience for production-grade SaaS products.",
      tags: ["Next.js", "TypeScript", "Open Source"],
      githubLink: "https://github.com/nextjs/saas-starter",
      liveLink: "https://next-saas-start.vercel.app",
      image: "/projects/saas.png",
      featured: true,
    },
  ],
  about: {
    hero: {
      title: "About Me",
      image: "/profile.jpg",
      subtitle:
        "Full Stack Developer | Open Source Contributor | Problem Solver",
      description:
        "I'm a passionate full-stack developer with a strong foundation in computer science and hands-on experience building scalable web applications. My journey includes developing enterprise dashboards for HSBC, leading hackathon teams, and contributing to open source projects.",
      skills: ["React", "Next.js", "TypeScript", "Node.js", "MongoDB"],
    },
    techSkills: [
      { name: "React", level: 5, icon: Icons.react },
      { name: "TypeScript", level: 5, icon: Icons.typescript },
      { name: "Next.js", level: 5, icon: Icons.nextjs },
      { name: "Node.js", level: 4, icon: Icons.nodejs },
      { name: "Tailwind CSS", level: 5, icon: Icons.tailwindcss },
      { name: "Python", level: 3, icon: Icons.python },
      { name: "Docker", level: 3, icon: Icons.docker },
      { name: "Git/GitHub", level: 5, icon: Icons.gitHub },
      { name: "Databases", level: 4, icon: Icons.database },
    ],
    experiences: [
      {
        title: "Software Trainee Intern",
        company: "HSBC",
        period: "Jan 2025 - Mar 2025",
        description:
          "Developed a full-stack internal web application to consolidate team updates and organizational data into a unified dashboard. Improved internal visibility and collaboration using React.js and Java.",
      },
      {
        title: "Freelance Full Stack Developer",
        company: "Self-employed",
        period: "Sep 2024 - Dec 2024",
        description:
          "Built and maintained dynamic web applications for clients using React.js, Next.js, and TypeScript. Contributed clean, reusable, and scalable code to open-source repositories.",
      },
      {
        title: "Community Contributor",
        company: "ACM Chapter, PCCOE",
        period: "2024",
        description:
          "Conducted sessions for 300+ students on Git, GitHub, and Open Source. Helped establish a strong developer community and fostered contributions to public projects.",
      },
    ],
    stats: {
      statItems: [
        { label: "LeetCode Problems Solved", value: "250+" },
        { label: "Hackathon Wins", value: "5+" },
      ],
      leetcodeRating: "1500+",
    },
  },
  contact: {
    thoughtTitle: "Let's Build Something Impactful",
    thoughtText:
      "I love collaborating on innovative ideas that push boundaries. If you’re working on something exciting or need a developer to bring your vision to life, let’s connect!",
    imageUrl: "/contact/recieved.gif",
    imageAlt: "Developer working on laptop",
    socials: {
      title: "Connect with me",
      links: [
        {
          name: Icons.instagram,
          url: "https://instagram.com/prathamesh_chougale_17",
        },
        { name: Icons.x, url: "https://twitter.com/prathamesh_7717" },
        {
          name: Icons.linkedin,
          url: "https://linkedin.com/in/prathamesh-chougale",
        },
        {
          name: Icons.gitHub,
          url: "https://github.com/prathamesh-chougale-17",
        },
      ],
    },
    form: {
      title: "Send Me a Message",
      name: { label: "Name", placeholder: "Your name" },
      email: { label: "Email", placeholder: "your.email@example.com" },
      subject: { label: "Subject", placeholder: "Enter message subject" },
      message: {
        label: "Message",
        placeholder: "Tell me about your project or inquiry...",
      },
      submit: "Send Message",
      success: "Thanks for reaching out! I'll get back to you soon.",
      error: "Something went wrong. Please try again.",
    },
  },
};
