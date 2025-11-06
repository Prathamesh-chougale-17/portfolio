"use client";

import { parseAsStringLiteral, useQueryState } from "nuqs";
import React from "react";
import type { Locale } from "@/lib/i18n";
import {
  defaultLocale,
  detectBrowserLocale,
  getStoredLocale,
  locales,
  setStoredLocale,
} from "@/lib/i18n";
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
  const [initialized, setInitialized] = React.useState(false);

  // Initialize locale from query param, localStorage, or browser
  React.useEffect(() => {
    if (initialized) {
      return;
    }

    // If no query param is set, check localStorage or browser
    if (!localeParam || localeParam === defaultLocale) {
      const storedLocale = getStoredLocale();
      if (storedLocale && storedLocale !== defaultLocale) {
        setLocaleParam(storedLocale);
      } else {
        const browserLocale = detectBrowserLocale();
        if (browserLocale !== defaultLocale) {
          setLocaleParam(browserLocale);
          setStoredLocale(browserLocale);
        }
      }
    } else {
      // Sync query param to localStorage
      setStoredLocale(localeParam);
    }
    setInitialized(true);
  }, [initialized, localeParam, setLocaleParam]);

  // Update translations when locale changes
  React.useEffect(() => {
    setTranslations(getTranslations(localeParam));
    setStoredLocale(localeParam);
  }, [localeParam]);

  const setLocale = React.useCallback(
    (newLocale: Locale) => {
      setLocaleParam(newLocale);
      setStoredLocale(newLocale);
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
      const url = new URL(href, window.location.origin);
      url.searchParams.set("lang", localeParam);

      // Return pathname + search (relative URL)
      return `${url.pathname}${url.search}${url.hash}`;
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
