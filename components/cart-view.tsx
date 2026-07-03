"use client";

import Link from "next/link";
import { useCart } from "@/components/cart-provider";

export function CartView() {
  const { items, count, updateQuantity, removeItem } = useCart();

  if (!items.length) {
    return (
      <div className="rounded-3xl border border-[#eadccd] bg-white p-10 text-center">
        <h2 className="text-2xl font-black text-navy-950">Your inquiry basket is empty</h2>
        <p className="mt-3 text-slate-600">Select products, samples, or custom items before sending an inquiry.</p>
        <Link href="/products" className="btn-primary mt-6">
          View Products
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
      <div className="grid gap-4">
        {items.map((item) => (
          <div key={item.slug} className="grid gap-4 rounded-3xl border border-[#eadccd] bg-white p-5 md:grid-cols-[120px_1fr_auto]">
            <div className="square-media rounded-2xl">
              <img src={item.image} alt={item.name} />
            </div>
            <div>
              <h3 className="text-lg font-black text-navy-950">{item.name}</h3>
              <p className="mt-1 text-sm text-slate-500">{item.modelNumber}</p>
              <p className="mt-3 font-black text-leather-800">Inquiry item, details confirmed by supplier</p>
            </div>
            <div className="grid gap-3">
              <label className="form-label">
                Qty
                <input
                  className="form-input w-28"
                  min={1}
                  type="number"
                  value={item.quantity}
                  onChange={(event) => updateQuantity(item.slug, Number(event.target.value))}
                />
              </label>
              <button className="text-sm font-black text-red-700" onClick={() => removeItem(item.slug)}>
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <aside className="h-fit rounded-3xl border border-[#eadccd] bg-white p-6">
        <h2 className="text-xl font-black text-navy-950">Inquiry Summary</h2>
        <div className="mt-5 grid gap-3 text-sm">
          <div className="flex justify-between">
            <span>Selected products</span>
            <strong>{items.length}</strong>
          </div>
          <div className="flex justify-between">
            <span>Total estimated quantity</span>
            <strong>{count}</strong>
          </div>
          <p className="border-t border-[#eadccd] pt-3 leading-6 text-slate-600">
            No online payment is required on the website. DIANSHANGMATS will review selected products, quantity,
            customization details, sample request and production timeline.
          </p>
        </div>
        <Link href="/submit-inquiry" className="btn-primary mt-6 w-full">
          Submit Inquiry
        </Link>
      </aside>
    </div>
  );
}
