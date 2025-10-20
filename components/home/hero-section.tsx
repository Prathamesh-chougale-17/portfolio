import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { HeroSectionProps } from "@/types/home";

export function HeroSection({
  name,
  image,
  title,
  company,
  description,
  companyLink,
}: HeroSectionProps) {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between gap-8 py-12 animate-fade-in">
      <div className="space-y-4 max-w-xl">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          Hi, I&apos;m <span className="text-primary">{name}</span>
        </h1>
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-semibold text-muted-foreground">
            {title}
          </h2>
          {companyLink ? (
            <a href={companyLink} target="_blank" rel="noopener noreferrer">
              <Badge className="text-sm">{company}</Badge>
            </a>
          ) : (
            <Badge className="text-sm">{company}</Badge>
          )}
        </div>
        <p className="text-muted-foreground text-lg">{description}</p>
      </div>
      <div className="relative w-64 h-64 md:w-80 md:h-80">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover rounded-full hover:animate-pulse border-4 border-primary"
          priority
        />
      </div>
    </section>
  );
}
