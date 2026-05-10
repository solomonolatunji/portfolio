import axios from "axios";

export interface MusicEnv {
  SPOTIFY_CLIENT_ID?: string;
  SPOTIFY_CLIENT_SECRET?: string;
  SPOTIFY_REFRESH_TOKEN?: string;
  SPOTIFY_REDIRECT_URI?: string;
  APPLE_MUSIC_DEVELOPER_TOKEN?: string;
  APPLE_MUSIC_STOREFRONT?: string;
  YOUTUBE_API_KEY?: string;
}

export interface NowPlayingPayload {
  isPlaying: boolean;
  title: string;
  artist: string;
  album?: string;
  artworkUrl?: string;
  spotifyUrl: string;
  appleMusicUrl?: string;
  youtubeUrl?: string;
}

interface SpotifyTrackResponse {
  is_playing: boolean;
  item?: {
    name: string;
    external_urls?: { spotify?: string };
    album?: {
      name?: string;
      images?: Array<{ url: string }>;
    };
    artists?: Array<{ name: string }>;
    external_ids?: { isrc?: string };
  };
}

interface SpotifyRecentTracksResponse {
  items?: Array<{
    track?: SpotifyTrackResponse["item"];
  }>;
}

const SPOTIFY_SCOPES = ["user-read-currently-playing", "user-read-recently-played"];

function invariant(value: string | undefined, name: string) {
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }

  return value;
}

async function fetchJson<T>(
  url: string,
  init?: {
    method?: string;
    headers?: Record<string, string>;
    body?: URLSearchParams | string;
  }
): Promise<T> {
  const response = await axios.request<T>({
    url,
    method: init?.method || "GET",
    headers: init?.headers,
    data: init?.body,
  });

  return response.data;
}

function basicAuth(clientId: string, clientSecret: string) {
  return Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
}

export function createSpotifyAuthorizationUrl(env: MusicEnv) {
  const clientId = invariant(env.SPOTIFY_CLIENT_ID, "SPOTIFY_CLIENT_ID");
  const redirectUri = invariant(env.SPOTIFY_REDIRECT_URI, "SPOTIFY_REDIRECT_URI");
  const url = new URL("https://accounts.spotify.com/authorize");

  url.searchParams.set("client_id", clientId);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("redirect_uri", redirectUri);
  url.searchParams.set("scope", SPOTIFY_SCOPES.join(" "));

  return url.toString();
}

export async function exchangeSpotifyCodeForRefreshToken(code: string, env: MusicEnv) {
  const clientId = invariant(env.SPOTIFY_CLIENT_ID, "SPOTIFY_CLIENT_ID");
  const clientSecret = invariant(env.SPOTIFY_CLIENT_SECRET, "SPOTIFY_CLIENT_SECRET");
  const redirectUri = invariant(env.SPOTIFY_REDIRECT_URI, "SPOTIFY_REDIRECT_URI");

  const body = new URLSearchParams({
    code,
    grant_type: "authorization_code",
    redirect_uri: redirectUri,
  });

  return fetchJson<{
    access_token: string;
    refresh_token?: string;
    scope: string;
    expires_in: number;
    token_type: string;
  }>("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basicAuth(clientId, clientSecret)}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });
}

async function refreshSpotifyAccessToken(env: MusicEnv) {
  const clientId = invariant(env.SPOTIFY_CLIENT_ID, "SPOTIFY_CLIENT_ID");
  const clientSecret = invariant(env.SPOTIFY_CLIENT_SECRET, "SPOTIFY_CLIENT_SECRET");
  const refreshToken = invariant(env.SPOTIFY_REFRESH_TOKEN, "SPOTIFY_REFRESH_TOKEN");

  const body = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: refreshToken,
  });

  const response = await fetchJson<{
    access_token: string;
    token_type: string;
    expires_in: number;
  }>("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basicAuth(clientId, clientSecret)}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });

  return response.access_token;
}

