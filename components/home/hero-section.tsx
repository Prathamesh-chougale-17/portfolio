import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import type { HeroSectionProps } from "@/types/home";

export function HeroSection({
  name,
  image,
  title,
  company,
  description,
  companyLink,
}: HeroSectionProps) {
  return (
    <section className="flex animate-fade-in flex-col items-center justify-between gap-8 py-12 md:flex-row">
      <div className="max-w-xl space-y-4">
        <h1 className="font-bold text-4xl tracking-tight md:text-6xl">
          Hi, I&apos;m <span className="text-primary">{name}</span>
        </h1>
        <div className="flex items-center gap-2">
          <h2 className="font-semibold text-2xl text-muted-foreground">
            {title}
          </h2>
          {companyLink ? (
            <a href={companyLink} rel="noopener noreferrer" target="_blank">
              <Badge className="text-sm">{company}</Badge>
            </a>
          ) : (
            <Badge className="text-sm">{company}</Badge>
          )}
        </div>
        <p className="text-lg text-muted-foreground">{description}</p>
      </div>
      <div className="relative h-64 w-64 md:h-80 md:w-80">
        <Image
          alt={name}
          className="rounded-full border-4 border-primary object-cover hover:animate-pulse"
          fill
          placeholder="blur"
          priority // ✅ automatically uses built-in tiny blur
          quality={80}
          src={image}
        />
      </div>
    </section>
  );
}
