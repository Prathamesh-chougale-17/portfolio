import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { en } from "@/data/en";

export default function SocialDock() {
  return (
    <div className="-translate-x-1/2 fixed bottom-5 left-1/2 z-50 hidden transform md:flex">
      <div className="flex items-center gap-3 rounded-full border border-border/50 bg-background/80 px-4 py-2 shadow-lg backdrop-blur-sm">
        {en.contact.socials.links.map((site) => {
          const label = site.label;
          return (
            <Tooltip key={site.url}>
              <TooltipTrigger asChild>
                <a
                  aria-label={label}
                  className="group relative flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 hover:rotate-6 hover:scale-125"
                  href={site.url}
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
                  <div className="absolute inset-0 rounded-full bg-linear-to-r from-primary/20 to-accent/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="-inset-1 absolute rounded-full bg-primary/10 opacity-0 blur transition-opacity duration-300 group-hover:opacity-100" />
                </a>
              </TooltipTrigger>
              <TooltipContent>
                <p>{label}</p>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>
    </div>
  );
}
