import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [vue(), tailwindcss(), tsconfigPaths()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    hmr: {
      host: "solomonolatunji.com",
      clientPort: 443,
      protocol: "wss",
    },
  },
  preview: {
    host: true,
    port: process.env.PORT ? Number(process.env.PORT) : 3000,
    strictPort: true,
  },
  base: "/",
});
