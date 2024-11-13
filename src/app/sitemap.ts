import { type MetadataRoute } from "next";

import config from "~/config";

export const revalidate = 3600; // 1 hour

/**
 * Generates the sitemap for the website during build time.
 * Each page that should be indexed by search engines should be added here.
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = ["/"];

  return [
    ...pages.map(
      (page) =>
        ({
          url: `${config.baseUrl.origin}${page}`,
          lastModified: new Date(),
          changeFrequency: "monthly",
          priority: page === "/" ? 1 : 0.8,
        }) as MetadataRoute.Sitemap[number],
    ),
  ];
}
