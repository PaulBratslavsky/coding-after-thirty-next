import { notFound } from "next/navigation";

import { BlockRenderer } from "@/components/blocks/block-renderer";
import { getHomePage } from "@/data-utils/loaders";

async function loader() {
  
  const data = await getHomePage();
  if (!data?.data) return notFound();
  const blocks = data?.data?.blocks;
  return { blocks };
}

export default async function HomeRoute() {
  const data = await loader();
  const blocks = data?.blocks;
  if (!blocks) notFound();
  return <div className="container mx-auto"><BlockRenderer blocks={blocks} /></div>;
}
