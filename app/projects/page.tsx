"use client";
import React, { useState } from "react";
import { en } from "@/data/en";
import { ProjectList } from "@/components/project/project-list";
import { ProjectFilters } from "@/components/project/project-filters";
import { type Project } from "@/components/project/project-card";

const ProjectPage = () => {
  const { projects } = en;
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);

  return (
    <section className="py-12">
      <ProjectFilters
        projects={projects}
        onFilteredProjectsChange={setFilteredProjects}
      />

      <ProjectList projects={filteredProjects} />
    </section>
  );
};

export default ProjectPage;
