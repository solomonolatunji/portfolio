import { getCloudflareEnv } from "#server/utils/cloudflare";
import { getGuestbookSession } from "#server/utils/guestbook";

export default defineEventHandler(async (event) => ({
  user: await getGuestbookSession(event, getCloudflareEnv(event).GUESTBOOK_DB),
}));
