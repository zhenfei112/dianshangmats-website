import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ProductCategorySidebar } from "@/components/product-category-sidebar";
import { ProductCard } from "@/components/product-card";
import { SectionHeading } from "@/components/section-heading";
import {
  categories,
  getActiveProductsByCategory,
  getCategory,
  getVisibleSubcategoriesForCategory
} from "@/lib/site-data";

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  return {
    title: category?.name || "Product Category",
    description: category?.summary
  };
}

const productsPerPage = 12;

function firstParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function getPage(value: string | undefined) {
  const page = Number(value);
  return Number.isFinite(page) && page > 0 ? Math.floor(page) : 1;
}

function getCategoryPageUrl(slug: string, page?: number) {
  const params = new URLSearchParams();
  if (page && page > 1) params.set("page", String(page));
  const query = params.toString();
  return `/category/${slug}${query ? `?${query}` : ""}`;
}

export default async function CategoryPage({
  params,
  searchParams
}: {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ page?: string | string[]; subcatPage?: string | string[] }>;
}) {
  const { slug } = await params;
  const query = searchParams ? await searchParams : {};
  const category = getCategory(slug);
  if (!category) notFound();
  const categoryProducts = getActiveProductsByCategory(category.slug);
  const subcategories = getVisibleSubcategoriesForCategory(category.slug);
  const requestedProductPage = getPage(firstParam(query.page));
  const requestedSubcategoryPage = getPage(firstParam(query.subcatPage));
  const totalProductPages = Math.max(1, Math.ceil(categoryProducts.length / productsPerPage));
  const currentProductPage = Math.min(requestedProductPage, totalProductPages);
  const pagedProducts = categoryProducts.slice(
    (currentProductPage - 1) * productsPerPage,
    currentProductPage * productsPerPage
  );

  return (
    <section className="section-pad">
      <div className="container-shell grid gap-10 lg:grid-cols-[300px_1fr]">
        <ProductCategorySidebar activeCategorySlug={category.slug} requestedSubcategoryPage={requestedSubcategoryPage} />
        <div>
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_360px]">
            <SectionHeading eyebrow="Product Category" title={category.name}>
              {category.summary}
            </SectionHeading>
            <div className="square-media rounded-3xl shadow-soft">
              <img src={category.image} alt={category.name} />
            </div>
          </div>
          <div className="mt-10 rounded-3xl bg-ivory p-6">
            <h2 className="text-xl font-black text-navy-950">Subcategories</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {subcategories.map((child) => (
                <Link
                  href={`/products?category=${category.slug}&subcategory=${encodeURIComponent(child.name)}`}
                  key={child.name}
                  className="rounded-full bg-white px-4 py-2 text-sm font-bold text-navy-900 transition hover:text-leather-800"
                >
                  {child.name}
                  <span className="ml-2 text-xs text-leather-800">{child.count}</span>
                </Link>
              ))}
            </div>
          </div>
          <div className="mt-10">
            {categoryProducts.length ? (
              <>
                <div className="product-grid">
                  {pagedProducts.map((product) => (
                    <ProductCard product={product} key={product.slug} />
                  ))}
                </div>
                {totalProductPages > 1 ? (
                  <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                    {currentProductPage > 1 ? (
                      <Link href={getCategoryPageUrl(category.slug, currentProductPage - 1)} className="btn-secondary">
                        Previous
                      </Link>
                    ) : null}
                    <span className="rounded-full border border-[#d8c5b3] bg-white px-5 py-3 text-sm font-black text-navy-950">
                      Page {currentProductPage} / {totalProductPages}
                    </span>
                    {currentProductPage < totalProductPages ? (
                      <Link href={getCategoryPageUrl(category.slug, currentProductPage + 1)} className="btn-primary">
                        Next
                      </Link>
                    ) : null}
                  </div>
                ) : null}
              </>
            ) : (
              <div className="rounded-3xl border border-[#eadccd] bg-white p-8">
                <h2 className="text-xl font-black text-navy-950">Products are reserved in admin</h2>
                <p className="mt-2 text-slate-600">
                  This category is ready in the system. Frontend products can be shown after real product data is reviewed.
                </p>
                <Link href="/submit-inquiry" className="btn-primary mt-5">
                  Request Related Products
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
