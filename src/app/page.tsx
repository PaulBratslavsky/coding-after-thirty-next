import qs from "qs";
import { notFound } from "next/navigation";
import { Block } from "@/types";

import { fetchAPI } from "@/lib/fetch-api";
import { getStrapiURL } from "@/lib/utils";
import { BlockRenderer } from "@/components/blocks/block-renderer";

const homePageQuery = qs.stringify({
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
        "blocks.heading": true,
        "blocks.content-with-image": {
          populate: {
            image: {
              fields: ["url", "alternativeText"],
            },
            link: true,
          },
        },
      },
    },
  },
});

async function loader() {
  // const authToken = process.env.STRAPI_API_TOKEN;
  const BASE_URL = getStrapiURL();
  const path = "/api/home-page";
  const url = new URL(path, BASE_URL);

  url.search = homePageQuery;

  const response = await fetchAPI<Block[] | null>(url.href, {
    method: "GET",
  });

  if (!response?.data) notFound();

  const blocks = response?.data || [];
  return { blocks };
}

export default async function HomeRoute() {
  const data = await loader();
  const blocks = data.blocks;
  return <BlockRenderer blocks={blocks} />;
}
