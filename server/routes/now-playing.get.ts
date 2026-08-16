import { getCloudflareEnv } from "#server/utils/cloudflare";
import { getNowPlaying } from "#server/utils/music";

export default defineEventHandler(async (event) => {
  const payload = await getNowPlaying(getCloudflareEnv(event));
  if (!payload) {
    setResponseStatus(event, 204);
    return null;
  }
  setResponseHeader(event, "Cache-Control", "no-store, max-age=0");
  return payload;
});
