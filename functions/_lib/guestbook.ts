const SESSION_COOKIE = "guestbook_session";
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 30;

export interface GuestbookEnv {
  GUESTBOOK_DB?: any;
  GITHUB_CLIENT_ID?: string;
  GITHUB_CLIENT_SECRET?: string;
}

export interface GuestbookUser {
  id: string;
  username: string;
  avatarUrl: string | null;
  profileUrl: string;
}

export function json(data: unknown, status = 200, headers: Record<string, string> = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Cache-Control": "no-store",
      "Content-Type": "application/json; charset=utf-8",
      ...headers,
    },
  });
}

function getCookie(request: Request, name: string) {
  const cookieHeader = request.headers.get("Cookie") || "";
  const cookie = cookieHeader
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${name}=`));

  return cookie ? decodeURIComponent(cookie.slice(name.length + 1)) : null;
}

function cookie(value: string, maxAge: number) {
  return `${SESSION_COOKIE}=${encodeURIComponent(value)}; Path=/; HttpOnly; SameSite=Lax; Secure; Max-Age=${maxAge}`;
}

async function hash(value: string) {
  const buffer = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return Array.from(new Uint8Array(buffer), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

function required(value: string | undefined, name: string) {
  if (!value) throw new Error(`Missing environment variable: ${name}`);
  return value;
}

export function githubAuthorizationUrl(env: GuestbookEnv, request: Request, state: string) {
  const url = new URL("https://github.com/login/oauth/authorize");
  url.searchParams.set("client_id", required(env.GITHUB_CLIENT_ID, "GITHUB_CLIENT_ID"));
  url.searchParams.set(
    "redirect_uri",
    new URL("/api/auth/github/callback", request.url).toString()
  );
  url.searchParams.set("scope", "read:user");
  url.searchParams.set("state", state);
  return url;
}

export function newState() {
  return crypto.randomUUID();
}

function secureCookie(request: Request) {
  return new URL(request.url).protocol === "https:" ? "; Secure" : "";
}

export function stateCookie(state: string, request: Request) {
  return `guestbook_oauth_state=${encodeURIComponent(state)}; Path=/; HttpOnly; SameSite=Lax${secureCookie(request)}; Max-Age=600`;
}

export function getState(request: Request) {
  return getCookie(request, "guestbook_oauth_state");
}

export async function exchangeGithubCode(code: string, env: GuestbookEnv, request: Request) {
  const response = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: required(env.GITHUB_CLIENT_ID, "GITHUB_CLIENT_ID"),
      client_secret: required(env.GITHUB_CLIENT_SECRET, "GITHUB_CLIENT_SECRET"),
      code,
      redirect_uri: new URL("/api/auth/github/callback", request.url).toString(),
    }),
  });

  const payload = (await response.json()) as { access_token?: string; error_description?: string };
  if (!response.ok || !payload.access_token) {
    throw new Error(payload.error_description || "GitHub authorization failed.");
  }

  return payload.access_token;
}

export async function fetchGithubUser(accessToken: string) {
  const response = await fetch("https://api.github.com/user", {
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${accessToken}`,
      "User-Agent": "Solomon-Portfolio-Guestbook",
    },
  });

  if (!response.ok) throw new Error("Could not retrieve your GitHub profile.");

  const user = (await response.json()) as {
    id: number;
    login: string;
    avatar_url?: string;
    html_url: string;
  };

  return {
    id: String(user.id),
    username: user.login,
    avatarUrl: user.avatar_url || null,
    profileUrl: user.html_url,
  } satisfies GuestbookUser;
}

export async function createSession(db: any, user: GuestbookUser) {
  const token = crypto.randomUUID();
  const sessionId = await hash(token);
  const expiresAt = new Date(Date.now() + SESSION_TTL_SECONDS * 1000).toISOString();

  await db
    .prepare(
      `INSERT INTO users (id, username, avatar_url, profile_url)
       VALUES (?, ?, ?, ?)
       ON CONFLICT(id) DO UPDATE SET username = excluded.username,
         avatar_url = excluded.avatar_url, profile_url = excluded.profile_url`
    )
    .bind(user.id, user.username, user.avatarUrl, user.profileUrl)
    .run();

  await db
    .prepare("INSERT INTO sessions (id, user_id, expires_at) VALUES (?, ?, ?)")
    .bind(sessionId, user.id, expiresAt)
    .run();

  return { token, expiresAt };
}

export async function getSession(request: Request, db: any) {
  const token = getCookie(request, SESSION_COOKIE);
  if (!token) return null;

  const sessionId = await hash(token);
  const result = await db
    .prepare(
      `SELECT u.id, u.username, u.avatar_url AS avatarUrl, u.profile_url AS profileUrl
       FROM sessions s JOIN users u ON u.id = s.user_id
       WHERE s.id = ? AND datetime(s.expires_at) > CURRENT_TIMESTAMP`
    )
    .bind(sessionId)
    .first();

  return result ? (result as GuestbookUser) : null;
}

export async function clearSession(request: Request, db: any) {
  const token = getCookie(request, SESSION_COOKIE);
  if (token)
    await db
      .prepare("DELETE FROM sessions WHERE id = ?")
      .bind(await hash(token))
      .run();
}

export function sessionCookie(token: string, request: Request) {
  return cookie(token, SESSION_TTL_SECONDS).replace("; Secure", secureCookie(request));
}

export function clearedSessionCookie(request: Request) {
  return cookie("", 0).replace("; Secure", secureCookie(request));
}
