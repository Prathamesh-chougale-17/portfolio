"use client";

import { AchievementsSection } from "@/components/home/achievements-section";
import { HeroSection } from "@/components/home/hero-section";
import { ProjectsSection } from "@/components/home/projects-section";
import { useLocale } from "@/context/locale-provider";

export default function Home() {
  const { t } = useLocale();

  return (
    <main>
      <HeroSection
        company={t.hero.company}
        companyLink={t.hero.companyLink}
        description={t.hero.description}
        image={t.hero.image}
        intro={t.hero.intro}
        name={t.hero.name}
        title={t.hero.title}
      />
      <AchievementsSection
        achievements={t.achievements.slice(0, 3)}
        title={t.homeSection.achievementSectionTitle}
      />
      <ProjectsSection
        projects={t.projects.slice(0, 3)}
        title={t.homeSection.projectSectionTitle}
      />
    </main>
  );
}
