import { githubAuthorizationUrl, json, newState, stateCookie } from "@functions/_lib/guestbook";

export async function onRequest(context: any) {
  try {
    const state = newState();
    return new Response(null, {
      status: 302,
      headers: {
        Location: githubAuthorizationUrl(context.env, context.request, state).toString(),
        "Set-Cookie": stateCookie(state, context.request),
      },
    });
  } catch (error: any) {
    return json({ error: error.message || "Unable to start GitHub login." }, 500);
  }
}
