/**
 * Locale Utilities
 * Helper functions for working with localized URLs
 */

import type { Locale } from "@/lib/i18n";
import { defaultLocale } from "@/lib/i18n";

/**
 * Add language parameter to a URL
 * @param href - The base URL (can be relative or absolute)
 * @param locale - The locale to add
 * @returns URL with language parameter
 */
export function addLangParam(href: string, locale: Locale): string {
  // Don't add lang param to external links
  if (href.startsWith("http") || href.startsWith("//")) {
    return href;
  }

  // Don't add lang param if it's the default locale
  if (locale === defaultLocale) {
    return href;
  }

  try {
    // Parse the href to handle existing query params
    const url = new URL(href, "http://dummy.com");
    url.searchParams.set("lang", locale);

    // Return pathname + search + hash (relative URL)
    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    // Fallback if URL parsing fails
    const separator = href.includes("?") ? "&" : "?";
    return `${href}${separator}lang=${locale}`;
  }
}

/**
 * Remove language parameter from a URL
 * @param href - The URL with potential lang parameter
 * @returns URL without language parameter
 */
export function removeLangParam(href: string): string {
  try {
    const url = new URL(href, "http://dummy.com");
    url.searchParams.delete("lang");
    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return href;
  }
}

/**
 * Extract locale from URL search params
 * @param searchParams - URL search params
 * @returns Locale if found, otherwise undefined
 */
export function getLocaleFromParams(
  searchParams: URLSearchParams
): Locale | undefined {
  const lang = searchParams.get("lang");
  if (lang === "en" || lang === "hi" || lang === "mr") {
    return lang;
  }
}
