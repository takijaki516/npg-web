import { relations } from "drizzle-orm";
import {
  pgTable,
  uuid,
  text,
  real,
  timestamp,
  smallint,
  uniqueIndex,
} from "drizzle-orm/pg-core";

import { profile } from "./profile";

export const healthInfos = pgTable(
  "health_infos",
  {
    id: uuid().defaultRandom().primaryKey().notNull(),
    profileEmail: text("profile_email")
      .references(() => profile.email)
      .notNull(),

    measuredDate: timestamp("measured_date", { mode: "string" }).notNull(),

    heightCm: real("height_cm"),
    weightKg: real("weight_kg"),
    bodyFatMassKg: real("body_fat_mass_kg"),
    skeletalMuscleMassKg: real("skeletal_muscle_mass_kg"),
    age: smallint(),

    createdAt: timestamp("created_at", { mode: "string" })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" })
      .defaultNow()
      .notNull(),
  },
  (t) => [
    uniqueIndex("health_info_profile_date_idx").on(
      t.profileEmail,
      t.measuredDate
    ),
  ]
);

export const healthInfosRelations = relations(healthInfos, ({ one }) => ({
  profile: one(profile, {
    fields: [healthInfos.profileEmail],
    references: [profile.email],
  }),
}));
