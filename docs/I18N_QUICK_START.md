# i18n Quick Start Guide

## 🚀 Quick Setup Checklist

Your portfolio already has i18n configured! Here's what you need to know:

## ✅ What's Already Done

- ✅ English (en) and Hindi (hi) translations created
- ✅ Language switcher added to navbar
- ✅ Locale provider configured
- ✅ Auto-detection from browser language
- ✅ LocalStorage persistence
- ✅ Type-safe translation structure

## 📝 Convert a Page to Use Translations

### Before:

```typescript
import { en } from "@/data/en";

export default function Page() {
  return (
    <div>
      <h1>{en.hero.title}</h1>
      <p>{en.hero.description}</p>
    </div>
  );
}
```

### After:

```typescript
"use client"; // Add this!

import { useLocale } from "@/context/locale-provider";

export default function Page() {
  const { t } = useLocale(); // Replace en with t

  return (
    <div>
      <h1>{t.hero.title}</h1>
      <p>{t.hero.description}</p>
    </div>
  );
}
```

## 🎨 Use Locale Information

```typescript
"use client";

import { useLocale } from "@/context/locale-provider";

export default function Page() {
  const { t, locale, setLocale } = useLocale();

  return (
    <div>
      {/* Display content */}
      <h1>{t.hero.title}</h1>

      {/* Show current locale */}
      <p>Current language: {locale}</p>

      {/* Change locale programmatically */}
      <button onClick={() => setLocale("hi")}>Switch to Hindi</button>
    </div>
  );
}
```

## 🌍 Add a New Language (e.g., Spanish)

### 1. Create Translation File

Create `data/es.ts`:

```typescript
import { Icons } from "@/components/icons";
import type { langtype } from "@/types/en";

export const es: langtype = {
  leetcode_username: "prathameshchougale17",
  navItems: [
    { title: "Inicio", href: "/" },
    { title: "Proyectos", href: "/projects" },
    // ... translate all fields
  ],
  // ... rest of translations
};
```

### 2. Update i18n Config

Edit `lib/i18n.ts`:

```typescript
export type Locale = "en" | "hi" | "es"; // Add new locale

export const locales: Locale[] = ["en", "hi", "es"];

export const localeNames: Record<Locale, string> = {
  en: "English",
  hi: "हिन्दी",
  es: "Español", // Add name
};

export const localeFlags: Record<Locale, string> = {
  en: "🇺🇸",
  hi: "🇮🇳",
  es: "🇪🇸", // Add flag
};
```

### 3. Register Translation

Edit `lib/translations.ts`:

```typescript
import { en } from "@/data/en";
import { hi } from "@/data/hi";
import { es } from "@/data/es"; // Import

const translations: Record<Locale, langtype> = {
  en,
  hi,
  es, // Register
};
```

### Done! 🎉

The language switcher will automatically show the new language.

## 🔍 Find Pages to Update

Search for files still using hardcoded `en`:

```bash
# Windows PowerShell
Get-ChildItem -Path app,components -Recurse -Include *.tsx,*.ts | Select-String "from '@/data/en'"

# Git Bash / Unix
grep -r "from '@/data/en'" app/ components/
```

## ⚡ Common Patterns

### Hero Section

```typescript
<HeroSection
  name={t.hero.name}
  title={t.hero.title}
  description={t.hero.description}
/>
```

### Projects List

```typescript
<ProjectsList projects={t.projects} />
```

### Navigation

```typescript
<nav>
  {t.navItems.map((item) => (
    <Link href={item.href} key={item.href}>
      {item.title}
    </Link>
  ))}
</nav>
```

### Form Labels

```typescript
<label>{t.contact.form.name.label}</label>
<input placeholder={t.contact.form.name.placeholder} />
```

## 🎯 Testing Checklist

- [ ] Switch to Hindi - verify content changes
- [ ] Refresh page - verify language persists
- [ ] Open in new tab - verify saved preference
- [ ] Clear localStorage - verify defaults to browser language
- [ ] Check all pages work in both languages

## 📚 Full Documentation

- [I18N_GUIDE.md](I18N_GUIDE.md) - Complete guide
- [MULTI_LANGUAGE_IMPLEMENTATION.md](MULTI_LANGUAGE_IMPLEMENTATION.md) - Implementation details
- [CLAUDE.md](../CLAUDE.md) - Project documentation

## 🆘 Quick Troubleshooting

**Language not switching?**
→ Make sure component has `"use client"` directive

**Hydration errors?**
→ Check that same locale is used on server and client

**TypeScript errors?**
→ Verify all translation files use `langtype` interface

**Missing dropdown?**
→ Run `bun install` to ensure @radix-ui/react-dropdown-menu is installed
