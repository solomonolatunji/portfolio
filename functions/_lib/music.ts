export interface MusicEnv {
  SPOTIFY_CLIENT_ID?: string;
  SPOTIFY_CLIENT_SECRET?: string;
  SPOTIFY_REFRESH_TOKEN?: string;
  SPOTIFY_REDIRECT_URI?: string;
}

export interface NowPlayingPayload {
  isPlaying: boolean;
  title: string;
  artist: string;
  album?: string;
  artworkUrl?: string;
  deviceName?: string;
  deviceType?: string;
  spotifyUrl: string;
  appleMusicUrl?: string;
  youtubeUrl?: string;
}

interface ResolvedLinks {
  appleMusicUrl?: string;
  youtubeUrl?: string;
}

interface SpotifyTrackResponse {
  is_playing: boolean;
  device?: {
    name?: string;
    type?: string;
  };
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

interface SpotifyDevicesResponse {
  devices?: Array<{
    id?: string | null;
    is_active?: boolean;
    name?: string;
    type?: string;
  }>;
}

const SPOTIFY_SCOPES = [
  "user-read-currently-playing",
  "user-read-playback-state",
  "user-read-recently-played",
];
const RESOLVED_LINKS_CACHE = new Map<string, ResolvedLinks>();

const DEVICE_NAME_MAP: Record<string, string> = {
  fedora: "Fedora",
  iphone: "iPhone",
  ipad: "iPad",
  ios: "iOS",
  macos: "macOS",
  "mac os": "macOS",
  macbook: "MacBook",
  linux: "Linux",
  android: "Android",
  desktop: "Desktop",
  computer: "Computer",
  speaker: "Speaker",
  smartphone: "Smartphone",
  tablet: "Tablet",
  tv: "TV",
  "web player": "Web Player",
};

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
  const response = await fetch(url, {
    method: init?.method || "GET",
    headers: init?.headers,
    body: init?.body,
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`${response.status} ${response.statusText}: ${text}`);
  }

  return response.json() as Promise<T>;
}

function basicAuth(clientId: string, clientSecret: string) {
  return btoa(`${clientId}:${clientSecret}`);
}

function normalizeDeviceLabel(value?: string) {
  if (!value) {
    return undefined;
  }

  const normalized = value.trim();
  const lookup = DEVICE_NAME_MAP[normalized.toLowerCase()];

  if (lookup) {
    return lookup;
  }

  return normalized
    .split(/\s+/)
    .map((part) => {
      const mapped = DEVICE_NAME_MAP[part.toLowerCase()];

      if (mapped) {
        return mapped;
      }

      return part.charAt(0).toUpperCase() + part.slice(1);
    })
    .join(" ");
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
  const response = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (response.status === 204) {
    return null;
  }

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`${response.status} ${response.statusText}: ${text}`);
  }

  return (await response.json()) as SpotifyTrackResponse;
}

async function fetchSpotifyRecentlyPlayed(accessToken: string) {
  const response = await fetch("https://api.spotify.com/v1/me/player/recently-played?limit=1", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (response.status === 401 || response.status === 403) {
    return null;
  }

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`${response.status} ${response.statusText}: ${text}`);
  }

  const data = (await response.json()) as SpotifyRecentTracksResponse;
  return data.items?.[0]?.track ?? null;
}

async function fetchSpotifyActiveDevice(accessToken: string) {
  const response = await fetch("https://api.spotify.com/v1/me/player/devices", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (response.status === 401 || response.status === 403) {
    return null;
  }

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`${response.status} ${response.statusText}: ${text}`);
  }

  const data = (await response.json()) as SpotifyDevicesResponse;
  return data.devices?.find((device) => device.is_active) ?? null;
}

function buildAppleMusicUrl(title: string, artist: string) {
  const term = `${title} ${artist}`;
  return `https://music.apple.com/us/search?term=${encodeURIComponent(term)}`;
}

function buildYouTubeMusicUrl(title: string, artist: string) {
  const query = `${title} ${artist}`;
  return `https://music.youtube.com/search?q=${encodeURIComponent(query)}`;
}

function buildTrackCacheKey(isrc: string | undefined, title: string, artist: string) {
  if (isrc) {
    return `isrc:${isrc}`;
  }

  return `search:${title.toLowerCase()}::${artist.toLowerCase()}`;
}

async function resolveLinksForTrack(isrc: string | undefined, title: string, artist: string) {
  const cacheKey = buildTrackCacheKey(isrc, title, artist);
  const cached = RESOLVED_LINKS_CACHE.get(cacheKey);

  if (cached) {
    return cached;
  }

  const resolved = {
    appleMusicUrl: buildAppleMusicUrl(title, artist),
    youtubeUrl: buildYouTubeMusicUrl(title, artist),
  };

  RESOLVED_LINKS_CACHE.set(cacheKey, resolved);
  return resolved;
}

async function buildNowPlayingPayload(
  track: SpotifyTrackResponse["item"] | null | undefined,
  isPlaying: boolean,
  device?: SpotifyTrackResponse["device"]
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

  const { appleMusicUrl, youtubeUrl } = await resolveLinksForTrack(isrc, title, artist);

  return {
    isPlaying,
    title,
    artist,
    album,
    artworkUrl,
    deviceName: normalizeDeviceLabel(device?.name),
    deviceType: normalizeDeviceLabel(device?.type),
    spotifyUrl,
    appleMusicUrl,
    youtubeUrl,
  };
}

export async function getNowPlaying(env: MusicEnv): Promise<NowPlayingPayload | null> {
  const accessToken = await refreshSpotifyAccessToken(env);
  const spotify = await fetchSpotifyNowPlaying(accessToken);

  if (spotify?.item?.name && spotify.item.external_urls?.spotify) {
    const fallbackDevice =
      spotify.device?.name || spotify.device?.type
        ? spotify.device
        : await fetchSpotifyActiveDevice(accessToken);

    return buildNowPlayingPayload(spotify.item, spotify.is_playing, fallbackDevice ?? undefined);
  }

  const recentTrack = await fetchSpotifyRecentlyPlayed(accessToken);
  return buildNowPlayingPayload(recentTrack, false);
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
