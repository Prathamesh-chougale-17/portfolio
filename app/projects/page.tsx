"use client";
import { useState } from "react";
import type { Project } from "@/components/project/project-card";
import { ProjectFilters } from "@/components/project/project-filters";
import { ProjectList } from "@/components/project/project-list";
import { en } from "@/data/en";

const ProjectPage = () => {
  const { projects } = en;
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);

  return (
    <section className="py-12">
      <ProjectFilters
        onFilteredProjectsChange={setFilteredProjects}
        projects={projects}
      />

      <ProjectList projects={filteredProjects} />
    </section>
  );
};

export default ProjectPage;
