import { exchangeSpotifyCodeForRefreshToken, renderSpotifyCallbackHtml } from "../_lib/music";
import { errorMessage, type MusicFunction } from "../_lib/types";

export const onRequest: MusicFunction = async (context) => {
  const url = new URL(context.request.url);
  const code = url.searchParams.get("code");
  const error = url.searchParams.get("error");

  if (error) {
    return new Response(renderSpotifyCallbackHtml({ error }), {
      status: 400,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  }

  if (!code) {
    return new Response(
      renderSpotifyCallbackHtml({ error: "Missing Spotify authorization code." }),
      {
        status: 400,
        headers: { "Content-Type": "text/html; charset=utf-8" },
      }
    );
  }

  try {
    const token = await exchangeSpotifyCodeForRefreshToken(code, context.env);
    return new Response(
      renderSpotifyCallbackHtml({
        refreshToken: token.refresh_token,
        scope: token.scope,
      }),
      { status: 200, headers: { "Content-Type": "text/html; charset=utf-8" } }
    );
  } catch (exchangeError: unknown) {
    return new Response(
      renderSpotifyCallbackHtml({
        error: errorMessage(exchangeError, "Spotify token exchange failed."),
      }),
      { status: 500, headers: { "Content-Type": "text/html; charset=utf-8" } }
    );
  }
};
