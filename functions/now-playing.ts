import { getNowPlaying } from "./_lib/music";

export async function onRequest(context: any) {
  try {
    const payload = await getNowPlaying(context.env);

    if (!payload) {
      return new Response(null, { status: 204 });
    }

    return new Response(JSON.stringify(payload), {
      status: 200,
      headers: {
        "Cache-Control": "no-store, max-age=0",
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: error.message || "Failed to fetch now playing." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
