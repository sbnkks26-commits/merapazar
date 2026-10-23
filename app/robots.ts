import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/format";
export default function robots(): MetadataRoute.Robots {
  return { rules: [{ userAgent: "*", allow: "/", disallow: ["/hesabim", "/ilan-ver", "/giris", "/auth/"] }], sitemap: `${siteUrl()}/sitemap.xml` };
}
