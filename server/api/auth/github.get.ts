import { sendRedirect } from "h3";
import { getCloudflareEnv } from "#server/utils/cloudflare";
import { githubAuthorizationUrl, newState, setOAuthState } from "#server/utils/guestbook";

export default defineEventHandler((event) => {
  const state = newState();
  setOAuthState(event, state);
  return sendRedirect(
    event,
    githubAuthorizationUrl(getCloudflareEnv(event), event, state).toString(),
    302
  );
});
