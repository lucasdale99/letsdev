import React from "react";
import Image from "next/image";
import Me from "@/public/me.png";
import BlogList from "@/components/BlogList";
import { TimelineList } from "@/components/TimelineList";
import { AnimatedDescription } from "@/components/animatedDescription";

export default async function Index() {
  const descriptions = [
    "Father of Two",
    "Bond servant of Christ",
    "Husband",
    "Developer",
    "Coffee Addict",
    "Disc Golfer",
    "Pickleball Player",
    "Skateboarder",
  ];

  return (
    <div className="flex-1 w-full flex flex-col items-center gap-20">
      <div className="flex flex-col md:flex-row mt-10 md:mt-20 max-w-4xl gap-8 md:gap-2 px-4 md:px-0 items-center">
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="rounded-full w-40 h-40 overflow-hidden">
            <Image
              src={Me}
              alt="Lucas Dale"
              width={160}
              height={160}
              className="w-full h-full object-cover"
              priority
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 text-center md:text-left md:border-l md:border-l-foreground/10 md:pl-4">
          <h1 className="text-3xl md:text-4xl">Lucas Dale</h1>
          <h2 className="text-2xl md:text-3xl">Software Engineer</h2>
          <div className="h-[1.5em] overflow-hidden">
            <AnimatedDescription descriptions={descriptions} />
          </div>
        </div>
      </div>
      <div className="w-full max-w-7xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col space-y-4">
            <h1 className="text-4xl font-bold">Blog</h1>
            <BlogList />
          </div>

          <div className="flex flex-col space-y-4">
            <h1 className="text-4xl font-bold">My Experience</h1>
            <TimelineList />
          </div>
        </div>
      </div>
    </div>
  );
}
