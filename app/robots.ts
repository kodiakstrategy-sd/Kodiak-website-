import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: ["/", "/c/"], disallow: ["/a/", "/b/", "/api/", "/thank-you"] },
    ],
    sitemap: "https://kodiakstrategy.com/sitemap.xml",
  };
}
