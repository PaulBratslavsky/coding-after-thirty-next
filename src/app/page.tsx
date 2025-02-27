import { notFound } from "next/navigation";

import { BlockRenderer } from "@/components/blocks/block-renderer";
import { getHomePage } from "@/data/loaders";

async function loader() {
  const data = await getHomePage();
  if (!data.data) notFound();
  const blocks = data?.data?.blocks;
  return { blocks };
}

export default async function HomeRoute() {
  const data = await loader();
  const blocks = data.blocks;
  return <BlockRenderer blocks={blocks} />;
}
