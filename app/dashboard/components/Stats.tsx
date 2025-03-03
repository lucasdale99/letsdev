import React from "react";
import { BookOpen, Eye } from "lucide-react";
import { getPublishedBlogs, getTotalViews } from "@/lib/db/actions/blog";

export default async function Stats() {
  const posts = await getPublishedBlogs();
  const views = await getTotalViews();
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="rounded-lg border bg-transparent p-6 transition-all duration-300 ease-in-out">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-primary/10 text-primary flex items-center justify-center">
            <BookOpen className="w-8 h-8" />
          </div>
          <div className="ml-4">
            <p className="text-sm text-muted-foreground">Total Posts</p>
            <h3 className="text-2xl font-semibold">{posts.length}</h3>
          </div>
        </div>
      </div>

      <div className="rounded-lg border bg-transparent p-6 transition-all duration-300 ease-in-out">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-primary/10 text-primary">
            <Eye className="w-6 h-6" />
          </div>
          <div className="ml-4">
            <p className="text-sm text-muted-foreground">Total Views</p>
            <h3 className="text-2xl font-semibold">{views}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
