"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/cart-provider";
import type { Product } from "@/lib/site-data";

export function ProductActions({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(product.salesMode === "QUOTE_ONLY" ? 100 : 10);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();
  const modeLabel =
    product.salesMode === "DIRECT_PURCHASE"
      ? "Sample inquiry"
      : product.salesMode === "BOTH"
        ? "Sample + bulk inquiry"
        : "Custom project inquiry";

  return (
    <div className="border border-[#e7d8c8] bg-white p-5 shadow-sm">
      <div className="grid gap-4">
        <div>
          <p className="eyebrow">Inquiry Type</p>
          <div className="bg-[#f7f7f7] p-4">
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-white px-3 py-1 text-sm font-black text-[#5b2d14]">{modeLabel}</span>
              <span className="rounded-full bg-white px-3 py-1 text-sm font-black text-navy-800">Factory confirmation</span>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Select a quantity and send one inquiry. DIANSHANGMATS will confirm sample details, bulk cost, packaging
              and lead time by email.
            </p>
          </div>
        </div>

        <div className="grid gap-4">
          <label className="form-label">
            Estimated Quantity
            <input
              className="form-input"
              type="number"
              min={1}
              value={quantity}
              onChange={(event) => setQuantity(Number(event.target.value))}
            />
          </label>
          <div className="grid gap-3 sm:grid-cols-2">
            <button
              className="inline-flex items-center justify-center rounded-full bg-[#5b2d14] px-5 py-3 text-sm font-black text-white"
              onClick={() => {
                addItem(product, quantity);
                setAdded(true);
              }}
            >
              Add to Inquiry Basket
            </button>
            <Link
              href="/submit-inquiry"
              className="inline-flex items-center justify-center rounded-full border border-[#d8d8d8] bg-white px-5 py-3 text-sm font-black text-navy-950"
              onClick={() => {
                addItem(product, quantity);
              }}
            >
              Submit Inquiry
            </Link>
          </div>
          <button
            className="rounded-full border border-dashed border-[#5b2d14] px-5 py-3 text-sm font-black text-[#5b2d14]"
            onClick={() => {
              addItem(product, 1);
              setAdded(true);
            }}
          >
            Add Sample Request
          </button>
          {added ? <p className="text-sm font-bold text-leather-800">Added to inquiry basket. Continue selecting products or submit inquiry.</p> : null}
        </div>

        <div className="grid gap-3 border-t border-[#eadccd] pt-4">
          <Link className="inline-flex items-center justify-center rounded-full border border-[#d8d8d8] bg-white px-5 py-3 text-sm font-black text-navy-950" href={`/contact-us?product=${product.slug}`}>
            Contact Supplier
          </Link>
        </div>
      </div>
    </div>
  );
}
