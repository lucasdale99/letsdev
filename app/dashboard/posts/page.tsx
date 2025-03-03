import { getPublishedBlogs, getUnpublishedBlogs } from "@/lib/db/actions/blog";
import Sidebar from "../components/Sidebar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";
import DashboardCard from "../components/DashboardCard";

export default async function Page() {
  const publishedBlogs = await getPublishedBlogs();
  const unpublishedBlogs = await getUnpublishedBlogs();

  console.log(publishedBlogs, "PUBLISHED BLOG POSTS");

  return (
    <div>
      <Sidebar />
      <main className="ml-0 lg:ml-64 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">Blogs</h1>
              <p className="text-muted-foreground">
                Manage your blog posts and content
              </p>
            </div>
            <Link href="/dashboard/posts/create">
              <Button>Create Blog</Button>
            </Link>
          </div>
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Published</h2>
            <div className="space-y-4">
              {publishedBlogs?.map((blog) => (
                <DashboardCard
                  key={blog.id}
                  id={blog.id.toString()}
                  title={blog.title}
                  description={blog.description || "No description available"}
                  slug={`/blog/${blog.slug}`}
                  category={blog.category}
                  views={blog.views || 0}
                  likes={blog.likes || 0}
                  published={blog.published}
                  isEditable={true}
                />
              ))}
            </div>
          </div>
          <Suspense fallback={<div>Loading...</div>}>
            <div className="mb-8">
              {unpublishedBlogs?.length > 0 && (
                <>
                  <h2 className="text-2xl font-bold mb-4">Unpublished</h2>
                  <div className="space-y-4">
                    {unpublishedBlogs?.map((blog) => (
                      <DashboardCard
                        key={blog.id}
                        id={blog.id.toString()}
                        title={blog.title || "No title available"}
                        description={
                          blog.description || "No description available"
                        }
                        slug={`/blog/${blog.slug}`}
                        category={blog.category}
                        views={blog.views || 0}
                        likes={blog.likes || 0}
                        published={blog.published}
                        isEditable={true}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </Suspense>
        </div>
      </main>
    </div>
  );
}
