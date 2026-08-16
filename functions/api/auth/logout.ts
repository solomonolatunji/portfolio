import { clearedSessionCookie, clearSession, json } from "@functions/_lib/guestbook";

export async function onRequestPost(context: any) {
  try {
    await clearSession(context.request, context.env.GUESTBOOK_DB);
    return json({ ok: true }, 200, { "Set-Cookie": clearedSessionCookie(context.request) });
  } catch (error: any) {
    return json({ error: error.message || "Unable to log out." }, 500);
  }
}
