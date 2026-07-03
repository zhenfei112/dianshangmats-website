import type { Metadata } from "next";
import Link from "next/link";
import { InquiryForm } from "@/components/inquiry-form";
import { company } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Contact ${company.brand} for B2B mat manufacturing and product inquiry requests.`
};

const contacts = [
  ["CS", "Contact", "DIANSHANGMATS Sales Team"],
  ["WA", "Tel/WhatsApp", "Please contact us by email first"],
  ["@", "E-Mail", company.email],
  ["HQ", "Address", company.location]
];

export default function ContactPage() {
  return (
    <>
      <section className="bg-[#f1e8dc] py-7">
        <div className="container-shell text-sm font-bold text-slate-600">{company.brand} &gt; Contact Us</div>
      </section>

      <section className="bg-white py-20">
        <div className="container-shell text-center">
          <h1 className="text-4xl font-black tracking-tight text-navy-950 md:text-5xl">Contact Information</h1>
          <p className="mt-5 text-lg text-slate-600">Contact us to customize high-quality mats for your business needs.</p>

          <div className="mt-10 grid gap-5 text-left md:grid-cols-2 lg:grid-cols-4">
            {contacts.map(([icon, title, value]) => (
              <div key={title} className="min-h-[230px] border border-[#e7d8c8] bg-[#fbf7f1] p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#5b2d14] text-sm font-black text-[#5b2d14]">
                  {icon}
                </div>
                <h2 className="mt-10 text-xl font-black text-navy-950">{title}</h2>
                <p className="mt-5 text-base leading-7 text-slate-600">{value}</p>
              </div>
            ))}
          </div>

          <Link href="/submit-inquiry" className="btn-primary mt-12 px-10">
            Contact DIANSHANGMATS For A Solution
          </Link>
        </div>
      </section>

      <section className="bg-ivory py-16">
        <div className="container-shell">
          <InquiryForm compact />
        </div>
      </section>
    </>
  );
}
