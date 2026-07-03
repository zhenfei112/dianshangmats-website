import type { Metadata } from "next";
import Link from "next/link";
import { articles, categories, products } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "DIANSHANGMATS local admin dashboard."
};

const modules = [
  "Product Management",
  "Category Management",
  "Attribute Management",
  "Image Management",
  "SKU Management",
  "MOQ Management",
  "Sales Mode Management",
  "Order Management",
  "Customer Management",
  "Inquiry Management",
  "Uploaded Design Files",
  "Shipping Quote Management",
  "Knowledge Article Management",
  "Homepage Content Management",
  "Factory Content Management",
  "Company Information Management",
  "Navigation Management",
  "SEO Management",
  "Review Status Management",
  "User Permissions",
  "Operation Logs"
];

export default function AdminDashboardPage() {
  const reviewCount = [...products, ...articles].filter((item) => item.needsReview).length;

  return (
    <section className="bg-ivory py-10">
      <div className="container-shell">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="eyebrow">Admin Dashboard</p>
            <h1 className="text-4xl font-black text-navy-950">Local management preview</h1>
          </div>
          <Link href="/admin/login" className="btn-secondary">
            Login UI
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          {[
            ["Products", products.length],
            ["Categories", categories.length],
            ["Needs Review", reviewCount],
            ["Inquiries", "Local preview"]
          ].map(([label, value]) => (
            <div key={label} className="rounded-3xl bg-white p-6">
              <span className="text-sm font-bold text-slate-500">{label}</span>
              <strong className="mt-2 block text-3xl font-black text-navy-950">{value}</strong>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="overflow-hidden rounded-3xl border border-[#eadccd] bg-white">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Mode</th>
                  <th>Review</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.slug}>
                    <td>
                      <strong>{product.name}</strong>
                      <br />
                      <span className="text-xs text-slate-500">{product.modelNumber}</span>
                    </td>
                    <td>{product.category}</td>
                    <td>{product.salesMode}</td>
                    <td>{product.needsReview ? "Needs Review" : "Approved"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <aside className="grid h-fit gap-3">
            {modules.map((module) => (
              <div key={module} className="rounded-2xl border border-[#eadccd] bg-white p-4 font-bold text-navy-900">
                {module}
              </div>
            ))}
          </aside>
        </div>
      </div>
    </section>
  );
}
