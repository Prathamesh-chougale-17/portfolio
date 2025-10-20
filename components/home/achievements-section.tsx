import { AchievementCard } from "@/components/home/achievement-card";
import { Achievement } from "@/types/home";

export function AchievementsSection({
  achievements,
}: {
  achievements: Achievement[];
}) {
  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold text-center mb-12">Key Achievements</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {achievements.map((achievement, index) => (
          <AchievementCard
            key={index}
            title={achievement.title}
            description={achievement.description}
            Icon={achievement.Icon}
          />
        ))}
      </div>
    </section>
  );
}
