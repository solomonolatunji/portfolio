import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import { createSpotifyAuthorizationUrl, exchangeSpotifyCodeForRefreshToken, getNowPlaying, renderSpotifyCallbackHtml, type MusicEnv } from "./server/music";

function musicApiDevPlugin(mode: string) {
  const env = {
    ...process.env,
    ...loadEnv(mode, process.cwd(), ""),
  } as MusicEnv;

  return {
    name: "music-api-dev-plugin",
    configureServer(server: any) {
      server.middlewares.use(async (req: any, res: any, next: () => void) => {
        const url = new URL(req.url || "/", "http://localhost");

        if (url.pathname === "/api/now-playing") {
          try {
            const payload = await getNowPlaying(env);

            if (!payload) {
              res.statusCode = 204;
              res.end();
              return;
            }

            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(payload));
          } catch (error: any) {
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ error: error.message || "Failed to fetch now playing." }));
          }

          return;
        }

        if (url.pathname === "/api/spotify/login") {
          try {
            res.statusCode = 302;
            res.setHeader("Location", createSpotifyAuthorizationUrl(env));
            res.end();
          } catch (error: any) {
            res.statusCode = 500;
            res.end(error.message || "Failed to create Spotify authorization URL.");
          }

          return;
        }

        if (url.pathname === "/api/spotify/callback") {
          const code = url.searchParams.get("code");
          const error = url.searchParams.get("error");
          res.setHeader("Content-Type", "text/html; charset=utf-8");

          if (error) {
            res.statusCode = 400;
            res.end(renderSpotifyCallbackHtml({ error }));
            return;
          }

          if (!code) {
            res.statusCode = 400;
            res.end(renderSpotifyCallbackHtml({ error: "Missing Spotify authorization code." }));
            return;
          }

          try {
            const token = await exchangeSpotifyCodeForRefreshToken(code, env);
            res.statusCode = 200;
            res.end(
              renderSpotifyCallbackHtml({
                refreshToken: token.refresh_token,
                scope: token.scope,
              }),
            );
          } catch (exchangeError: any) {
            res.statusCode = 500;
            res.end(
              renderSpotifyCallbackHtml({
                error: exchangeError.message || "Spotify token exchange failed.",
              }),
            );
          }

          return;
        }

        next();
      });
    },
  };
}

export default defineConfig(({ mode }) => ({
  plugins: [vue(), tailwindcss(), musicApiDevPlugin(mode)],
  resolve: {
    tsconfigPaths: true,
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
}));
