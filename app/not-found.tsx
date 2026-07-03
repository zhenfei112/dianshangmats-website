import Link from "next/link";

export default function NotFoundPage() {
  return (
    <section className="section-pad">
      <div className="container-shell max-w-2xl text-center">
        <p className="eyebrow">404</p>
        <h1 className="text-5xl font-black text-navy-950">Page not found</h1>
        <p className="mt-4 text-slate-600">The requested page does not exist or has not been connected yet.</p>
        <Link href="/products" className="btn-primary mt-6">
          Back to Products
        </Link>
      </div>
    </section>
  );
}
