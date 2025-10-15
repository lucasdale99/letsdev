"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center max-w-3xl mx-auto mt-20">
        <div className="flex flex-col items-center gap-8 w-full">
          <h1 className="text-8xl font-bold bg-gradient-to-r from-primary to-ring bg-clip-text text-transparent leading-none">
            404
          </h1>
          <h2 className="text-4xl font-semibold">Page Not Found</h2>
          <p className="text-muted-foreground max-w-md">
            Sorry, the page you're looking for doesn't exist or has been moved.
            Let's get you back on track.
          </p>

          <div className="w-full max-w-md border border-border rounded-lg p-6 backdrop-blur-sm bg-background/75">
            <h3 className="text-xl font-semibold mb-3">
              Looking for something?
            </h3>
            <p className="text-card-foreground mb-4">
              You might want to check out my blog for articles about software
              engineering, being a Christian, fatherhood, or entrepreneurship.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
            <Button asChild className="flex-1">
              <Link href="/">Back to Home</Link>
            </Button>
            <Button asChild variant="outline" className="flex-1">
              <Link href="/blog">Read My Blog</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
