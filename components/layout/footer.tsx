import Link from "next/link";
import { Github, Linkedin, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-background px-4 sm:px-6 md:px-8 lg:px-12">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose md:text-left">
            &copy; {new Date().getFullYear()} Portfolio. All rights reserved.
          </p>
        </div>
        <div className="flex gap-4 mr-10">
          <Link
            href="https://twitter.com/username"
            target="_blank"
            rel="noreferrer"
            className="hover:text-foreground/80"
          >
            <Twitter className="h-5 w-5" />
            <span className="sr-only">Twitter</span>
          </Link>
          <Link
            href="https://github.com/username"
            target="_blank"
            rel="noreferrer"
            className="hover:text-foreground/80"
          >
            <Github className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </Link>
          <Link
            href="https://linkedin.com/in/username"
            target="_blank"
            rel="noreferrer"
            className="hover:text-foreground/80"
          >
            <Linkedin className="h-5 w-5" />
            <span className="sr-only">LinkedIn</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
