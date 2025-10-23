# PWA Configuration for Turbopack

This portfolio is configured as a Progressive Web App (PWA) that works with both Webpack and Turbopack.

## Features

- ✅ **Turbopack Compatible**: Works with `next dev --turbo` and `next build --turbo`
- ✅ **Offline Support**: Service worker caches assets for offline access
- ✅ **Install Prompt**: Can be installed as a standalone app
- ✅ **Background Sync**: Updates content in the background
- ✅ **Smart Caching**: Different caching strategies for different asset types

## How It Works

### Development Mode

1. Start the dev server with Turbopack:

   ```bash
   npm run dev -- --turbo
   # or
   bun dev -- --turbo
   ```

2. PWA registration is disabled in development by default (configurable in `pwa.config.ts`)

### Production Build

1. Build with Turbopack:

   ```bash
   npm run build:turbo
   # or
   npm run build
   ```

2. The build script automatically generates the service worker (`public/sw.js`)

3. Start the production server:
   ```bash
   npm start
   ```

## File Structure

```
portfolio/
├── pwa.config.ts              # PWA configuration (caching strategies, etc.)
├── components/
│   └── pwa-register.tsx       # Service worker registration component
├── scripts/
│   └── generate-sw.js         # Service worker generator script
├── public/
│   ├── manifest.json          # PWA manifest
│   ├── sw.js                  # Generated service worker (after build)
│   ├── offline.html           # Offline fallback page
│   └── icons/                 # App icons
└── app/
    └── layout.tsx             # Root layout with PWA registration
```

## Configuration

### PWA Settings (`pwa.config.ts`)

```typescript
export const PWA_CONFIG = {
  sw: {
    dest: "public",
    filename: "sw.js",
    scope: "/",
  },
  disable: process.env.NODE_ENV === "development", // Disable in dev
  runtimeCaching: [...], // Caching strategies
};
```

### Caching Strategies

The PWA uses different caching strategies for different types of content:

1. **CacheFirst**: Google Fonts, static assets (long-term cache)
2. **NetworkFirst**: API requests, pages (always fresh with fallback)
3. **StaleWhileRevalidate**: Images, JS, CSS (serve cache while updating)

### Customization

#### Change Caching Behavior

Edit `pwa.config.ts` to modify caching strategies:

```typescript
runtimeCaching: [
  {
    urlPattern: /\/api\/.*/i,
    handler: "NetworkFirst",      // or "CacheFirst", "StaleWhileRevalidate"
    options: {
      cacheName: "api-cache",
      expiration: {
        maxEntries: 16,
        maxAgeSeconds: 60 * 60 * 24,  // 24 hours
      },
      networkTimeoutSeconds: 10,
    },
  },
],
```

#### Enable PWA in Development

In `pwa.config.ts`:

```typescript
export const PWA_CONFIG = {
  disable: false, // Enable in development
  // ...
};
```

#### Add More Cached Routes

Edit `scripts/generate-sw.js` to add routes to pre-cache:

```javascript
return cache.addAll(["/", "/about", "/projects", "/contact", "/offline.html"]);
```

## Testing

### Test PWA Features

1. Build and run production server:

   ```bash
   npm run build
   npm start
   ```

2. Open Chrome DevTools:

   - **Application → Service Workers**: Check registration status
   - **Application → Cache Storage**: View cached assets
   - **Lighthouse**: Run PWA audit

3. Test offline mode:
   - Load the app
   - Open DevTools → Network → Throttling → Offline
   - Navigate the app (should work offline)

### Install as App

1. On desktop: Look for install icon in address bar
2. On mobile: Tap "Add to Home Screen" in browser menu

## Troubleshooting

### Service Worker Not Registering

- Check browser console for errors
- Ensure HTTPS (or localhost for dev)
- Clear browser cache and reload

### Hydration Error Fixed

The theme toggle component was causing hydration mismatches. Fixed by:

- Using `useState` and `useEffect` to handle SSR
- Rendering a neutral state during SSR
- Only showing theme-specific content after client-side mount

### Old Cache Not Clearing

Service worker automatically cleans old caches on activation. To force clear:

1. DevTools → Application → Clear Storage → Clear site data
2. Unregister service worker
3. Hard reload (Ctrl+Shift+R)

## Benefits

1. **Fast Loading**: Cached assets load instantly
2. **Offline Support**: Works without internet connection
3. **Installable**: Can be installed as a standalone app
4. **Turbopack Compatible**: Works with Next.js 16's fast bundler
5. **SEO Friendly**: Doesn't affect search engine optimization

## Resources

- [Next.js PWA Guide](https://nextjs.org/docs/app/building-your-application/configuring/progressive-web-apps)
- [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [PWA Best Practices](https://web.dev/progressive-web-apps/)
