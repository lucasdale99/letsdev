import Link from "next/link";
import { Card, CardContent, CardHeader } from "./ui/card";

interface TimelineCardProps {
  company: string;
  year: string;
  content: string;
}

export const TimelineCard: React.FC<TimelineCardProps> = ({
  company,
  year,
  content,
}) => {
  return (
    <Link href={`/experience#${company.toLowerCase().replace(/\s+/g, "-")}`}>
      <Card className="p-6 my-4 transition-all duration-300 ease-in-out cursor-pointer">
        <CardHeader className="p-0 flex flex-row justify-between items-center">
          <h3 className="text-xl font-bold">{company}</h3>
          <span className="text-xs text-muted-foreground">{year}</span>
        </CardHeader>
        <CardContent className="p-0 mt-2">
          <p className="text-sm text-muted-foreground overflow-hidden line-clamp-2">
            {content}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
};
