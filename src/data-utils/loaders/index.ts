import type { TStrapiResponse, TLandingPageData, TGlobalData, TCourseData, TCourseWithLessonsData, TLessonDetailData, TItemData } from "@/types";

import qs from "qs";
import { api } from "@/data-utils/data-api";
import { getStrapiURL } from "@/lib/utils";

const baseUrl = getStrapiURL();
const authToken = process.env.STRAPI_API_KEY;


async function getGlobalPageData(): Promise<TStrapiResponse<TGlobalData>> {
  const url = new URL("/api/global", baseUrl);
  return api.get<TGlobalData>(url.href, { authToken });
}

function getLandingPage(): Promise<TStrapiResponse<TLandingPageData>> {
  const query = qs.stringify({
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
        },
      },
    },
  });

  const url = new URL("/api/home-page", baseUrl);
  url.search = query;
  return api.get<TLandingPageData>(url.href, { authToken });
}

async function getAllCourses(): Promise<TStrapiResponse<TCourseData[]>> {
  const query = qs.stringify({
    populate: {
      image: {
        fields: ["url", "alternativeText", "formats"],
      },
    },
  });

  const url = new URL("/api/courses", baseUrl);
  url.search = query;
  return api.get<TCourseData[]>(url.href, { authToken });
}

async function getCourseBySlug(slug: string): Promise<TStrapiResponse<TCourseWithLessonsData[]>> {
  const query = qs.stringify({
    filters: {
      slug: slug,
    },
    populate: {
      lessons: {
        fields: ["slug", "title", "description", "documentId"],
      },
    },
  });

  const url = new URL("/api/courses", baseUrl);
  url.search = query;
  return api.get<TCourseWithLessonsData[]>(url.href, { authToken });
}

async function getLessonBySlug(slug: string): Promise<TStrapiResponse<TLessonDetailData[]>> {
  const query = qs.stringify({
    filters: {
      slug: slug,
    },
    populate: "*",
  });

  const url = new URL("/api/lessons", baseUrl);
  url.search = query;
  return api.get<TLessonDetailData[]>(url.href, { authToken });
}

async function getAllItems(): Promise<TStrapiResponse<TItemData[]>> {
  
  const query = qs.stringify({
    populate: "*",
  });

  const url = new URL("/api/items", baseUrl);
  url.search = query;
  return api.get<TItemData[]>(url.href, { authToken });
}






export const loaders = {
  getLandingPage,
  getGlobalPageData,
  getAllCourses,
  getCourseBySlug,
  getLessonBySlug,
  getAllItems,
};
