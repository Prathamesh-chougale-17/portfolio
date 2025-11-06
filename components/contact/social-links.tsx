"use client";

import { useLocale } from "@/context/locale-provider";

export function SocialLinks() {
  const { t } = useLocale();

  return (
    <div className="flex justify-center space-x-8">
      {t.contact.socials.links.map((social, index) => (
        <a
          className="transform text-muted-foreground transition-all duration-300 hover:scale-110 hover:text-primary"
          href={social.url}
          key={index}
          rel="noopener noreferrer"
          target="_blank"
        >
          <social.name
            className={`h-8 w-8 ${
              (social.url.includes("twitter.com") ||
                social.url.includes("x.com")) &&
              "dark:invert"
            }`}
          />
        </a>
      ))}
    </div>
  );
}
