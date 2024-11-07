import Link from "next/link";
import { Card, CardContent, CardHeader } from "./ui/card";

interface BlogCardProps {
  title: string;
  category: string;
  description: string;
  link: string;
  index: number;
}

export default function BlogCard({
  title,
  category,
  description,
  link,
  index,
}: BlogCardProps) {
  return (
    <Link key={index} href={link}>
      <Card className="p-6 my-4 transition-all duration-300 ease-in-out cursor-pointer">
        <CardHeader className="p-0 text-xl font-bold gap-2">
          {title}
          <span className="text-xs text-muted-foreground">
            {category.toUpperCase()}
          </span>
        </CardHeader>
        <CardContent className="p-0 text-sm mt-2">
          <p className="text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
