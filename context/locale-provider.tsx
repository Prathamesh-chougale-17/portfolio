"use client";

import React from "react";
import type { Locale } from "@/lib/i18n";
import {
  defaultLocale,
  detectBrowserLocale,
  getStoredLocale,
  setStoredLocale,
} from "@/lib/i18n";
import { getTranslations } from "@/lib/translations";
import type { entype } from "@/types/en";

type LocaleContextType = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: entype;
};

const LocaleContext = React.createContext<LocaleContextType | undefined>(
  undefined
);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = React.useState<Locale>(defaultLocale);
  const [translations, setTranslations] = React.useState<entype>(
    getTranslations(defaultLocale)
  );

  // Initialize locale from localStorage or browser
  React.useEffect(() => {
    const storedLocale = getStoredLocale();
    if (storedLocale) {
      setLocaleState(storedLocale);
      setTranslations(getTranslations(storedLocale));
    } else {
      const browserLocale = detectBrowserLocale();
      setLocaleState(browserLocale);
      setTranslations(getTranslations(browserLocale));
      setStoredLocale(browserLocale);
    }
  }, []);

  const setLocale = React.useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    setTranslations(getTranslations(newLocale));
    setStoredLocale(newLocale);
  }, []);

  const value = React.useMemo(
    () => ({
      locale,
      setLocale,
      t: translations,
    }),
    [locale, setLocale, translations]
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
