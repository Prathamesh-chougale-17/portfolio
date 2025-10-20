if (!self.define) {
  let e,
    s = {};
  const a = (a, c) => (
    (a = new URL(a + ".js", c).href),
    s[a] ||
      new Promise((s) => {
        if ("document" in self) {
          const e = document.createElement("script");
          (e.src = a), (e.onload = s), document.head.appendChild(e);
        } else (e = a), importScripts(a), s();
      }).then(() => {
        let e = s[a];
        if (!e) throw new Error(`Module ${a} didn’t register its module`);
        return e;
      })
  );
  self.define = (c, t) => {
    const i =
      e ||
      ("document" in self ? document.currentScript.src : "") ||
      location.href;
    if (s[i]) return;
    let n = {};
    const f = (e) => a(e, i),
      r = { module: { uri: i }, exports: n, require: f };
    s[i] = Promise.all(c.map((e) => r[e] || f(e))).then((e) => (t(...e), n));
  };
}
define(["./workbox-1bb06f5e"], function (e) {
  "use strict";
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        {
          url: "/_next/app-build-manifest.json",
          revision: "b793f83baa819730cad5ec24175d9f71",
        },
        {
          url: "/_next/static/UDwGbphZ_C7BklVaxd9-W/_buildManifest.js",
          revision: "64f74e04c36c3e6027493c4eae98a4f5",
        },
        {
          url: "/_next/static/UDwGbphZ_C7BklVaxd9-W/_ssgManifest.js",
          revision: "b6652df95db52feb4daf4eca35380933",
        },
        {
          url: "/_next/static/chunks/139.7a5a8e93a21948c1.js",
          revision: "7a5a8e93a21948c1",
        },
        {
          url: "/_next/static/chunks/156-8917e5dc2ee15427.js",
          revision: "8917e5dc2ee15427",
        },
        {
          url: "/_next/static/chunks/160-645ad447a7bb7528.js",
          revision: "645ad447a7bb7528",
        },
        {
          url: "/_next/static/chunks/255-cf2e1d3491ac955b.js",
          revision: "cf2e1d3491ac955b",
        },
        {
          url: "/_next/static/chunks/301-f6af6bcc1771a90a.js",
          revision: "f6af6bcc1771a90a",
        },
        {
          url: "/_next/static/chunks/356-3c99812d1fa41abf.js",
          revision: "3c99812d1fa41abf",
        },
        {
          url: "/_next/static/chunks/4bd1b696-c023c6e3521b1417.js",
          revision: "c023c6e3521b1417",
        },
        {
          url: "/_next/static/chunks/619-9168df9c2a29b74b.js",
          revision: "9168df9c2a29b74b",
        },
        {
          url: "/_next/static/chunks/646.f342b7cffc01feb0.js",
          revision: "f342b7cffc01feb0",
        },
        {
          url: "/_next/static/chunks/660-10b336358cbfae9d.js",
          revision: "10b336358cbfae9d",
        },
        {
          url: "/_next/static/chunks/764-10e842745309bace.js",
          revision: "10e842745309bace",
        },
        {
          url: "/_next/static/chunks/904-ba7a2a80498fcc34.js",
          revision: "ba7a2a80498fcc34",
        },
        {
          url: "/_next/static/chunks/997-09ef4bff7f376677.js",
          revision: "09ef4bff7f376677",
        },
        {
          url: "/_next/static/chunks/app/_not-found/page-c0ea02d7abbff6b5.js",
          revision: "c0ea02d7abbff6b5",
        },
        {
          url: "/_next/static/chunks/app/about/page-b958fec38b9ad337.js",
          revision: "b958fec38b9ad337",
        },
        {
          url: "/_next/static/chunks/app/api/trpc/%5Btrpc%5D/route-3803e4f9f59857b9.js",
          revision: "3803e4f9f59857b9",
        },
        {
          url: "/_next/static/chunks/app/contact/page-b84be4d358d8ad65.js",
          revision: "b84be4d358d8ad65",
        },
        {
          url: "/_next/static/chunks/app/layout-cb89eed252f3a79c.js",
          revision: "cb89eed252f3a79c",
        },
        {
          url: "/_next/static/chunks/app/page-d3cc2b7517b3aa79.js",
          revision: "d3cc2b7517b3aa79",
        },
        {
          url: "/_next/static/chunks/app/projects/page-0369a57229dc5189.js",
          revision: "0369a57229dc5189",
        },
        {
          url: "/_next/static/chunks/app/robots.txt/route-3803e4f9f59857b9.js",
          revision: "3803e4f9f59857b9",
        },
        {
          url: "/_next/static/chunks/app/sitemap.xml/route-3803e4f9f59857b9.js",
          revision: "3803e4f9f59857b9",
        },
        {
          url: "/_next/static/chunks/framework-acd67e14855de5a2.js",
          revision: "acd67e14855de5a2",
        },
        {
          url: "/_next/static/chunks/main-2f4ee91f4b4ead98.js",
          revision: "2f4ee91f4b4ead98",
        },
        {
          url: "/_next/static/chunks/main-app-7c3aa6e887464a34.js",
          revision: "7c3aa6e887464a34",
        },
        {
          url: "/_next/static/chunks/pages/_app-82835f42865034fa.js",
          revision: "82835f42865034fa",
        },
        {
          url: "/_next/static/chunks/pages/_error-013f4188946cdd04.js",
          revision: "013f4188946cdd04",
        },
        {
          url: "/_next/static/chunks/polyfills-42372ed130431b0a.js",
          revision: "846118c33b2c0e922d7b3a7676f81f6f",
        },
        {
          url: "/_next/static/chunks/webpack-da2cb5bfc3726a80.js",
          revision: "da2cb5bfc3726a80",
        },
        {
          url: "/_next/static/css/779810fbe90a7471.css",
          revision: "779810fbe90a7471",
        },
        {
          url: "/_next/static/media/4cf2300e9c8272f7-s.p.woff2",
          revision: "18bae71b1e1b2bb25321090a3b563103",
        },
        {
          url: "/_next/static/media/747892c23ea88013-s.woff2",
          revision: "a0761690ccf4441ace5cec893b82d4ab",
        },
        {
          url: "/_next/static/media/8d697b304b401681-s.woff2",
          revision: "cc728f6c0adb04da0dfcb0fc436a8ae5",
        },
        {
          url: "/_next/static/media/93f479601ee12b01-s.p.woff2",
          revision: "da83d5f06d825c5ae65b7cca706cb312",
        },
        {
          url: "/_next/static/media/9610d9e46709d722-s.woff2",
          revision: "7b7c0ef93df188a852344fc272fc096b",
        },
        {
          url: "/_next/static/media/ba015fad6dcf6784-s.woff2",
          revision: "8ea4f719af3312a055caf09f34c89a77",
        },
        {
          url: "/contact/recieved.gif",
          revision: "f9ee675d3edb0af53c4c7fe74f3cab0c",
        },
        { url: "/file.svg", revision: "d09f95206c3fa0bb9bd9fefabfd0ea71" },
        { url: "/globe.svg", revision: "2aaafa6a49b6563925fe440891e32717" },
        { url: "/next.svg", revision: "8e061864f388b47f33a1c3780831193e" },
        {
          url: "/placeholder.svg",
          revision: "35707bd9960ba5281c72af927b79291f",
        },
        { url: "/profile.jpg", revision: "1aafbdfc4a6bb473c01ec715958ffdcb" },
        {
          url: "/projects/health-vault.png",
          revision: "fd3cb41278da5c4346f39c86b3f4b7f4",
        },
        {
          url: "/projects/oorja.png",
          revision: "e3bf0fee2414734d69a89684b1353b62",
        },
        {
          url: "/projects/saas.png",
          revision: "e98bf39fa45eb4017886f8369c778f5d",
        },
        {
          url: "/projects/swaadlink.png",
          revision: "76c4a3fcba7de2554510f568daf7d6f3",
        },
        { url: "/user.png", revision: "f6d0d1a5bf192b6d9eb2e0c3b305df06" },
        { url: "/vercel.svg", revision: "c0af2f507b369b085b35ef4bbe3bcf1e" },
        { url: "/window.svg", revision: "a2760511c65806022ad20adf74370ff3" },
      ],
      { ignoreURLParametersMatching: [] },
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      "/",
      new e.NetworkFirst({
        cacheName: "start-url",
        plugins: [
          {
            cacheWillUpdate: async ({
              request: e,
              response: s,
              event: a,
              state: c,
            }) =>
              s && "opaqueredirect" === s.type
                ? new Response(s.body, {
                    status: 200,
                    statusText: "OK",
                    headers: s.headers,
                  })
                : s,
          },
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /^https:\/\/fonts\.googleapis\.com\/.*/i,
      new e.CacheFirst({
        cacheName: "google-fonts-cache",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 10, maxAgeSeconds: 31536e3 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /^https:\/\/fonts\.gstatic\.com\/.*/i,
      new e.CacheFirst({
        cacheName: "gstatic-fonts-cache",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 10, maxAgeSeconds: 31536e3 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-font-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-image-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 2592e3 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-image",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 2592e3 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new e.CacheFirst({
        cacheName: "static-audio-assets",
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 2592e3 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\.(?:mp4)$/i,
      new e.CacheFirst({
        cacheName: "static-video-assets",
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 2592e3 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-js-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 48, maxAgeSeconds: 2592e3 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-style-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 2592e3 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\/_next\/static.+\.js$/i,
      new e.CacheFirst({
        cacheName: "next-static-js-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 2592e3 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\/api\/.*/i,
      new e.NetworkFirst({
        cacheName: "apis",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /.*/i,
      new e.NetworkFirst({
        cacheName: "others",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    );
});
