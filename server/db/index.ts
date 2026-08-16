import type { H3Event } from "h3";
import { drizzle, type MySql2Database } from "drizzle-orm/mysql2";
import * as schema from "#server/db/schema";

interface HyperdriveBinding {
  connectionString: string;
}

type PortfolioDatabase = MySql2Database<typeof schema>;

let database: PortfolioDatabase | undefined;
let databaseUrl: string | undefined;

function getHyperdrive(event?: H3Event) {
  const binding = event?.context.cloudflare?.env?.MYSQL as HyperdriveBinding | undefined;
  if (binding?.connectionString) return binding;

  const globalBinding = (globalThis as typeof globalThis & { MYSQL?: HyperdriveBinding }).MYSQL;
  if (globalBinding?.connectionString) return globalBinding;

  const environmentBinding = process.env.MYSQL as unknown as HyperdriveBinding | undefined;
  if (environmentBinding?.connectionString) return environmentBinding;

  return undefined;
}

export function getDb(event?: H3Event) {
  const hyperdrive = getHyperdrive(event);
  const connectionString = hyperdrive?.connectionString || process.env.MYSQL_URL;

  if (!connectionString) {
    throw new Error(
      "MySQL is not configured. Provide the Cloudflare MYSQL Hyperdrive binding or MYSQL_URL."
    );
  }

  if (!database || databaseUrl !== connectionString) {
    database = drizzle({
      connection: {
        uri: connectionString,
        disableEval: true,
      },
      schema,
      mode: "default",
    });
    databaseUrl = connectionString;
  }

  return database;
}
