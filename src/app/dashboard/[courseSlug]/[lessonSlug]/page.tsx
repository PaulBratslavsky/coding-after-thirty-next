import { notFound } from "next/navigation";


import { MarkdownText } from "@/components/custom/markdown-text";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MediaPlayer } from "@/components/custom/media-player";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { getLessonBySlug } from "@/data/loaders";

interface ParamsProps {
  courseSlug: string;
  lessonSlug: string;
}

interface LessonData {
  title: string;
  description: string;
  content: string;
  resources: string;
  player: { videoId: string; timecode: number }[];
  documentId: string;
}


async function loader(slug: string) {
  const data = await getLessonBySlug(slug);
  const lessonData = data.data[0];
  if (!lessonData) notFound();
  return lessonData;
}

export default async function LessonRoute({
  params,
}: {
  readonly params: Promise<ParamsProps>;
}) {
  const resolvedParams = await params;
  const lessonData = await loader(resolvedParams.lessonSlug);

  const { title, description, content, resources, player } = lessonData;


  const video = player[0];



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
              {/* <LessonStatusButton documentId={documentId} /> */}

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
