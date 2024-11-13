"use server";
import { db } from "@/lib/db";
import { blogsTable } from "@/lib/schema";

export async function getBlogs() {
  try {
    const blogs = await db.select().from(blogsTable).execute();
    return blogs;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw new Error("Failed to fetch blogs");
  }
}
