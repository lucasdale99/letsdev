import { getSecret } from "../../lib/secrets";

async function performMigration() {
  const dbUrl = await getSecret("DATABASE_URL");
  if (!dbUrl) {
    return;
  }
  
}

getSecret("DATABASE_URL")
  .then((res) => console.log(res))
  .catch((err: Error) => {
    console.log(err);
  });
