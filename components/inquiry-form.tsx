"use client";

import { useState } from "react";
import { categories, company, products } from "@/lib/site-data";

const initialState = {
  name: "",
  companyName: "",
  businessEmail: "",
  phoneOrWhatsapp: "",
  countryOrRegion: "",
  product: "",
  estimatedQuantity: "",
  requiredShape: "",
  requiredSize: "",
  requiredThickness: "",
  material: "",
  surfaceTexture: "",
  logoRequirements: "",
  printingRequirements: "",
  packagingRequirements: "",
  targetMarket: "",
  expectedDeliveryDate: "",
  detailedRequirements: ""
};

export function InquiryForm({ compact = false }: { compact?: boolean }) {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function submitInquiry(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      if (!response.ok) throw new Error("Inquiry failed");
      setStatus("sent");
      setForm(initialState);
    } catch {
      setStatus("error");
    }
  }

  function updateField(field: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  return (
    <form onSubmit={submitInquiry} className="rounded-3xl border border-[#eadccd] bg-white p-6 shadow-sm">
      <div className="mb-6">
        <p className="eyebrow">Factory Inquiry</p>
        <h2 className="text-2xl font-black text-navy-950">Send requirements to {company.brand}</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Share product, quantity, size, material, logo, packaging, and destination details. The local version stores
          test submissions only after database setup.
        </p>
      </div>

      <div className={`grid gap-4 ${compact ? "md:grid-cols-2" : "md:grid-cols-3"}`}>
        <label className="form-label">
          Name
          <input className="form-input" required value={form.name} onChange={(e) => updateField("name", e.target.value)} />
        </label>
        <label className="form-label">
          Company Name
          <input
            className="form-input"
            value={form.companyName}
            onChange={(e) => updateField("companyName", e.target.value)}
          />
        </label>
        <label className="form-label">
          Business Email
          <input
            className="form-input"
            required
            type="email"
            value={form.businessEmail}
            onChange={(e) => updateField("businessEmail", e.target.value)}
          />
        </label>
        <label className="form-label">
          Phone or WhatsApp
          <input
            className="form-input"
            value={form.phoneOrWhatsapp}
            onChange={(e) => updateField("phoneOrWhatsapp", e.target.value)}
          />
        </label>
        <label className="form-label">
          Country or Region
          <input
            className="form-input"
            value={form.countryOrRegion}
            onChange={(e) => updateField("countryOrRegion", e.target.value)}
          />
        </label>
        <label className="form-label">
          Product
          <select className="form-input" value={form.product} onChange={(e) => updateField("product", e.target.value)}>
            <option value="">Select product or category</option>
            {products.map((product) => (
              <option key={product.slug} value={product.name}>
                {product.name}
              </option>
            ))}
            {categories.map((category) => (
              <option key={category.slug} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </label>
        <label className="form-label">
          Estimated Quantity
          <input
            className="form-input"
            value={form.estimatedQuantity}
            onChange={(e) => updateField("estimatedQuantity", e.target.value)}
          />
        </label>
        <label className="form-label">
          Required Shape
          <input
            className="form-input"
            value={form.requiredShape}
            onChange={(e) => updateField("requiredShape", e.target.value)}
          />
        </label>
        <label className="form-label">
          Required Size
          <input
            className="form-input"
            value={form.requiredSize}
            onChange={(e) => updateField("requiredSize", e.target.value)}
          />
        </label>
        <label className="form-label">
          Required Thickness
          <input
            className="form-input"
            value={form.requiredThickness}
            onChange={(e) => updateField("requiredThickness", e.target.value)}
          />
        </label>
        <label className="form-label">
          Material
          <input
            className="form-input"
            value={form.material}
            onChange={(e) => updateField("material", e.target.value)}
          />
        </label>
        <label className="form-label">
          Surface Texture
          <input
            className="form-input"
            value={form.surfaceTexture}
            onChange={(e) => updateField("surfaceTexture", e.target.value)}
          />
        </label>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <label className="form-label">
          Logo Requirements
          <textarea
            className="form-input min-h-28"
            value={form.logoRequirements}
            onChange={(e) => updateField("logoRequirements", e.target.value)}
          />
        </label>
        <label className="form-label">
          Printing Requirements
          <textarea
            className="form-input min-h-28"
            value={form.printingRequirements}
            onChange={(e) => updateField("printingRequirements", e.target.value)}
          />
        </label>
        <label className="form-label">
          Packaging Requirements
          <textarea
            className="form-input min-h-28"
            value={form.packagingRequirements}
            onChange={(e) => updateField("packagingRequirements", e.target.value)}
          />
        </label>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <label className="form-label">
          Target Market
          <input
            className="form-input"
            value={form.targetMarket}
            onChange={(e) => updateField("targetMarket", e.target.value)}
          />
        </label>
        <label className="form-label">
          Expected Delivery Date
          <input
            className="form-input"
            value={form.expectedDeliveryDate}
            onChange={(e) => updateField("expectedDeliveryDate", e.target.value)}
          />
        </label>
      </div>

      <label className="form-label mt-4">
        Detailed Requirements
        <textarea
          className="form-input min-h-32"
          value={form.detailedRequirements}
          onChange={(e) => updateField("detailedRequirements", e.target.value)}
        />
      </label>

      <label className="mt-4 grid rounded-2xl border border-dashed border-[#c7ad98] bg-ivory p-5 text-center text-sm font-bold text-slate-600">
        Upload Logo / Design File
        <input type="file" multiple className="mt-3 text-sm" />
      </label>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button className="btn-primary" disabled={status === "sending"}>
          {status === "sending" ? "Sending..." : "Submit Inquiry"}
        </button>
        <a className="btn-secondary" href={`mailto:${company.email}`}>
          Email Supplier
        </a>
        {status === "sent" ? <span className="font-bold text-leather-800">Inquiry received in test mode.</span> : null}
        {status === "error" ? <span className="font-bold text-red-700">Could not submit. Please try email.</span> : null}
      </div>
    </form>
  );
}
