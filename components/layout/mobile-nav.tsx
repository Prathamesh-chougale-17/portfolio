"use client";

import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { Menu } from "lucide-react";
import { useState } from "react";
import { AnimatedLink } from "@/components/ui/animated-link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

type NavItem = {
  title: string;
  href: string;
};

type MobileNavProps = {
  navItems: NavItem[];
};

export function MobileNav({ navItems }: MobileNavProps) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet onOpenChange={setOpen} open={open}>
      <SheetTrigger asChild>
        <Button className="px-0 md:hidden" size="icon" variant="ghost">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        className="w-[280px] border-l px-6 py-8 focus:outline-none sm:w-[350px]"
        side="right"
      >
        <div className="flex h-full flex-col">
          <div className="mb-6 flex items-center justify-between border-b pb-6">
            <DialogTitle>Prathamesh Chougale</DialogTitle>
            <DialogDescription />
          </div>
          <nav className="flex flex-col gap-3">
            {navItems.map((item, index) => (
              <AnimatedLink
                activeClassName="text-foreground font-semibold bg-accent/30 translate-x-1"
                className="relative rounded-lg px-4 py-3 font-medium text-foreground/70 text-lg transition-all duration-300 hover:translate-x-2 hover:bg-accent/50 hover:text-foreground"
                href={item.href}
                key={item.href}
                onClick={() => setOpen(false)}
                showActiveIndicator={false}
                style={{
                  animationDelay: `${index * 50}ms`,
                }}
              >
                <span className="relative z-10">{item.title}</span>
              </AnimatedLink>
            ))}
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
}
