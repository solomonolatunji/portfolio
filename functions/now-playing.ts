import { getNowPlaying } from "./_lib/music";
import { errorMessage, type MusicFunction } from "./_lib/types";

export const onRequest: MusicFunction = async (context) => {
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
  } catch (error: unknown) {
    return new Response(
      JSON.stringify({ error: errorMessage(error, "Failed to fetch now playing.") }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
