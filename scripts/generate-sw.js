#!/usr/bin/env node

/**
 * PWA Build Script for Turbopack
 * 
 * This script generates a service worker file that works with Turbopack.
 * It should be run after the Next.js build completes.
 * 
 * Usage: node scripts/generate-sw.js
 */

const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(process.cwd(), 'public');
const SW_PATH = path.join(PUBLIC_DIR, 'sw.js');
const WORKBOX_PATH = path.join(PUBLIC_DIR, 'workbox-1bb06f5e.js');

// Read the PWA configuration
const pwaConfigPath = path.join(process.cwd(), 'pwa.config.ts');
let runtimeCaching = [];

try {
  // For this simple script, we'll define the config inline
  // In production, you might want to parse the TS file or use a JSON config
  runtimeCaching = [
    {
      urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
      handler: "CacheFirst",
      options: {
        cacheName: "google-fonts-cache",
        expiration: {
          maxEntries: 10,
          maxAgeSeconds: 60 * 60 * 24 * 365,
        },
      },
    },
    {
      urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
      handler: "CacheFirst",
      options: {
        cacheName: "gstatic-fonts-cache",
        expiration: {
          maxEntries: 10,
          maxAgeSeconds: 60 * 60 * 24 * 365,
        },
      },
    },
    {
      urlPattern: /\.(?:eot|otf|ttc|ttf|woff|woff2|font\.css)$/i,
      handler: "StaleWhileRevalidate",
      options: {
        cacheName: "static-font-assets",
        expiration: {
          maxEntries: 4,
          maxAgeSeconds: 60 * 60 * 24 * 7,
        },
      },
    },
    {
      urlPattern: /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      handler: "StaleWhileRevalidate",
      options: {
        cacheName: "static-image-assets",
        expiration: {
          maxEntries: 64,
          maxAgeSeconds: 60 * 60 * 24 * 30,
        },
      },
    },
    {
      urlPattern: /\/_next\/image\?url=.+$/i,
      handler: "StaleWhileRevalidate",
      options: {
        cacheName: "next-image",
        expiration: {
          maxEntries: 64,
          maxAgeSeconds: 60 * 60 * 24 * 30,
        },
      },
    },
    {
      urlPattern: /\.(?:js)$/i,
      handler: "StaleWhileRevalidate",
      options: {
        cacheName: "static-js-assets",
        expiration: {
          maxEntries: 48,
          maxAgeSeconds: 60 * 60 * 24 * 30,
        },
      },
    },
    {
      urlPattern: /\.(?:css|less)$/i,
      handler: "StaleWhileRevalidate",
      options: {
        cacheName: "static-style-assets",
        expiration: {
          maxEntries: 32,
          maxAgeSeconds: 60 * 60 * 24 * 30,
        },
      },
    },
    {
      urlPattern: /\/_next\/static.+\.js$/i,
      handler: "CacheFirst",
      options: {
        cacheName: "next-static-js-assets",
        expiration: {
          maxEntries: 64,
          maxAgeSeconds: 60 * 60 * 24 * 30,
        },
      },
    },
    {
      urlPattern: /\/api\/.*/i,
      handler: "NetworkFirst",
      method: "GET",
      options: {
        cacheName: "apis",
        expiration: {
          maxEntries: 16,
          maxAgeSeconds: 60 * 60 * 24,
        },
        networkTimeoutSeconds: 10,
      },
    },
    {
      urlPattern: /.*/i,
      handler: "NetworkFirst",
      options: {
        cacheName: "others",
        expiration: {
          maxEntries: 32,
          maxAgeSeconds: 60 * 60 * 24,
        },
        networkTimeoutSeconds: 10,
      },
    },
  ];
} catch (error) {
  console.error('Error reading PWA config:', error);
}

