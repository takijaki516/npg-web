import {
  pgTable,
  uuid,
  text,
  real,
  timestamp,
  smallint,
} from "drizzle-orm/pg-core";

import { user } from "./auth";

export const healthInfos = pgTable("health_infos", {
  id: uuid().defaultRandom().primaryKey().notNull(),
  userId: text("user_id")
    .references(() => user.id)
    .notNull(),

  measuredData: timestamp("measured_data", { mode: "string" }).notNull(),

  heightCm: real("height_cm"),
  weightKg: real("weight_kg"),
  bodyFatMassKg: real("body_fat_mass_kg"),
  skeletalMuscleMassKg: real("skeletal_muscle_mass_kg"),
  age: smallint(),

  createdAt: timestamp("created_at", { mode: "string" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "string" }).defaultNow().notNull(),
});
