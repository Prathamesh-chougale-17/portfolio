type WorkExperience = {
  title: string;
  company: string;
  period: string;
  description: string;
};

type ExperienceTimelineProps = {
  experiences: WorkExperience[];
};

export function ExperienceTimeline({ experiences }: ExperienceTimelineProps) {
  return (
    <section>
      <h2 className="mb-8 font-bold text-3xl tracking-tight">
        Work Experience
      </h2>
      <div className="space-y-8">
        {experiences.map((exp, index) => (
          <div
            className="relative animate-fade-in border-gray-300 border-l pb-8 pl-8 dark:border-gray-600"
            key={index}
            style={{ animationDelay: `${index * 200}ms` }}
          >
            <div className="-left-2 absolute top-0 h-4 w-4 rounded-full bg-primary" />
            <div className="mb-1 font-semibold text-xl">{exp.title}</div>
            <div className="mb-2 flex justify-between">
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
