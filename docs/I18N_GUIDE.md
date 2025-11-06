# Multi-Language (i18n) Implementation Guide

This portfolio now supports multiple languages using a custom i18n implementation.

## 📁 File Structure

```
portfolio/
├── lib/
│   ├── i18n.ts              # i18n configuration & utilities
│   └── translations.ts       # Translation loader
├── context/
│   └── locale-provider.tsx   # Locale context & provider
├── data/
│   ├── lang.ts                 # English translations
│   └── hi.ts                 # Hindi translations
├── components/ui/
│   └── language-switcher.tsx # Language switcher component
└── types/
    └── lang.ts                 # Type definition for all languages
```

## 🌍 Currently Supported Languages

- **English** (en) 🇺🇸
- **Hindi** (hi) 🇮🇳

## 🚀 How to Use Translations

### In Client Components

```typescript
"use client";

import { useLocale } from "@/context/locale-provider";

export default function MyComponent() {
  const { t, locale } = useLocale();

  return (
    <div>
      <h1>{t.hero.title}</h1>
      <p>{t.hero.description}</p>
      <p>Current language: {locale}</p>
    </div>
  );
}
```

### Accessing Current Locale

```typescript
const { locale, setLocale, t } = useLocale();

// Get current locale
console.log(locale); // "en" or "hi"

// Change locale
setLocale("hi");

// Access translations
console.log(t.hero.name); // Translated text
```

## ➕ Adding a New Language

### Step 1: Update i18n Configuration

Edit [lib/i18n.ts](lib/i18n.ts:5):

```typescript
export type Locale = "en" | "hi" | "es"; // Add new locale

export const locales: Locale[] = ["en", "hi", "es"]; // Add to array

export const localeNames: Record<Locale, string> = {
  en: "English",
  hi: "हिन्दी",
  es: "Español", // Add locale name
};

export const localeFlags: Record<Locale, string> = {
  en: "🇺🇸",
  hi: "🇮🇳",
  es: "🇪🇸", // Add flag emoji
};
```

### Step 2: Create Translation File

Create `data/es.ts`:

```typescript
import { Icons } from "@/components/icons";
import type { langtype } from "@/types/en";

export const es: langtype = {
  leetcode_username: "prathameshchougale17",
  navItems: [
    { title: "Inicio", href: "/" },
    { title: "Proyectos", href: "/projects" },
    { title: "Acerca de", href: "/about" },
    { title: "Contacto", href: "/contact" },
  ],
  hero: {
    name: "Prathamesh Chougale",
    image: "/profile.webp",
    title: "Ingeniero de Software",
    company: "RDM",
    companyLink: "https://rdmtoken.com",
    description: "Desarrollador full-stack...",
  },
  // ... translate all other fields
};
```

### Step 3: Register Translation

Edit [lib/translations.ts](lib/translations.ts:7):

```typescript
import { es } from "@/data/es";

const translations: Record<Locale, langtype> = {
  en,
  hi,
  es, // Add new translation
};
```

## 🎨 Language Switcher Component

The language switcher is already added to the navbar. It shows:

- Flag emoji for each language
- Language name in native script
- Current selection highlighted
- Dropdown menu for easy switching

Location: [components/ui/language-switcher.tsx](components/ui/language-switcher.tsx)

## 🔧 How It Works

### 1. Locale Detection

On first visit, the system:

1. Checks `localStorage` for saved preference
2. Falls back to browser language detection
3. Defaults to English if no match found

### 2. Locale Persistence

Selected language is saved to `localStorage` and persists across sessions.

### 3. Type Safety

All translations use the same `langtype` interface, ensuring:

- All languages have the same structure
- No missing translations
- Full TypeScript autocomplete

## 📝 Migration Guide

To migrate existing pages from hardcoded `en` to using translations:

### Before:

```typescript
import { en } from "@/data/en";

export default function Page() {
  return <h1>{en.hero.title}</h1>;
}
```

### After:

```typescript
"use client";

import { useLocale } from "@/context/locale-provider";

export default function Page() {
  const { t } = useLocale();
  return <h1>{t.hero.title}</h1>;
}
```

## 🌐 Pages to Update

The following pages should be updated to use `useLocale()`:

- ✅ [app/page.tsx](app/page.tsx) - Already updated
- ⬜ [app/about/page.tsx](app/about/page.tsx)
- ⬜ [app/projects/page.tsx](app/projects/page.tsx)
- ⬜ [app/contact/page.tsx](app/contact/page.tsx)
- ⬜ Any other components importing `en` directly

## 🎯 Best Practices

1. **Always use `t` object** from `useLocale()` instead of importing `en` directly
2. **Keep translations synchronized** - ensure all language files have the same structure
3. **Test in all languages** - verify translations appear correctly
4. **Use semantic keys** - translation keys should be descriptive (e.g., `t.hero.title` not `t.h1`)
5. **Icons are language-agnostic** - Icons from `Icons` object don't need translation

## 🐛 Troubleshooting

### Language not switching?

- Check that `LocaleProvider` wraps your component in the layout
- Verify localStorage is enabled in browser
- Check browser console for errors

### Missing translations?

- Ensure new translation file exports the correct type (`langtype`)
- Verify the translation is registered in `lib/translations.ts`
- Check TypeScript errors for missing fields

### Hydration errors?

- Make sure pages using `useLocale()` are marked as `"use client"`
- Verify the same locale is used on server and client initial render

## 📚 Related Files

- [lib/i18n.ts](lib/i18n.ts) - i18n configuration
- [lib/translations.ts](lib/translations.ts) - Translation loader
- [context/locale-provider.tsx](context/locale-provider.tsx) - React context
- [components/ui/language-switcher.tsx](components/ui/language-switcher.tsx) - UI component
- [app/layout.tsx](app/layout.tsx) - Root layout with providers
- [types/lang.ts](types/lang.ts) - Translation type definition
