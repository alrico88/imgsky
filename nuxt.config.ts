export default defineNuxtConfig({
  app: {
    head: {
      title: "Imgsky",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "theme-color", content: "#8EB0A2" },
      ],
      htmlAttrs: {
        "data-bs-theme": "light",
      },
    },
  },

  css: ["@/assets/main.scss"],

  modules: [
    "@vueuse/nuxt",
    "@vite-pwa/nuxt",
    "@bootstrap-vue-next/nuxt",
    "@nuxtjs/color-mode",
    "@nuxt/icon",
    "@nuxt/fonts",
    "@nuxt/image",
    "nuxt-umami",
    "@morev/vue-transitions/nuxt",
  ],

  colorMode: {
    dataValue: "bs-theme",
    storageKey: "nuxt-color-mode",
  },

  pwa: {
    registerType: "prompt",
    manifest: {
      name: "Imgsky",
      description: "Watch the flow of images posted to Bluesky, live",
      theme_color: "#8EB0A2",
      icons: [
        {
          src: "android-chrome-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "android-chrome-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
        {
          src: "android-chrome-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "any maskable",
        },
      ],
    },
    client: {
      installPrompt: true,
    },
    workbox: {
      navigateFallback: "/",
      globPatterns: ["**/*.{js,css,html,png,svg,ico,woff,woff2}"],
      cleanupOutdatedCaches: true,
    },
  },

  compatibilityDate: "2024-11-18",

  umami: {
    ignoreLocalhost: true,
  },
});
