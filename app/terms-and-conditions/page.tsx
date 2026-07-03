import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: "DIANSHANGMATS terms and conditions placeholder for local development."
};

export default function TermsPage() {
  return (
    <section className="section-pad">
      <div className="container-shell max-w-4xl rich-text">
        <p className="eyebrow">Legal</p>
        <h1 className="text-4xl font-black text-navy-950">Terms and Conditions</h1>
        <p className="mt-5">
          This is a draft terms placeholder for local development. Before production launch, define sample sales,
          inquiry terms, custom production approvals, sample confirmation, shipping confirmation and project rules.
        </p>
      </div>
    </section>
  );
}
