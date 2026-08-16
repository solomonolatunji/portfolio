import {
  createSession,
  exchangeGithubCode,
  fetchGithubUser,
  getState,
  json,
  sessionCookie,
} from "@functions/_lib/guestbook";

export async function onRequest(context: any) {
  const url = new URL(context.request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  if (!code || !state || state !== getState(context.request)) {
    return json({ error: "Invalid GitHub login session." }, 400);
  }

  try {
    const accessToken = await exchangeGithubCode(code, context.env, context.request);
    const user = await fetchGithubUser(accessToken);
    const session = await createSession(context.env.GUESTBOOK_DB, user);
    return new Response(null, {
      status: 302,
      headers: {
        Location: new URL("/guestbook", context.request.url).toString(),
        "Set-Cookie": sessionCookie(session.token, context.request),
      },
    });
  } catch (error: any) {
    return new Response(null, {
      status: 302,
      headers: {
        Location: new URL(
          `/guestbook?error=${encodeURIComponent(error.message || "GitHub login failed.")}`,
          context.request.url
        ).toString(),
      },
    });
  }
}
