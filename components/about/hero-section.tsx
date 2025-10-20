import Image from "next/image";
import { Badge } from "@/components/ui/badge";

interface HeroSectionProps {
  image: string;
  title: string;
  subtitle: string;
  description: string;
  skills: string[];
}

export function HeroSection({
  image,
  title,
  subtitle,
  description,
  skills,
}: HeroSectionProps) {
  return (
    <section className="mb-16">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
        <div className="lg:col-span-3 space-y-4">
          <h1 className="text-4xl font-bold tracking-tight animate-fade-in">
            {title}
          </h1>
          <p className="text-xl text-muted-foreground">{subtitle}</p>
          <div className="space-y-4 mt-6">
            <p>{description}</p>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <Badge
                  key={skill}
                  variant="outline"
                  className="animate-fade-in"
                  style={{ animationDelay: `${(index + 1) * 100}ms` }}
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        <div className="lg:col-span-2 flex justify-center lg:justify-end">
          <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden animate-fade-in animation-delay-300">
            <Image
              src={image}
              alt="Profile Image"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
