import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: ".env.local" });

export default defineConfig({
  schema: "./lib/schema.ts",
  out: "./lib/migrations",
  dialect: "postgresql",
  driver: "pglite",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
