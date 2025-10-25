import { Dock, DockIcon } from "@/components/ui/dock";
import { en } from "@/data/en";
export default function SocialDock() {
  return (
    <div className="fixed z-90 hidden w-full items-center justify-center md:bottom-5 md:block">
      <Dock iconDistance={100} iconMagnification={60}>
        {en.contact.socials.links.map((site, index) => (
          <a
            href={site.url}
            key={index}
            rel="noopener noreferrer"
            target="_blank"
          >
            <DockIcon>
              <site.name
                className={`h-8 w-8 ${
                  (site.url.includes("twitter.com") ||
                    site.url.includes("x.com")) &&
                  "dark:invert"
                }`}
              />
            </DockIcon>
          </a>
        ))}
      </Dock>
    </div>
  );
}
