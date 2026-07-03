import type { Metadata } from "next";
import { CartView } from "@/components/cart-view";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "Inquiry Basket",
  description: "Review selected products before submitting a factory quote inquiry."
};

export default function QuoteBasketPage() {
  return (
    <section className="section-pad">
      <div className="container-shell">
        <SectionHeading eyebrow="Inquiry Basket" title="Review selected products before inquiry." />
        <div className="mt-8">
          <CartView />
        </div>
      </div>
    </section>
  );
}
