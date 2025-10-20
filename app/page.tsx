import { HeroSection } from "@/components/home/hero-section";
import { AchievementsSection } from "@/components/home/achievements-section";
import { ProjectsSection } from "@/components/home/projects-section";
import { en } from "@/data/en";

export default function Home() {
  return (
    <main>
      <HeroSection
        image={en.hero.image}
        name={en.hero.name}
        title={en.hero.title}
        company={en.hero.company}
        description={en.hero.description}
        companyLink={en.hero.companyLink}
      />
      <AchievementsSection achievements={en.achievements.slice(0, 3)} />
      <ProjectsSection projects={en.projects.slice(0, 3)} />
    </main>
  );
}
