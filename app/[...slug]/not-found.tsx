"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] gap-6">
      <h2 className="text-4xl font-bold">Not Found</h2>
      <p className="text-muted-foreground text-lg">
        Could not find the page you were looking for.
      </p>
      <Button
        onClick={() => router.back()}
        className="hover:ring-gold hover:shadow-gold transition-all duration-300 ease-in-out ring-2 text-white"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Go Back
      </Button>
    </div>
  );
}
