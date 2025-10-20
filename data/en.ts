import { Icons } from "@/components/icons";
import { entype } from "@/types/en";
export const en: entype = {
  leetcode_username: "prathameshchougale17", // Add your LeetCode username here to dynamically fetch your stats
  navItems: [
    { title: "Home", href: "/" },
    { title: "Projects", href: "/projects" },
    // { title: "Blog", href: "/blog" },
    { title: "About", href: "/about" },
    { title: "Contact", href: "/contact" },
  ],
  hero: {
    name: "Prathamesh Chougale",
    image: "/profile.jpg",
    title: "Software Engineer Intern",
    company: "HSBC",
    companyLink: "https://hsbc.com",
    description:
      "Passionate developer focused on creating performant and accessible web applications using modern technologies like React, Next.js, and TypeScript.",
  },
  achievements: [
    {
      title: "Open Source Contributor",
      description:
        "Contributed to over 50 open source projects including React, Next.js, and various popular libraries.",
      Icon: Icons.gitHub,
    },
    {
      title: "Tech Conference Speaker",
      description:
        "Presented at 10+ international conferences on topics related to web performance and accessibility.",
      Icon: Icons.mic,
    },
    {
      title: "Award-Winning Developer",
      description:
        "Received the Developer of the Year award at the 2023 Web Excellence Awards.",
      Icon: Icons.trophy,
    },
  ],
  projectsPage: {
    title: "My Projects",
    subtitle: "Showcasing My Creative Work",
    description:
      "A collection of my recent projects highlighting my skills in web development, user experience design, and modern technologies.",
  },
  projects: [
      {
      title: "NextGen E-commerce",
      description:
        "A blazing fast e-commerce platform built with Next.js, TypeScript and Tailwind CSS.",
      tags: ["Next.js", "TypeScript", "Tailwind"],
      githubLink: "https://github.com/johndoe/nextgen-ecommerce",
      liveLink: "https://nextgen-ecommerce.vercel.app",
      image: "/placeholder.svg",
      featured: true,
    },
    {
      title: "DevCollab",
      description:
        "Real-time collaboration tool for developers with integrated code editor and version control.",
      tags: ["React", "Socket.io", "Node.js"],
      githubLink: "https://github.com/johndoe/devcollab",
      image: "/placeholder.svg",
      featured: false,
    },
    {
      title: "Accessible UI Library",
      description:
        "A collection of accessible, reusable UI components following WCAG guidelines.",
      tags: ["React", "TypeScript", "ARIA"],
      githubLink: "https://github.com/johndoe/accessible-ui",
      liveLink: "https://accessible-ui.vercel.app",
      image: "/placeholder.svg",
      featured: false,
    },
    {
      title: "Task Management Dashboard",
      description:
        "A productivity application for managing tasks, deadlines, and team collaboration.",
      tags: ["Next.js", "Prisma", "tRPC"],
      githubLink: "https://github.com/johndoe/task-dashboard",
      liveLink: "https://task-dashboard.vercel.app",
      image: "/placeholder.svg",
      featured: true,
    },
    {
      title: "AI Content Generator",
      description:
        "An AI-powered tool for generating marketing copy, blog posts, and social media content.",
      tags: ["OpenAI", "React", "Node.js"],
      githubLink: "https://github.com/johndoe/ai-content-generator",
      image: "/placeholder.svg",
      featured: false,
    },
    {
      title: "Personal Finance Tracker",
      description:
        "A secure application for tracking expenses, creating budgets, and visualizing financial data.",
      tags: ["Next.js", "Chart.js", "PostgreSQL"],
      githubLink: "https://github.com/johndoe/finance-tracker",
      liveLink: "https://finance-tracker.vercel.app",
      image: "/placeholder.svg",
      featured: false,
    },
  ],
    about: {
    hero: {
      title: "About Me",
      image: "/profile.jpg",
      subtitle: "Full Stack Developer specializing in modern web technologies",
      description:
        "I'm a passionate developer with over 7 years of experience building web applications and digital experiences. My journey has taken me from startups to enterprise organizations, where I've honed my skills in creating performant, accessible, and beautiful interfaces.",
      skills: ["React", "TypeScript", "Next.js", "Node.js", "TailwindCSS"],
  },
    techSkills: [
      { name: "React", level: 5, icon: Icons.react },
      { name: "TypeScript", level: 5, icon: Icons.typescript },
      { name: "Next.js", level: 4, icon: Icons.nextjs },
      { name: "Node.js", level: 4, icon: Icons.nodejs },
      { name: "Tailwind CSS", level: 5, icon: Icons.tailwindcss },
      { name: "Python", level: 3, icon: Icons.python },
      { name: "Docker", level: 3, icon: Icons.docker },
      { name: "AWS", level: 4, icon: Icons.aws },
      { name: "Databases", level: 4, icon: Icons.database },
      { name: "Git/GitHub", level: 5, icon: Icons.gitHub },
    ],
    experiences: [
      {
        title: "Senior Frontend Developer",
        company: "Tech Innovations Inc.",
        period: "2021 - Present",
        description:
          "Lead frontend development using React, TypeScript, and Next.js. Implemented design systems and improved performance by 40%.",
      },
      {
        title: "Full Stack Developer",
        company: "Digital Solutions",
        period: "2018 - 2021",
        description:
          "Developed full-stack applications with Node.js and React. Collaborated with cross-functional teams to deliver client projects.",
      },
      {
        title: "Junior Developer",
        company: "StartUp Ventures",
        period: "2016 - 2018",
        description:
          "Built responsive web applications and contributed to the company's core product development.",
      },
    ],
    stats: {
      statItems: [
        { label: "Projects Completed", value: "25" },
        { label: "Hackathon Participations", value: "12" },
        // Add more stats as needed
      ],
      leetcodeRating: "1850+",
    },
  },
  contact: {
    thoughtTitle: "Let's Create Something Amazing Together",
    thoughtText:
      "I'm passionate about turning ideas into reality. Whether you have a project in mind or just want to say hello, I'd love to hear from you!",
    imageUrl: "/placeholder.svg",
    imageAlt: "Person working at desk with laptop and notebook",
    socials: {
      title: "Connect with me",
      links: [
        { name: Icons.instagram, url: "https://instagram.com/username" },
        { name: Icons.x, url: "https://twitter.com/username" },
        { name: Icons.linkedin, url: "https://linkedin.com/in/username" },
        { name: Icons.gitHub, url: "https://github.com/username" },
      ],
    },
    form: {
      title: "Send Me a Message",
      name: {
        label: "Name",
        placeholder: "Your name",
      },
      email: {
        label: "Email",
        placeholder: "your.email@example.com",
      },
      subject: {
        label: "Subject",
        placeholder: "Enter message subject",
      },
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
