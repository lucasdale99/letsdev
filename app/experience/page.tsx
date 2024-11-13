import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Home } from "lucide-react";
import { getWorkExperience } from "@/actions/work/getWorkExperience";

export default async function ExperiencePage() {
  const experiences = await getWorkExperience();
  const formatDate = (date: string, showMonth: boolean = true): string => {
    if (date === "Current") return "Present";
    return new Date(date).toLocaleDateString("en-US", {
      month: showMonth ? "long" : undefined,
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
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
              <h2 className="text-2xl font-semibold">{experience.company}</h2>
              <span className="text-lg sm:text-xl text-muted-foreground">
                <span className="hidden sm:inline">
                  {formatDate(experience.startDate, true)} -{" "}
                  {formatDate(experience.endDate, true)}
                </span>
                <span className="sm:hidden">
                  {formatDate(experience.startDate, false)} -{" "}
                  {formatDate(experience.endDate, false)}
                </span>
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
