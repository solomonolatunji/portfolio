import type { MusicEnv } from "./_lib/music.js";
import { getNowPlaying } from "./_lib/music.js";

export default async function handler(_req: any, res: any) {
  try {
    const payload = await getNowPlaying(process.env as MusicEnv);

    if (!payload) {
      res.status(204).end();
      return;
    }

    res.setHeader("Cache-Control", "no-store, max-age=0");
    res.status(200).json(payload);
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to fetch now playing." });
  }
}
