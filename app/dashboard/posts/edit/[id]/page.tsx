import { getBlogById } from "@/lib/db/actions/blog";
import PostForm from "../../../components/PostForm";

export default async function EditPostPage({
  params,
}: {
  params: { id: string };
}) {
  const blog = await getBlogById(Number(params.id));
  return (
    <div className="bg-background w-full max-w-4xl mx-auto mt-16">
      <div className="rounded-lg border border-blue-500/20 bg-transparent p-6 transition-all duration-300 ease-in-out">
        <h2 className="text-xl font-semibold mb-6">Edit Existing Blog</h2>
        <PostForm initialData={blog} />
      </div>
    </div>
  );
}
