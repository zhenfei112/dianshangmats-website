import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { articles } from "@/lib/site-data";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);
  return {
    title: article?.title || "Article",
    description: article?.excerpt,
    robots: article?.needsReview ? { index: false, follow: true } : undefined
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);
  if (!article) notFound();
  return (
    <article className="section-pad">
      <div className="container-shell max-w-4xl">
        <p className="eyebrow">{article.category}</p>
        <h1 className="text-5xl font-black tracking-tight text-navy-950">{article.title}</h1>
        <p className="mt-5 text-lg leading-8 text-slate-600">{article.excerpt}</p>
        <img className="mt-8 aspect-[16/9] rounded-3xl object-cover shadow-soft" src={article.image} alt={article.title} />
        <div className="rich-text mt-8 text-lg leading-8">
          <p>{article.body}</p>
        </div>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link href="/products" className="btn-secondary">Browse Products</Link>
          <Link href="/oem-odm-services" className="btn-secondary">OEM/ODM Services</Link>
          <Link href="/request-quote" className="btn-primary">Request a Quote</Link>
        </div>
      </div>
    </article>
  );
}
