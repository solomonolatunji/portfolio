import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "mysql",
  schema: "./server/db/schema.ts",
  out: "./server/db/migrations/mysql",
  dbCredentials: {
    url: process.env.MYSQL_URL || "",
  },
});
