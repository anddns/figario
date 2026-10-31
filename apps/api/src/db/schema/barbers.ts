import { sql } from "drizzle-orm";
import { pgTable, text, uuid } from "drizzle-orm/pg-core";

export const barbers = pgTable("barbers", {
  id: uuid().primaryKey().default(sql`uuidv7()`),
  name: text().notNull(),
});
