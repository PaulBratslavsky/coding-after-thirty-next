import type { ImageProps } from "@/types";
import { notFound } from "next/navigation";

import { getAllCourses } from "@/data-utils/loaders";
import { getUserMeLoader } from "@/lib/services/user";

import {
  Carousel,
  CarouselContent,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

import { CourseItem } from "@/components/custom/course-item";

export interface CourseData {
  id: number;
  documentId: string;
  title: string;
  description: string;
  isPremium: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  slug: string;
  content: string | null;
  image: ImageProps;
}

async function loader() {
  try {
  const data = await getAllCourses();
  const user = await getUserMeLoader();

  if (!data?.data) notFound();

  return {
    courseData: data.data,
    user: user?.data,
  };
} catch (error) {
  console.error("Failed to load courses:", error);
  throw error;
}
}

export default async function CoursesRoute() {
  const { courseData, user } = await loader();

  return (
    <section className="container mx-auto flex flex-col items-center gap-6 py-10 sm:gap-7">
      <Carousel
        opts={{ align: "start", loop: true }}
        className="mt-6 w-full px-4 xl:px-0"
      >
        <CarouselPrevious className="-left-6 size-7 xl:-left-12 xl:size-8" />
        <CarouselContent className="pb-4">
          {courseData.map((course) => (
            <CourseItem
              course={course as CourseData}
              key={course.documentId}
              user={user}
            />
          ))}
        </CarouselContent>
        <CarouselNext className="-right-6 size-7 xl:-right-12 xl:size-8" />
      </Carousel>
    </section>
  );
}
