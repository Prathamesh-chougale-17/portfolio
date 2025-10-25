import { en } from "@/data/en";

export function Footer() {
  return (
    <footer className="border-t bg-background px-4 sm:px-6 md:px-8 lg:px-12">
      <p className="py-6 text-center text-muted-foreground text-sm leading-loose md:text-left">
        &copy; {new Date().getFullYear()} {en.hero.name}. All rights reserved.
      </p>
    </footer>
  );
}
