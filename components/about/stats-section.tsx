import React from "react";
import { LeetcodeRating } from "./leetcode-rating";

interface StatItemProps {
  value: string;
  label: string;
}

function StatItem({ value, label }: StatItemProps) {
  return (
    <div className="text-center">
      <div className="text-4xl font-bold text-primary mb-2">{value}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  );
}

interface StatsProps {
  statItems: Array<{ label: string; value: string }>;
}

export function StatsSection({ statItems }: StatsProps) {
  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold mb-8">Stats</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {statItems.map((stat, index) => (
          <StatItem key={index} value={stat.value} label={stat.label} />
        ))}
        <LeetcodeRating />
      </div>
    </section>
  );
}
