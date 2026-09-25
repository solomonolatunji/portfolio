import { sendRedirect } from "h3";
import { getServerEnv } from "#server/utils/env";
import { createSpotifyAuthorizationUrl } from "#server/utils/music";

export default defineEventHandler((event) =>
  sendRedirect(event, createSpotifyAuthorizationUrl(getServerEnv()), 302)
);
