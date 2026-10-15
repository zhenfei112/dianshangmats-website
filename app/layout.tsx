import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/components/cart-provider";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { company } from "@/lib/site-data";

export const metadata: Metadata = {
  metadataBase: new URL("https://dianshangmats.com"),
  // Next resolves ./ against each route, not against the home page.
  alternates: { canonical: "./" },
  title: {
    default: `${company.brand} | Custom Mats and Mouse Pads Manufacturer`,
    template: `%s | ${company.brand}`
  },
  description: "Custom mouse pads, desk mats, placemats and coasters for wholesale and OEM projects. Explore materials, logo printing, sizes and packaging with DIANSHANGMATS.",
  openGraph: {
    title: `${company.brand} | Custom Mats and Mouse Pads Manufacturer`,
    description: company.subheadline,
    type: "website",
    siteName: company.brand,
    url: "./"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "@id": "https://dianshangmats.com/#organization",
          name: company.brand,
          legalName: company.legalName,
          url: "https://dianshangmats.com",
          email: "sales@dianshangmats.com"
        }).replace(/</g, "\\u003c") }} />
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
