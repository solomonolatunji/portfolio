import { readBody } from "h3";
import { and, count, eq, gt } from "drizzle-orm";
import { getDb } from "#server/db";
import { guestbookEntries } from "#server/db/schema";
import { getGuestbookSession } from "#server/utils/guestbook";

const MAX_MESSAGE_LENGTH = 500;

export default defineEventHandler(async (event) => {
  const db = getDb(event);
  const user = await getGuestbookSession(event);
  if (!user)
    throw createError({
      statusCode: 401,
      statusMessage: "Sign in with GitHub to leave a message.",
    });
  const body = await readBody<{ message?: string }>(event);
  const message = body?.message?.trim() || "";
  if (!message) throw createError({ statusCode: 400, statusMessage: "Write a message first." });
  if (message.length > MAX_MESSAGE_LENGTH)
    throw createError({
      statusCode: 400,
      statusMessage: `Messages must be ${MAX_MESSAGE_LENGTH} characters or fewer.`,
    });
  const recent = await db
    .select({ count: count() })
    .from(guestbookEntries)
    .where(
      and(
        eq(guestbookEntries.userId, user.id),
        gt(guestbookEntries.createdAt, new Date(Date.now() - 60 * 60 * 1000))
      )
    );
  if (Number(recent[0]?.count || 0) >= 5)
    throw createError({
      statusCode: 429,
      statusMessage: "You can leave up to five messages per hour.",
    });
  await db.insert(guestbookEntries).values({ userId: user.id, message });
  return { ok: true };
});
