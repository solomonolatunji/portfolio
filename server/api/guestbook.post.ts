import { readBody } from "h3";
import { getCloudflareEnv } from "#server/utils/cloudflare";
import { getGuestbookSession } from "#server/utils/guestbook";

const MAX_MESSAGE_LENGTH = 500;

export default defineEventHandler(async (event) => {
  const env = getCloudflareEnv(event);
  const user = await getGuestbookSession(event, env.GUESTBOOK_DB);
  if (!user) throw createError({ statusCode: 401, statusMessage: "Sign in with GitHub to leave a message." });
  const body = await readBody<{ message?: string }>(event);
  const message = body?.message?.trim() || "";
  if (!message) throw createError({ statusCode: 400, statusMessage: "Write a message first." });
  if (message.length > MAX_MESSAGE_LENGTH) throw createError({ statusCode: 400, statusMessage: `Messages must be ${MAX_MESSAGE_LENGTH} characters or fewer.` });
  const recent = await env.GUESTBOOK_DB.prepare("SELECT COUNT(*) AS count FROM guestbook_entries WHERE user_id = ? AND created_at > datetime('now', '-1 hour')").bind(user.id).first();
  if (Number(recent?.count || 0) >= 5) throw createError({ statusCode: 429, statusMessage: "You can leave up to five messages per hour." });
  await env.GUESTBOOK_DB.prepare("INSERT INTO guestbook_entries (user_id, message) VALUES (?, ?)").bind(user.id, message).run();
  return { ok: true };
});
