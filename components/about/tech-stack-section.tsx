import type { JSX } from "react";
import type { IconProps } from "@/components/icons";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

type TechSkill = {
  name: string;
  level: number;
  icon: (props: IconProps) => JSX.Element;
};

type TechStackSectionProps = {
  skills: TechSkill[];
  title: string;
};

export function TechStackSection({ skills, title }: TechStackSectionProps) {
  return (
    <section className="mb-16">
      <h2 className="mb-8 font-bold text-3xl tracking-tight">{title}</h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {skills.map((Skill, index) => (
          <Card
            className="animate-fade-in"
            key={Skill.name}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardHeader className="pb-2">
              <div className="flex justify-center text-primary">
                <Skill.icon className="h-8 w-8" />
              </div>
            </CardHeader>
            <CardContent className="text-center">
              <h3 className="font-medium">{Skill.name}</h3>
              <div className="mt-2 flex justify-center space-x-1">
                {[...new Array(5)].map((_, i) => (
                  <div
                    className={`h-1.5 w-4 rounded-full ${
                      i < Skill.level ? "bg-primary" : "bg-muted"
                    }`}
                    key={i}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
