import Link from "next/link";
import type { Product } from "@/lib/site-data";

export function ProductCard({ product }: { product: Product }) {
  const modeLabel =
    product.salesMode === "DIRECT_PURCHASE"
      ? "Stock inquiry"
      : product.salesMode === "BOTH"
        ? "Sample + bulk inquiry"
        : "Custom inquiry";

  return (
    <article className="group overflow-hidden border border-[#e7d8c8] bg-white shadow-sm transition hover:-translate-y-1 hover:border-[#b98a58] hover:shadow-soft">
      <Link href={`/products/${product.slug}`} className="square-media block">
        <img className="transition duration-500 group-hover:scale-105" src={product.image} alt={product.name} />
      </Link>
      <div className="grid gap-3 p-5">
        <div className="flex flex-wrap items-center gap-2 text-xs font-black uppercase tracking-[0.1em]">
          <span className="bg-ivory px-3 py-1 text-leather-800">{modeLabel}</span>
          <span className="text-slate-500">{product.modelNumber}</span>
        </div>
        <Link href={`/products/${product.slug}`} className="product-card-title text-lg font-black text-navy-950">
          {product.name}
        </Link>
        <Link href={`/products/${product.slug}`} className="text-sm font-black text-leather-800">
          View Details
        </Link>
      </div>
    </article>
  );
}
