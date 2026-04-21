import BlogContent from "./components/BlogContent";
import SubscriberForm from "../components/SubscriberForm";
import { getBlog } from "@/lib/db/actions/blog";
import Like from "./components/Like";
import notFound from "./not-found";
import NotFound from "./not-found";

export const revalidate = 60;

interface BlogParams {
  params: Promise<{
    slug: string;
  }>;
}

export default async function BlogPost({ params }: BlogParams) {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (blog?.published === false) {
    return <NotFound />;
  }

  if (!blog) {
    return <NotFound />;
  }

  return (
    <>
      <BlogContent content={blog.content} slug={slug} />
      <div className="flex-1 w-full max-w-4xl mx-auto p-6">
        <Like postId={slug} initialLikes={blog.likes} />
        <SubscriberForm />
      </div>
    </>
  );
}
