# Quick Reference: PWA with Turbopack

## 🚀 Quick Start

### Development

```bash
# Start with Turbopack
bun dev -- --turbo
# or
npm run dev -- --turbo
```

### Production

```bash
# Build (generates service worker)
npm run build:turbo

# Start server
npm start
```

## 📁 Key Files

| File                          | Purpose                                          |
| ----------------------------- | ------------------------------------------------ |
| `pwa.config.ts`               | PWA configuration (edit caching strategies here) |
| `components/pwa-register.tsx` | Service worker registration (auto-loaded)        |
| `scripts/generate-sw.js`      | Service worker generator (runs on build)         |
| `public/offline.html`         | Offline fallback page                            |
| `public/manifest.json`        | App manifest (name, icons, colors)               |

## ⚙️ Common Tasks

### Enable PWA in Development

Edit `pwa.config.ts`:

```typescript
disable: false, // Change from true to false
```

### Change Cache Duration

Edit `pwa.config.ts`:

```typescript
{
  urlPattern: /\/api\/.*/i,
  handler: "NetworkFirst",
  options: {
    expiration: {
      maxAgeSeconds: 3600, // 1 hour (in seconds)
    },
  },
}
```

### Add New Caching Rule

Edit `pwa.config.ts`:

```typescript
runtimeCaching: [
  // ... existing rules
  {
    urlPattern: /\/my-custom-route\/.*/i,
    handler: "CacheFirst", // or NetworkFirst, StaleWhileRevalidate
    options: {
      cacheName: "my-custom-cache",
      expiration: {
        maxEntries: 50,
        maxAgeSeconds: 86400, // 24 hours
      },
    },
  },
];
```

### Update Offline Page

Edit `public/offline.html` - it's a standard HTML file.

### Change App Name/Colors

Edit `public/manifest.json`:

```json
{
  "name": "My App",
  "theme_color": "#ff0000",
  ...
}
```

## 🐛 Troubleshooting

### Service Worker Not Updating

```bash
# Clear Next.js cache
rm -rf .next

# Rebuild
npm run build
```

### PWA Not Working Locally

- PWA requires HTTPS (or localhost)
- Check if service worker registered: DevTools → Application → Service Workers

### Hydration Error

✅ Already fixed in `components/ui/theme-toggle.tsx`

### Build Fails with Turbopack

Make sure you're using Next.js 16.0.0+:

```bash
npm list next
```

## 📊 Testing

### Check PWA Score

1. Build: `npm run build`
2. Start: `npm start`
3. Open Chrome DevTools → Lighthouse
4. Run "Progressive Web App" audit

### Test Offline Mode

1. Load app in browser
2. Open DevTools → Network
3. Set throttling to "Offline"
4. Navigate app (should work!)

### View Cached Assets

DevTools → Application → Cache Storage

## 🎯 Caching Strategies

| Strategy                 | When to Use                           | Example              |
| ------------------------ | ------------------------------------- | -------------------- |
| **CacheFirst**           | Static assets that rarely change      | Fonts, icons, images |
| **NetworkFirst**         | Dynamic content with offline fallback | API routes, pages    |
| **StaleWhileRevalidate** | Assets that update frequently         | JS, CSS, images      |

## 🔧 Scripts

```json
{
  "dev": "next dev",
  "build": "next build && node scripts/generate-sw.js",
  "build:turbo": "next build --turbo && node scripts/generate-sw.js",
  "start": "next start"
}
```

## 📚 Documentation

- Full setup guide: `docs/PWA_SETUP.md`
- Migration summary: `docs/PWA_MIGRATION_SUMMARY.md`

## ✅ Checklist

Before deploying:

- [ ] Test in production mode (`npm run build && npm start`)
- [ ] Check service worker registration (DevTools → Application)
- [ ] Test offline functionality
- [ ] Run Lighthouse audit
- [ ] Verify manifest.json is accessible
- [ ] Test on mobile device
- [ ] Check "Add to Home Screen" prompt

## 🎉 What's Fixed

✅ Hydration error in theme toggle  
✅ Turbopack compatibility  
✅ PWA with Turbopack  
✅ Service worker generation  
✅ Offline support  
✅ Smart caching

---

**Need help?** Check `docs/PWA_SETUP.md` for detailed documentation.
