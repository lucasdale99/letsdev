import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";

// Load environment variables from .env.local in development
if (process.env.NODE_ENV !== "production") {
  config({ path: ".env.local" });
}

// Get the appropriate database URL based on environment
const getDatabaseUrl = () => {
  // For staging environment
  if (process.env.DATABASE_URL_STAGING) {
    return process.env.DATABASE_URL_STAGING;
  }
  // For production environment
  if (process.env.DATABASE_URL) {
    return process.env.DATABASE_URL;
  }

  throw new Error(
    "No database connection string was found in environment variables"
  );
};

// Create the database connection
const sql = neon(getDatabaseUrl());
export const db = drizzle({ client: sql });
