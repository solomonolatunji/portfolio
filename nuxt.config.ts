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
  runtimeConfig: {
    githubClientId: "",
    githubClientSecret: "",
    spotifyClientId: "",
    spotifyClientSecret: "",
    spotifyRefreshToken: "",
    spotifyRedirectUri: "",
  },
});
