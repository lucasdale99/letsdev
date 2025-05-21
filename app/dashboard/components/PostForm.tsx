"use client";
import React, { useRef } from "react";
import { Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFormState } from "react-dom";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { motion } from "framer-motion";
import { insertBlogSchema } from "@/lib/db/schema";
import {
  createBlogAction,
  updateBlogAction,
} from "@/lib/handlers/blog/actions";
import { useRouter } from "next/navigation";

const PostForm = ({ initialData }: { initialData: any }) => {
  const [state, action] = useFormState(
    initialData ? updateBlogAction : createBlogAction,
    undefined
  );
  const ref = useRef<HTMLFormElement>(null);
  const router = useRouter();

  const defaultValues = {
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    description: initialData?.description || "",
    content: initialData?.content || "",
    category: initialData?.category || "",
  };

  const [form, fields] = useForm({
    lastResult: state,
    defaultValue: defaultValues,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: insertBlogSchema });
    },
    shouldRevalidate: "onInput",
  });

  return (
    <form
      id={form.id}
      ref={ref}
      className="space-y-6"
      action={(formData) => {
        action(formData);
        if (state?.status === "success") {
          ref.current?.reset();
          router.push("/dashboard/posts");
        }
      }}
    >
      {initialData && <input type="hidden" name="id" value={initialData.id} />}
      <div>
        <label htmlFor="title" className="text-sm font-medium">
          Blog Title
        </label>
        <Input
          name="title"
          placeholder="Enter post title"
          className="flex-1"
          required
          defaultValue={initialData?.title}
        />
        {fields.title.errors && (
          <p className="text-sm text-red-500 mt-1">{fields.title.errors}</p>
        )}
      </div>
      <div>
        <label htmlFor="slug" className="text-sm font-medium">
          Slug
        </label>
        <Input
          name="slug"
          placeholder="Enter post slug"
          className="flex-1"
          required
          defaultValue={initialData?.slug}
        />
        {fields.title.errors && (
          <p className="text-sm text-red-500 mt-1">{fields.slug.errors}</p>
        )}
      </div>

      <div>
        <label htmlFor="description" className="text-sm font-medium">
          Description
        </label>
        <Input
          name="description"
          placeholder="Enter post description"
          className="flex-1"
          required
          defaultValue={initialData?.description}
        />
        {fields.description.errors && (
          <p className="text-sm text-red-500 mt-1">
            {fields.description.errors}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="category" className="text-sm font-medium">
          Category
        </label>
        <Input
          name="category"
          placeholder="Enter post category"
          className="flex-1"
          required
          defaultValue={initialData?.category}
        />
        {fields.category.errors && (
          <p className="text-sm text-red-500 mt-1">{fields.category.errors}</p>
        )}
      </div>

      <div>
        <label htmlFor="content" className="text-sm font-medium">
          Content
        </label>
        <textarea
          name="content"
          rows={12}
          className="flex w-full rounded-md border border-zinc-200 bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-zinc-950 placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:border-zinc-800 dark:file:text-zinc-50 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-300"
          placeholder="Write your post content here..."
          required
          defaultValue={initialData?.content}
        />
        {fields.content.errors && (
          <p className="text-sm text-red-500 mt-1">{fields.content.errors}</p>
        )}
      </div>
      <div className="flex justify-end gap-2">
        <Button
          type="button"
          onClick={() => router.push("/dashboard/posts")}
          className="bg-red-500 hover:bg-red-600 text-white font-medium px-6"
        >
          <X className="w-4 h-4 mr-2" />
          Cancel
        </Button>
        <Button
          type="submit"
          className="bg-yellow-600 hover:bg-yellow-700 text-white font-medium px-6"
        >
          <Save className="w-4 h-4 mr-2" />
          {initialData ? "Update Post" : "Save Post"}
        </Button>
      </div>

      {state?.status === "success" && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-green-500 text-center"
        >
          {initialData
            ? "Post updated successfully!"
            : "Post created successfully!"}
        </motion.p>
      )}
      {state?.status === "error" && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-red-500 text-center"
        >
          {"message" in state ? state.message : "Failed to create post"}
        </motion.p>
      )}
    </form>
  );
};

export default PostForm;
