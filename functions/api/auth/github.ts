import { githubAuthorizationUrl, json, newState, stateCookie } from "../../_lib/guestbook";
import { errorMessage, type GuestbookFunction } from "../../_lib/types";

export const onRequest: GuestbookFunction = async (context) => {
  try {
    const state = newState();
    return new Response(null, {
      status: 302,
      headers: {
        Location: githubAuthorizationUrl(context.env, context.request, state).toString(),
        "Set-Cookie": stateCookie(state, context.request),
      },
    });
  } catch (error: unknown) {
    return json({ error: errorMessage(error, "Unable to start GitHub login.") }, 500);
  }
};
