import { ProjectCard } from "@/components/home/project-card";
import { Project } from "@/types/home";

export function ProjectsSection({ projects }: { projects: Project[] }) {
  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold text-center mb-12">Popular Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            title={project.title}
            description={project.description}
            tags={project.tags}
            githubLink={project.githubLink}
            liveLink={project.liveLink}
          />
        ))}
      </div>
    </section>
  );
}
