export default defineNuxtConfig({
  srcDir: "src/",
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
