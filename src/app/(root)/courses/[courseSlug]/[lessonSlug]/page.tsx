import { notFound } from "next/navigation";
import { loaders } from "@/data-utils/loaders";
import { validateApiResponse } from "@/lib/error-handler";
import { MarkdownText } from "@/components/custom/markdown-text";
import { MediaPlayer } from "@/components/custom/media-player";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

async function loader(slug: string) {
  const response = await loaders.getLessonBySlug(slug);
  const data = validateApiResponse(response, "lesson");
  const lesson = data[0];
  
  if (!lesson) notFound();
  
  return lesson;
}

type LessonPageProps = {
  readonly params: Promise<{
    courseSlug: string;
    lessonSlug: string;
  }>;
};

export default async function LessonPage({ params }: LessonPageProps) {
  const { lessonSlug } = await params;
  const lesson = await loader(lessonSlug);
  const { title, description, content, resources, player } = lesson;
  const video = player?.[0];

  if (!video) {
    return <div>No video available for this lesson</div>;
  }

  return (
    <div className="p-2 h-[calc(100vh-72px)]">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={60}>
          <ScrollArea className="h-[calc(100vh-72px)] w-full p-8">
            <div className="rounded flex flex-col gap-4">
              <div className="aspect-video rounded overflow-hidden">
                <MediaPlayer
                  videoId={video.videoId}
                  timestamp={video.timecode}
                  controls
                />
              </div>

              <div>
                <h1 className="text-3xl mt-2 mb-4 font-bold">{title}</h1>
                <p className="text-lg mb-4 text-muted-foreground">
                  {description}
                </p>
                {resources && (
                  <div>
                    <MarkdownText
                      content={resources}
                      className="resources-text"
                    />
                  </div>
                )}
              </div>
            </div>
          </ScrollArea>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={40}>
          <ScrollArea className="h-[calc(100vh-72px)] w-full p-8">
            {content && (
              <MarkdownText content={content} className="rich-text w-full" />
            )}
          </ScrollArea>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
