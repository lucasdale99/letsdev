import { IBlogList } from "@/lib/types";
import BlogCard from "./BlogCard";

export default async function BlogList() {
  const data = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/blog`);
  const blogs = await data.json();

  return (
    <div className="flex flex-col">
      {blogs?.data?.map((blog: IBlogList, index: number) => (
        <BlogCard
          key={blog.id}
          title={blog.title}
          category={blog.category}
          description={blog.description}
          slug={blog.slug}
          index={index}
        />
      ))}
    </div>
  );
}
