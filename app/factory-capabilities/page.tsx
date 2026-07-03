import type { Metadata } from "next";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "Factory Capabilities",
  description: "DIANSHANGMATS factory capability page for custom mat production, printing, cutting, packaging and export support."
};

const capabilities = [
  ["Material Preparation", "Leather, PU, textile, cork, felt, rubber and composite material selection."],
  ["Printing", "Sublimation, UV printing, screen printing and full-surface artwork workflows."],
  ["Logo Processing", "Embossing, debossing, foil stamping, labels and print logo options."],
  ["Cutting and Edge", "Die cutting, custom shape, stitched edge and clean-cut edge finishing."],
  ["Packaging", "Bulk packs, gift boxes, sleeves, retail cards, cartons and shipping marks."],
  ["Export Support", "Product data, packing details, shipment preparation and buyer communication."]
];

export default function FactoryCapabilitiesPage() {
  return (
    <section className="section-pad">
      <div className="container-shell">
        <SectionHeading eyebrow="Factory Capabilities" title="Manufacturing modules prepared for B2B sourcing." />
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {capabilities.map(([title, copy]) => (
            <div key={title} className="rounded-3xl border border-[#eadccd] bg-white p-6">
              <h2 className="text-xl font-black text-navy-950">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">{copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
