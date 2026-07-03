import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { articles } from "@/lib/site-data";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);
  return {
    title: article?.title || "Article",
    description: article?.excerpt
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
          <p>
            This article is seeded as review content. The admin backend will support editing, SEO metadata and
            publication status before launch.
          </p>
        </div>
      </div>
    </article>
  );
}
