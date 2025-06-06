import Markdown from "react-markdown";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";
import { StrapiImage } from "@/components/custom/strapi-image";
import { ImgHTMLAttributes } from "react";

const MarkdownImage = ({ src, alt, ...props }: ImgHTMLAttributes<HTMLImageElement>) => (
  <AspectRatio ratio={16 / 9} className="w-full relative rounded-sm overflow-hidden">
    <StrapiImage src={String(src ?? '')} alt={alt ?? ''} className="rounded-sm object-cover w-full h-full" {...props} height={400} width={600}/>
  </AspectRatio>
);

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
        components={{ img: MarkdownImage }}
        remarkPlugins={[remarkGfm]}
      >
        {content}
      </Markdown>
    </article>
  );
}
