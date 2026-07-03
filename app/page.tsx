import Link from "next/link";
import { InquiryForm } from "@/components/inquiry-form";
import { ProductCard } from "@/components/product-card";
import { SectionHeading } from "@/components/section-heading";
import { articles, categories, company, products } from "@/lib/site-data";

const pillars = [
  ["Material", "PU leather, rubber, cork, cloth, silicone and composite structures."],
  ["Branding", "Logo print, embossing, stitched edge, labels and retail packaging."],
  ["Projects", "Samples, standard products and custom bulk programs in one inquiry flow."],
  ["Export", "Artwork review, packing marks, inspection and shipment-ready documentation."]
];

const process = ["Brief", "Material", "Sample", "Production"];

export default function HomePage() {
  const featuredProducts = products.slice(0, 6);

  return (
    <>
      <section className="luxury-dark overflow-hidden py-20 text-white lg:py-28">
        <div className="container-shell grid items-center gap-12 lg:grid-cols-[1fr_520px]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#d7b07a]">B2B Custom Mat Manufacturer</p>
            <h1 className="mt-5 max-w-3xl text-5xl font-black tracking-tight md:text-6xl">
              Custom mats made for brands, offices and hospitality buyers.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/76">
              {company.brand} builds mouse pads, desk mats, placemats, coasters, wrist rests and game mats with material,
              logo and packaging customization.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/products" className="btn-primary">
                View Product Lines
              </Link>
              <Link href="/customization" className="btn-secondary">
                Custom Options
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full border border-[#b98a58]/40" />
            <div className="relative overflow-hidden border border-white/14 bg-white/[0.08] p-3 shadow-soft">
              <img
                className="aspect-[4/3] w-full object-cover"
                src="/images/generated/home-hero-ai.png"
                alt="Custom mats and desk accessories manufacturing"
              />
            </div>
            <div className="grid grid-cols-3 border-x border-b border-white/12 bg-white/[0.08] text-center text-xs font-black uppercase tracking-[0.08em] text-white/82">
              {["OEM/ODM", "Samples", "Bulk Inquiry"].map((item) => (
                <div key={item} className="border-r border-white/12 px-3 py-4 last:border-r-0">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container-shell grid gap-10 lg:grid-cols-[360px_1fr]">
          <SectionHeading eyebrow="Factory Positioning" title="A focused mat supplier for B2B projects." />
          <div className="grid gap-4 md:grid-cols-2">
            {pillars.map(([title, copy]) => (
              <div key={title} className="premium-surface p-6">
                <div className="bronze-line mb-5 h-1 w-16" />
                <h3 className="text-xl font-black text-navy-950">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-shell">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow="Product Lines" title="Core categories for global buyers." />
            <Link href="/products" className="text-sm font-black text-[#5b2d14]">
              View all products
            </Link>
          </div>
          <div className="mt-9 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {categories.slice(0, 8).map((category) => (
              <Link
                href={`/category/${category.slug}`}
                key={category.slug}
                className="group border border-[#e7d8c8] bg-white p-4 transition hover:-translate-y-1 hover:border-[#b98a58] hover:shadow-soft"
              >
                <div className="square-media">
                  <img className="transition duration-500 group-hover:scale-105" src={category.image} alt={category.name} />
                </div>
                <h3 className="mt-4 text-xl font-black text-navy-950">{category.name}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{category.summary}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy-950 py-20 text-white">
        <div className="container-shell grid gap-10 lg:grid-cols-[1fr_430px]">
          <div>
            <SectionHeading eyebrow="Customization" title="From brief to approved sample.">
              <span className="text-white/70">
                A compact development path for logo, material, size, color, edge finish and packaging.
              </span>
            </SectionHeading>
            <div className="mt-9 grid gap-4 md:grid-cols-4">
              {process.map((step, index) => (
                <div key={step} className="border border-white/12 bg-white/[0.07] p-5">
                  <span className="text-3xl font-black text-[#d7b07a]">{String(index + 1).padStart(2, "0")}</span>
                  <h3 className="mt-5 font-black">{step}</h3>
                </div>
              ))}
            </div>
          </div>
          <img
            className="aspect-[4/3] w-full object-cover shadow-soft"
            src="/images/generated/oem-customization-ai.png"
            alt="OEM and ODM mat customization"
          />
        </div>
      </section>

      <section className="section-pad">
        <div className="container-shell">
          <SectionHeading eyebrow="Featured Products" title="Popular inquiry products." />
          <div className="product-grid mt-9">
            {featuredProducts.map((product) => (
              <ProductCard product={product} key={product.slug} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ivory py-16">
        <div className="container-shell">
          <SectionHeading eyebrow="Knowledge" title="Buyer guides and manufacturing notes." />
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {articles.map((article) => (
              <Link href={`/knowledge/${article.slug}`} key={article.slug} className="premium-surface block p-4">
                <img className="aspect-[4/3] object-cover" src={article.image} alt={article.title} />
                <p className="eyebrow mt-5">{article.category}</p>
                <h3 className="text-xl font-black text-navy-950">{article.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{article.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-shell">
          <InquiryForm compact />
        </div>
      </section>
    </>
  );
}
