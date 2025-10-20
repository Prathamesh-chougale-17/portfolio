import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { IconProps } from "../icons";
import { JSX } from "react";

interface TechSkill {
  name: string;
  level: number;
  icon: (props: IconProps) => JSX.Element;
}

interface TechStackSectionProps {
  skills: TechSkill[];
}

export function TechStackSection({ skills }: TechStackSectionProps) {
  return (
    <section className="mb-16">
      <h2 className="text-3xl font-bold mb-8 tracking-tight">Tech Stack</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {skills.map((Skill, index) => (
          <Card
            key={Skill.name}
            className="animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardHeader className="pb-2">
              <div className="flex justify-center text-primary">
                <Skill.icon className="w-8 h-8" />
              </div>
            </CardHeader>
            <CardContent className="text-center">
              <h3 className="font-medium">{Skill.name}</h3>
              <div className="flex justify-center mt-2 space-x-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 w-4 rounded-full ${
                      i < Skill.level ? "bg-primary" : "bg-muted"
                    }`}
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
