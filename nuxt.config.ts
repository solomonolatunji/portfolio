import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  css: ["~/assets/css/main.css", "~/index.css", "@vueform/vueform/themes/vueform/css/index.css"],
  devtools: { enabled: true },
  modules: [
    "@nuxt/image",
    "@nuxtjs/seo",
    "@nuxt/a11y",
    "@nuxt/eslint",
    "@nuxt/test-utils/module",
    "@nuxt/ui",
    "@nuxtjs/google-fonts",
    "@nuxthub/core",
  ],
  robots: {
    robotsTxt: false,
  },
  googleFonts: {
    families: {
      "DM Sans": true,
    },
    download: false,
    inject: true,
    display: "swap",
  },
  vite: {
    plugins: [tailwindcss()],
  },
  typescript: {
    strict: true,
    typeCheck: true,
  },
  nitro: {
    preset: "cloudflare_pages",
    prerender: {
      autoSubfolderIndex: false,
    },
  },
  hub: {
    db: {
      dialect: "mysql",
      driver: "mysql2",
      connection: {
        hyperdriveId: process.env.HYPERDRIVE_ID || undefined,
      },
      applyMigrationsDuringBuild: false,
      applyMigrationsDuringDev: false,
    },
  },
  runtimeConfig: {
    githubClientId: "",
    githubClientSecret: "",
    spotifyClientId: "",
    spotifyClientSecret: "",
    spotifyRefreshToken: "",
    spotifyRedirectUri: "",
  },
});
