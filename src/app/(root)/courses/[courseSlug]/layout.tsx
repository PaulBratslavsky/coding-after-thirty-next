import { getCourseBySlug } from "@/data-utils/loaders";
import { notFound } from "next/navigation";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { LessonLink } from "@/components/custom/lesson-link";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

async function loader(slug: string) {
  try { 
  const data = await getCourseBySlug(slug);
  const courseData = data?.data[0];
  if (!courseData) notFound();
  return courseData;
} catch (error) {
  console.error("Failed to load course:", error);
  throw error;
}
}

interface LessonListProps {
  documentId: string;
  slug: string;
  title: string;
  description: string;
}

interface ParamsProps {
  courseSlug: string;
  lessonSlug: string;
}

export default async function DashboardRoute({
  params,
  children,
}: {
  readonly params: Promise<ParamsProps>;
  readonly children: React.ReactNode;
}) {
  const resolvedParams = await params;  
  const courseSlug = resolvedParams.courseSlug;
  const data = await loader(courseSlug);
  const courseList = data?.lessons;


  return (
    <TooltipProvider delayDuration={0}>
      <Separator />
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={25}>
          <ScrollArea className="h-[calc(100vh-72px)] w-full p-4">
            <h2 className="text-xl font-bold mb-4">Lessons</h2>
            <div className="space-y-2">
              {courseList ? courseList.map((lesson: LessonListProps, index: number) => <LessonLink pathname={"/courses/" + courseSlug} lesson={lesson} index={index} key={index} />  ) : <div>No lessons found</div>}
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
