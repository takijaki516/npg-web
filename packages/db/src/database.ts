// NOTE: just for migration/seed
import "dotenv/config";
import { neon, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

let connectionString = process.env.DATABASE_URL!;

if (process.env.NODE_ENV === "development") {
  connectionString = "postgres://postgres:postgres@localhost:5444/main";
  neonConfig.fetchEndpoint = (host) => {
    const [protocol, port] =
      host === "localhost" ? ["http", 4444] : ["https", 443];
    return `${protocol}://${host}:${port}/sql`;
  };
}

const sql = neon(connectionString);
export const drizzleClientHttp = drizzle({ client: sql });
