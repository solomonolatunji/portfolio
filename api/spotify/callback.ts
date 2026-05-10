import type { MusicEnv } from "../_lib/music.js";
import { exchangeSpotifyCodeForRefreshToken, renderSpotifyCallbackHtml } from "../_lib/music.js";

export default async function handler(req: any, res: any) {
  const code = req.query?.code;
  const error = req.query?.error;

  if (error) {
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.status(400).send(renderSpotifyCallbackHtml({ error }));
    return;
  }

  if (!code || typeof code !== "string") {
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res
      .status(400)
      .send(renderSpotifyCallbackHtml({ error: "Missing Spotify authorization code." }));
    return;
  }

  try {
    const token = await exchangeSpotifyCodeForRefreshToken(code, process.env as MusicEnv);
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.status(200).send(
      renderSpotifyCallbackHtml({
        refreshToken: token.refresh_token,
        scope: token.scope,
      })
    );
  } catch (exchangeError: any) {
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.status(500).send(
      renderSpotifyCallbackHtml({
        error: exchangeError.message || "Spotify token exchange failed.",
      })
    );
  }
}
