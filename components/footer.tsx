import Link from "next/link";
import { categories, company, navItems } from "@/lib/site-data";

export function Footer() {
  return (
    <footer className="bg-navy-950 py-14 text-white">
      <div className="container-shell grid gap-10 lg:grid-cols-[1.25fr_1fr_1fr_1fr]">
        <div>
          <h2 className="text-2xl font-black">{company.brand}</h2>
          <p className="mt-4 max-w-sm text-sm leading-7 text-white/70">
            {company.legalName} supplies custom mats, mouse pads, placemats, coasters, wrist rests, and game mats for
            B2B buyers.
          </p>
          <p className="mt-4 text-sm text-white/70">{company.location}</p>
          <a className="mt-2 block text-sm font-bold text-white" href={`mailto:${company.email}`}>
            {company.email}
          </a>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-black uppercase tracking-[0.12em] text-white/60">Products</h3>
          <div className="grid gap-2 text-sm text-white/78">
            {categories.slice(0, 8).map((category) => (
              <Link href={`/category/${category.slug}`} key={category.slug}>
                {category.name}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-black uppercase tracking-[0.12em] text-white/60">Company</h3>
          <div className="grid gap-2 text-sm text-white/78">
            {navItems.slice(2).map((item) => (
              <Link href={item.href} key={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-black uppercase tracking-[0.12em] text-white/60">Buyer Tools</h3>
          <div className="grid gap-2 text-sm text-white/78">
            <Link href="/submit-inquiry">Send Inquiry</Link>
            <Link href="/quote-basket">Inquiry Basket</Link>
            <Link href="/submit-inquiry">Submit Inquiry</Link>
            <Link href="/order-tracking">Inquiry Tracking</Link>
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms-and-conditions">Terms and Conditions</Link>
          </div>
        </div>
      </div>
      <div className="container-shell mt-10 border-t border-white/10 pt-6 text-xs text-white/50">
        Copyright {new Date().getFullYear()} {company.legalName}. All rights reserved.
      </div>
    </footer>
  );
}
