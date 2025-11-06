# Localized Navigation with Query Parameters

## Overview

The portfolio now uses **query parameters** to persist language preferences across all routes. When a user selects a language, the `?lang=XX` parameter is automatically added to all internal links.

## How It Works

### URL Structure

- **English (default)**: `https://example.com/` or `https://example.com/about`
- **Hindi**: `https://example.com/?lang=hi` or `https://example.com/about?lang=hi`
- **Marathi**: `https://example.com/?lang=mr` or `https://example.com/about?lang=mr`

### Automatic Link Localization

All internal navigation links are automatically localized:

1. **AnimatedLink Component**: Automatically adds the language parameter to all hrefs
2. **Navigation**: The navbar, mobile nav, and all menu items preserve the language
3. **Programmatic Navigation**: Use the `getLocalizedHref` helper from context

## Usage

### Using AnimatedLink (Recommended)

The `AnimatedLink` component automatically handles localization:

```tsx
import { AnimatedLink } from "@/components/ui/animated-link";

// This will automatically include ?lang=XX if not English
<AnimatedLink href="/about">About</AnimatedLink>;
```

### Using the Locale Context

Access localization helpers in any component:

```tsx
import { useLocale } from "@/context/locale-provider";

function MyComponent() {
  const { locale, getLocalizedHref, setLocale } = useLocale();

  // Get a localized URL
  const aboutUrl = getLocalizedHref("/about");
  // Returns: "/about?lang=mr" (if Marathi is selected)

  // Change language
  setLocale("mr"); // Updates URL and all links
}
```

### Manual Link Construction

If you need to manually construct localized URLs:

```tsx
import { addLangParam } from "@/lib/locale-utils";
import { useLocale } from "@/context/locale-provider";

function MyComponent() {
  const { locale } = useLocale();

  const myUrl = addLangParam("/contact", locale);
  // Returns: "/contact?lang=hi" (if Hindi is selected)
}
```

## Features

### ✅ URL Persistence

- Language preference is visible in the URL
- Users can share links with their preferred language
- Browser back/forward buttons work correctly

### ✅ Smart Defaults

- Default locale (English) doesn't add query parameter
- External links are not modified
- Existing query parameters are preserved

### ✅ Pure Query Parameter Based

- No localStorage usage - language preference is ONLY in the URL
- Clean, stateless approach
- Share any link and it will show the exact language

## Implementation Details

### Priority Order

1. **URL Query Parameter** (`?lang=mr`) - The ONLY source of language state
2. **Default** (English) - Fallback when no query parameter present

### Component Updates

**Updated Components:**

- ✅ `context/locale-provider.tsx` - Added `getLocalizedHref` helper
- ✅ `components/ui/animated-link.tsx` - Auto-localizes all internal links
- ✅ `lib/locale-utils.ts` - Utility functions for URL manipulation

**Already Compatible:**

- ✅ Navbar (uses AnimatedLink)
- ✅ Mobile Navigation (uses AnimatedLink)
- ✅ Footer links (uses AnimatedLink)

## Best Practices

### Do's ✅

- Use `AnimatedLink` for all internal navigation
- Use `getLocalizedHref()` for programmatic navigation
- Let the system handle query parameters automatically

### Don'ts ❌

- Don't manually add `?lang=XX` to hrefs
- Don't use plain `<Link>` for internal navigation (use `AnimatedLink` instead)
- Don't construct URLs with string concatenation

## Example: Complete Flow

1. User visits `https://example.com/` (sees English - default)
2. User selects Marathi from language switcher
3. URL updates to `https://example.com/?lang=mr`
4. User clicks "About" link
5. URL becomes `https://example.com/about?lang=mr`
6. User shares this link with a friend
7. Friend opens `https://example.com/about?lang=mr` and sees Marathi content immediately
8. If friend removes `?lang=mr` from URL, they see English (default)

## Migration Notes

No changes needed for most components! All components using `AnimatedLink` are already compatible. Only manual URL construction needs to use the provided helpers.
