import { ExperienceTimeline } from "@/components/about/experience-timeline";
import { HeroSection } from "@/components/about/hero-section";
import { StatsSection } from "@/components/about/stats-section";
import { TechStackSection } from "@/components/about/tech-stack-section";
import { en } from "@/data/en";

export default function AboutPage() {
  const { about } = en;
  return (
    <main className="py-12">
      <HeroSection
        description={about.hero.description}
        image={about.hero.image}
        skills={about.hero.skills}
        subtitle={about.hero.subtitle}
        title={about.hero.title}
      />
      <StatsSection statItems={about.stats?.statItems || []} />
      <TechStackSection skills={about.techSkills} />
      <ExperienceTimeline experiences={about.experiences} />
    </main>
  );
}
