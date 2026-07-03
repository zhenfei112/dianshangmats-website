import type { Metadata } from "next";
import { SectionHeading } from "@/components/section-heading";
import { faqs } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about custom mats, samples, MOQ, quotes and direct purchase."
};

export default function FaqPage() {
  return (
    <section className="section-pad">
      <div className="container-shell max-w-4xl">
        <SectionHeading eyebrow="FAQ" title="Common buyer questions." />
        <div className="mt-8 grid gap-4">
          {faqs.map((faq) => (
            <div key={faq.question} className="rounded-3xl border border-[#eadccd] bg-white p-6">
              <h2 className="text-xl font-black text-navy-950">{faq.question}</h2>
              <p className="mt-3 leading-7 text-slate-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
