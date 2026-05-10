import type { MusicEnv } from "../../server/music";
import { createSpotifyAuthorizationUrl } from "../../server/music";

export default async function handler(_req: any, res: any) {
  try {
    res.redirect(createSpotifyAuthorizationUrl(process.env as MusicEnv));
  } catch (error: any) {
    res.status(500).send(error.message || "Failed to create Spotify authorization URL.");
  }
}
