import { sql } from "drizzle-orm";
import { check, pgEnum, pgTable, timestamp, uuid } from "drizzle-orm/pg-core";
import { barbers } from "./barbers";

export const appointmentStatus = pgEnum("appointment_status", [
  "scheduled",
  "completed",
  "cancelled",
  "no_show",
]);

export const appointments = pgTable(
  "appointments",
  {
    id: uuid().primaryKey().default(sql`uuidv7()`),
    barberId: uuid().notNull().references(() => barbers.id),
    startsAt: timestamp({ withTimezone: true }).notNull(),
    endsAt: timestamp({ withTimezone: true }).notNull(),
    status: appointmentStatus().notNull().default("scheduled"),
  },
  (t) => [check("appointments_valid_range", sql`${t.endsAt} > ${t.startsAt}`)],
);
