import Image from "next/image";

interface StrapiImageProps {
  src: string;
  alt: string | null;
  height?: number;
  width?: number;
  className?: string;
  fill?: boolean;
  priority?: boolean;
}

export function getStrapiMedia(url: string | null) {
  const strapiURL = process.env.STRAPI_API_URL ?? "http://localhost:1337";
  if (url == null) return null;
  if (url.startsWith("data:")) return url;
  if (url.startsWith("http") || url.startsWith("//")) return url;
  return `${strapiURL}${url}`;
}

export function StrapiImage({
  src,
  alt,
  className,
  ...rest
}: Readonly<StrapiImageProps>) {
  const imageUrl = getStrapiMedia(src);
  if (!imageUrl) return null;
  return (
    <Image
      src={imageUrl}
      alt={alt ?? "No alternative text provided"}
      className={className}
      {...rest}
    />
  );
}
