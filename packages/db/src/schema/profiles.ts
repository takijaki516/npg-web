import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";

export const profiles = pgTable("profiles", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  cognitoSubId: uuid("cognito_sub_id").unique(),

  image: text("image"),
  timezone: text("timezone").notNull().default("Asia/Seoul"),
  language: text("language").notNull().default("ko"),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
