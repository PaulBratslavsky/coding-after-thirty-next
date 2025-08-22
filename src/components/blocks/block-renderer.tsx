import { Hero, type IHeroProps } from "@/components/blocks/hero";
import { Heading, type IHeadingProps } from "@/components/blocks/heading";
import { CardCarousel, type ICardCarouselProps } from "@/components/blocks/card-carousel";
import { ContentWithImage, type IContentWithImageProps } from "@/components/blocks/content-with-image";

export type Block = IHeroProps | IHeadingProps | ICardCarouselProps | IContentWithImageProps;

export function blockRenderer(block: Block, index: number) {
  switch (block.__component) {
    case "blocks.hero":
      return <Hero {...block} key={index} />;
    case "blocks.card-carousel":
      return <CardCarousel {...block} key={index} />;
    case "blocks.heading":
      return <Heading {...block} key={index} />;
    case "blocks.content-with-image":
      return <ContentWithImage {...block} key={index} />;
    default:
      return null;
  }
}

export function BlockRenderer({ blocks }: { blocks: Block[] }) {
  return blocks.map((block: Block, index: number) => {
    return blockRenderer(block, index);
  });
}
