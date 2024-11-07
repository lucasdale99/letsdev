import { dbNow } from "@/lib/db";
import { NextResponse } from "next/server";

export const fetchCache = "force-no-store";
export const revalidate = 0;

export async function GET() {
  const dbResult = await dbNow();
  const now = dbResult ? dbResult[0].now : null;
  return NextResponse.json({ now });
}
