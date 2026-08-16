import { createSpotifyAuthorizationUrl } from "../_lib/music";
import { errorMessage, type MusicFunction } from "../_lib/types";

export const onRequest: MusicFunction = async (context) => {
  try {
    const url = createSpotifyAuthorizationUrl(context.env);
    return Response.redirect(url, 302);
  } catch (error: unknown) {
    return new Response(errorMessage(error, "Failed to create Spotify authorization URL."), {
      status: 500,
    });
  }
};
