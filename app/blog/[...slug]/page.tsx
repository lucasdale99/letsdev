import { capitalizeAndRemoveDashes } from "@/utils/capitilizeLinks";

interface BlogParams {
  params: {
    slug: string;
  };
}

export default function BlogPost({ params }: BlogParams) {
  return (
    <div className="flex-1 w-full max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6">
        {capitalizeAndRemoveDashes(params.slug.toString())}
      </h1>
      <p className="text-muted-foreground">Coming soon...</p>
    </div>
  );
}
