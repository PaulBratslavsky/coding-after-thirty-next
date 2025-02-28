import { blogSdk, sdk } from "@/lib/sdk";
const PAGE_SIZE = 6;

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

export async function getBlogPosts(
  page: number,
  queryString: string,
  category: string
) {
  const posts = await blogSdk.collection("posts").find({
    populate: {
      image: {
        fields: ["url", "alternativeText", "name"],
      },
      // category: {
      //   fields: ["text"],
      // },
    },

    // _q: queryString,

    // filters: {
    //   $or: [
    //     { title: { $containsi: queryString } },
    //     { description: { $containsi: queryString } },
    //     { content: { $containsi: queryString } },
    //   ],
    //   ...(category && { category: { text: { $eq: category } } }),
    // },

    filters: {
      title: { $containsi: queryString },
      ...(category && { category: { text: { $eq: category } } }),
    },

    pagination: {
      pageSize: PAGE_SIZE,
      page: page,
    },
  });
  return posts;
}

export async function getBlogPostBySlug(slug: string) {
  const data = await blogSdk.collection("posts").find({
    filters: {
      slug: slug,
    },
    populate: {
      image: {
        fields: ["url", "alternativeText", "name"],
      },
    },
  });
  return data;
}