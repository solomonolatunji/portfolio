import { createSpotifyAuthorizationUrl } from "../_lib/music";

export async function onRequest(context: any) {
  try {
    const url = createSpotifyAuthorizationUrl(context.env);
    return Response.redirect(url, 302);
  } catch (error: any) {
    return new Response(error.message || "Failed to create Spotify authorization URL.", {
      status: 500,
    });
  }
}
