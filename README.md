# Portfolio

Single-page portfolio built with Vue 3, TypeScript, Vite, and Cloudflare Pages.

## Stack

- Vue 3
- Vite
- TypeScript
- Tailwind CSS v4
- Cloudflare Pages / Workers

## Development

```bash
npm install
npm run dev
```

`npm run dev` builds the site and starts Cloudflare Pages locally so the `/api` guestbook
Functions and D1 binding work together. Use `npm run dev:ui` when you only need the Vite
frontend server.

## Live Music Setup

This project supports an automatic `currently listening` row powered by Spotify, with Apple Music
and YouTube Music search links generated from the current track metadata.

### Environment

Copy `.env.example` to `.env` and fill in:

```bash
SPOTIFY_CLIENT_ID=
SPOTIFY_CLIENT_SECRET=
SPOTIFY_REFRESH_TOKEN=
SPOTIFY_REDIRECT_URI=http://localhost:5173/spotify/callback
```

### Spotify setup

1. Create a Spotify app:
   <https://developer.spotify.com/dashboard>
2. Add your callback URL to the app settings:
   `http://localhost:5173/spotify/callback`
3. Start the app locally, then open:
   `http://localhost:5173/spotify/login`
4. After authorizing, copy the refresh token shown on the callback page into
   `SPOTIFY_REFRESH_TOKEN`.
5. If you add new Spotify scopes later, re-run the authorization flow and replace the stored refresh
   token.
6. This project uses Spotify playback state to show the active device when available, so if you
   already authorized before that scope was added, re-run `/spotify/login` once and replace
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

## Build and Deploy

To deploy to Cloudflare Pages:

```bash
npm run build
npm run deploy
```

## Guestbook Setup

The guestbook uses GitHub OAuth, Cloudflare Pages Functions, and a D1 database.

1. Create a D1 database with `npx wrangler d1 create portfolio-guestbook` and replace
   `YOUR_DATABASE_ID` in `wrangler.json`.
2. Apply the schema locally with `npx wrangler d1 execute portfolio-guestbook --local --file=migrations/0001_guestbook.sql`.
3. Apply it to production with `npx wrangler d1 execute portfolio-guestbook --remote --file=migrations/0001_guestbook.sql`.
4. Create a GitHub OAuth App. Set its callback URL to `/api/auth/github/callback` on your domain.
5. Add `GITHUB_CLIENT_ID` as a Pages environment variable and `GITHUB_CLIENT_SECRET` as a secret.
6. Deploy the site and visit `/guestbook`.
