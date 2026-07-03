import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "DIANSHANGMATS privacy policy placeholder for local development."
};

export default function PrivacyPolicyPage() {
  return (
    <section className="section-pad">
      <div className="container-shell max-w-4xl rich-text">
        <p className="eyebrow">Legal</p>
        <h1 className="text-4xl font-black text-navy-950">Privacy Policy</h1>
        <p className="mt-5">
          This is a draft privacy policy placeholder for local development. Before production launch, replace this page
          with a reviewed policy covering inquiry data, uploaded files, cookies, analytics and customer
          communication.
        </p>
      </div>
    </section>
  );
}
