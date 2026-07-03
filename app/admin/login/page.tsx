import type { Metadata } from "next";
import { company } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Admin Login",
  description: "DIANSHANGMATS admin login."
};

export default function AdminLoginPage() {
  return (
    <section className="min-h-[70vh] bg-ivory py-16">
      <div className="container-shell max-w-md">
        <form className="rounded-3xl border border-[#eadccd] bg-white p-8 shadow-soft">
          <p className="eyebrow">Admin Login</p>
          <h1 className="text-3xl font-black text-navy-950">{company.brand} Backend</h1>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Demo login UI only. Secure session authentication will be connected after database setup.
          </p>
          <div className="mt-6 grid gap-4">
            <label className="form-label">
              Email
              <input className="form-input" type="email" placeholder="admin@dianshangmats.com" />
            </label>
            <label className="form-label">
              Password
              <input className="form-input" type="password" placeholder="Use .env for local demo password" />
            </label>
          </div>
          <button type="button" className="btn-primary mt-6 w-full">
            Sign In
          </button>
        </form>
      </div>
    </section>
  );
}
