interface WorkExperience {
  title: string;
  company: string;
  period: string;
  description: string;
}

interface ExperienceTimelineProps {
  experiences: WorkExperience[];
}

export function ExperienceTimeline({ experiences }: ExperienceTimelineProps) {
  return (
    <section>
      <h2 className="text-3xl font-bold mb-8 tracking-tight">
        Work Experience
      </h2>
      <div className="space-y-8">
        {experiences.map((exp, index) => (
          <div
            key={index}
            className="relative pl-8 pb-8 border-l border-gray-300 dark:border-gray-600 animate-fade-in"
            style={{ animationDelay: `${index * 200}ms` }}
          >
            <div className="absolute w-4 h-4 bg-primary rounded-full -left-2 top-0" />
            <div className="mb-1 text-xl font-semibold">{exp.title}</div>
            <div className="flex justify-between mb-2">
              <span className="text-muted-foreground">{exp.company}</span>
              <span className="text-muted-foreground">{exp.period}</span>
            </div>
            <p>{exp.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
