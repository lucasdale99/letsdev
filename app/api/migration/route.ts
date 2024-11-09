import { execSync } from "child_process";

export async function GET(request: Request) {
  execSync(`npm run db push`, { stdio: "inherit" });
  return new Response("Migrated");
}
