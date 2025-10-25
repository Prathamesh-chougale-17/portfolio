import { en } from "@/data/en";

export default function SocialDock() {
  return (
    <div className="-translate-x-1/2 fixed bottom-5 left-1/2 z-50 hidden transform md:flex">
      <div className="flex items-center gap-3 rounded-full border border-border/50 bg-background/80 px-4 py-2 shadow-lg backdrop-blur-sm">
        {en.contact.socials.links.map((site) => (
          <a
            className="group relative flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 hover:rotate-6 hover:scale-125"
            href={site.url}
            key={site.url}
            rel="noopener noreferrer"
            target="_blank"
          >
            <site.name
              className={`h-5 w-5 transition-colors duration-300 group-hover:text-primary ${
                (site.url.includes("twitter.com") ||
                  site.url.includes("x.com")) &&
                "dark:invert"
              }`}
            />
          </a>
        ))}
      </div>
    </div>
  );
}
