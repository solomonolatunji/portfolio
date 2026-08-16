import { getSession, json } from "../../_lib/guestbook";
import { errorMessage, type GuestbookFunction } from "../../_lib/types";

export const onRequest: GuestbookFunction = async (context) => {
  try {
    return json({ user: await getSession(context.request, context.env.GUESTBOOK_DB) });
  } catch (error: unknown) {
    return json({ error: errorMessage(error, "Unable to load your session.") }, 500);
  }
};
