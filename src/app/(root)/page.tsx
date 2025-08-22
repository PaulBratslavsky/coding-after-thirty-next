import { loaders } from "@/data-utils/loaders";
import { validateApiResponse } from "@/lib/error-handler";
import { BlockRenderer } from "@/components/blocks/block-renderer";

async function loader() {
  const response = await loaders.getLandingPage();
  const data = validateApiResponse(response, "landing-page");
  return data?.blocks || [];
}

export default async function HomePage() {
  const blocks = await loader();
  
  return (
    <div className="container mx-auto">
      <BlockRenderer blocks={blocks} />
    </div>
  );
}
