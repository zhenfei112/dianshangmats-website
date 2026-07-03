"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/components/cart-provider";
import { categories, company } from "@/lib/site-data";

export function Header() {
  const pathname = usePathname();
  const { count } = useCart();
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const primaryNav = [
    { label: "HOME", href: "/" },
    { label: "PRODUCT", href: "/products" },
    { label: "CUSTOMIZATION", href: "/customization" },
    { label: "OEM/ODM", href: "/oem-odm-services" },
    { label: "ABOUT US", href: "/about-us" },
    { label: "NEWS", href: "/knowledge" },
    { label: "CONTACT US", href: "/contact-us" }
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-[#e4d5c5] bg-[#fffaf4] text-[#20242b] shadow-sm">
      <div className="container-shell hidden min-h-10 items-center justify-between gap-6 text-sm text-slate-700 md:flex">
        <span>{company.brand} - Professional One-Stop Desk Mat & Mouse Pads Manufacturer.</span>
        <div className="flex items-center gap-3">
          <a className="font-semibold text-[#5b2d14]" href={`mailto:${company.email}`}>
            {company.email}
          </a>
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#06172d] text-xs font-black text-[#d7b07a]">
            EN
          </span>
        </div>
      </div>
      <div className="container-shell flex min-h-[82px] items-center justify-between gap-8">
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#06172d] text-lg font-black text-[#d7b07a]">
            DS
          </span>
          <span className="text-xl font-black tracking-tight text-navy-950">{company.brand}</span>
        </Link>

        <nav className="hidden items-center gap-5 lg:flex">
          {primaryNav.map((item) => {
            const active = pathname === item.href || (item.href === "/products" && pathname.startsWith("/products"));
            if (item.label === "PRODUCT") {
              return (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => setMegaOpen(true)}
                  onMouseLeave={() => setMegaOpen(false)}
                >
                  <Link
                    href={item.href}
                    className={`whitespace-nowrap py-8 text-sm font-black ${active ? "text-[#5b2d14]" : "text-[#222] hover:text-[#5b2d14]"}`}
                    onFocus={() => setMegaOpen(true)}
                  >
                    {item.label}
                  </Link>
                  {megaOpen && <MegaMenu />}
                </div>
              );
            }
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`whitespace-nowrap py-8 text-sm font-black ${active ? "text-[#5b2d14]" : "text-[#222] hover:text-[#5b2d14]"}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden shrink-0 items-center gap-3 lg:flex">
          <Link href="/quote-basket" className="rounded-full border border-[#5b2d14] px-4 py-2 text-sm font-black text-[#5b2d14]">
            Inquiry ({count})
          </Link>
        </div>

        <button
          className="rounded-full border border-navy-950/20 px-4 py-2 text-sm font-bold lg:hidden"
          onClick={() => setMobileOpen((value) => !value)}
        >
          Menu
        </button>
      </div>
      {mobileOpen && (
        <div className="border-t border-[#e8dfd5] bg-white lg:hidden">
          <div className="container-shell grid gap-2 py-5">
            {primaryNav.map((item) => (
              <Link key={item.href} href={item.href} className="rounded-lg bg-ivory px-4 py-3 font-bold text-navy-950">
                {item.label}
              </Link>
            ))}
            <Link href="/quote-basket" className="btn-primary text-center">
              Inquiry Basket ({count})
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

function MegaMenu() {
  return (
    <div className="absolute left-1/2 top-full w-[980px] -translate-x-1/2 pt-5">
      <div className="grid grid-cols-4 gap-5 border border-[#ededed] bg-white p-6 text-navy-950 shadow-soft">
        {categories.slice(0, 8).map((category) => (
          <Link
            href={`/category/${category.slug}`}
            key={category.slug}
            className="group border border-[#e7d8c8] p-4 transition hover:border-[#b98a58] hover:bg-[#f8f1e8]"
          >
            <div className="square-media mb-3 rounded-xl">
              <img src={category.image} alt={category.name} />
            </div>
            <h3 className="font-black">{category.name}</h3>
            <ul className="mt-2 space-y-1 text-xs text-slate-600">
              {category.children.slice(0, 4).map((child) => (
                <li key={child}>{child}</li>
              ))}
            </ul>
          </Link>
        ))}
      </div>
    </div>
  );
}
