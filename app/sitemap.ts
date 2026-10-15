import type { MetadataRoute } from "next";
import { articles, categories, products, navItems } from "@/lib/site-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = "https://dianshangmats.com";
  const staticRoutes = [
    ...navItems.map((item) => item.href),
    "/factory-capabilities",
    "/quality-control",
    "/request-quote",
    "/privacy-policy",
    "/terms-and-conditions"
  ];

  return [
    ...[...new Set(staticRoutes)].map((route) => ({ url: `${siteUrl}${route}` })),
    ...categories.map((category) => ({ url: `${siteUrl}/category/${category.slug}` })),
    ...products.filter((product) => product.status === "ACTIVE").map((product) => ({ url: `${siteUrl}/products/${product.slug}` })),
    ...articles.map((article) => ({ url: `${siteUrl}/knowledge/${article.slug}` }))
  ];
}
