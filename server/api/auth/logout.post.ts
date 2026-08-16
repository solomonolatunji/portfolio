import { clearGuestbookSession, clearSessionCookie } from "#server/utils/guestbook";

export default defineEventHandler(async (event) => {
  await clearGuestbookSession(event);
  clearSessionCookie(event);
  return { ok: true };
});
