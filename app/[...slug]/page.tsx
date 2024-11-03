import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import listOfBlogs from "@/data/blog";
import { capitalizeAndRemoveDashes } from "@/utils/capitilizeLinks";
import { Home } from "lucide-react";
import { notFound } from "next/navigation";

interface BlogParams {
  params: {
    slug: string;
  };
}

export default function BlogPost({ params }: BlogParams) {
  const blog = listOfBlogs.find((blog) => blog.link === `/${params.slug}`);

  if (!blog) {
    return notFound();
  }

  return (
    <div className="flex-1 w-full max-w-4xl mx-auto p-6">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/" className="flex items-center">
              <Home className="h-4 w-4" />
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>
              {capitalizeAndRemoveDashes(params.slug.toString())}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="text-4xl font-bold mb-6">
        {capitalizeAndRemoveDashes(params.slug.toString())}
      </h1>
      <p className="text-muted-foreground mb-6">{blog?.keyNote}</p>
      <p className="text-muted-foreground">{blog?.mainContent}</p>
    </div>
  );
}
