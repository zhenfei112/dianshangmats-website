import type { Metadata } from "next";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "Inquiry Tracking",
  description: "Track DIANSHANGMATS inquiry status using an inquiry number and business email."
};

export default function OrderTrackingPage() {
  return (
    <section className="section-pad">
      <div className="container-shell max-w-3xl">
        <SectionHeading eyebrow="Inquiry Tracking" title="Check quote request progress." />
        <form className="mt-8 rounded-3xl border border-[#eadccd] bg-white p-7">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="form-label">
              Inquiry Number
              <input className="form-input" placeholder="DSQ-TEST-1001" />
            </label>
            <label className="form-label">
              Business Email
              <input className="form-input" type="email" placeholder="buyer@example.com" />
            </label>
          </div>
          <button type="button" className="btn-primary mt-5">
            Track Inquiry
          </button>
          <p className="mt-4 text-sm text-slate-500">Tracking will connect to real inquiry records after database setup.</p>
        </form>
      </div>
    </section>
  );
}
