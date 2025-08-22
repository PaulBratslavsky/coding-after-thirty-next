import type { TCourseData, TStrapiUserData } from "@/types";
import Link from "next/link";
import { formatDate } from "@/lib/utils";

import { CarouselItem } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StrapiImage } from "@/components/custom/strapi-image";
import { AuthButton } from "./auth/auth-button";

export function CourseItem({
  course, 
  user,
  pathname,
}: {
  course: TCourseData;
  user: TStrapiUserData | null;
  pathname: string;
}) {
  const { documentId, title, description, slug, createdAt, image } = course;
  return (
    <CarouselItem key={documentId} className="md:basis-1/2 lg:basis-1/3">
      <div className="h-full p-1">
        <Card className="h-full shadow-lg relative">
          <CardContent className="flex h-full flex-col items-start gap-5 p-5">
            {image && (
              <div className="relative h-52 w-full">
                <StrapiImage
                  src={image.url}
                  alt={image.alternativeText}
                  className="object-cover rounded-lg"
                  width={400}
                  height={500}
                />
              </div>
            )}

            <div className="flex flex-1 flex-col gap-4">
              <h4 className="text-lg font-semibold">{title}</h4>
              <div className="flex items-center gap-3">
                <span className="rounded-full border bg-accent px-3 py-0.5 text-sm text-accent-foreground">
                  {"Strapi"}
                </span>
                <span className="text-sm text-muted-foreground">
                  {formatDate(createdAt)}
                </span>
              </div>
              <p className="mb-auto text-muted-foreground">
                {description.slice(0, 100)}
              </p>
            </div>
            <div className="flex items-center justify-between w-full">
              {user ? (
                <Button asChild>
                  <Link href={pathname + "/" + slug}>View Course</Link>
                </Button>
              ) : (
                <Button asChild>
                  <AuthButton />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </CarouselItem>
  );
}
