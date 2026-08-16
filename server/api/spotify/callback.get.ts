import { getQuery, setResponseHeader, setResponseStatus } from "h3";
import { getCloudflareEnv } from "#server/utils/cloudflare";
import { exchangeSpotifyCodeForRefreshToken, renderSpotifyCallbackHtml } from "#server/utils/music";
import { errorMessage } from "#server/utils/types";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const code = typeof query.code === "string" ? query.code : null;
  const spotifyError = typeof query.error === "string" ? query.error : null;
  setResponseHeader(event, "Content-Type", "text/html; charset=utf-8");
  if (spotifyError) {
    setResponseStatus(event, 400);
    return renderSpotifyCallbackHtml({ error: spotifyError });
  }
  if (!code) {
    setResponseStatus(event, 400);
    return renderSpotifyCallbackHtml({ error: "Missing Spotify authorization code." });
  }
  try {
    const token = await exchangeSpotifyCodeForRefreshToken(code, getCloudflareEnv(event));
    return renderSpotifyCallbackHtml({ refreshToken: token.refresh_token, scope: token.scope });
  } catch (error: unknown) {
    setResponseStatus(event, 500);
    return renderSpotifyCallbackHtml({
      error: errorMessage(error, "Spotify token exchange failed."),
    });
  }
});
