import { neon, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

// schema
export * from "./schema/auth";
export * from "./schema/cardio-exercise";
export * from "./schema/daily-intake";
export * from "./schema/daily-weight";
export * from "./schema/health-info";
export * from "./schema/meal";
export * from "./schema/user-goal";

// database client;

export function createDb(env: any) {
  let connectionString = env.DATABASE_URL;

  // Configuring Neon for local development
  if (env.NODE_ENV === "development") {
    connectionString = "postgres://postgres:postgres@db.localtest.me:5432/main";
    neonConfig.fetchEndpoint = (host) => {
      const [protocol, port] =
        host === "db.localtest.me" ? ["http", 4444] : ["https", 443];
      return `${protocol}://${host}:${port}/sql`;
    };
  }

  const sql = neon(connectionString);
  return drizzle({ client: sql });
}
