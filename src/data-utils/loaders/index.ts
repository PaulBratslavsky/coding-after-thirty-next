import { sdk } from "@/lib/sdk";

export async function getHomePage() {
  const data = await sdk.single("home-page").find({
    populate: {
      blocks: {
        on: {
          "blocks.hero": {
            populate: {
              image: {
                fields: ["url", "alternativeText"],
              },
              links: true,
            },
          },
          "blocks.card-carousel": {
            populate: {
              cards: true,
            },
          },
          // "blocks.heading": true,
          // "blocks.content-with-image": {
          //   populate: {
          //     image: {
          //       fields: ["url", "alternativeText"],
          //     },
          //     link: true,
          //   },
          // },
        },
      },
    },
  });
  return data;
}

export async function getGlobalPageData() {
  const data = await sdk.single("global").find();
  return data;
}

export async function getAllCourses() {
  const data = await sdk.collection("courses").find({
    populate: {
      image: {
        fields: ["url", "alternativeText", "formats"],
      },
    },
  });
  return data;
}

export async function getCourseBySlug(slug: string) {
  const data = await sdk.collection("courses").find({
    filters: {
      slug: slug,
    },
    populate: {
      lessons: {
        fields: ["slug", "title", "description", "documentId"],
      },
    },
  });
  console.log("da    ta", data);
  return data;
}

export async function getLessonBySlug(slug: string) {
  const data = await sdk.collection("lessons").find({
    filters: {
      slug: slug,
    },
    populate: "*",
  });
  return data;
}
