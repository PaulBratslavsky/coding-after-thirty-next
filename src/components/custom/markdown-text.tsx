import React from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { cn } from "@/lib/utils";
import { StrapiImage, getStrapiMedia } from "@/components/custom/strapi-image";
import { ImgHTMLAttributes } from "react";

const MarkdownImage = ({ src, alt, ...props }: ImgHTMLAttributes<HTMLImageElement>) => (
  <StrapiImage src={String(src ?? '')} alt={alt ?? ''} className="rounded-sm object-cover w-full h-full my-4" {...props} height={400} width={600}/>
);

const MarkdownVideo = ({ children, ...props }: React.VideoHTMLAttributes<HTMLVideoElement>) => {
  return (
    <div className="w-full my-6">
      <div className="relative aspect-video w-full overflow-hidden rounded-lg">
        <video 
          className="absolute inset-0 w-full h-full object-cover"
          {...props}
        >
          {children}
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

const MarkdownSource = ({ src, ...props }: React.SourceHTMLAttributes<HTMLSourceElement>) => {
  const sourceUrl = getStrapiMedia(src || '');
  return <source src={sourceUrl || undefined} {...props} />;
};

const MarkdownParagraph = ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => {
  // Check if children contains only an img or video element
  const childArray = React.Children.toArray(children);
  const hasOnlyMediaElement = childArray.length === 1 && 
    React.isValidElement(childArray[0]) && 
    ((childArray[0] as React.ReactElement).type === 'img' || 
     (childArray[0] as React.ReactElement).type === 'video' ||
     (childArray[0] as React.ReactElement<{ src?: string }>).props?.src); // Image/video elements will have src prop
  
  // If it only contains media (img/video), render as a fragment to avoid invalid nesting
  if (hasOnlyMediaElement) {
    return <>{children}</>;
  }
  
  return <p {...props}>{children}</p>;
};

interface MarkdownTextProps {
  readonly content: string;
  readonly className?: string;
}

export function MarkdownText({
  content,
  className,
}: Readonly<MarkdownTextProps>) {
  return (
    <article className={cn("py-6", className)}>
      <Markdown
        components={{ 
          img: MarkdownImage,
          video: MarkdownVideo,
          source: MarkdownSource,
          p: MarkdownParagraph 
        }}
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
      >
        {content}
      </Markdown>
    </article>
  );
}
