# Portfolio

Single-page portfolio built with Vue 3, TypeScript, and Vite.

## Stack

- Vue 3
- Vite
- TypeScript
- Tailwind CSS v4

## Development

```bash
pnpm install
pnpm dev
```

## Live Music Setup

This project supports an automatic `currently listening` row powered by Spotify, with optional
Apple Music and YouTube link resolution.

### Environment

Copy `.env.example` to `.env` and fill in:

```bash
SPOTIFY_CLIENT_ID=
SPOTIFY_CLIENT_SECRET=
SPOTIFY_REFRESH_TOKEN=
SPOTIFY_REDIRECT_URI=http://localhost:5173/api/spotify/callback
APPLE_MUSIC_DEVELOPER_TOKEN=
APPLE_MUSIC_STOREFRONT=us
YOUTUBE_API_KEY=
```

### Spotify setup

1. Create a Spotify app:
   <https://developer.spotify.com/dashboard>
2. Add your callback URL to the app settings:
   `http://localhost:5173/api/spotify/callback`
3. Start the app locally, then open:
   `http://localhost:5173/api/spotify/login`
4. After authorizing, copy the refresh token shown on the callback page into
   `SPOTIFY_REFRESH_TOKEN`.

Spotify docs:

- Authorization code flow:
  <https://developer.spotify.com/documentation/web-api/tutorials/code-flow>
- Refresh tokens:
  <https://developer.spotify.com/documentation/web-api/tutorials/refreshing-tokens>
- Current playback:
  <https://developer.spotify.com/documentation/web-api/reference/get-the-users-currently-playing-track>

### Apple Music setup

Generate an Apple Music developer token and put it in `APPLE_MUSIC_DEVELOPER_TOKEN`.

Apple docs:

- Apple Music API overview:
  <https://developer.apple.com/documentation/applemusicapi/>
- Generating developer tokens:
  <https://developer.apple.com/documentation/applemusicapi/generating-developer-tokens>
- Search:
  <https://developer.apple.com/documentation/applemusicapi/search>
- ISRC song lookup:
  <https://developer.apple.com/documentation/applemusicapi/get-multiple-catalog-songs-by-isrc>

### YouTube setup

Create a Google Cloud project, enable the YouTube Data API v3, then create an API key and place it
in `YOUTUBE_API_KEY`.

Google docs:

- Create credentials:
  <https://console.cloud.google.com/apis/credentials>
- YouTube search API:
  <https://developers.google.com/youtube/v3/docs/search/list>

## Build

```bash
pnpm build
pnpm preview
```
