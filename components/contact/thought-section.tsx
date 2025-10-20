import { en } from "@/data/en";
import { SocialLinks } from "./social-links";

export function ThoughtSection() {
  return (
    <section className="mb-16 text-center">
      <div className="mx-auto">
        <h1 className="text-3xl md:text-5xl font-bold mb-6 animate-fade-in">
          <em>{en.contact.thoughtTitle}</em>
        </h1>
        <p className="text-lg italic text-muted-foreground mb-10 animate-fade-in-up">
          {en.contact.thoughtText}
        </p>
        <SocialLinks />
      </div>
    </section>
  );
}
