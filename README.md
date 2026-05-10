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

This project supports an automatic `currently listening` row powered by Spotify, with Apple Music
and YouTube Music search links generated from the current track metadata.

### Environment

Copy `.env.example` to `.env` and fill in:

```bash
SPOTIFY_CLIENT_ID=
SPOTIFY_CLIENT_SECRET=
SPOTIFY_REFRESH_TOKEN=
SPOTIFY_REDIRECT_URI=http://localhost:5173/api/spotify/callback
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
5. If you add new Spotify scopes later, re-run the authorization flow and replace the stored refresh
   token.
6. This project uses Spotify playback state to show the active device when available, so if you
   already authorized before that scope was added, re-run `/api/spotify/login` once and replace
   the stored refresh token.

Spotify docs:

- Authorization code flow:
  <https://developer.spotify.com/documentation/web-api/tutorials/code-flow>
- Refresh tokens:
  <https://developer.spotify.com/documentation/web-api/tutorials/refreshing-tokens>
- Current playback:
  <https://developer.spotify.com/documentation/web-api/reference/get-the-users-currently-playing-track>
- Available devices:
  <https://developer.spotify.com/documentation/web-api/reference/get-a-users-available-devices>
- Recently played:
  <https://developer.spotify.com/documentation/web-api/reference/get-recently-played>

### Apple Music and YouTube Music

Apple Music and YouTube Music links are generated as search URLs from the Spotify track metadata,
so no extra API keys are required for those providers.

## Build

```bash
pnpm build
pnpm preview
```
