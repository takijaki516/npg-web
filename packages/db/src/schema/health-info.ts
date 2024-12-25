import {
  pgTable,
  real,
  timestamp,
  uuid,
  smallint,
  text,
} from "drizzle-orm/pg-core";
import { user } from "./better-auth";

export const healthInfos = pgTable("health_infos", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id")
    .references(() => user.id)
    .notNull(),

  measuredData: timestamp("measured_data").notNull(),
  heightCm: real("height_cm").notNull(),
  weightKg: real("weight_kg").notNull(),
  bodyFatMassKg: real("body_fat_mass_kg").notNull(),
  skeletalMuscleMassKg: real("skeletal_muscle_mass_kg").notNull(),
  age: smallint("age").notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
