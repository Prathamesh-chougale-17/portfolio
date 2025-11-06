"use client";

import { useState } from "react";
import type { Project } from "@/components/project/project-card";
import { ProjectFilters } from "@/components/project/project-filters";
import { ProjectList } from "@/components/project/project-list";
import { useLocale } from "@/context/locale-provider";

const ProjectPage = () => {
  const { t } = useLocale();
  const { projects } = t;
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
