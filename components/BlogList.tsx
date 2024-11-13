import { IBlogList } from "@/lib/types";
import BlogCard from "./BlogCard";
import { Suspense } from "react";
import BlogListSkeleton from "./BlogListSkeleton";
import { getBlogs } from "@/actions/blog/getBlogs";

export default async function BlogList() {
  const blogs = await getBlogs();

  return (
    <Suspense fallback={<BlogListSkeleton />}>
      <div className="flex flex-col">
        {blogs?.map((blog: IBlogList, index: number) => (
          <BlogCard
            key={index}
            title={blog.title}
            category={blog.category}
            description={blog.description}
            slug={blog.slug}
          />
        ))}
      </div>
    </Suspense>
  );
}
