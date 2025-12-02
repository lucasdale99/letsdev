import PortfolioCard from "./PortfolioCard";
import { Suspense } from "react";
import BlogListSkeleton from "./BlogListSkeleton";
import { getPublishedBlogs } from "@/lib/db/actions/blog";

export const revalidate = 60;

export interface IBlogList {
  slug: string;
  id: number;
  title: string;
  category: string;
  description: string;
  content: string;
  views: number;
  likes: number;
}

export default async function BlogList() {
  const blogs = await getPublishedBlogs();

  return (
    <Suspense fallback={<BlogListSkeleton />}>
      <div className="flex flex-col">
        {blogs?.map((blog: IBlogList, index: number) => (
          <PortfolioCard
            key={index}
            id={blog.id.toString()}
            title={blog.title}
            category={blog.category}
            description={blog.description}
            slug={`/blog/${blog.slug}`}
            views={blog.views}
            likes={blog.likes}
          />
        ))}
      </div>
    </Suspense>
  );
}
