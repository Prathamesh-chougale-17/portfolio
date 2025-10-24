import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Project } from "./project-card";

type FeaturedProjectCardProps = {
  project: Project;
};

export function FeaturedProjectCard({ project }: FeaturedProjectCardProps) {
  return (
    <Card className="animate-fade-up overflow-hidden border-2 border-primary/20 pt-0 transition-all duration-300 hover:border-primary/50">
      <div className="relative h-60 w-full">
        <Image
          alt={project.title}
          className="object-cover"
          fill
          src={project.image}
        />
      </div>
      <CardHeader>
        <CardTitle className="text-2xl">{project.title}</CardTitle>
        <CardDescription className="line-clamp-2">
          {project.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag, tagIndex) => (
            <Badge
              className="hover:bg-secondary/80"
              key={tagIndex}
              variant="secondary"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        {project.githubLink && (
          <Button asChild size="sm">
            <Link
              className="flex items-center gap-2"
              href={project.githubLink}
              rel="noopener noreferrer"
              target="_blank"
            >
              <Github className="h-4 w-4" />
              Code
            </Link>
          </Button>
        )}
        {project.liveLink && (
          <Button asChild size="sm">
            <Link
              className="flex items-center gap-2"
              href={project.liveLink}
              rel="noopener noreferrer"
              target="_blank"
            >
              <ExternalLink className="h-4 w-4" />
              Live Demo
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
