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

export interface PagesContext<Env> {
  request: Request;
  env: Env;
  params: Record<string, string | string[]>;
  functionPath: string;
  next: (input?: Request | string, init?: RequestInit) => Promise<Response>;
  waitUntil: (promise: Promise<unknown>) => void;
  passThroughOnException: () => void;
  data: Record<string, unknown>;
}

export type GuestbookFunction = (
  context: PagesContext<GuestbookEnv>
) => Response | Promise<Response>;
export type MusicFunction = (context: PagesContext<MusicEnv>) => Response | Promise<Response>;

export function errorMessage(error: unknown, fallback: string) {
  return error instanceof Error && error.message ? error.message : fallback;
}
