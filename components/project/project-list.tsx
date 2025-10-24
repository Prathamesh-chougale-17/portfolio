import { type Project, ProjectCard } from "./project-card";

type ProjectListProps = {
  projects: Project[];
};

export function ProjectList({ projects }: ProjectListProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project, index) => (
        <ProjectCard index={index} key={index} project={project} />
      ))}
    </div>
  );
}
