import { getSession, json } from "../../_lib/guestbook";

export async function onRequest(context: any) {
  try {
    return json({ user: await getSession(context.request, context.env.GUESTBOOK_DB) });
  } catch (error: any) {
    return json({ error: error.message || "Unable to load your session." }, 500);
  }
}
