import type { Metadata } from "next";
import { SubmitInquiryForm } from "@/components/submit-inquiry-form";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "Submit Inquiry",
  description: "Submit selected products and requirements to DIANSHANGMATS."
};

export default function SubmitInquiryPage() {
  return (
    <section className="section-pad">
      <div className="container-shell">
        <SectionHeading eyebrow="Submit Inquiry" title="Send selected products to DIANSHANGMATS for review." />
        <div className="mt-8">
          <SubmitInquiryForm />
        </div>
      </div>
    </section>
  );
}
