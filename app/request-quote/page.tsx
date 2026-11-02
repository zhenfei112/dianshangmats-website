import type { Metadata } from "next";
import { InquiryForm } from "@/components/inquiry-form";

export const metadata: Metadata = {
  title: "Request an OEM and Wholesale Mat Quote",
  description: "Request a quote for custom mouse pads, desk mats, placemats and coasters. Share your material, size, quantity, logo and packaging requirements."
};

export default function RequestQuotePage() {
  return (
    <section className="section-pad">
      <div className="container-shell">
        <h1 className="mb-6 text-4xl font-black tracking-tight text-navy-950">Request a Custom Mat Quote</h1>
        <InquiryForm />
      </div>
    </section>
  );
}
