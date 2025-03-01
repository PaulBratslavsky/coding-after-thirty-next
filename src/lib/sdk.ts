import { getStrapiURL } from "@/lib/utils";
import { strapi } from "@strapi/client";

const BASE_API_URL = getStrapiURL() + "/api";
const sdk = strapi({ baseURL: BASE_API_URL });

const BLOG_API_URL = process.env.BLOG_API_URL;
const resourcesSdk = strapi({ baseURL: BLOG_API_URL + "/api" });
export { sdk, resourcesSdk };

const STRAPI_API_KEY = process.env.STRAPI_API_KEY;
const authenticatedSdk = strapi({ baseURL: BASE_API_URL, auth: STRAPI_API_KEY });
export { authenticatedSdk };
