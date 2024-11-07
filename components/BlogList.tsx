import BlogCard from "./BlogCard";
import listOfBlogs from "@/data/blog";

export default function BlogList() {
  return (
    <div className="flex flex-col">
      {listOfBlogs.map((blog, index) => (
        <BlogCard
          key={index}
          title={blog.title}
          category={blog.category}
          description={blog.description}
          link={blog.slug}
          index={index}
        />
      ))}
    </div>
  );
}
