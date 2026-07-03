import Link from "next/link";
import {
  categories,
  getActiveProductsByCategory,
  getVisibleSubcategoriesForCategory
} from "@/lib/site-data";

const essentialCategorySlugs = new Set(["placemats", "coasters", "game-mats"]);
const subcategoryPageSize = 6;

function getSubcategoryUrl(categorySlug: string, subcategory?: string, subcatPage?: number) {
  const params = new URLSearchParams({ category: categorySlug });
  if (subcategory) params.set("subcategory", subcategory);
  if (subcatPage && subcatPage > 1) params.set("subcatPage", String(subcatPage));
  return `/products?${params.toString()}`;
}

export function ProductCategorySidebar({
  activeCategorySlug,
  activeSubcategory,
  requestedSubcategoryPage = 1
}: {
  activeCategorySlug?: string;
  activeSubcategory?: string;
  requestedSubcategoryPage?: number;
}) {
  const visibleCategories = categories.filter((category) => {
    const count = getActiveProductsByCategory(category.slug).length;
    return essentialCategorySlugs.has(category.slug) || count > 0;
  });

  return (
    <aside className="h-fit border border-[#e7d8c8] bg-white p-5 shadow-sm lg:sticky lg:top-28">
      <p className="eyebrow">Products Center</p>
      <Link
        href="/products"
        className={`mb-3 block px-4 py-3 font-black ${
          !activeCategorySlug ? "bg-leather-700 text-white" : "bg-ivory text-navy-950"
        }`}
      >
        All Products
      </Link>
      <div className="grid gap-3">
        {visibleCategories.map((category, index) => {
          const categoryProducts = getActiveProductsByCategory(category.slug);
          const subcategories = getVisibleSubcategoriesForCategory(category.slug);
          const selectedSubcategoryIndex = activeSubcategory
            ? subcategories.findIndex((child) => child.name === activeSubcategory)
            : -1;
          const selectedSubcategoryPage =
            selectedSubcategoryIndex >= 0
              ? Math.floor(selectedSubcategoryIndex / subcategoryPageSize) + 1
              : requestedSubcategoryPage;
          const isOpen = activeCategorySlug === category.slug || (!activeCategorySlug && index === 0);
          const totalSubcategoryPages = Math.max(1, Math.ceil(subcategories.length / subcategoryPageSize));
          const currentSubcategoryPage = isOpen ? Math.min(selectedSubcategoryPage, totalSubcategoryPages) : 1;
          const firstSubcategoryIndex = (currentSubcategoryPage - 1) * subcategoryPageSize;
          const pagedSubcategories = subcategories.slice(
            firstSubcategoryIndex,
            firstSubcategoryIndex + subcategoryPageSize
          );

          return (
            <details key={category.slug} className="category-accordion bg-ivory" name="product-categories" open={isOpen}>
              <summary className="cursor-pointer list-none px-4 py-3 font-black text-navy-950 transition hover:text-leather-800">
                <span className="flex items-center justify-between gap-3">
                  <span>{category.name}</span>
                  <span className="text-xs font-black text-leather-800">{categoryProducts.length}</span>
                </span>
              </summary>
              <div className="grid gap-1 border-t border-white/80 px-3 pb-3 pt-2">
                <Link
                  href={`/products?category=${category.slug}`}
                  className={`flex items-center justify-between gap-3 px-3 py-2 text-sm font-bold ${
                    activeCategorySlug === category.slug && !activeSubcategory
                      ? "bg-white text-leather-800"
                      : "text-slate-600 hover:bg-white"
                  }`}
                >
                  <span>All {category.name}</span>
                  <span className="text-xs text-slate-400">{categoryProducts.length}</span>
                </Link>
                {pagedSubcategories.map((child) => (
                  <Link
                    key={child.name}
                    href={getSubcategoryUrl(category.slug, child.name, currentSubcategoryPage)}
                    className={`flex items-center justify-between gap-3 px-3 py-2 text-sm font-bold ${
                      activeSubcategory === child.name ? "bg-white text-leather-800" : "text-slate-600 hover:bg-white"
                    }`}
                  >
                    <span>{child.name}</span>
                    <span className="rounded-full bg-white px-2 py-0.5 text-[11px] text-slate-500">{child.count}</span>
                  </Link>
                ))}
                {totalSubcategoryPages > 1 ? (
                  <div className="mt-2 grid grid-cols-[1fr_auto_1fr] items-center gap-2 border-t border-white/80 pt-3 text-xs font-black">
                    {currentSubcategoryPage > 1 ? (
                      <Link
                        href={getSubcategoryUrl(category.slug, undefined, currentSubcategoryPage - 1)}
                        className="text-leather-800 hover:text-navy-950"
                      >
                        Prev
                      </Link>
                    ) : (
                      <span className="text-slate-300">Prev</span>
                    )}
                    <span className="rounded-full bg-white px-3 py-1 text-slate-600">
                      {currentSubcategoryPage} / {totalSubcategoryPages}
                    </span>
                    {currentSubcategoryPage < totalSubcategoryPages ? (
                      <Link
                        href={getSubcategoryUrl(category.slug, undefined, currentSubcategoryPage + 1)}
                        className="text-right text-leather-800 hover:text-navy-950"
                      >
                        Next
                      </Link>
                    ) : (
                      <span className="text-right text-slate-300">Next</span>
                    )}
                  </div>
                ) : null}
              </div>
            </details>
          );
        })}
      </div>
    </aside>
  );
}