async function fetchSpotifyNowPlaying(accessToken: string) {
  try {
    const response = await axios.get<SpotifyTrackResponse>(
      "https://api.spotify.com/v1/me/player/currently-playing",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    if (error.response?.status === 204) {
      return null;
    }

    if (error.response) {
      throw new Error(
        `${error.response.status} ${error.response.statusText}: ${JSON.stringify(error.response.data)}`
      );
    }

    throw error;
  }
}

async function fetchSpotifyRecentlyPlayed(accessToken: string) {
  try {
    const response = await axios.get<SpotifyRecentTracksResponse>(
      "https://api.spotify.com/v1/me/player/recently-played?limit=1",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data.items?.[0]?.track ?? null;
  } catch (error: any) {
    if (error.response?.status === 401 || error.response?.status === 403) {
      return null;
    }

    if (error.response) {
      throw new Error(
        `${error.response.status} ${error.response.statusText}: ${JSON.stringify(error.response.data)}`
      );
    }

    throw error;
  }
}

async function resolveAppleMusicUrl(
  env: MusicEnv,
  isrc: string | undefined,
  title: string,
  artist: string
) {
  const developerToken = env.APPLE_MUSIC_DEVELOPER_TOKEN;

  if (!developerToken) {
    return undefined;
  }

  const storefront = env.APPLE_MUSIC_STOREFRONT || "us";
  const headers = {
    Authorization: `Bearer ${developerToken}`,
  };

  if (isrc) {
    const byIsrc = await fetchJson<{
      data?: Array<{ attributes?: { url?: string } }>;
    }>(
      `https://api.music.apple.com/v1/catalog/${storefront}/songs?filter[isrc]=${encodeURIComponent(
        isrc
      )}`,
      { headers }
    );

    const directMatch = byIsrc.data?.[0]?.attributes?.url;

    if (directMatch) {
      return directMatch;
    }
  }

  const term = `${title} ${artist}`;
  const bySearch = await fetchJson<{
    results?: {
      songs?: {
        data?: Array<{ attributes?: { url?: string } }>;
      };
    };
  }>(
    `https://api.music.apple.com/v1/catalog/${storefront}/search?types=songs&limit=1&term=${encodeURIComponent(
      term
    )}`,
    { headers }
  );

  return bySearch.results?.songs?.data?.[0]?.attributes?.url;
}

async function resolveYouTubeUrl(env: MusicEnv, title: string, artist: string) {
  const apiKey = env.YOUTUBE_API_KEY;

  if (!apiKey) {
    return undefined;
  }

  const query = `${title} ${artist}`;
  const response = await fetchJson<{
    items?: Array<{ id?: { videoId?: string } }>;
  }>(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&videoCategoryId=10&maxResults=1&q=${encodeURIComponent(
      query
    )}&key=${encodeURIComponent(apiKey)}`
  );

  const videoId = response.items?.[0]?.id?.videoId;

  return videoId ? `https://music.youtube.com/watch?v=${videoId}` : undefined;
}

async function resolveOptionalLink<T>(resolver: () => Promise<T | undefined>) {
  try {
    return await resolver();
  } catch {
    return undefined;
  }
}

async function buildNowPlayingPayload(
  env: MusicEnv,
  track: SpotifyTrackResponse["item"] | null | undefined,
  isPlaying: boolean
) {
  if (!track?.name || !track.external_urls?.spotify) {
    return null;
  }

  const title = track.name;
  const artist = track.artists?.map((entry) => entry.name).join(", ") || "Unknown artist";
  const album = track.album?.name;
  const artworkUrl = track.album?.images?.[0]?.url;
  const spotifyUrl = track.external_urls.spotify;
  const isrc = track.external_ids?.isrc;

  const [appleMusicUrl, youtubeUrl] = await Promise.all([
    resolveOptionalLink(() => resolveAppleMusicUrl(env, isrc, title, artist)),
    resolveOptionalLink(() => resolveYouTubeUrl(env, title, artist)),
  ]);

  return {
    isPlaying,
    title,
    artist,
    album,
    artworkUrl,
    spotifyUrl,
    appleMusicUrl,
    youtubeUrl,
  };
}

export async function getNowPlaying(env: MusicEnv): Promise<NowPlayingPayload | null> {
  const accessToken = await refreshSpotifyAccessToken(env);
  const spotify = await fetchSpotifyNowPlaying(accessToken);

  if (spotify?.item?.name && spotify.item.external_urls?.spotify) {
    return buildNowPlayingPayload(env, spotify.item, spotify.is_playing);
  }

  const recentTrack = await fetchSpotifyRecentlyPlayed(accessToken);
  return buildNowPlayingPayload(env, recentTrack, false);
}

export function renderSpotifyCallbackHtml(params: {
  refreshToken?: string;
  scope?: string;
  error?: string;
}) {
  if (params.error) {
    return `<!doctype html>
<html><body style="font-family: sans-serif; background:#050505; color:#f5f5f5; padding:32px;">
<h1>Spotify setup failed</h1>
<p>${params.error}</p>
</body></html>`;
  }

  return `<!doctype html>
<html>
  <body style="font-family: sans-serif; background:#050505; color:#f5f5f5; padding:32px;">
    <h1>Spotify refresh token</h1>
    <p>Copy this value into <code>SPOTIFY_REFRESH_TOKEN</code> in your <code>.env</code>.</p>
    <pre style="white-space:pre-wrap; word-break:break-word; padding:16px; border:1px solid #333;">${params.refreshToken ?? ""}</pre>
    <p>Granted scopes: <code>${params.scope ?? ""}</code></p>
  </body>
</html>`;
}
