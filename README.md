# Portfolio

Portfolio and guestbook built with Nuxt 4, Vue 3, TypeScript, and MySQL.

## Stack

- Vue 3
- Nuxt 4 / Nitro
- TypeScript
- Nitro Node server
- Drizzle ORM
- AWS MySQL

## Development

```bash
npm install
npm run dev
```

`npm run dev` starts the normal Nuxt development server on port 3000. The `/api` server routes
connect directly to MySQL through `MYSQL_URL`.

## Live Music Setup

This project supports an automatic `currently listening` row powered by Spotify, with Apple Music
and YouTube Music search links generated from the current track metadata.

### Environment

Copy `.env.example` to `.env` and fill in:

```bash
SPOTIFY_CLIENT_ID=
SPOTIFY_CLIENT_SECRET=
SPOTIFY_REFRESH_TOKEN=
SPOTIFY_REDIRECT_URI=http://localhost:3000/spotify/callback
```

### Spotify setup

1. Create a Spotify app:
   <https://developer.spotify.com/dashboard>
2. Add your callback URL to the app settings:
   `http://localhost:3000/spotify/callback`
3. Start the app locally, then open:
   `http://localhost:3000/spotify/login`
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

For Render, Railway, or another Node host:

```bash
npm run build
npm run start
```

Use `npm run build` as the build command and `npm run start` as the start command.

## Guestbook Setup

The guestbook uses GitHub OAuth, Nuxt server routes, Drizzle, and MySQL.

1. Create an AWS MySQL database and set its connection string in `MYSQL_URL`.
2. Generate and apply schema migrations:

   ```bash
   npm run db:generate
   npm run db:migrate
   ```

3. Create a GitHub OAuth App. Set its callback URL to the full URL ending in
   `/api/auth/github/callback` (for example, `http://localhost:3000/api/auth/github/callback`).
4. Add `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` to the host environment.
5. Deploy the site and visit `/guestbook`.
