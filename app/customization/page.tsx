import type { Metadata } from "next";
import { InquiryForm } from "@/components/inquiry-form";
import { SectionHeading } from "@/components/section-heading";
import { company } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Customization",
  description: "Custom materials, printing, logo, shape, color, packaging and OEM options for B2B mat programs."
};

const process = [
  ["01", "Requirement", "Material, size, logo, color, use case and target quantity."],
  ["02", "Planning", "Sample method, cost target, production timeline and packaging path."],
  ["03", "Sampling", "Digital mockup or physical sample based on approved specifications."],
  ["04", "Approval", "Detail adjustment before bulk production and final inspection."]
];

const capabilities = [
  "PU leather and rubber structures",
  "Custom shape and size",
  "Logo print and embossing",
  "Edge stitching",
  "Color matching",
  "Private label packaging",
  "Retail barcode and marks",
  "Export carton planning"
];

export default function CustomizationPage() {
  return (
    <>
      <section className="luxury-dark py-20 text-white">
        <div className="container-shell grid items-center gap-10 lg:grid-cols-[1fr_460px]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#d7b07a]">Customization</p>
            <h1 className="mt-5 max-w-3xl text-5xl font-black tracking-tight">
              Turn a buyer brief into a production-ready mat program.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/72">
              {company.brand} supports material, surface, size, logo, stitching, label and packaging development for B2B
              buyers.
            </p>
          </div>
          <img
            className="aspect-[4/3] w-full border border-white/12 object-cover shadow-soft"
            src="/images/generated/oem-customization-ai.png"
            alt="Custom mat development"
          />
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-shell">
          <SectionHeading eyebrow="Process" title="Four steps, clear responsibility." />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {process.map(([number, title, copy]) => (
              <div key={number} className="premium-surface p-7">
                <span className="text-5xl font-black text-[#b98a58]">{number}</span>
                <h2 className="mt-8 text-xl font-black text-navy-950">{title}</h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ivory py-16">
        <div className="container-shell grid gap-10 lg:grid-cols-[360px_1fr]">
          <SectionHeading eyebrow="Options" title="Custom details that matter." />
          <div className="grid gap-3 md:grid-cols-2">
            {capabilities.map((item) => (
              <div key={item} className="border border-[#e7d8c8] bg-white px-5 py-4 font-black text-navy-950">
                {item}
              </div>
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
