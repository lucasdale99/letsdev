import { getBlog } from "@/lib/db/actions/blog";

export default async function Page({ params }: { params: { slug: string } }) {
  const post = await getBlog(params.slug);

  if (!post) {
    return <div className="p-6">Post not found</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>

      <div className="mb-4 flex items-center gap-4 text-muted-foreground">
        <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
          {post.category}
        </span>
        <span className="text-sm">
          {new Date(post.createdAt).toLocaleDateString()}
        </span>
      </div>

      <p className="text-muted-foreground mb-8">{post.description}</p>

      <div className="prose prose-neutral dark:prose-invert max-w-none">
        {post.content}
      </div>
    </div>
  );
}
