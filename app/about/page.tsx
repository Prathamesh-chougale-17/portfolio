import { HeroSection } from "@/components/about/hero-section";
import { StatsSection } from "@/components/about/stats-section";
import { TechStackSection } from "@/components/about/tech-stack-section";
import { ExperienceTimeline } from "@/components/about/experience-timeline";
import { en } from "@/data/en";

export default function AboutPage() {
  const { about } = en;
  return (
    <main className="py-12">
      <HeroSection
        image={about.hero.image}
        title={about.hero.title}
        subtitle={about.hero.subtitle}
        description={about.hero.description}
        skills={about.hero.skills}
      />
      <StatsSection statItems={about.stats?.statItems || []} />
      <TechStackSection skills={about.techSkills} />
      <ExperienceTimeline experiences={about.experiences} />
    </main>
  );
}
