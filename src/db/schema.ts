import { relations, sql } from "drizzle-orm";
import {
  pgTable,
  serial,
  varchar,
} from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 20 }).notNull().unique(),
  firstName: varchar("first_name", { length: 50 }).notNull(),
  lastName: varchar("last_name", { length: 100 }).notNull(),
});

type User = typeof user.$inferSelect;
