import { notFound } from "next/navigation";
import BlogContent from "./components/BlogContent";
import SubscriberForm from "../components/SubscriberForm";
import { getBlog } from "@/lib/db/actions/blog";
import Like from "./components/Like";

interface BlogParams {
  params: {
    slug: string;
  };
}

export default async function BlogPost({ params }: BlogParams) {
  const blog = await getBlog(params.slug);

  if (blog?.published === false) {
    return notFound();
  }

  if (!blog) {
    return notFound();
  }

  console.log(blog, "TEST");

  return (
    <>
      <BlogContent content={blog.content} slug={`${params.slug}`} />
      <div className="flex-1 w-full max-w-4xl mx-auto p-6">
        <Like postId={`${params.slug}`} initialLikes={blog.likes} />
        <SubscriberForm />
      </div>
    </>
  );
}
