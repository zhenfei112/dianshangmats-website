import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { InquiryForm } from "@/components/inquiry-form";
import { ProductCategorySidebar } from "@/components/product-category-sidebar";
import { ProductActions } from "@/components/product-actions";
import { ProductCard } from "@/components/product-card";
import { ProductGallery } from "@/components/product-gallery";
import { SectionHeading } from "@/components/section-heading";
import { categories, getProduct, products } from "@/lib/site-data";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  return {
    title: product?.name || "Product Detail",
    description: product?.summary
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  const activeCategory = categories.find((category) => category.name === product.category);
  const related = products
    .filter((item) => item.status === "ACTIVE" && item.slug !== product.slug && item.category === product.category)
    .slice(0, 6);
  const specRows =
    product.specs ??
    [
      ["Model Number", product.modelNumber],
      ["Material", product.material],
      ["Surface Material", product.surfaceMaterial],
      ["Base Material", product.baseMaterial],
      ["Size", product.size],
      ["Thickness", product.thickness],
      ["MOQ", product.moq],
      ["Production Time", product.productionTime]
    ].map(([label, value]) => ({ label, value }));
  const featureItems = product.features ?? product.tags;

  return (
    <>
      <section className="bg-[#f1e8dc] py-6">
        <div className="container-shell text-sm font-semibold text-slate-600">
          <Link href="/" className="hover:text-[#5b2d14]">
            DIANSHANGMATS
          </Link>
          <span className="px-2">&gt;</span>
          <Link href="/products" className="hover:text-[#5b2d14]">
            Product
          </Link>
          <span className="px-2">&gt;</span>
          <span>{product.name}</span>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="container-shell grid gap-10 lg:grid-cols-[560px_1fr]">
          <div>
            <ProductGallery name={product.name} images={[product.image, ...product.gallery.filter((image) => image !== product.image)]} />
            <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
              {featureItems.slice(0, 4).map((item) => (
                <span key={item} className="bg-[#f6f0e8] px-4 py-3 text-center text-sm font-bold text-slate-700">
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-black uppercase tracking-[0.14em] text-[#8a4a24]">{product.category}</p>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-navy-950">{product.name}</h1>
            <p className="mt-4 text-base leading-7 text-slate-600">{product.summary}</p>
            <div className="mt-7 grid gap-0 border border-[#e7d8c8] text-sm">
              {[
                ["Model Number", product.modelNumber],
                ["Product Line", product.subcategory],
                ["Material", product.material],
                ["Size", product.size],
                ["MOQ", product.moq]
              ].map(([label, value]) => (
                <div key={label} className="grid grid-cols-[140px_1fr] border-b border-[#e7d8c8] last:border-b-0">
                  <span className="bg-[#f6f0e8] px-4 py-3 font-bold text-slate-600">{label}</span>
                  <span className="px-4 py-3 font-semibold text-navy-950">{value}</span>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <ProductActions product={product} />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f7f7f7] py-16">
        <div className="container-shell">
          <div className="mb-8 flex flex-wrap gap-3 border-b border-[#d8c5b3]">
            {["Product Description", "Specifications", "Customization", "Inquiry"].map((item) => (
              <span key={item} className="border-b-2 border-[#5b2d14] px-5 py-3 text-sm font-black text-navy-950">
                {item}
              </span>
            ))}
          </div>
          <div className="grid gap-8 lg:grid-cols-[1fr_420px]">
            <div className="premium-surface p-8">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <SectionHeading eyebrow="Product Description" title="Product technical specifications." />
                <span className="text-sm font-bold text-slate-500">Confirm final details by inquiry.</span>
              </div>
              <p className="mt-4 text-base leading-8 text-slate-600">{product.description}</p>
              <div className="mt-8 overflow-hidden border border-[#e7d8c8]">
                {specRows.map(({ label, value }) => (
                  <div key={label} className="grid gap-2 border-b border-[#e7d8c8] bg-white px-4 py-3 text-sm last:border-b-0 md:grid-cols-[210px_1fr]">
                    <span className="font-black text-navy-950">{label}</span>
                    <span className="text-slate-600">{value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid gap-5">
              <div className="premium-surface p-6">
                <h2 className="text-xl font-black text-navy-950">Customization</h2>
                <div className="mt-4 grid gap-3 text-sm text-slate-600">
                  <p>
                    <strong className="text-navy-950">Logo:</strong> {product.logoMethod}
                  </p>
                  <p>
                    <strong className="text-navy-950">Printing:</strong> {product.printingMethod}
                  </p>
                  <p>
                    <strong className="text-navy-950">Packing:</strong> {product.packaging}
                  </p>
                </div>
              </div>
              <div className="luxury-dark p-6 text-white">
                <h2 className="text-xl font-black">Need this product customized?</h2>
                <p className="mt-3 text-sm leading-6 text-white/85">
                  Send size, logo, material, quantity and packaging requirements. The DIANSHANGMATS team will review the
                  details and reply by email.
                </p>
                <Link href="/submit-inquiry" className="mt-5 inline-flex rounded-full bg-white px-5 py-3 text-sm font-black text-[#5b2d14]">
                  Submit Inquiry
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ivory py-16">
        <div className="container-shell">
          <InquiryForm compact />
        </div>
      </section>

      <section className="section-pad">
        <div className="container-shell grid gap-10 lg:grid-cols-[300px_1fr]">
          <ProductCategorySidebar activeCategorySlug={activeCategory?.slug} activeSubcategory={product.subcategory} />
          <div>
            <SectionHeading eyebrow="Related Products" title="Other products buyers often compare." />
            <div className="product-grid mt-8">
              {related.map((item) => (
                <ProductCard product={item} key={item.slug} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
