"use client";

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
import ReactMarkdown from "react-markdown";
import { motion, useScroll } from "framer-motion";
import { useEffect, useState } from "react";

interface BlogParams {
  params: {
    slug: string;
  };
}

export default function BlogPost({ params }: BlogParams) {
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      scrollYProgress.onChange((v) => console.log("Scroll progress:", v));
    }
  }, [mounted, scrollYProgress]);

  const blog = listOfBlogs.find((blog) => blog.slug === `/${params.slug}`);

  if (!blog) {
    return notFound();
  }

  return (
    <>
      {mounted && (
        <motion.div
          className="fixed top-16 left-0 right-0 z-[999]"
          style={{
            scaleX: scrollYProgress,
            position: "fixed",
            height: "4px",
            backgroundColor: "rgb(234, 179, 8)",
            transformOrigin: "0%",
          }}
        />
      )}
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
        <ReactMarkdown
          className="prose prose-invert max-w-none"
          components={{
            h1: ({ children }) => (
              <h1 className="text-3xl font-bold mt-8 mb-4">{children}</h1>
            ),
            h2: ({ children }) => (
              <h2 className="text-2xl font-bold mt-6 mb-3">{children}</h2>
            ),
            p: ({ children }) => <p className="mb-4">{children}</p>,
            ul: ({ children }) => (
              <ul className="list-disc pl-6 mb-4">{children}</ul>
            ),
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4">
                {children}
              </blockquote>
            ),
          }}
        >
          {blog?.content}
        </ReactMarkdown>
      </div>
    </>
  );
}
