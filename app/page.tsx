import { AchievementsSection } from "@/components/home/achievements-section";
import { HeroSection } from "@/components/home/hero-section";
import { ProjectsSection } from "@/components/home/projects-section";
import { en } from "@/data/en";

export default function Home() {
  return (
    <main>
      <HeroSection
        company={en.hero.company}
        companyLink={en.hero.companyLink}
        description={en.hero.description}
        image={en.hero.image}
        name={en.hero.name}
        title={en.hero.title}
      />
      <AchievementsSection achievements={en.achievements.slice(0, 3)} />
      <ProjectsSection projects={en.projects.slice(0, 3)} />
    </main>
  );
}
