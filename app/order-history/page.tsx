import type { Metadata } from "next";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "Order History",
  description: "Customer order history placeholder for DIANSHANGMATS B2B commerce."
};

const demoOrders = [
  ["DSQ-TEST-1001", "New Inquiry", "PU Leather Restaurant Placemat", "Quote pending"],
  ["DSQ-TEST-1002", "Awaiting Supplier Review", "Leather Executive Desk Mat", "Inquiry pending"]
];

export default function OrderHistoryPage() {
  return (
    <section className="section-pad">
      <div className="container-shell">
        <SectionHeading eyebrow="Inquiry History" title="Track selected product quote requests." />
        <div className="mt-8 overflow-hidden rounded-3xl border border-[#eadccd] bg-white">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Inquiry</th>
                <th>Status</th>
                <th>Product</th>
                <th>Quote</th>
              </tr>
            </thead>
            <tbody>
              {demoOrders.map(([order, status, product, total]) => (
                <tr key={order}>
                  <td>{order}</td>
                  <td>{status}</td>
                  <td>{product}</td>
                  <td>{total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
