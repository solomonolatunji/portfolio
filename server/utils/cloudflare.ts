import type { H3Event } from "h3";
import type { CloudflareEnv } from "./types";

export function getCloudflareEnv(event: H3Event): CloudflareEnv {
  return event.context.cloudflare?.env as CloudflareEnv;
}
