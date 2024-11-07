import { db } from "../db";
import { InsertBlog, blogsTable } from "../schema";

export async function createBlogPost(data: InsertBlog) {
  await db.insert(blogsTable).values(data);
}
