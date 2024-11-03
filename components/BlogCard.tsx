import Link from "next/link";
import { Card, CardContent, CardHeader } from "./ui/card";

interface BlogCardProps {
  title: string;
  description: string;
  link: string;
  index: number;
}

export default function BlogCard({
  title,
  description,
  link,
  index,
}: BlogCardProps) {
  return (
    <Link key={index} href={link}>
      <Card className="p-6 my-4 hover:ring-gold gap-2 hover:shadow-gold transition-all duration-300 ease-in-out cursor-pointer ring-2 rounded-lg">
        <CardHeader className="p-0 text-xl font-bold">{title}</CardHeader>
        <CardContent className="p-0">
          <p className="text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
