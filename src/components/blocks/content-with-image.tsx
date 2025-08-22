import Link from "next/link";
import ReactMarkdown from "react-markdown";

import { StrapiImage } from "@/components/custom/strapi-image";
import { cn } from "@/lib/utils";
import type { Base, TLink } from "@/types";

export interface IContentWithImageProps extends Base<"blocks.content-with-image"> {
  reverse: boolean;
  image: {
    url: string;
    name: string;
  };
  heading: string;
  subHeading: string;
  text: string;
  link?: TLink;
}

export function ContentWithImage(data: IContentWithImageProps) {
  if (!data) return null;
  const { reverse, image, heading, subHeading, text, link } = data;
  const revereStyle = reverse ? "md:flex-row-reverse" : "md:flex-row";

  return (
    <section
      className={cn(
        "container flex flex-col gap-10 py-24 md:items-center md:gap-24",
        revereStyle
      )}
    >
      <div className="relative flex-1">
        <StrapiImage
          src={image.url}
          alt={image.name}
          width={713}
          height={497.7}
          className="rounded-xl border border-border shadow-lg"
        />
      </div>
      <div className="flex flex-1 flex-col items-start gap-5">
        <div className="flex flex-col gap-3">
          <span className="font-bold uppercase text-primary text-left">
            {subHeading}
          </span>
          <h2 className="font-heading text-3xl font-semibold sm:text-4xl text-left">
            {heading}
          </h2>
        </div>
        <ReactMarkdown>
          {text}
        </ReactMarkdown>
        {link && (
          <Link
            href={link.href}
            target={link.isExternal ? "_blank" : "_self"}
            rel="noopener noreferrer"
            prefetch
          >
            {link.label}
          </Link>
        )}
      </div>
    </section>
  );
}
