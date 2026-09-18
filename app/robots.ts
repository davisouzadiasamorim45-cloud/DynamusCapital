import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.dynamuscapital.com.br";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/cotacao"],
      disallow: ["/admin"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
