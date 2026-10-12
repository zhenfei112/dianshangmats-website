"use client";

import { useState } from "react";
import { useCart } from "@/components/cart-provider";
import { sendInquiry } from "@/lib/inquiry-client";

export function SubmitInquiryForm() {
  const { items, clearCart } = useCart();
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [reference, setReference] = useState("");

  async function submitInquiry(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setStatus("sending");
    setErrorMessage("");

    try {
      const inquiryLines = items
        .map((item) => `${item.name} (${item.modelNumber}) x ${item.quantity}`)
        .join("\n");
      const result = await sendInquiry({
          name: formData.get("customerName"),
          businessEmail: formData.get("customerEmail"),
          companyName: formData.get("companyName"),
          phoneOrWhatsapp: formData.get("phone"),
          countryOrRegion: formData.get("country"),
          product: items.map((item) => item.name).join(", "),
          estimatedQuantity: String(items.reduce((sum, item) => sum + item.quantity, 0)),
          detailedRequirements: [
            "Selected products:",
            inquiryLines || "No selected products",
            "",
            `Destination / address: ${formData.get("addressLine1") || ""}`,
            `City: ${formData.get("city") || ""}`,
            "",
            `Additional requirements: ${formData.get("requirements") || ""}`
          ].join("\n")
      });
      setReference(result.id);
      setStatus("sent");
      clearCart();
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Delivery was not confirmed. Please email sales@dianshangmats.com.");
      setStatus("error");
    }
  }

  return (
    <form onSubmit={submitInquiry} className="grid gap-6 lg:grid-cols-[1fr_380px]">
      <div className="rounded-3xl border border-[#eadccd] bg-white p-6">
        <h2 className="text-2xl font-black text-navy-950">Inquiry Contact Details</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <label className="form-label">
            Full Name
            <input name="customerName" required className="form-input" />
          </label>
          <label className="form-label">
            Business Email
            <input name="customerEmail" required type="email" className="form-input" />
          </label>
          <label className="form-label">
            Company Name
            <input name="companyName" className="form-input" />
          </label>
          <label className="form-label">
            Phone / WhatsApp
            <input name="phone" className="form-input" />
          </label>
          <label className="form-label">
            Country
            <input name="country" required className="form-input" />
          </label>
          <label className="form-label">
            City
            <input name="city" className="form-input" />
          </label>
        </div>
        <label className="form-label mt-4">
          Destination / Address
          <input name="addressLine1" className="form-input" placeholder="Country, city, delivery destination or warehouse" />
        </label>
        <label className="form-label mt-4">
          Additional Requirements
          <textarea
            name="requirements"
            className="form-input min-h-32"
            placeholder="Logo, print, size, thickness, material, packing, sample request, target market..."
          />
        </label>
      </div>

      <aside className="h-fit rounded-3xl border border-[#eadccd] bg-white p-6">
        <h2 className="text-xl font-black text-navy-950">Selected Products</h2>
        <div className="mt-5 grid gap-3">
          {items.map((item) => (
            <div key={item.slug} className="flex justify-between gap-4 text-sm">
              <span>
                {item.name} x {item.quantity}
              </span>
              <strong>{item.modelNumber}</strong>
            </div>
          ))}
        </div>
        <div className="mt-5 border-t border-[#eadccd] pt-4">
          <p className="text-sm leading-6 text-slate-500">
            This is not a payment page. The selected products and requirements will be sent to DIANSHANGMATS for review.
            Sales will confirm sample details, bulk cost, shipping and production time by email.
          </p>
        </div>
        <button className="btn-primary mt-6 w-full" disabled={!items.length || status === "sending"}>
          {status === "sending" ? "Sending Inquiry..." : "Submit Inquiry"}
        </button>
        {status === "sent" ? <p role="status" className="mt-4 font-bold text-leather-800">Inquiry saved and email notification accepted. Reference: {reference}. The inquiry basket has been cleared.</p> : null}
        {status === "error" ? <p role="alert" className="mt-4 font-bold text-red-700">{errorMessage}</p> : null}
      </aside>
    </form>
  );
}
