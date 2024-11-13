"use server";

import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { blogsTable } from "@/lib/schema";

export async function getBlog(slug: string) {
  try {
    const incomingSlug = slug.replace(/^\/+|\/+$/g, "");

    const blogData = await db
      .select()
      .from(blogsTable)
      .where(eq(blogsTable.slug, `/${incomingSlug}`));

    if (!blogData.length) {
      throw new Error("Blog not found");
    }

    return blogData[0];
  } catch (error) {
    console.error("Error fetching blog:", error);
    throw new Error("Failed to fetch blog");
  }
}