// Generate service worker content
const generateServiceWorker = () => {
  const cacheVersion = `v${Date.now()}`;
  const staticCacheName = `portfolio-static-${cacheVersion}`;
  
  const runtimeCachingStr = JSON.stringify(runtimeCaching, null, 2)
    .replace(/"urlPattern":\s*"([^"]+)"/g, '"urlPattern": $1')
    .replace(/\/(.+?)\/i/g, (match) => match);

  return `// Service Worker for Portfolio PWA
// Generated: ${new Date().toISOString()}

const CACHE_VERSION = '${cacheVersion}';
const STATIC_CACHE = '${staticCacheName}';
const RUNTIME_CACHING = ${JSON.stringify(runtimeCaching, null, 2)};

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      console.log('[SW] Caching static assets');
      return cache.addAll([
        '/',
        '/offline.html',
      ].filter(Boolean));
    }).then(() => {
      console.log('[SW] Service worker installed');
      return self.skipWaiting();
    })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker...');
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => {
            return cacheName.startsWith('portfolio-') && cacheName !== STATIC_CACHE;
          })
          .map((cacheName) => {
            console.log('[SW] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          })
      );
    }).then(() => {
      console.log('[SW] Service worker activated');
      return self.clients.claim();
    })
  );
});

// Fetch event - handle requests with caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip cross-origin requests
  if (url.origin !== location.origin) {
    return;
  }

  // Find matching runtime caching strategy
  let matchedStrategy = null;
  for (const strategy of RUNTIME_CACHING) {
    const pattern = strategy.urlPattern;
    if (pattern instanceof RegExp && pattern.test(url.pathname)) {
      matchedStrategy = strategy;
      break;
    } else if (typeof pattern === 'string' && url.pathname === pattern) {
      matchedStrategy = strategy;
      break;
    }
  }

  if (matchedStrategy) {
    const handler = matchedStrategy.handler;
    
    if (handler === 'CacheFirst') {
      event.respondWith(cacheFirst(request, matchedStrategy.options));
    } else if (handler === 'NetworkFirst') {
      event.respondWith(networkFirst(request, matchedStrategy.options));
    } else if (handler === 'StaleWhileRevalidate') {
      event.respondWith(staleWhileRevalidate(request, matchedStrategy.options));
    }
  } else {
    // Default: NetworkFirst for navigation, CacheFirst for others
    if (request.mode === 'navigate') {
      event.respondWith(networkFirst(request, { cacheName: 'pages' }));
    } else {
      event.respondWith(cacheFirst(request, { cacheName: 'assets' }));
    }
  }
});

// Caching strategies
async function cacheFirst(request, options = {}) {
  const cacheName = options.cacheName || 'cache-first';
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  
  if (cached) {
    return cached;
  }
  
  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    console.error('[SW] Fetch failed:', error);
    return new Response('Offline', { status: 503 });
  }
}

async function networkFirst(request, options = {}) {
  const cacheName = options.cacheName || 'network-first';
  const timeout = options.networkTimeoutSeconds ? options.networkTimeoutSeconds * 1000 : 5000;
  
  try {
    const fetchPromise = fetch(request);
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Network timeout')), timeout)
    );
    
    const response = await Promise.race([fetchPromise, timeoutPromise]);
    
    if (response.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    
    return response;
  } catch (error) {
    console.log('[SW] Network failed, trying cache:', error);
    const cache = await caches.open(cacheName);
    const cached = await cache.match(request);
    
    if (cached) {
      return cached;
    }
    
    return new Response('Offline', { status: 503 });
  }
}

async function staleWhileRevalidate(request, options = {}) {
  const cacheName = options.cacheName || 'stale-while-revalidate';
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  
  const fetchPromise = fetch(request).then((response) => {
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  });
  
  return cached || fetchPromise;
}

console.log('[SW] Service worker loaded');
`;
};

// Write the service worker file
try {
  const swContent = generateServiceWorker();
  fs.writeFileSync(SW_PATH, swContent, 'utf8');
  console.log('✓ Service worker generated successfully:', SW_PATH);
} catch (error) {
  console.error('✗ Error generating service worker:', error);
  process.exit(1);
}
