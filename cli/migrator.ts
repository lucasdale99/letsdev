import { migrate } from "drizzle-orm/postgres-js/migrator";
import { drizzle } from "drizzle-orm/neon-serverless";
import { Pool, neonConfig } from "@neondatabase/serverless";
import ws from "ws";

import * as schema from "../lib/schema";
import getSecret from "../lib/secrets";

async function performMigration() {
  const dbUrlResponse = await getSecret("DATABASE_URL");
  const dbUrl = dbUrlResponse?.Parameter?.Value;
  if (!dbUrl) {
    console.error("DATABASE_URL not found");
    return;
  }

  neonConfig.webSocketConstructor = ws; // <-- this is the key bit

  const pool = new Pool({ connectionString: dbUrl });
  pool.on("error", (err) => console.error(err)); // deal with e.g. re-connect

  const client = await pool.connect();

  try {
    await client.query("BEGIN");
    const db = await drizzle(client, { schema });
    await migrate(db, { migrationsFolder: "src/migrations" });
    await client.query("COMMIT");
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }

  await pool.end();
}

if (require.main === module) {
  console.log("Running migrations");

  performMigration()
    .then((val) => {
      console.log("Migration performed");
      process.exit(0);
    })
    .catch((err) => {
      console.log("err", err);
      process.exit(1);
    });
}
