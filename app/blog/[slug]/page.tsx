import { notFound } from "next/navigation";
import BlogContent from "./components/BlogContent";
import SubscriberForm from "./components/SubscriberForm";

interface BlogParams {
  params: {
    slug: string;
  };
}

export default async function BlogPost({ params }: BlogParams) {
  const blog = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/blog/${params.slug}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const blogData = await blog.json();

  if (!blogData || !blogData.data) {
    return notFound();
  }

  return (
    <>
      <BlogContent content={blogData.data.content} slug={params.slug} />
      <SubscriberForm />
    </>
  );
}
