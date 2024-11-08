import { db } from "@/lib/db";
import { blogsTable } from "@/lib/schema";
import { NextResponse } from "next/server";
export const fetchCache = "force-no-store";
export const revalidate = 0;

export async function GET() {
  const data = await db.select().from(blogsTable).execute();
  return NextResponse.json({ data });
}
