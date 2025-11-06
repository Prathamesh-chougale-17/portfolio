"use client";

import { useLocale } from "@/context/locale-provider";
import { SocialLinks } from "./social-links";

export function ThoughtSection() {
  const { t } = useLocale();

  return (
    <section className="mb-16 text-center">
      <div className="mx-auto">
        <h1 className="mb-6 animate-fade-in font-bold text-3xl md:text-5xl">
          <em>{t.contact.thoughtTitle}</em>
        </h1>
        <p className="mb-10 animate-fade-in-up text-lg text-muted-foreground italic">
          {t.contact.thoughtText}
        </p>
        <SocialLinks />
      </div>
    </section>
  );
}
