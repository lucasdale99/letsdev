import { notFound } from "next/navigation";
import BlogContent from "./components/BlogContent";
import SubscriberForm from "../components/SubscriberForm";
import { getBlog } from "@/actions/blog/getBlog";

interface BlogParams {
  params: {
    slug: string;
  };
}

export default async function BlogPost({ params }: BlogParams) {
  const blog = await getBlog(params.slug);

  if (!blog) {
    return notFound();
  }

  return (
    <>
      <BlogContent content={blog.content} slug={params.slug} />
      <div className="flex-1 w-full max-w-4xl mx-auto p-6">
        <SubscriberForm />
      </div>
    </>
  );
}
