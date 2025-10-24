import { en } from "@/data/en";
import { SocialLinks } from "./social-links";

export function ThoughtSection() {
  return (
    <section className="mb-16 text-center">
      <div className="mx-auto">
        <h1 className="mb-6 animate-fade-in font-bold text-3xl md:text-5xl">
          <em>{en.contact.thoughtTitle}</em>
        </h1>
        <p className="mb-10 animate-fade-in-up text-lg text-muted-foreground italic">
          {en.contact.thoughtText}
        </p>
        <SocialLinks />
      </div>
    </section>
  );
}
