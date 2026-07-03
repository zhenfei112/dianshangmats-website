import type { Metadata } from "next";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "Cases",
  description: "B2B application cases for hospitality, corporate office, promotions, gaming and private-label mat programs."
};

const cases = [
  ["Restaurant Placemat Program", "/images/case-restaurant.png", "Custom color leather placemats for hospitality buyers."],
  ["Corporate Desk Mat Program", "/images/case-office.png", "Branded desk mats for executive office and gifting programs."],
  ["Rubber Backed Mat Project", "/images/case-rubber-backed.png", "Composite rubber-backed mats for anti-slip and custom print applications."]
];

export default function CasesPage() {
  return (
    <section className="section-pad">
      <div className="container-shell">
        <SectionHeading eyebrow="Cases" title="Application examples for B2B buyers." />
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {cases.map(([title, image, copy]) => (
            <article key={title} className="rounded-3xl border border-[#eadccd] bg-white p-4">
              <img className="aspect-[4/3] rounded-2xl object-cover" src={image} alt={title} />
              <h2 className="mt-5 text-xl font-black text-navy-950">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
