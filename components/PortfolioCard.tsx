"use client";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardFooter } from "./ui/card";
import { Eye, Heart } from "lucide-react";

interface PortfolioCardProps {
  title: string;
  description: string;
  id?: string;
  category?: string;
  slug?: string;
  views?: number;
  likes?: number;
  published?: boolean;
  isEditable?: boolean;
}

export default function PortfolioCard({
  id,
  title,
  category,
  description,
  slug,
  views = 0,
  likes = 0,
}: PortfolioCardProps) {
  return (
    <Card className="p-6 my-4 transition-all duration-300 ease-in-out">
      <div className="flex justify-between items-start">
        <Link href={`${slug}`} className="flex-1">
          <CardHeader className="p-0 text-xl font-bold gap-2">
            {title}
            {category ? (
              <span className="text-xs text-muted-foreground">
                {category.toUpperCase()}
              </span>
            ) : null}
          </CardHeader>
          <CardContent className="p-0 text-sm mt-2">
            <p className="text-muted-foreground">{description}</p>
          </CardContent>
        </Link>
      </div>
      {id && (
        <CardFooter className="p-0 mt-4 flex gap-4">
          {/* <span className="text-sm text-muted-foreground flex items-center gap-1">
            <Eye className="w-4 h-4" /> {views}
          </span> */}
          <span className="text-sm text-muted-foreground flex items-center gap-1">
            <Heart className="w-4 h-4" /> {likes}
          </span>
        </CardFooter>
      )}
    </Card>
  );
}
