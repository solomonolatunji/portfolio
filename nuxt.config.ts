export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  css: ["~/index.css"],
  devtools: { enabled: false },
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
