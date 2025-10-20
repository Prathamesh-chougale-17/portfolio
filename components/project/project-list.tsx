import { FeaturedProjectCard } from "./featured-project-card";
import { ProjectCard, type Project } from "./project-card";

interface ProjectListProps {
  projects: Project[];
}

export function ProjectList({ projects }: ProjectListProps) {
  const featuredProjects = projects.filter((project) => project.featured);

  return (
    <>
      {featuredProjects.length > 0 && (
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 animate-fade-up">
            Featured Projects
          </h2>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {featuredProjects.map((project, index) => (
              <FeaturedProjectCard key={index} project={project} />
            ))}
          </div>
        </div>
      )}

      <div>
        <h2 className="text-2xl font-bold mb-6 animate-fade-up">
          All Projects
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </>
  );
}
