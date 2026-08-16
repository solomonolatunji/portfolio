import { sendRedirect } from "h3";
import { getServerEnv } from "#server/utils/env";
import { githubAuthorizationUrl, newState, setOAuthState } from "#server/utils/guestbook";

export default defineEventHandler((event) => {
  const state = newState();
  setOAuthState(event, state);
  return sendRedirect(event, githubAuthorizationUrl(getServerEnv(), event, state).toString(), 302);
});
