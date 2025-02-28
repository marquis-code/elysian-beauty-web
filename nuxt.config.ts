import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  postcss: {
    plugins: {
      "postcss-import": {},
      "tailwindcss/nesting": {},
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  server: {
    port: 3000, // Forcefully set the port to 3000
  },
  plugins: ["~/plugins/aos.client.ts"],
  build: {
    transpile: ['chart.js', 'vue-cal', 'fullcalendar'],
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE || 'http://localhost:3000/api',
    },
  },
  modules: ['@kevinmarrec/nuxt-pwa'],
  pwa: {
    workbox: {
      enabled: true
    },
    meta: {
      title: "Elysian Beauty",
      author: "Marquis",
      mobileAppIOS: false,
      mobileApp: true,
      description:
        "Elysian Beauty",
      theme_color: "#27396B",
      background_color: "#27396B",
      display: "standalone",
      start_url: "/",
      nativeUI: true,
    },
    icon: {
      sizes: [64, 120, 144, 152, 192, 384, 512],
    },
    manifest: {
      name: "Achilles Drill",
      lang: "fa",
      useWebmanifestExtension: false,
    },
    runtimeCaching: [
      {
        urlPattern: "https://fonts.googleapis.com/.*",
        handler: "cacheFirst",
        method: "GET",
        strategyOptions: { cacheableResponse: { statuses: [0, 200] } },
      },
      {
        urlPattern: "https://fonts.gstatic.com/.*",
        handler: "cacheFirst",
        method: "GET",
        strategyOptions: { cacheableResponse: { statuses: [0, 200] } },
      },
      {
        urlPattern: "https://cdn.snipcart.com/.*",
        method: "GET",
        strategyOptions: { cacheableResponse: { statuses: [0, 200] } },
      },
      {
        urlPattern:
          "https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js",
        handler: "cacheFirst",
        method: "GET",
        strategyOptions: { cacheableResponse: { statuses: [0, 200] } },
      },
    ],
  },
  app: {
    head: {
      title: "Elysian Beauty - Your Journey to Timeless Beauty Begins Here",
      htmlAttrs: { lang: "en" },
      meta: [
        { charset: "utf-8" },
        { name: "format-detection", content: "telephone=no" },
        {
          name: 'viewport',
          content: 'initial-scale=1.0, user-scalable=no, width=device-width',
        },
        { name: 'mobile-web-app-capable', content: 'yes' },
        { name: 'apple-touch-fullscreen', content: 'yes' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' }
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        {
          "rel": "apple-touch-startup-image",
          "href": "/icons/apple-splash-dark-2048-2732.jpg",
          "media": "(prefers-color-scheme: dark) and (device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
        },
        {
          "rel": "apple-touch-startup-image",
          "href": "/icons/apple-splash-dark-2732-2048.jpg",
          "media": "(prefers-color-scheme: dark) and (device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
        },
        {
          "rel": "apple-touch-startup-image",
          "href": "/icons/apple-splash-dark-1668-2388.jpg",
          "media": "(prefers-color-scheme: dark) and (device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
        },
        {
          "rel": "apple-touch-startup-image",
          "href": "/icons/apple-splash-dark-2388-1668.jpg",
          "media": "(prefers-color-scheme: dark) and (device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
        },
        {
          "rel": "apple-touch-startup-image",
          "href": "/icons/apple-splash-dark-1536-2048.jpg",
          "media": "(prefers-color-scheme: dark) and (device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
        },
        {
          "rel": "apple-touch-startup-image",
          "href": "/icons/apple-splash-dark-2048-1536.jpg",
          "media": "(prefers-color-scheme: dark) and (device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
        },
        {
          "rel": "apple-touch-startup-image",
          "href": "/icons/apple-splash-dark-1488-2266.jpg",
          "media": "(prefers-color-scheme: dark) and (device-width: 744px) and (device-height: 1133px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
        },
        {
          "rel": "apple-touch-startup-image",
          "href": "/icons/apple-splash-dark-2266-1488.jpg",
          "media": "(prefers-color-scheme: dark) and (device-width: 744px) and (device-height: 1133px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
        },
        {
          "rel": "apple-touch-startup-image",
          "href": "/icons/apple-splash-dark-1640-2360.jpg",
          "media": "(prefers-color-scheme: dark) and (device-width: 820px) and (device-height: 1180px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
        },
        {
          "rel": "apple-touch-startup-image",
          "href": "/icons/apple-splash-dark-2360-1640.jpg",
          "media": "(prefers-color-scheme: dark) and (device-width: 820px) and (device-height: 1180px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
        },
        {
          "rel": "apple-touch-startup-image",
          "href": "/icons/apple-splash-dark-1668-2224.jpg",
          "media": "(prefers-color-scheme: dark) and (device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
        },
        {
          "rel": "apple-touch-startup-image",
          "href": "/icons/apple-splash-dark-2224-1668.jpg",
          "media": "(prefers-color-scheme: dark) and (device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
        },
        {
          "rel": "apple-touch-startup-image",
          "href": "/icons/apple-splash-dark-1620-2160.jpg",
          "media": "(prefers-color-scheme: dark) and (device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
        },
        {
          "rel": "apple-touch-startup-image",
          "href": "/icons/apple-splash-dark-2160-1620.jpg",
          "media": "(prefers-color-scheme: dark) and (device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
        },
        {
          "rel": "apple-touch-startup-image",
          "href": "/icons/apple-splash-dark-1320-2868.jpg",
          "media": "(prefers-color-scheme: dark) and (device-width: 440px) and (device-height: 956px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
        },
        {
          "rel": "apple-touch-startup-image",
          "href": "/icons/apple-splash-dark-2868-1320.jpg",
          "media": "(prefers-color-scheme: dark) and (device-width: 440px) and (device-height: 956px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
        },
        {
          "rel": "apple-touch-startup-image",
          "href": "/icons/apple-splash-dark-1206-2622.jpg",
          "media": "(prefers-color-scheme: dark) and (device-width: 402px) and (device-height: 874px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
        },
        {
          "rel": "apple-touch-startup-image",
          "href": "/icons/apple-splash-dark-2622-1206.jpg",
          "media": "(prefers-color-scheme: dark) and (device-width: 402px) and (device-height: 874px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
        },
        {
          "rel": "apple-touch-startup-image",
          "href": "/icons/apple-splash-dark-1290-2796.jpg",
          "media": "(prefers-color-scheme: dark) and (device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
        },
        {
          "rel": "apple-touch-startup-image",
          "href": "/icons/apple-splash-dark-2796-1290.jpg",
          "media": "(prefers-color-scheme: dark) and (device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
        }
      ],
      script:[
        {
          src:"https://cdn.jsdelivr.net/npm/pwacompat@2.0.6/pwacompat.min.js",
          integrity:"sha384-GOaSLecPIMCJksN83HLuYf9FToOiQ2Df0+0ntv7ey8zjUHESXhthwvq9hXAZTifA",
          crossorigin:"anonymous" ,defer:true
        }
      ]
    },
    pageTransition: false,
  },
  // modules: [
  //   '@nuxtjs/pwa'
  // ],
  // pwa: {
  //   manifest: {
  //     name: 'My Awesome Nuxt 3 PWA',
  //     short_name: 'Nuxt3PWA',
  //     lang: 'en',
  //     useWebmanifestExtension: false,
  //     display: 'standalone',
  //     theme_color: '#4DBA87',
  //     background_color: '#000000'
  //   },
  //   workbox: {
  //     // Workbox options for customizing the service worker
  //   }
  // }
});
