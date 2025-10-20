import React from "react";
import { en } from "@/data/en";
import { ProjectList } from "@/components/project/project-list";

const ProjectPage = () => {
  const { projects } = en;

  return (
    <section className="py-12">
      {/* Header Section */}
      {/* <div className="max-w-3xl mx-auto mb-16 text-center animate-fade-up">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          {projectsPage.title}
        </h1>
        <p className="mt-3 text-xl text-muted-foreground sm:mt-4">
          {projectsPage.subtitle}
        </p>
        <div className="max-w-2xl mx-auto mt-6">
          <p className="text-lg text-muted-foreground">
            {projectsPage.description}
          </p>
        </div>
      </div> */}

      <ProjectList projects={projects} />
    </section>
  );
};

export default ProjectPage;
