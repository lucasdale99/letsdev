import Link from "next/link";
import { Card, CardContent } from "./ui/card";

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
      <Card className="my-4 hover:ring-primary transition-all duration-300 ease-in-out cursor-pointer ring-2 rounded-lg">
        <CardContent className="p-6">
          <div className="flex justify-between items-start gap-6">
            <div className="flex-1 space-y-3">
              <h3 className="font-bold text-xl">{company}</h3>
              <p className="text-muted-foreground">{content}</p>
              <p className="text-sm text-muted-foreground/80">
                {expandedContent}
              </p>
            </div>
            <div className="text-lg font-semibold text-primary">{year}</div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
