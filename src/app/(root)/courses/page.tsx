import { loaders } from "@/data-utils/loaders";
import { validateApiResponse } from "@/lib/error-handler";
import { getUserMeLoader } from "@/data-utils/services/user";
import { CourseItem } from "@/components/custom/course-item";
import {
  Carousel,
  CarouselContent,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

async function loader() {
  const response = await loaders.getAllCourses();
  const data = validateApiResponse(response, "courses");
  const user = await getUserMeLoader();

  return {
    courses: data,
    user: user?.data,
  };
}

export default async function CoursesPage() {
  const { courses, user } = await loader();

  return (
    <section className="container mx-auto flex flex-col items-center gap-6 py-10 sm:gap-7">
      <Carousel
        opts={{ align: "start", loop: true }}
        className="mt-6 w-full px-4 xl:px-0"
      >
        <CarouselPrevious className="-left-6 size-7 xl:-left-12 xl:size-8" />
        <CarouselContent className="pb-4">
          {courses.map((course) => (
            <CourseItem
              key={course.documentId}
              course={course}
              user={user}
              pathname="/courses"
            />
          ))}
        </CarouselContent>
        <CarouselNext className="-right-6 size-7 xl:-right-12 xl:size-8" />
      </Carousel>
    </section>
  );
}
