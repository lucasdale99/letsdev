import BlogCard from "./BlogCard";
import listOfBlogs from "@/data/blog";

export default function BlogList() {
  return (
    <div className="flex flex-col gap-4">
      {listOfBlogs.map((blog, index) => (
        <BlogCard
          key={index}
          title={blog.title}
          description={blog.description}
          link={blog.link}
          index={index}
        />
      ))}
    </div>
  );
}
