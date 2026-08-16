# Portfolio

Portfolio and guestbook built with Nuxt 4, Vue 3, TypeScript, AWS MySQL, and Cloudflare Pages.

## Stack

- Vue 3
- Nuxt 4 / Nitro
- TypeScript
- Cloudflare Pages / Workers
- NuxtHub + Drizzle ORM
- AWS MySQL through Cloudflare Hyperdrive

## Development

```bash
npm install
npm run dev
```

`npm run dev` builds the Nuxt Cloudflare Pages worker and starts it locally so the `/api`
server routes and Hyperdrive/MySQL binding work together. Use `npm run dev:nuxt` for the faster Nuxt UI
development server when you do not need the Cloudflare runtime.

## Live Music Setup

This project supports an automatic `currently listening` row powered by Spotify, with Apple Music
and YouTube Music search links generated from the current track metadata.

### Environment

Copy `.env.example` to `.env` and fill in:

```bash
SPOTIFY_CLIENT_ID=
SPOTIFY_CLIENT_SECRET=
SPOTIFY_REFRESH_TOKEN=
SPOTIFY_REDIRECT_URI=http://localhost:8788/spotify/callback
```

### Spotify setup

1. Create a Spotify app:
   <https://developer.spotify.com/dashboard>
2. Add your callback URL to the app settings:
   `http://localhost:8788/spotify/callback`
3. Start the app locally, then open:
   `http://localhost:8788/spotify/login`
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

The guestbook uses GitHub OAuth, Nuxt server routes, NuxtHub, Drizzle, and MySQL.

1. Create an AWS MySQL database and allow connections from Cloudflare Hyperdrive.
2. Create a Hyperdrive configuration:

   ```bash
   npx wrangler hyperdrive create portfolio-mysql \
     --connection-string="mysql://USER:PASSWORD@AWS_HOST:3306/DATABASE"
   ```

3. Put the returned ID in `HYPERDRIVE_ID` while building/deploying. For local development,
   put your development connection string in `MYSQL_URL`.
4. Generate and apply schema migrations:

   ```bash
   npx nuxt db generate
   npx nuxt db migrate
   ```

5. Create a GitHub OAuth App. Set its callback URL to the full URL ending in
   `/api/auth/github/callback` (for example, `http://localhost:8788/api/auth/github/callback`).
6. Add `GITHUB_CLIENT_ID` as a Pages environment variable and `GITHUB_CLIENT_SECRET` as a secret.
7. Deploy the site and visit `/guestbook`.
