import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";
import { articles } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Knowledge",
  description: "Buyer guides for custom mats, mouse pads, desk mats, placemats and OEM manufacturing."
};

export default function KnowledgePage() {
  return (
    <section className="section-pad">
      <div className="container-shell">
        <SectionHeading eyebrow="Knowledge" title="Manufacturing and sourcing guides." />
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {articles.map((article) => (
            <Link href={`/knowledge/${article.slug}`} key={article.slug} className="rounded-3xl border border-[#eadccd] bg-white p-4">
              <img className="aspect-[4/3] rounded-2xl object-cover" src={article.image} alt={article.title} />
              <p className="eyebrow mt-5">{article.category}</p>
              <h2 className="text-xl font-black text-navy-950">{article.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{article.excerpt}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
