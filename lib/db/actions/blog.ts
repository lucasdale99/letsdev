"use server";
import { db } from "@/lib/db/db";
import { eq, sql, and } from "drizzle-orm";
import { blogsTable, insertBlogSchema, blogLikesTable } from "@/lib/db/schema";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function publishBlog(id: number) {
  try {
    await db
      .update(blogsTable)
      .set({ published: true })
      .where(eq(blogsTable.id, id));
    revalidatePath("/dashboard/posts");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to publish blog post" };
  }
}

export async function unpublishBlog(id: number) {
  try {
    await db
      .update(blogsTable)
      .set({ published: false })
      .where(eq(blogsTable.id, id));
    revalidatePath("/dashboard/posts");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to unpublish blog post" };
  }
}

export async function getUnpublishedBlogs() {
  try {
    const blogs = await db
      .select()
      .from(blogsTable)
      .where(eq(blogsTable.published, false))
      .execute();
    return blogs;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw new Error("Failed to fetch blogs");
  }
}

export async function getPublishedBlogs() {
  try {
    const blogs = await db
      .select()
      .from(blogsTable)
      .where(eq(blogsTable.published, true))
      .execute();

    console.log(blogs, "BLOGS");

    return blogs;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw new Error("Failed to fetch blogs");
  }
}

export async function createBlog(
  prevState: any,
  formData: z.infer<typeof insertBlogSchema>
) {
  try {
    const { title, description, content, category } = formData;

    const blog = await db
      .insert(blogsTable)
      .values({
        title,
        description,
        content,
        category,
        published: false,
        slug: title.toLowerCase().replace(/ /g, "-"),
      })
      .returning();

    revalidatePath("/dashboard/posts");
    return { status: "success", data: blog };
  } catch (error) {
    return {
      status: "error",
      message: "Failed to create blog post",
    };
  }
}

export async function getBlogById(id: number) {
  try {
    const blogData = await db
      .select()
      .from(blogsTable)
      .where(eq(blogsTable.id, id))
      .execute();

    return blogData[0];
  } catch (error) {
    console.error("Error fetching blog:", error);
  }
}

export async function getBlog(slug: string) {
  try {
    const blogData = await db
      .select()
      .from(blogsTable)
      .where(eq(blogsTable.slug, slug))
      .execute();

    if (!blogData.length) {
      throw new Error("Blog not found");
    }

    return blogData[0];
  } catch (error) {
    console.error("Error fetching blog:", error);
  }
}

export async function updateBlog(
  id: number,
  formData: Partial<z.infer<typeof insertBlogSchema>>
) {
  try {
    const blog = await db
      .update(blogsTable)
      .set({
        ...formData,
        // If title is updated, update slug as well
        ...(formData.title && {
          slug: formData.title.toLowerCase().replace(/ /g, "-"),
        }),
      })
      .where(eq(blogsTable.id, id))
      .returning();

    revalidatePath("/dashboard/posts");
    return { success: true, data: blog };
  } catch (error) {
    console.error("Error updating blog:", error);
    return { success: false, error: "Failed to update blog post" };
  }
}

export async function deleteBlog(id: number) {
  try {
    await db.delete(blogsTable).where(eq(blogsTable.id, id));

    revalidatePath("/dashboard/posts");
    return { success: true };
  } catch (error) {
    console.error("Error deleting blog:", error);
    return { success: false, error: "Failed to delete blog post" };
  }
}

export async function getTotalViews() {
  try {
    const result = await db
      .select({
        totalViews: sql<number>`sum(${blogsTable.views})`,
      })
      .from(blogsTable)
      .execute();

    return result[0].totalViews ?? 0;
  } catch (error) {
    console.error("Error fetching total views:", error);
    return 0;
  }
}

export async function likeBlog(slug: string, anonymousId: string) {
  try {
    const blog = await db
      .select()
      .from(blogsTable)
      .where(eq(blogsTable.slug, slug))
      .execute();

    if (!blog.length) {
      return { success: false, error: "Blog not found" };
    }

    // Check if this anonymous user has already liked this blog
    const existingLike = await db
      .select()
      .from(blogLikesTable)
      .where(
        and(
          eq(blogLikesTable.blogId, blog[0].id),
          eq(blogLikesTable.anonymousId, anonymousId)
        )
      )
      .execute();

    // If already liked, return early
    if (existingLike.length > 0) {
      return { success: true, alreadyLiked: true };
    }

    // Instead of using a transaction, perform operations sequentially

    // 1. Insert the like record
    await db.insert(blogLikesTable).values({
      blogId: blog[0].id,
      anonymousId,
      createdAt: new Date(),
    });

    // 2. Update the likes count
    await db
      .update(blogsTable)
      .set({ likes: blog[0].likes + 1 })
      .where(eq(blogsTable.slug, slug));

    return { success: true };
  } catch (error) {
    console.error("Error liking blog:", error);
    return { success: false, error: "Failed to like blog post" };
  }
}

export async function unlikeBlog(slug: string, anonymousId: string) {
  try {
    const blog = await db
      .select()
      .from(blogsTable)
      .where(eq(blogsTable.slug, slug))
      .execute();

    if (!blog.length) {
      return { success: false, error: "Blog not found" };
    }

    // Check if this anonymous user has liked this blog
    const existingLike = await db
      .select()
      .from(blogLikesTable)
      .where(
        and(
          eq(blogLikesTable.blogId, blog[0].id),
          eq(blogLikesTable.anonymousId, anonymousId)
        )
      )
      .execute();

    // If not liked, return early
    if (existingLike.length === 0) {
      return { success: true, notLiked: true };
    }

    // Instead of using a transaction, perform operations sequentially

    // 1. Delete the like record
    await db
      .delete(blogLikesTable)
      .where(
        and(
          eq(blogLikesTable.blogId, blog[0].id),
          eq(blogLikesTable.anonymousId, anonymousId)
        )
      );

    // 2. Update the likes count (ensure it doesn't go below 0)
    const newLikes = Math.max(0, blog[0].likes - 1);
    await db
      .update(blogsTable)
      .set({ likes: newLikes })
      .where(eq(blogsTable.slug, slug));

    return { success: true };
  } catch (error) {
    console.error("Error unliking blog:", error);
    return { success: false, error: "Failed to unlike blog post" };
  }
}

export async function hasUserLikedBlog(slug: string, anonymousId: string) {
  try {
    const blog = await db
      .select()
      .from(blogsTable)
      .where(eq(blogsTable.slug, slug))
      .execute();

    if (!blog.length) {
      return { liked: false, error: "Blog not found" };
    }

    const existingLike = await db
      .select()
      .from(blogLikesTable)
      .where(
        and(
          eq(blogLikesTable.blogId, blog[0].id),
          eq(blogLikesTable.anonymousId, anonymousId)
        )
      )
      .execute();

    return { liked: existingLike.length > 0 };
  } catch (error) {
    console.error("Error checking if user liked blog:", error);
    return { liked: false, error: "Failed to check like status" };
  }
}
