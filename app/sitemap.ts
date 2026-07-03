import type { MetadataRoute } from "next";
import { articles, categories, products, navItems } from "@/lib/site-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const staticRoutes = [
    ...navItems.map((item) => item.href),
    "/quote-basket",
    "/submit-inquiry",
    "/account",
    "/order-history",
    "/order-tracking",
    "/privacy-policy",
    "/terms-and-conditions"
  ];

  return [
    ...staticRoutes.map((route) => ({ url: `${siteUrl}${route}`, lastModified: new Date() })),
    ...categories.map((category) => ({ url: `${siteUrl}/category/${category.slug}`, lastModified: new Date() })),
    ...products.map((product) => ({ url: `${siteUrl}/products/${product.slug}`, lastModified: new Date() })),
    ...articles.map((article) => ({ url: `${siteUrl}/knowledge/${article.slug}`, lastModified: new Date() }))
  ];
}
