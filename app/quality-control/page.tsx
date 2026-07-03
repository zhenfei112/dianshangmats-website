import type { Metadata } from "next";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "Quality Control",
  description: "Quality control process for custom mats, printed products, packaging and export inspection."
};

export default function QualityControlPage() {
  const steps = ["Material Check", "Artwork Review", "Sample Confirmation", "In-process Inspection", "Final Inspection", "Packing Review"];
  return (
    <section className="section-pad">
      <div className="container-shell grid gap-10 lg:grid-cols-[420px_1fr]">
        <SectionHeading eyebrow="Quality Control" title="Inspection path for custom and stock orders.">
          Confirm material, color, print, size tolerance, backing stability, edge finish and packaging before shipment.
        </SectionHeading>
        <div className="grid gap-4 md:grid-cols-2">
          {steps.map((step, index) => (
            <div key={step} className="rounded-3xl border border-[#eadccd] bg-white p-6">
              <span className="text-sm font-black text-leather-800">{String(index + 1).padStart(2, "0")}</span>
              <h2 className="mt-3 text-xl font-black text-navy-950">{step}</h2>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
