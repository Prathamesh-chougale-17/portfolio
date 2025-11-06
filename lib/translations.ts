/**
 * Translation loader
 * Central place to get translations by locale
 */

import type { Locale } from "@/lib/i18n";
import type { entype } from "@/types/en";
import { en } from "@/data/en";
import { hi } from "@/data/hi";

const translations: Record<Locale, entype> = {
  en,
  hi,
};

export function getTranslations(locale: Locale): entype {
  return translations[locale] || translations.en;
}
