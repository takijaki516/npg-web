import { neon, neonConfig, Pool } from "@neondatabase/serverless";
import { drizzle as drizzleHTTP } from "drizzle-orm/neon-http";
import { drizzle as drizzlePool } from "drizzle-orm/neon-serverless";

// schema
import * as authSchema from "./schema/auth";
import * as cardioExerciseSchema from "./schema/cardio-exercise";
import * as dailyIntakeSchema from "./schema/daily-intake";
import * as dailyWeightSchema from "./schema/daily-weight";
import * as healthInfoSchema from "./schema/health-info";
import * as mealSchema from "./schema/meal";
import * as userGoalSchema from "./schema/user-goal";
import * as profileSchema from "./schema/profile";

// schema
export * from "./schema/auth";
export * from "./schema/cardio-exercise";
export * from "./schema/daily-intake";
export * from "./schema/daily-weight";
export * from "./schema/health-info";
export * from "./schema/meal";
export * from "./schema/user-goal";
export * from "./schema/profile";

// database client;
export function createDb({
  DATABASE_URL,
  NODE_ENV,
}: {
  DATABASE_URL: string;
  NODE_ENV: string;
}) {
  let connectionString = DATABASE_URL;

  // Configuring Neon for local development
  if (NODE_ENV === "development") {
    connectionString = "postgres://postgres:postgres@db.localtest.me:5432/main";
    neonConfig.fetchEndpoint = (host) => {
      const [protocol, port] =
        host === "db.localtest.me" ? ["http", 4444] : ["https", 443];
      return `${protocol}://${host}:${port}/sql`;
    };
  }

  const sql = neon(connectionString);
  return drizzleHTTP({
    client: sql,
    schema: {
      ...authSchema,
      ...cardioExerciseSchema,
      ...dailyIntakeSchema,
      ...dailyWeightSchema,
      ...healthInfoSchema,
      ...mealSchema,
      ...userGoalSchema,
      ...profileSchema,
    },
  });
}

export function createPoolDb({
  DATABASE_URL,
  NODE_ENV,
}: {
  DATABASE_URL: string;
  NODE_ENV: string;
}) {
  let connectionString = DATABASE_URL;

  // Configuring Neon for local development
  if (NODE_ENV === "development") {
    connectionString = "postgres://postgres:postgres@db.localtest.me:5432/main";
    neonConfig.fetchEndpoint = (host) => {
      const [protocol, port] =
        host === "db.localtest.me" ? ["http", 4444] : ["https", 443];
      return `${protocol}://${host}:${port}/sql`;
    };

    const connectionStringUrl = new URL(connectionString);
    neonConfig.useSecureWebSocket =
      connectionStringUrl.hostname !== "db.localtest.me";
    neonConfig.wsProxy = (host) =>
      host === "db.localtest.me" ? `${host}:4444/v2` : `${host}/v2`;
  }

  const pool = new Pool({ connectionString: connectionString });
  return drizzlePool({
    client: pool,
    schema: {
      ...authSchema,
      ...cardioExerciseSchema,
      ...dailyIntakeSchema,
      ...dailyWeightSchema,
      ...healthInfoSchema,
      ...mealSchema,
      ...userGoalSchema,
      ...profileSchema,
    },
  });
}
