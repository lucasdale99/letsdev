import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { workExperience } from "@/data/workExperience";
import { Home } from "lucide-react";

export default function ExperiencePage() {
  const experiences = workExperience;
  const formatDate = (date: string): string => {
    if (date === "Current") return "Present";
    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="flex-1 w-full max-w-4xl mx-auto p-6">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/" className="flex items-center">
              <Home className="h-4 w-4" />
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Experience</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h1 className="text-4xl font-bold mb-8 text-white">Work Experience</h1>

      <div className="space-y-12">
        {experiences.map((experience) => (
          <div
            key={experience.company}
            id={experience.company.toLowerCase().replace(/\s+/g, "-")}
            className="rounded-lg p-6"
          >
            <div className="flex justify-between items-center">
              <h2 className="flex text-2xl font-semibold mb-2 ">
                {experience.company}
              </h2>
              <span className="text-xl text-muted-foreground">
                {formatDate(experience.startDate)} -{" "}
                {formatDate(experience.endDate)}
              </span>
            </div>

            <p className="text-muted-foreground mb-4"></p>
            <h3 className="text-xl mb-3">{experience.position}</h3>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              {experience.content}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
