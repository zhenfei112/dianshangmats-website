import type { Metadata } from "next";
import Link from "next/link";
import { ProductCategorySidebar } from "@/components/product-category-sidebar";
import { ProductCard } from "@/components/product-card";
import { SectionHeading } from "@/components/section-heading";
import { categories, products } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Products Center",
  description: "Browse DIANSHANGMATS custom mats, mouse pads, desk mats, placemats, coasters and game mats."
};

function firstParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

const productsPerPage = 12;

function getPage(value: string | undefined) {
  const page = Number(value);
  return Number.isFinite(page) && page > 0 ? Math.floor(page) : 1;
}

function getProductPageUrl({
  category,
  subcategory,
  subcatPage,
  page
}: {
  category?: string;
  subcategory?: string;
  subcatPage?: number;
  page?: number;
}) {
  const params = new URLSearchParams();
  if (category) params.set("category", category);
  if (subcategory) params.set("subcategory", subcategory);
  if (subcatPage && subcatPage > 1) params.set("subcatPage", String(subcatPage));
  if (page && page > 1) params.set("page", String(page));
  const query = params.toString();
  return `/products${query ? `?${query}` : ""}`;
}

export default async function ProductsPage({
  searchParams
}: {
  searchParams?: Promise<{
    category?: string | string[];
    subcategory?: string | string[];
    subcatPage?: string | string[];
    page?: string | string[];
  }>;
}) {
  const params = searchParams ? await searchParams : {};
  const categoryParam = firstParam(params.category);
  const subcategoryParam = firstParam(params.subcategory);
  const requestedSubcategoryPage = getPage(firstParam(params.subcatPage));
  const requestedProductPage = getPage(firstParam(params.page));
  const activeCategory = categories.find((category) => category.slug === categoryParam);
  const activeSubcategory = subcategoryParam ? decodeURIComponent(subcategoryParam) : undefined;
  const activeProducts = products.filter((product) => product.status === "ACTIVE");
  const visibleProducts = activeProducts
    .filter((product) => {
      if (activeCategory && product.category !== activeCategory.name) return false;
      if (activeSubcategory && product.subcategory !== activeSubcategory) return false;
      return true;
    });
  const totalProductPages = Math.max(1, Math.ceil(visibleProducts.length / productsPerPage));
  const currentProductPage = Math.min(requestedProductPage, totalProductPages);
  const pagedProducts = visibleProducts.slice(
    (currentProductPage - 1) * productsPerPage,
    currentProductPage * productsPerPage
  );

  return (
    <section className="section-pad">
      <div className="container-shell grid gap-10 lg:grid-cols-[300px_1fr]">
        <ProductCategorySidebar
          activeCategorySlug={activeCategory?.slug}
          activeSubcategory={activeSubcategory}
          requestedSubcategoryPage={requestedSubcategoryPage}
        />
        <div>
          <SectionHeading
            eyebrow="Product Catalog"
            title={activeSubcategory || activeCategory?.name || "Factory-direct B2B product lines."}
          >
            {visibleProducts.length} products found. Select a category or open product details to request a quote.
          </SectionHeading>
          {visibleProducts.length ? (
            <>
              <div className="product-grid mt-8">
                {pagedProducts.map((product) => (
                  <ProductCard product={product} key={product.slug} />
                ))}
              </div>
              {totalProductPages > 1 ? (
                <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                  {currentProductPage > 1 ? (
                    <Link
                      href={getProductPageUrl({
                        category: activeCategory?.slug,
                        subcategory: activeSubcategory,
                        subcatPage: requestedSubcategoryPage,
                        page: currentProductPage - 1
                      })}
                      className="btn-secondary"
                    >
                      Previous
                    </Link>
                  ) : null}
                  <span className="rounded-full border border-[#d8c5b3] bg-white px-5 py-3 text-sm font-black text-navy-950">
                    Page {currentProductPage} / {totalProductPages}
                  </span>
                  {currentProductPage < totalProductPages ? (
                    <Link
                      href={getProductPageUrl({
                        category: activeCategory?.slug,
                        subcategory: activeSubcategory,
                        subcatPage: requestedSubcategoryPage,
                        page: currentProductPage + 1
                      })}
                      className="btn-primary"
                    >
                      Next
                    </Link>
                  ) : null}
                </div>
              ) : null}
            </>
          ) : (
            <div className="mt-8 border border-[#e7d8c8] bg-white p-8">
              <h2 className="text-xl font-black text-navy-950">Products are being organized.</h2>
              <p className="mt-2 text-slate-600">This subcategory is ready. Add real products later in the data file.</p>
              <Link href="/submit-inquiry" className="btn-primary mt-5">
                Request Related Products
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
