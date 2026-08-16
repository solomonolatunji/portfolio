import { getCloudflareEnv } from "#server/utils/cloudflare";

export default defineEventHandler(async (event) => {
  const result = await getCloudflareEnv(event).GUESTBOOK_DB.prepare(`SELECT e.id, e.message, e.created_at AS createdAt, u.username, u.avatar_url AS avatarUrl, u.profile_url AS profileUrl FROM guestbook_entries e JOIN users u ON u.id = e.user_id ORDER BY e.created_at DESC LIMIT 100`).all();
  return { entries: result.results || [] };
});
