"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { AnimatedLink } from "@/components/ui/animated-link";

interface NavItem {
  title: string;
  href: string;
}

interface MobileNavProps {
  navItems: NavItem[];
}

export function MobileNav({ navItems }: MobileNavProps) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" className="px-0 md:hidden" size="icon">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="px-6 py-8 w-[280px] sm:w-[350px] border-l focus:outline-none"
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between pb-6 border-b mb-6">
            <DialogTitle>Prathamesh Chougale</DialogTitle>
            <DialogDescription></DialogDescription>
          </div>
          <nav className="flex flex-col gap-3">
            {navItems.map((item, index) => (
              <AnimatedLink
                key={item.href}
                href={item.href}
                className="relative text-foreground/70 transition-all duration-300 hover:text-foreground text-lg font-medium hover:translate-x-2 px-4 py-3 rounded-lg hover:bg-accent/50"
                activeClassName="text-foreground font-semibold bg-accent/30 translate-x-1"
                showActiveIndicator={false}
                onClick={() => setOpen(false)}
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
