import Image from "next/image";
import { MobileNav } from "@/components/layout/mobile-nav";
import { AnimatedLink } from "@/components/ui/animated-link";
import { AnimatedThemeToggler } from "@/components/ui/theme-toggle";
// Navigation items

export function Navbar({
  navItems,
}: {
  navItems: { title: string; href: string }[];
}) {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 sm:px-6 md:px-8 lg:px-12">
      <div className="flex h-16 items-center justify-between py-4">
        {/* Logo - Left */}
        <div className="flex items-center">
          <AnimatedLink
            className="items-center space-x-2 md:flex"
            href="/"
            showActiveIndicator={false}
          >
            <Image
              alt="Logo"
              className="hidden md:inline-block"
              height={64}
              src="/icons/android-chrome-192x192.png"
              width={64}
            />
            {/* <span className="text-xl font-bold">MyApp</span> */}
          </AnimatedLink>
        </div>

        {/* Desktop navigation - Center */}
        <nav className="hidden items-center justify-center gap-8 md:flex">
          {navItems.map((item) => (
            <AnimatedLink
              className="flex items-center py-1 font-medium text-base text-foreground/70 transition-all duration-300 hover:text-foreground"
              href={item.href}
              key={item.href}
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
