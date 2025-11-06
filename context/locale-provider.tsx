"use client";

import { parseAsStringLiteral, useQueryState } from "nuqs";
import React from "react";
import { SITE_URL } from "@/lib/constant";
import type { Locale } from "@/lib/i18n";
import { defaultLocale, locales } from "@/lib/i18n";
import { getTranslations } from "@/lib/translations";
import type { entype } from "@/types/en";

type LocaleContextType = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: entype;
  getLocalizedHref: (href: string) => string;
};

const LocaleContext = React.createContext<LocaleContextType | undefined>(
  undefined
);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  // Use nuqs to manage locale via query params
  const [localeParam, setLocaleParam] = useQueryState(
    "lang",
    parseAsStringLiteral(locales).withDefault(defaultLocale)
  );

  const [translations, setTranslations] = React.useState<entype>(
    getTranslations(localeParam)
  );

  // Update translations when locale changes (query param only)
  React.useEffect(() => {
    setTranslations(getTranslations(localeParam));
  }, [localeParam]);

  const setLocale = React.useCallback(
    (newLocale: Locale) => {
      setLocaleParam(newLocale);
    },
    [setLocaleParam]
  );

  // Helper function to add language parameter to hrefs
  const getLocalizedHref = React.useCallback(
    (href: string) => {
      // Don't add lang param to external links
      if (href.startsWith("http") || href.startsWith("//")) {
        return href;
      }

      // Don't add lang param if it's the default locale
      if (localeParam === defaultLocale) {
        return href;
      }

      // Parse the href to handle existing query params
      try {
        // Use SITE_URL as the base for parsing relative URLs (SSR-safe)
        const url = new URL(href, SITE_URL);
        url.searchParams.set("lang", localeParam);

        // Return pathname + search + hash (relative URL)
        return `${url.pathname}${url.search}${url.hash}`;
      } catch {
        // Fallback for invalid URLs
        const separator = href.includes("?") ? "&" : "?";
        return `${href}${separator}lang=${localeParam}`;
      }
    },
    [localeParam]
  );

  const value = React.useMemo(
    () => ({
      locale: localeParam,
      setLocale,
      t: translations,
      getLocalizedHref,
    }),
    [localeParam, setLocale, translations, getLocalizedHref]
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = React.useContext(LocaleContext);
  if (context === undefined) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return context;
}
