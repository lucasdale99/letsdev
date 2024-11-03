import BlogCard from "./BlogCard";

export default function BlogList() {
  const listOfBlogs = [
    {
      title: "Fighting Apathy",
      description:
        "In a day and age where we're glued to our screens, here are some helpful ways we can fight apathetic tendencies and move towards more productive behavior.",
      link: "/blog/overcoming-apathy",
    },
  ];
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
