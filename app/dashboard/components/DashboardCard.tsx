"use client";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Eye, Heart, Send, Trash, Edit, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { publishBlog, deleteBlog, unpublishBlog } from "@/lib/db/actions/blog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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

export default function DashboardCard({
  id,
  title,
  category,
  description,
  slug,
  views = 0,
  likes = 0,
  published = true,
  isEditable = false,
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
        <div className="flex gap-2">
          {isEditable && (
            <Link href={`/dashboard/posts/edit/${id}`}>
              <Button size="sm" variant="outline">
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
            </Link>
          )}

          {!published ? (
            <form
              action={async () => {
                if (id) {
                  await publishBlog(parseInt(id));
                }
              }}
            >
              {isEditable && (
                <Button size="sm" className="ml-2">
                  <Send className="w-4 h-4 mr-2" />
                  Publish
                </Button>
              )}
            </form>
          ) : (
            isEditable && (
              <form
                action={async () => {
                  if (id) {
                    await unpublishBlog(parseInt(id));
                  }
                }}
              >
                <Button size="sm" variant="secondary" className="ml-2">
                  <EyeOff className="w-4 h-4 mr-2" />
                  Unpublish
                </Button>
              </form>
            )
          )}

          {isEditable && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm" className="ml-2">
                  <Trash className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your blog post.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={async () => {
                      if (id) {
                        await deleteBlog(parseInt(id));
                      }
                    }}
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
      </div>
      {id && (
        <CardFooter className="p-0 mt-4 flex gap-4">
          <span className="text-sm text-muted-foreground flex items-center gap-1">
            <Eye className="w-4 h-4" /> {views}
          </span>
          <span className="text-sm text-muted-foreground flex items-center gap-1">
            <Heart className="w-4 h-4" /> {likes}
          </span>
        </CardFooter>
      )}
    </Card>
  );
}
