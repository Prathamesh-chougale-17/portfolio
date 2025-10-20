import { en } from "@/data/en";

export function SocialLinks() {
  return (
    <div className="flex justify-center space-x-8">
      {en.contact.socials.links.map((social, index) => (
        <a
          key={index}
          href={social.url}
          className="text-muted-foreground hover:text-primary transform hover:scale-110 transition-all duration-300"
          target="_blank"
          rel="noopener noreferrer"
        >
          <social.name
            className={`w-8 h-8 ${
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
