import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { user } from "./auth";

export const profile = pgTable("profile", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email")
    .references(() => user.email)
    .unique()
    .notNull(),

  image: text(),
  timezone: text().default("Asia/Seoul").notNull(),
  language: text().default("ko").notNull(),

  createdAt: timestamp({ mode: "string" }).defaultNow().notNull(),
  updatedAt: timestamp({ mode: "string" }).defaultNow().notNull(),
});
