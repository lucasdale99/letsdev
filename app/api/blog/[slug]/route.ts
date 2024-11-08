import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { blogsTable } from "@/lib/schema";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const incomingSlug = params.slug.replace(/^\/+|\/+$/g, "");

    const blogData = await db
      .select()
      .from(blogsTable)
      .where(eq(blogsTable.slug, `/${incomingSlug}`));

    console.log(blogData[0], "BLOG DATA");

    if (!blogData.length) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({ data: blogData[0] });
  } catch (error) {
    console.error("Error fetching blog:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog" },
      { status: 500 }
    );
  }
}
