import type { Metadata } from "next";
import { ProductCard } from "@/components/product-card";
import { SectionHeading } from "@/components/section-heading";
import { products } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Search",
  description: "Search DIANSHANGMATS products and buyer resources."
};

export default function SearchPage() {
  return (
    <section className="section-pad">
      <div className="container-shell">
        <SectionHeading eyebrow="Search" title="Search products and sourcing content." />
        <div className="mt-8 rounded-3xl border border-[#eadccd] bg-white p-5">
          <input className="form-input" placeholder="Search mouse pads, placemats, desk mats, coasters..." />
        </div>
        <div className="product-grid mt-8">
          {products.map((product) => (
            <ProductCard product={product} key={product.slug} />
          ))}
        </div>
      </div>
    </section>
  );
}
