import { TimelineCard } from "@/components/TimelineCard";

interface TimelineItem {
  company: string;
  year: string;
  content: string;
  expandedContent: string;
  slug: string;
}

const timelineData: TimelineItem[] = [
  {
    company: "McKee Foods",
    year: "2019 - 2021",
    content: "FSO Help Intern",
    expandedContent: "Detailed info for 2019, 2020, and 2021...",
    slug: "mckee-foods",
  },
  {
    company: "Cracker Barrel",
    year: "2021 - 2022",
    content: "Full Stack Engineer",
    expandedContent: "Detailed info for 2021 and 2022...",
    slug: "cracker-barrel",
  },
  {
    company: "Datably",
    year: "2022 - 2023",
    content: "Software Engineer",
    expandedContent: "Detailed info for 2022 and 2023...",
    slug: "datably",
  },
  {
    company: "Clayton Homes",
    year: "2024 - Present",
    content: "Software Engineer",
    expandedContent: "Detailed info for 2024...",
    slug: "clayton-homes",
  },
];

export const TimelineList: React.FC = () => {
  return (
    <div>
      {timelineData.map((item, index) => (
        <TimelineCard
          key={index}
          company={item.company}
          year={item.year}
          content={item.content}
          expandedContent={item.expandedContent}
          slug={item.slug}
        />
      ))}
    </div>
  );
};
