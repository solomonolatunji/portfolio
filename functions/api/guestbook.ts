import { getSession, json } from "../_lib/guestbook";

const MAX_MESSAGE_LENGTH = 500;

export async function onRequestGet(context: any) {
  try {
    const result = await context.env.GUESTBOOK_DB.prepare(
      `SELECT e.id, e.message, e.created_at AS createdAt,
                u.username, u.avatar_url AS avatarUrl, u.profile_url AS profileUrl
         FROM guestbook_entries e JOIN users u ON u.id = e.user_id
         ORDER BY e.created_at DESC LIMIT 100`
    ).all();

    return json({ entries: result.results || [] });
  } catch (error: any) {
    return json({ error: error.message || "Unable to load guestbook entries." }, 500);
  }
}

export async function onRequestPost(context: any) {
  try {
    const user = await getSession(context.request, context.env.GUESTBOOK_DB);
    if (!user) return json({ error: "Sign in with GitHub to leave a message." }, 401);

    const body = (await context.request.json()) as { message?: string };
    const message = body.message?.trim() || "";
    if (!message) return json({ error: "Write a message first." }, 400);
    if (message.length > MAX_MESSAGE_LENGTH) {
      return json({ error: `Messages must be ${MAX_MESSAGE_LENGTH} characters or fewer.` }, 400);
    }

    const recent = await context.env.GUESTBOOK_DB.prepare(
      `SELECT COUNT(*) AS count FROM guestbook_entries
         WHERE user_id = ? AND created_at > datetime('now', '-1 hour')`
    )
      .bind(user.id)
      .first();

    if (Number(recent?.count || 0) >= 5) {
      return json({ error: "You can leave up to five messages per hour." }, 429);
    }

    await context.env.GUESTBOOK_DB.prepare(
      "INSERT INTO guestbook_entries (user_id, message) VALUES (?, ?)"
    )
      .bind(user.id, message)
      .run();

    return json({ ok: true }, 201);
  } catch (error: any) {
    return json({ error: error.message || "Unable to save your message." }, 500);
  }
}
