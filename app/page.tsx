import React from "react";
import Image from "next/image";
import Me from "@/public/me.png";
import { AnimatedDescription } from "@/components/AnimatedDescription";
import PortfolioCard from "@/components/PortfolioCard";
export default async function Index() {
  const descriptions = [
    "Father of Two",
    "Bond servant of Christ",
    "Husband",
    "Developer",
    "Coffee Fiend",
    "Disc Golfer",
    "Pickleball Player",
    "Skateboarder",
    "Audio Book Listener",
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
      <div className="w-full max-w-3xl px-6">
        <div className="grid grid-cols-1 gap-8">
          <div className="flex flex-col space-y-4">
            <h1 className="text-3xl font-bold">My Blog</h1>
            <PortfolioCard
              title="Check out my articles"
              description="I'll be posting about my personal life, professional experiences, and things I'm learning. These will range from being a Christ follower, my experiences as a father, and entrepreneur. I'll also post about the tech I'm interested in."
              slug="/blog"
            />
          </div>

          <div className="flex flex-col">
            <h1 className="text-3xl font-bold">My Business</h1>
            <PortfolioCard
              title={"Check out Strukt"}
              description={
                "Strukt is a company that I'm building with my friend, Matt Schroder. We do anything from product building to consulting to game development. We're always looking for new clients and would love to have a conversation with you."
              }
              slug="https://strukt.io"
            />
          </div>

          <div className="flex flex-col">
            <h1 className="text-3xl font-bold">My Experience</h1>
            <PortfolioCard
              title={"Check out my experience"}
              description={
                "I've worked at McKee Foods, Cracker Barrel, a startup called Datably, and finally Clayton Homes. I've learned a lot from each of them and am using my experiences to build Strukt with my friend. Check out my experiences!"
              }
              slug="/experience"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
