import type { Metadata } from "next";
import { InquiryForm } from "@/components/inquiry-form";

export const metadata: Metadata = {
  title: "Product Inquiry",
  description: "Submit a product inquiry for custom mats, mouse pads, placemats, coasters and game mats."
};

export default function RequestQuotePage() {
  return (
    <section className="section-pad">
      <div className="container-shell">
        <InquiryForm />
      </div>
    </section>
  );
}
