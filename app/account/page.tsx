import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "Customer Account",
  description: "Customer account placeholder for order history, saved buyer profile and inquiry tracking."
};

export default function AccountPage() {
  return (
    <section className="section-pad">
      <div className="container-shell max-w-3xl">
        <SectionHeading eyebrow="Customer Account" title="Buyer account area prepared for phase-two authentication." />
        <div className="mt-8 rounded-3xl border border-[#eadccd] bg-white p-7">
          <h2 className="text-2xl font-black text-navy-950">Account functions to connect</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {["Buyer profile", "Saved destinations", "Quote history", "Inquiry tracking", "Inquiry history", "Uploaded files"].map((item) => (
              <div key={item} className="rounded-2xl bg-ivory p-4 font-bold text-navy-900">
                {item}
              </div>
            ))}
          </div>
          <Link href="/order-history" className="btn-primary mt-6">
            View Inquiry History
          </Link>
        </div>
      </div>
    </section>
  );
}
