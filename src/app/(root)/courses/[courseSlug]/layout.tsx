import { notFound } from "next/navigation";
import { loaders } from "@/data-utils/loaders";
import { validateApiResponse } from "@/lib/error-handler";
import { LessonLink } from "@/components/custom/lesson-link";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

async function loader(slug: string) {
  const response = await loaders.getCourseBySlug(slug);
  const data = validateApiResponse(response);
  const courseData = data?.[0];
  if (!courseData) notFound();
  return courseData;
}

type CourseLayoutProps = {
  readonly params: Promise<{ courseSlug: string }>;
  readonly children: React.ReactNode;
};

export default async function CourseLayout({ params, children }: CourseLayoutProps) {
  const { courseSlug } = await params;
  const courseData = await loader(courseSlug);
  const lessons = courseData.lessons || [];

  return (
    <TooltipProvider delayDuration={0}>
      <Separator />
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={25}>
          <ScrollArea className="h-[calc(100vh-72px)] w-full p-4">
            <h2 className="text-xl font-bold mb-4">Lessons</h2>
            <div className="space-y-2">
              {lessons.length > 0 ? (
                lessons.map((lesson, index) => (
                  <LessonLink
                    key={lesson.documentId}
                    pathname={`/courses/${courseSlug}`}
                    lesson={lesson}
                    index={index}
                  />
                ))
              ) : (
                <div>No lessons found</div>
              )}
            </div>
          </ScrollArea>
          <Separator />
        </ResizablePanel>

        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={75}>{children}</ResizablePanel>
      </ResizablePanelGroup>
      <Separator />
    </TooltipProvider>
  );
}
