import { getGuestbookSession } from "#server/utils/guestbook";

export default defineEventHandler(async (event) => ({
  user: await getGuestbookSession(event),
}));
