import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "src/schema",
  out: "drizzle/migrations",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
