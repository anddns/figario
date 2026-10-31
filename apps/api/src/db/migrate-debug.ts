import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

const url = process.env.DATABASE_URL;
console.log("DATABASE_URL =", url?.replace(/:[^:@/]+@/, ":****@"));

const client = postgres(url!, { max: 1, onnotice: () => {} });
try {
  await migrate(drizzle(client), { migrationsFolder: "./drizzle" });
  console.log("✓ migrations applied");
} catch (err) {
  const e = ((err as Error).cause ?? err) as { code?: string; message?: string };
  console.error(`✗ ${e.code ?? ""} ${e.message}`);
  process.exitCode = 1;
} finally {
  await client.end();
}
