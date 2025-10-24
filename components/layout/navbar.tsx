import { AnimatedThemeToggler } from "@/components/ui/theme-toggle";
import { AnimatedLink } from "@/components/ui/animated-link";
import { MobileNav } from "@/components/layout/mobile-nav";
import Image from "next/image";
// Navigation items

export function Navbar({
  navItems,
}: {
  navItems: { title: string; href: string }[];
}) {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 sm:px-6 md:px-8 lg:px-12">
      <div className="flex justify-between items-center h-16 py-4">
        {/* Logo - Left */}
        <div className="flex items-center">
          <AnimatedLink
            href="/"
            className="items-center space-x-2 md:flex"
            showActiveIndicator={false}
          >
            <Image
              src="/icons/android-chrome-192x192.png"
              alt="Logo"
              width={64}
              height={64}
              className="hidden md:inline-block"
            />
            {/* <span className="text-xl font-bold">MyApp</span> */}
          </AnimatedLink>
        </div>

        {/* Desktop navigation - Center */}
        <nav className="hidden md:flex justify-center gap-8 items-center">
          {navItems.map((item) => (
            <AnimatedLink
              key={item.href}
              href={item.href}
              className="flex items-center text-base font-medium transition-all duration-300 hover:text-foreground text-foreground/70 py-1"
            >
              {item.title}
            </AnimatedLink>
          ))}
        </nav>

        {/* Theme toggle and mobile nav - Right */}
        <div className="flex items-center justify-end gap-2">
          <AnimatedThemeToggler />
          <MobileNav navItems={navItems} />
        </div>
      </div>
    </header>
  );
}
