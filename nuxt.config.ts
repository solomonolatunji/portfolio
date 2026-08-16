import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  css: ["~/assets/css/tailwind.css", "~/index.css"],
  devtools: { enabled: false },
  modules: ["@nuxt/image", "@nuxtjs/seo"],
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
