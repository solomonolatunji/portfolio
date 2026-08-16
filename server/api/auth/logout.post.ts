import { getCloudflareEnv } from "#server/utils/cloudflare";
import { clearGuestbookSession, clearSessionCookie } from "#server/utils/guestbook";

export default defineEventHandler(async (event) => {
  await clearGuestbookSession(event, getCloudflareEnv(event).GUESTBOOK_DB);
  clearSessionCookie(event);
  return { ok: true };
});
