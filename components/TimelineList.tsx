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
    content: "FSO Help Intern / Software Engineer Intern",
    expandedContent:
      "From May 2019 to January 2020, I worked as an IT intern, then transitioned to a software engineer intern.",
    slug: "mckee-foods",
  },
  {
    company: "Cracker Barrel",
    year: "2021 - 2022",
    content: "Full Stack Engineer",
    expandedContent:
      "At Crackerbarrel, I worked on the PWA React app for Crackerbarrel's mobile app and website.",
    slug: "cracker-barrel",
  },
  {
    company: "Datably",
    year: "2022 - 2023",
    content: "Software Engineer",
    expandedContent:
      "At Datably, a startup in Chattanooga, I worked on multiple applications ranging from Church mobile apps to enterprise dashboards.",
    slug: "datably",
  },
  {
    company: "Clayton Homes",
    year: "2024 - Present",
    content: "Software Engineer",
    expandedContent:
      "At Clayton Homes, I'm working on VMFHomes, a used Manufactured Home websites, and some other enterprise software.",
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
