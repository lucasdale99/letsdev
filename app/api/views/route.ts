import { eq } from "drizzle-orm";

import { blogsTable } from "@/lib/db/schema";
import { sql } from "drizzle-orm";
import { NextResponse } from "next/server";
import { db } from "@/lib/db/db";

export async function POST(request: Request) {
  try {
    const { slug } = await request.json();

    // Increment the views count for the blog post
    const result = await db
      .update(blogsTable)
      .set({
        views: sql`${blogsTable.views} + 1`,
        updatedAt: sql`now()`,
      })
      .where(eq(blogsTable.slug, slug))
      .returning({ views: blogsTable.views });

    if (!result.length) {
      return NextResponse.json(
        { error: "Blog post not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ views: result[0].views });
  } catch (error) {
    console.error("Error updating view count:", error);
    return NextResponse.json(
      { error: "Failed to update view count" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    return NextResponse.json({ error: "Slug is required" }, { status: 400 });
  }

  try {
    const views = await db
      .select({ views: blogsTable.views })
      .from(blogsTable)
      .where(eq(blogsTable.slug, slug))
      .limit(1);

    if (!views.length) {
      return NextResponse.json(
        { error: "Blog post not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ views: views[0].views });
  } catch (error) {
    console.error("Error fetching view count:", error);
    return NextResponse.json(
      { error: "Failed to fetch view count" },
      { status: 500 }
    );
  }
}
