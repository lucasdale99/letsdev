"use client";
import { useState } from "react";
import { TimelineCard } from "./TimelineCard";

interface TimelineItem {
  company: string;
  year: string;
  content: string;
  expandedContent: string;
}

const timelineData: TimelineItem[] = [
  {
    company: "McKee Foods",
    year: "2019 - 2021",
    content: "FSO Help Intern",
    expandedContent: "Detailed info for 2019, 2020, and 2021...",
  },
  {
    company: "Cracker Barrel",
    year: "2021 - 2022",
    content: "Full Stack Engineer",
    expandedContent: "Detailed info for 2021 and 2022...",
  },
  {
    company: "Datably",
    year: "2022 - 2023",
    content: "Software Engineer",
    expandedContent: "Detailed info for 2022 and 2023...",
  },
  {
    company: "Clayton Homes",
    year: "2024 - Present",
    content: "Software Engineer",
    expandedContent: "Detailed info for 2024...",
  },
  // Add more items...
];

export const Timeline: React.FC = () => {
  return (
    <div className="rounded-lg">
      {timelineData.map((item, index) => (
        <TimelineCard
          key={index}
          company={item.company}
          year={item.year}
          content={item.content}
          expandedContent={item.expandedContent}
        />
      ))}
    </div>
  );
};
