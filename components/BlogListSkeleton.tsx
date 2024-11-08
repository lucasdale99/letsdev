import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function BlogListSkeleton() {
  return (
    <div className="flex flex-col">
      {[...Array(3)].map((_, index) => (
        <Card key={index} className="p-6 my-4">
          {/* Category skeleton */}
          <Skeleton className="h-4 w-24 mb-2" />

          {/* Title skeleton */}
          <Skeleton className="h-8 w-3/4 mb-4" />

          {/* Description skeleton */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
          </div>
        </Card>
      ))}
    </div>
  );
}
