import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink } from "lucide-react";
import { Project } from "@/types/home";

export function ProjectCard({
  title,
  description,
  tags,
  githubLink,
  liveLink,
}: Project) {
  return (
    <Card
      className="flex flex-col cursor-pointer h-full bg-gradient-to-br from-background to-muted/50 backdrop-blur-sm border-muted-foreground/10 transition-all duration-300 
    hover:shadow-xl hover:shadow-blue-400/20 hover:border-blue-400/50 hover:scale-[1.02] 
    dark:hover:shadow-blue-500/30 dark:bg-gradient-to-br dark:from-background dark:to-background/80
    after:absolute after:inset-0 after:rounded-lg after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-300 after:bg-gradient-to-br after:from-blue-400/5 after:to-purple-600/5 after:pointer-events-none after:-z-10"
    >
      <CardHeader className="pb-2 relative z-10">
        <CardTitle className="text-xl bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/90">
          {title}
        </CardTitle>
        <div className="flex flex-wrap gap-2 mt-2">
          {tags.map((tag, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="bg-secondary/80 hover:bg-secondary transition-colors"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </CardHeader>
      <CardContent className="flex-grow pt-2 relative z-10">
        <CardDescription className="text-base text-muted-foreground">
          {description}
        </CardDescription>
      </CardContent>
      <CardFooter className="flex gap-2 relative z-10">
        <Button
          asChild
          variant="outline"
          size="sm"
          className="border-primary/50 hover:bg-primary/10 hover:text-primary transition-all"
        >
          <a
            href={githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1"
          >
            <Github className="h-4 w-4" /> Code
          </a>
        </Button>
        {liveLink && (
          <Button
            asChild
            variant="default"
            size="sm"
            className="bg-primary/90 hover:bg-primary transition-colors shadow-sm hover:shadow-md hover:shadow-blue-400/30"
          >
            <a
              href={liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1"
            >
              <ExternalLink className="h-4 w-4" /> Demo
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
