import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";
import { processSteps } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "OEM/ODM Services",
  description: "OEM and ODM services for custom mats, mouse pads, desk mats, placemats, coasters and game mats."
};

export default function OemPage() {
  return (
    <>
      <section className="bg-ivory py-20">
        <div className="container-shell grid items-center gap-10 lg:grid-cols-[1fr_480px]">
          <SectionHeading eyebrow="OEM/ODM Services" title="From product recommendation to sample approval and mass production.">
            We support private-label buyers, distributors, promotional companies, hospitality groups, and office supply
            programs with structured OEM/ODM development.
          </SectionHeading>
          <img className="aspect-square rounded-3xl object-cover shadow-soft" src="/images/stitch/oem-hero.jpg" alt="OEM mat production" />
        </div>
      </section>
      <section className="section-pad">
        <div className="container-shell">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {processSteps.map((step, index) => (
              <div key={step} className="rounded-3xl border border-[#eadccd] bg-white p-5">
                <span className="text-sm font-black text-leather-800">{String(index + 1).padStart(2, "0")}</span>
                <h2 className="mt-3 font-black text-navy-950">{step}</h2>
              </div>
            ))}
          </div>
          <div className="mt-10 rounded-3xl bg-navy-950 p-8 text-white">
            <h2 className="text-3xl font-black">Need custom project support?</h2>
            <p className="mt-3 max-w-2xl text-white/70">
              Submit material, size, logo, quantity, packing, and target market requirements. The team can review
              whether sample development, standard products, or a custom production plan is the right path.
            </p>
            <Link href="/submit-inquiry" className="btn-primary mt-6">
              Submit Project Inquiry
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
