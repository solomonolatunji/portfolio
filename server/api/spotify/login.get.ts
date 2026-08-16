import { sendRedirect } from "h3";
import { getCloudflareEnv } from "#server/utils/cloudflare";
import { createSpotifyAuthorizationUrl } from "#server/utils/music";

export default defineEventHandler((event) =>
  sendRedirect(event, createSpotifyAuthorizationUrl(getCloudflareEnv(event)), 302)
);
