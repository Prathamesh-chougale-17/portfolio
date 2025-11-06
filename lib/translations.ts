/**
 * Translation loader
 * Central place to get translations by locale
 */

import { en } from "@/data/en";
import { hi } from "@/data/hi";
import { mr } from "@/data/mr";
import type { Locale } from "@/lib/i18n";
import type { entype } from "@/types/en";

const translations: Record<Locale, entype> = {
  en,
  hi,
  mr,
};

export function getTranslations(locale: Locale): entype {
  return translations[locale] || translations.en;
}
