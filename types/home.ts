import { IconProps } from "@/components/icons";
import { JSX } from "react";

export interface Achievement {
  title: string;
  description: string;
  Icon: (props: IconProps) => JSX.Element;
}

export interface Project {
  title: string;
  description: string;
  tags: string[];
  githubLink: string;
  liveLink?: string;
}

export interface HeroSectionProps {
  image: string;
  name: string;
  title: string;
  company: string;
  description: string;
  companyLink?: string;
}
