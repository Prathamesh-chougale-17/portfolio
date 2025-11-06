/**
 * i18n Configuration
 * Manages language detection, locale preferences, and translations
 */

export type Locale = "en" | "hi";

export const locales: Locale[] = ["en", "hi"];

export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
  en: "English",
  hi: "हिन्दी",
};

export const localeFlags: Record<Locale, string> = {
  en: "🇺🇸",
  hi: "🇮🇳",
};

/**
 * Get locale from localStorage or default
 */
export function getStoredLocale(): Locale {
  if (typeof window === "undefined") {
    return defaultLocale;
  }

  const stored = localStorage.getItem("locale");
  if (stored && locales.includes(stored as Locale)) {
    return stored as Locale;
  }

  return defaultLocale;
}

/**
 * Save locale to localStorage
 */
export function setStoredLocale(locale: Locale): void {
  if (typeof window === "undefined") {
    return;
  }
  localStorage.setItem("locale", locale);
}

/**
 * Detect user's preferred locale from browser
 */
export function detectBrowserLocale(): Locale {
  if (typeof window === "undefined") {
    return defaultLocale;
  }

  const browserLang = navigator.language.split("-")[0];

  if (locales.includes(browserLang as Locale)) {
    return browserLang as Locale;
  }

  return defaultLocale;
}
