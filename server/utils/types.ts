import type { D1Database } from "@cloudflare/workers-types";

export interface GuestbookEnv {
  GUESTBOOK_DB: D1Database;
  GITHUB_CLIENT_ID?: string;
  GITHUB_CLIENT_SECRET?: string;
}

export interface MusicEnv {
  SPOTIFY_CLIENT_ID?: string;
  SPOTIFY_CLIENT_SECRET?: string;
  SPOTIFY_REFRESH_TOKEN?: string;
  SPOTIFY_REDIRECT_URI?: string;
}

export type CloudflareEnv = GuestbookEnv & MusicEnv;

export function errorMessage(error: unknown, fallback: string) {
  return error instanceof Error && error.message ? error.message : fallback;
}
