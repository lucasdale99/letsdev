import Link from "next/link";
import { Card, CardContent, CardHeader } from "./ui/card";

interface TimelineCardProps {
  company: string;
  year: string;
  content: string;
  expandedContent: string;
  slug: string;
}

export const TimelineCard: React.FC<TimelineCardProps> = ({
  company,
  year,
  content,
  expandedContent,
  slug,
}) => {
  return (
    <Link key={slug} href={`/experience/${slug}`}>
      <Card className="p-6 my-4 hover:ring-gold gap-2 hover:shadow-gold transition-all duration-300 ease-in-out cursor-pointer ring-2 rounded-lg">
        <CardHeader className="p-0 flex flex-row justify-between items-center">
          <h3 className="font-bold text-xl">{company}</h3>
          <span className="text-muted-foreground">{year}</span>
        </CardHeader>
        <CardContent className="p-0 flex flex-col gap-2 justify-between">
          <p className="text-muted-foreground">{content}</p>
          <p className="text-muted-foreground text-sm">{expandedContent}</p>
        </CardContent>
      </Card>
    </Link>
  );
};
