"use server";
import { createBlog, updateBlog } from "@/lib/db/actions/blog";
import { insertBlogSchema } from "@/lib/db/schema";

type ActionResponse = {
  status: "success" | "error";
  message?: string;
};

export async function createBlogAction(
  prevState: any,
  formData: FormData
): Promise<ActionResponse> {
  try {
    const rawData = Object.fromEntries(formData.entries());
    const validatedData = insertBlogSchema.parse(rawData);
    const result = await createBlog(undefined, validatedData);

    return {
      status: result.status as "success" | "error",
      message: result.message,
    };
  } catch (error) {
    console.error("Error creating blog post:", error);
    return {
      status: "error",
      message: "Failed to create blog post.",
    };
  }
}

export async function updateBlogAction(
  prevState: any,
  formData: FormData
): Promise<ActionResponse> {
  try {
    const rawData = Object.fromEntries(formData.entries());

    // Extract id before validation
    const id = Number(rawData.id);

    // Remove id from data before validation since it's not part of the schema
    const { id: _, ...dataToValidate } = rawData;

    const validatedData = insertBlogSchema.parse(dataToValidate);

    const result = await updateBlog(id, validatedData);

    return {
      status: result.success ? "success" : "error",
      message: result.success ? "Blog post updated successfully" : result.error,
    };
  } catch (error) {
    console.error("Error updating blog post:", error);
    return {
      status: "error",
      message: "Failed to update blog post.",
    };
  }
}
