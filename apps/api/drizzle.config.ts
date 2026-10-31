import { defineConfig } from "drizzle-kit";
import { env } from "./src/env";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema",
  out: "./drizzle",
  dbCredentials: { url: env.DATABASE_URL },
  casing: "snake_case",
  strict: true,
  verbose: true,
});
