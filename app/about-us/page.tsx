import type { Metadata } from "next";
import { company } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "About Us",
  description: `${company.legalName} is a Guangzhou-based supplier of custom mats, mouse pads and desk accessories.`
};

const facts = [
  ["Factory Location", company.location],
  ["Main Products", "Mouse pads, desk mats, wrist rests, placemats, coasters and game mats."],
  ["Buyer Focus", "B2B importers, distributors, brands, offices, hospitality groups and promotional programs."]
];

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-navy-950">
        <div className="absolute inset-0">
          <img
            className="h-full w-full object-cover opacity-55"
            src="/images/generated/about-factory-ai.png"
            alt="DIANSHANGMATS factory"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#06172d] via-[#06172d]/86 to-[#5b2d14]/30" />
        </div>
        <div className="container-shell relative py-24 lg:py-32">
          <p className="text-xl font-black text-[#d7b07a]">One-Stop Mouse Pad Solution Manufacturer</p>
          <h1 className="mt-8 max-w-4xl text-4xl font-black tracking-tight text-white md:text-6xl">
            Factory-direct custom mat manufacturer.
          </h1>
          <p className="mt-5 text-sm font-bold text-white/56">{company.brand} &gt; About Us</p>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-white/76">
            {company.legalName} provides one-stop manufacturing support for mouse pads, desk mats, wrist rests,
            placemats and custom mat programs for global B2B buyers.
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="container-shell">
          <div className="-mt-10 luxury-dark px-8 py-8 text-center text-4xl font-black text-white shadow-soft md:text-5xl">
            Customizable Mouse Pad <span className="text-[#d7b07a]">Manufacturer</span>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-shell grid gap-6 md:grid-cols-3">
          {facts.map(([title, copy]) => (
            <div key={title} className="premium-surface p-8">
              <h2 className="text-xl font-black text-navy-950">{title}</h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">{copy}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
