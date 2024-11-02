import Link from "next/link";
import { Card, CardContent, CardHeader } from "./ui/card";

export default function BlogList() {
  const listOfBlogs = [
    {
      title: "Fighting Apathy",
      description:
        "In a day and age where we're glued to our screens, here are some helpful ways we can fight apathetic tendencies and move towards more productive behavior.",
      link: "/blog/overcoming-apathy",
    },
  ];
  return (
    <div className="flex flex-col gap-4">
      {listOfBlogs.map((blog, index) => (
        <Link key={index} href={blog.link}>
          <Card className="p-6 my-4 hover:ring-primary transition-all duration-300 ease-in-out cursor-pointer ring-2 rounded-lg">
            <div className="flex flex-col space-y-2">
              <CardHeader className="p-0">
                <h3 className="text-xl font-bold">{blog.title}</h3>
              </CardHeader>
              <CardContent className="p-0">
                <p className="text-muted-foreground">{blog.description}</p>
              </CardContent>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
}
