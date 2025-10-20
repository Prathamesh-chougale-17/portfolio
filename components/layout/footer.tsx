import Link from "next/link";
import { en } from "@/data/en";

export function Footer() {
  return (
    <footer className="border-t bg-background px-4 sm:px-6 md:px-8 lg:px-12">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose md:text-left">
            &copy; {new Date().getFullYear()} Prathamesh Chougale. All rights reserved.
          </p>
        </div>
        <div className="flex gap-4 mr-10">
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
      </div>
    </footer>
  );
}
