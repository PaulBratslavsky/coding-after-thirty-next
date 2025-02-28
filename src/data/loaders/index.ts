import sdk from "@/lib/sdk";

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

export async function getGlobalData() {
  const data = await sdk.single("global").find({
    populate: {
      header: {
        populate: {
          logoText: true,
          navItems: true,
          cta: true,
        },
      },
    },
  });
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
  console.log(data, "why is this not working");
  return data;
}

export async function getLessonBySlug(slug: string) {
  const data = await sdk.collection("lessons").find({
    filters: { slug },
  });
  return data;
}