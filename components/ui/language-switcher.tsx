"use client";

import * as React from "react";
import { Languages } from "lucide-react";
import { useLocale } from "@/context/locale-provider";
import { locales, localeNames, localeFlags, type Locale } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          aria-label="Select language"
          className="gap-2"
          size="icon"
          variant="ghost"
        >
          <Languages className="h-5 w-5" />
          <span className="sr-only">Toggle language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {locales.map((loc) => (
          <DropdownMenuItem
            className={`cursor-pointer ${locale === loc ? "bg-accent" : ""}`}
            key={loc}
            onClick={() => setLocale(loc)}
          >
            <span className="mr-2">{localeFlags[loc]}</span>
            {localeNames[loc]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
