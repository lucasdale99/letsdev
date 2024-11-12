import { IBlogList } from "@/lib/types";
import BlogCard from "./BlogCard";
import { Suspense } from "react";
import BlogListSkeleton from "./BlogListSkeleton";

export default async function BlogList() {
  const data = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/blog`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const blogs = await data.json();

  return (
    <Suspense fallback={<BlogListSkeleton />}>
      <div className="flex flex-col">
        {blogs.data?.map((blog: IBlogList, index: number) => (
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
