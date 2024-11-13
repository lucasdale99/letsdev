import { getWorkExperience } from "@/actions/work/getWorkExperience";
import { TimelineCard } from "@/components/TimelineCard";

interface TimelineItem {
  company: string;
  startDate: string;
  endDate: string;
  position: string;
  content: string;
  slug: string;
}

export const TimelineList: React.FC = async () => {
  const experiences = await getWorkExperience();
  const formatDate = (date: string): string => {
    if (date === "Current") return "Current";
    return new Date(date).getFullYear().toString();
  };

  const timelineData: TimelineItem[] = experiences.map((exp) => ({
    company: exp.company,
    startDate: exp.startDate,
    endDate: exp.endDate,
    position: exp.position,
    content: exp.content,
    slug: exp.company.toLowerCase().replace(/\s+/g, "-"),
  }));

  return (
    <div>
      {timelineData.map((item, index) => (
        <TimelineCard
          key={index}
          company={item.company}
          year={`${formatDate(item.startDate)} - ${formatDate(item.endDate)}`}
          content={item.content}
        />
      ))}
    </div>
  );
};
