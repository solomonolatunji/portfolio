import { clearedSessionCookie, clearSession, json } from "../../_lib/guestbook";
import { errorMessage, type GuestbookFunction } from "../../_lib/types";

export const onRequestPost: GuestbookFunction = async (context) => {
  try {
    await clearSession(context.request, context.env.GUESTBOOK_DB);
    return json({ ok: true }, 200, { "Set-Cookie": clearedSessionCookie(context.request) });
  } catch (error: unknown) {
    return json({ error: errorMessage(error, "Unable to log out.") }, 500);
  }
};
