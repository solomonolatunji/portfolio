import { desc, eq } from "drizzle-orm";
import { getDb } from "#server/db";
import { guestbookEntries, users } from "#server/db/schema";

export default defineEventHandler(async (event) => {
  const db = getDb(event);
  const entries = await db
    .select({
      id: guestbookEntries.id,
      message: guestbookEntries.message,
      createdAt: guestbookEntries.createdAt,
      username: users.username,
      avatarUrl: users.avatarUrl,
      profileUrl: users.profileUrl,
    })
    .from(guestbookEntries)
    .innerJoin(users, eq(users.id, guestbookEntries.userId))
    .orderBy(desc(guestbookEntries.createdAt))
    .limit(100);
  return { entries };
});
