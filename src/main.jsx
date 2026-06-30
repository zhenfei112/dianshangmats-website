import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const contactEmail = "sales@dianshangmats.com";

const pages = [
  { path: "/", label: "Home" },
  { path: "/products", label: "Products" },
  { path: "/about-us", label: "About Factory" },
  { path: "/custom-options", label: "OEM/ODM Services" },
  { path: "/cases", label: "Knowledge" },
  { path: "/contact-us", label: "Contact Us" }
];

const stitchImages = {
  products: [
    "/images/stitch/products-signature-leather-pad.jpg",
    "/images/stitch/products-executive-desk.jpg",
    "/images/stitch/products-tactical-fabric.jpg",
    "/images/stitch/products-coaster-set.jpg",
    "/images/stitch/products-industrial-floor.jpg",
    "/images/stitch/products-chess-mat.jpg"
  ],
  about: {
    hero: "/images/stitch/about-hero.jpg",
    craft: "/images/stitch/about-craft.jpg",
    line: "/images/stitch/about-production-line.jpg",
    material: "/images/stitch/about-material-hub.jpg",
    lab: "/images/stitch/about-qc-lab.jpg",
    printing: "/images/stitch/about-custom-printing.jpg"
  },
  oem: {
    hero: "/images/stitch/oem-hero.jpg",
    digital: "/images/stitch/oem-digital-printing.jpg",
    embossing: "/images/stitch/oem-logo-embossing.jpg",
    cutting: "/images/stitch/oem-die-cutting.jpg"
  },
  single: [
    "/images/stitch/single-main.jpg",
    "/images/stitch/single-stitching.jpg",
    "/images/stitch/single-texture.jpg",
    "/images/stitch/single-color-samples.jpg",
    "/images/stitch/single-engraving.jpg"
  ],
  knowledge: [
    "/images/stitch/knowledge-1.jpg",
    "/images/stitch/knowledge-2.jpg",
    "/images/stitch/knowledge-3.jpg"
  ],
  contact: "/images/stitch/contact-hero.jpg"
};

const aiImages = {
  home: "/images/generated/home-hero-ai.png",
  deskMat: "/images/generated/product-desk-mat-ai.png",
  placemat: "/images/generated/product-placemat-ai.png",
  rubberDesk: "/images/generated/product-rubber-desk-ai.png",
  mousePad: "/images/generated/product-mouse-pad-ai.png",
  gameMat: "/images/generated/product-game-mat-ai.png",
  readyStock: "/images/generated/product-ready-stock-ai.png",
  floorMat: "/images/generated/product-floor-mat-ai.png",
  factory: "/images/generated/about-factory-ai.png",
  oem: "/images/generated/oem-customization-ai.png",
  quote: "/images/generated/contact-quote-ai.png"
};

const categories = [
  {
    title: "Leather Desk Mats",
    path: "/leather-desk-mats",
    image: aiImages.deskMat,
    summary: "Refined workspace surfaces for executive branding, office programs, and corporate gifts.",
    tags: ["Custom size", "Logo branding", "Office buyers"]
  },
  {
    title: "Leather Placemats",
    path: "/leather-placemats",
    image: aiImages.placemat,
    summary: "Hospitality-grade PU leather placemats for restaurants, hotels, events, and gift orders.",
    tags: ["MOQ 100 pcs", "Restaurant ready", "Color options"]
  },
  {
    title: "PU Leather Rubber Desk Mats",
    path: "/pu-leather-rubber-desk-mats",
    image: aiImages.rubberDesk,
    summary: "Rubber-backed surfaces for buyers who need anti-slip stability and premium texture.",
    tags: ["Rubber backing", "Anti-slip", "OEM/ODM"]
  },
  {
    title: "Ready-to-Ship Mats",
    path: "/ready-to-ship-mats",
    image: aiImages.readyStock,
    summary: "Selected stock styles for faster bulk purchasing, sampling, and urgent projects.",
    tags: ["Stock styles", "Bulk purchase", "Fast lead time"]
  },
  {
    title: "Rubber Mouse Pads",
    path: "/rubber-mouse-pads",
    image: aiImages.mousePad,
    summary: "Precision printed rubber surfaces for selected brand programs and office merchandise.",
    tags: ["Digital print", "Brand programs", "Bulk orders"]
  },
  {
    title: "Custom Game Mats",
    path: "/game-mahjong-mats",
    image: aiImages.gameMat,
    summary: "Event, entertainment, and game table surfaces for project-based custom production.",
    tags: ["Game mats", "Events", "Custom print"]
  }
];

const productCards = [
  {
    title: "Signature Leather Pad",
    path: "/leather-desk-mats",
    image: aiImages.deskMat,
    sku: "LP-880",
    summary: "Bonded leather surface with non-slip backing for professional office and gift programs."
  },
  {
    title: "Executive Desk Canvas",
    path: "/leather-desk-mats",
    image: stitchImages.single[0],
    sku: "DC-1020",
    summary: "Large-format desk mat for unified executive workspaces and corporate brand applications."
  },
  {
    title: "Tactical Fabric Pad",
    path: "/rubber-mouse-pads",
    image: aiImages.mousePad,
    sku: "TF-550",
    summary: "Low-friction textile surface with rubber base for selected mouse pad and game mat projects."
  },
  {
    title: "Atelier Coaster Set",
    path: "/ready-to-ship-mats",
    image: aiImages.readyStock,
    sku: "CS-400",
    summary: "Premium small leather goods for hospitality, gifting, samples, and promotional sets."
  },
  {
    title: "Industrial Floor Shield",
    path: "/floor-mats",
    image: aiImages.floorMat,
    sku: "FS-2000",
    summary: "Rubber mat construction for high-traffic, anti-slip, and heavy-duty project requests."
  },
  {
    title: "Championship Game Mat",
    path: "/game-mahjong-mats",
    image: aiImages.gameMat,
    sku: "GM-640",
    summary: "Rollable printed game surfaces for events, clubs, entertainment buyers, and distributors."
  }
];

const products = {
  "/leather-placemats": {
    eyebrow: "Custom Leather Placemats",
    title: "Leather placemats for restaurants, hotels, events, and brand programs.",
    intro:
      "We produce PU leather placemats for bulk custom orders, including solid colors, printed patterns, logo designs, shaped placemats, and packaging-ready sets.",
    image: aiImages.placemat,
    gallery: [aiImages.placemat, aiImages.readyStock, stitchImages.products[0], stitchImages.products[3], aiImages.oem],
    highlights: [
      "Custom orders usually start from 100 pieces",
      "Logo printing, pattern printing, and color matching available",
      "Suitable for restaurants, hotels, weddings, gifts, and events",
      "Selected ready-to-ship styles can support faster bulk purchasing"
    ],
    specs: [
      ["Materials", "PU leather, synthetic leather, selected textured materials"],
      ["Custom options", "Size, shape, color, logo, print, package"],
      ["Applications", "Restaurants, hotels, weddings, gift companies, brands"],
      ["Sample", "Sample orders available before bulk production"]
    ]
  },
  "/leather-desk-mats": {
    eyebrow: "Custom Leather Desk Mats",
    title: "Leather desk mats for offices, corporate gifts, and brand buyers.",
    intro:
      "Our desk mats are made for B2B buyers who need clean office presentation, custom branding, and reliable bulk production for workspaces and gift programs.",
    image: aiImages.deskMat,
    gallery: [aiImages.deskMat, ...stitchImages.single.slice(0, 4)],
    highlights: [
      "Large desk pad sizes and custom sizes available",
      "Logo printing and private-label packaging supported",
      "Good fit for office suppliers, corporate gifts, and ecommerce sellers",
      "Smooth writing surface with easy-clean PU leather finish"
    ],
    specs: [
      ["Materials", "PU leather, textured leather surface, optional backing"],
      ["Custom options", "Logo, size, color, edge style, packaging"],
      ["Applications", "Offices, corporate gifts, brand stores, distributors"],
      ["MOQ", "Custom orders usually start from 100 pieces"]
    ]
  },
  "/pu-leather-rubber-desk-mats": {
    eyebrow: "PU Leather Rubber Desk Mats",
    title: "Rubber-backed desk mats with a PU leather surface.",
    intro:
      "This product line combines a premium PU leather surface with a black rubber anti-slip backing. It is designed for buyers who want better stability, durability, and differentiation.",
    image: aiImages.rubberDesk,
    gallery: [aiImages.rubberDesk, aiImages.deskMat, stitchImages.single[2], stitchImages.products[2], aiImages.oem],
    highlights: [
      "PU leather surface with black rubber backing",
      "Anti-slip, water-resistant, and durable for daily desk use",
      "Custom logo, size, color, and package options",
      "A strong option for premium office and gift programs"
    ],
    specs: [
      ["Structure", "PU leather top layer + rubber backing"],
      ["Edge", "Flat cut edge; stitched edge optional by project"],
      ["Applications", "Office desk pads, corporate gifts, brand merchandise"],
      ["MOQ", "Custom orders usually start from 100 pieces"]
    ]
  },
  "/rubber-mouse-pads": {
    eyebrow: "Custom Rubber Mouse Pads",
    title: "Rubber mouse pads for promotional, office, and brand programs.",
    intro:
      "We support custom rubber mouse pads and extended desk pads for B2B buyers who need print quality, stable backing, and bulk supply for office, brand, and promotional orders.",
    image: aiImages.mousePad,
    gallery: [aiImages.mousePad, aiImages.rubberDesk, stitchImages.products[2], aiImages.gameMat, aiImages.oem],
    highlights: [
      "Fabric top and rubber backing options for different use cases",
      "Full-surface printing, logo printing, and size customization",
      "Suitable for office gifts, brand merchandise, distributors, and ecommerce sellers",
      "Custom projects usually start from 100 pieces depending on size and print"
    ],
    specs: [
      ["Materials", "Fabric top, natural rubber or selected rubber backing"],
      ["Custom options", "Size, thickness, print, edge, package"],
      ["Applications", "Office mouse pads, promotional gifts, extended desk pads"],
      ["MOQ", "Custom orders usually start from 100 pieces"]
    ]
  },
  "/floor-mats": {
    eyebrow: "Industrial & Commercial Floor Mats",
    title: "Anti-slip rubber floor mats for commercial and facility projects.",
    intro:
      "This line is prepared for B2B buyers who need durable rubber mat products for entrances, work areas, commercial spaces, and custom facility programs.",
    image: aiImages.floorMat,
    gallery: [aiImages.floorMat, aiImages.rubberDesk, stitchImages.products[4], aiImages.factory, aiImages.oem],
    highlights: [
      "Anti-slip rubber surfaces and durable mat structures",
      "Custom thickness, size, edge, texture, and packing can be discussed by project",
      "Suitable for facility suppliers, commercial buyers, and distributor programs",
      "Best handled as a project-based custom or bulk inquiry"
    ],
    specs: [
      ["Materials", "Rubber, rubber compound, selected surface textures"],
      ["Custom options", "Size, thickness, pattern, edge, package"],
      ["Applications", "Entrances, work areas, commercial spaces, facility supply"],
      ["MOQ", "Confirmed by size, material, and production requirement"]
    ]
  },
  "/ready-to-ship-mats": {
    eyebrow: "Ready-to-Ship Mats",
    title: "Stock mat styles for faster bulk purchasing.",
    intro:
      "Ready-to-ship styles help buyers move faster when they need sample comparison, urgent events, or bulk purchasing without a full custom development cycle.",
    image: aiImages.readyStock,
    gallery: [aiImages.readyStock, aiImages.placemat, aiImages.deskMat, stitchImages.products[3], aiImages.quote],
    highlights: [
      "Selected stock styles available for bulk buyers",
      "Useful for urgent restaurant, event, and gift projects",
      "Ask for current inventory, colors, sizes, and packing details",
      "Logo or custom package options may be available depending on style"
    ],
    specs: [
      ["Stock status", "Please contact us for current available quantity"],
      ["Best for", "Bulk purchasing, events, samples, fast delivery needs"],
      ["Custom add-ons", "Logo, labels, packaging depending on stock style"],
      ["MOQ", "Depends on style, stock quantity, and shipping requirements"]
    ]
  },
  "/game-mahjong-mats": {
    eyebrow: "Game & Mahjong Mats",
    title: "Custom game and mahjong mats for entertainment buyers.",
    intro:
      "We support bulk custom projects for game mats, mahjong mats, and entertainment table mats, with options for material, size, print, and packaging.",
    image: aiImages.gameMat,
    gallery: [aiImages.gameMat, aiImages.mousePad, stitchImages.products[5], aiImages.rubberDesk, aiImages.oem],
    highlights: [
      "Custom sizes for game tables and entertainment surfaces",
      "Pattern printing and private-label packaging available",
      "Suitable for gift programs, event suppliers, and distributors",
      "Best used as a project-based or seasonal product line"
    ],
    specs: [
      ["Products", "Mahjong mats, game mats, entertainment table mats"],
      ["Custom options", "Size, material, print, package"],
      ["Applications", "Entertainment, events, gifts, distributors"],
      ["Sample", "Samples available for qualified bulk projects"]
    ]
  }
};

const customOptions = [
  "Custom size",
  "Custom logo",
  "Custom color",
  "Custom shape",
  "Material selection",
  "Pattern printing",
  "Private-label packaging",
  "Ready-to-ship stock"
];

const cases = [
  {
    title: "Restaurant leather placemat program",
    sector: "Restaurant / Hospitality",
    result: "Custom color placemats with brand mark for table presentation.",
    image: aiImages.placemat
  },
  {
    title: "Corporate leather desk mat gift",
    sector: "Office / Brand gift",
    result: "Logo printed desk mats with custom packaging for a business gift order.",
    image: aiImages.deskMat
  },
  {
    title: "Rubber-backed desk mat development",
    sector: "OEM / Product development",
    result: "PU leather top with anti-slip rubber backing for a differentiated desk pad line.",
    image: aiImages.rubberDesk
  }
];

const catalogLinks = [
  { label: "Mouse Pads", path: "/rubber-mouse-pads" },
  { label: "Desk Mats", path: "/leather-desk-mats" },
  { label: "Placemats", path: "/leather-placemats" },
  { label: "Coasters", path: "/ready-to-ship-mats" },
  { label: "Floor Mats", path: "/floor-mats" },
  { label: "Game Mats", path: "/game-mahjong-mats" }
];

const inquiryProcess = [
  ["1", "Submit Request", "Share product type, quantity, size, logo, destination, and target timeline."],
  ["2", "Expert Review", "We check material, structure, artwork, packing, and production feasibility."],
  ["3", "Sample / Mockup", "Qualified projects can move into sample, artwork proof, or material confirmation."],
  ["4", "Bulk Production", "After confirmation, we coordinate production, QC, packing, and export delivery."]
];

const quoteFieldGroups = [
  ["Full Name", "e.g. Alexander Sterling"],
  ["Company Name", "Global Logistics Corp"],
  ["Business Email", "procurement@company.com"],
  ["Phone / WhatsApp", "+1 (555) 000-0000"],
  ["Estimated Order Quantity", "Min. 100 pcs"],
  ["Destination Country", "United States"]
];

function useRoute() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const onPopState = () => setPath(window.location.pathname);
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const navigate = (nextPath) => {
    if (window.location.pathname !== nextPath) {
      window.history.pushState({}, "", nextPath);
      setPath(nextPath);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return { path, navigate };
}

function LinkButton({ to, children, className = "", navigate }) {
  return (
    <button className={`link-button ${className}`} onClick={() => navigate(to)}>
      {children}
    </button>
  );
}

function Header({ path, navigate }) {
  const [open, setOpen] = useState(false);
  const visiblePages = pages.filter((page) =>
    ["/", "/products", "/custom-options", "/cases", "/about-us", "/contact-us"].includes(page.path)
  );

  return (
    <header className="site-header">
      <button className="brand text-brand" onClick={() => navigate("/")} aria-label="DianShang Mats home">
        DianShangMats
      </button>
      <nav className={`main-nav ${open ? "open" : ""}`} aria-label="Main navigation">
        {visiblePages.map((page) => (
          <button
            key={page.path}
            className={path === page.path || (page.path === "/products" && products[path]) ? "active" : ""}
            onClick={() => {
              navigate(page.path);
              setOpen(false);
            }}
          >
            {page.label}
          </button>
        ))}
      </nav>
      <button className="nav-toggle" onClick={() => setOpen((value) => !value)} aria-label="Toggle navigation">
        Menu
      </button>
      <LinkButton navigate={navigate} to="/request-quote" className="header-cta">
        Get Factory Quote
      </LinkButton>
    </header>
  );
}

function Hero({ navigate }) {
  return (
    <section className="hero section-pad">
      <div className="hero-copy">
        <p className="pill-label">B2B Global Solutions</p>
        <h1 className="hero-heading">
          <span>China-Based</span>
          <span><em>Manufacturer</em> of</span>
          <span>Custom Leather &</span>
          <span>Rubber Mats.</span>
        </h1>
        <p className="hero-text">
          Factory-direct B2B solutions for US and European buyers. We develop leather placemats, desk mats,
          rubber-backed surfaces, ready-to-ship stock mats, and custom game mats for hospitality, office,
          gift, and brand programs.
        </p>
        <div className="hero-actions">
          <LinkButton navigate={navigate} to="/request-quote" className="primary">
            Request a Factory Quote
          </LinkButton>
          <LinkButton navigate={navigate} to="/products" className="secondary">
            View Products
          </LinkButton>
        </div>
      </div>
      <div className="hero-media">
        <div className="hero-photo hero-photo-main">
          <img src={aiImages.home} alt="Premium leather and rubber mat product display" />
        </div>
        <div className="hero-photo-stack">
          <div className="hero-photo hero-photo-small">
            <img src={aiImages.oem} alt="Custom mat printing, embossing, and sample development" />
          </div>
          <div className="hero-photo hero-photo-small">
            <img src={aiImages.readyStock} alt="Ready-to-ship mat inventory and sample sets" />
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionTitle({ eyebrow, title, intro }) {
  return (
    <div className="section-title">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {intro && <p>{intro}</p>}
    </div>
  );
}

function CategoryGrid({ navigate }) {
  return (
    <section className="category-section section-pad">
      <div className="material-heading">
        <div>
          <h2>Material Mastery</h2>
          <p>Explore our primary manufacturing categories. Every item is developed with practical material selection, print control, and factory-direct production.</p>
        </div>
        <span>FACTORY DIRECT - GUANGZHOU</span>
      </div>
      <div className="category-grid">
        {categories.map((item) => (
          <article className="category-card" key={item.title} onClick={() => navigate(item.path)}>
            <img src={item.image} alt={item.title} />
            <div>
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function CustomCapabilities({ compact = false }) {
  const capabilityCards = [
    ["Integrated Supply Chain", "Material sourcing, production coordination, and export sales support custom mat projects from one Guangzhou-based team."],
    ["Printing & Finishing Options", "UV printing, screen printing, embossing, stitching, edge finishing, packaging, and other project-based customization options."],
    ["Bulk Customization", "Custom orders usually start from 100 pcs, suitable for hospitality, office, gift, brand, and distributor buyers."]
  ];

  return (
    <section className={`capability-section section-pad ${compact ? "compact" : ""}`}>
      <div className="capability-panel">
        {capabilityCards.map(([title, text], index) => (
          <article className="capability-card" key={title}>
            <div className={`capability-icon tone-${index + 1}`}>{index + 1}</div>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Applications() {
  const items = ["Restaurants", "Hotels", "Offices", "Gift companies", "Events", "Brands", "Wholesalers", "Distributors"];
  return (
    <section className="application-band section-pad">
      <SectionTitle eyebrow="Buyer applications" title="Designed for professional buyers, not low-price retail traffic." />
      <div className="application-list">
        {items.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
    </section>
  );
}

function Process() {
  const steps = [
    ["01", "Inquiry", "Share product type, quantity, size, logo, destination, and target timeline."],
    ["02", "Material & quote", "We confirm material, structure, printing method, packaging, and estimated cost."],
    ["03", "Sample", "Samples can be made for qualified custom or bulk-ready projects."],
    ["04", "Production", "Bulk production starts after sample approval and order confirmation."],
    ["05", "Quality check", "Color, size, quantity, print, and packing details are checked before shipment."],
    ["06", "Delivery", "We support export-ready packing and help coordinate shipping requirements."]
  ];

  return (
    <section className="section-pad">
      <SectionTitle eyebrow="Process" title="A clear production path for custom and stock bulk orders." />
      <div className="process-grid">
        {steps.map(([number, title, text]) => (
          <div className="process-card" key={number}>
            <span>{number}</span>
            <h3>{title}</h3>
            <p>{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function CaseGrid({ limit }) {
  const shownCases = limit ? cases.slice(0, limit) : cases;
  return (
    <section className="section-pad">
      <SectionTitle
        eyebrow="Project examples"
        title="Examples of the projects this site should attract."
        intro="Replace these mockup visuals with your real customer photos and production pictures as soon as they are ready."
      />
      <div className="case-grid">
        {shownCases.map((item) => (
          <article className="case-card" key={item.title}>
            <img src={item.image} alt={item.title} />
            <div>
              <p className="case-sector">{item.sector}</p>
              <h3>{item.title}</h3>
              <p>{item.result}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Faq() {
  const items = [
    ["What is your MOQ for custom orders?", "Custom orders usually start from 100 pieces. The exact MOQ depends on product type, size, material, print, and packaging."],
    ["Can I order ready-to-ship styles?", "Yes. Selected stock styles are available for bulk purchasing. Please contact us for current inventory and shipping options."],
    ["Can you print a logo?", "Yes. We support logo printing and pattern printing for qualified custom and bulk projects."],
    ["Do you provide samples?", "Yes. Sample orders are available before bulk production. Sample cost and shipping depend on product and destination."]
  ];

  return (
    <section className="faq section-pad">
      <SectionTitle eyebrow="FAQ" title="Common questions before sending an inquiry." />
      <div className="faq-list">
        {items.map(([question, answer]) => (
          <details key={question}>
            <summary>{question}</summary>
            <p>{answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

function ContactBlock({ heading = "Ready to prototype your brand's signature mat?" }) {
  return (
    <section className="contact-block section-pad">
      <div>
        <p className="eyebrow">Contact sales</p>
        <h2>{heading}</h2>
        <p>
          Tell us the product type, quantity, size, logo requirement, destination country, and target timeline.
          We will review whether custom production or ready-to-ship bulk stock is the better path.
        </p>
      </div>
      <div className="contact-card">
        <a className="primary contact-link" href="/request-quote">
          Request a Factory Quote
        </a>
        <a className="contact-link ghost" href={`mailto:${contactEmail}`}>
          Contact Sales Team
        </a>
      </div>
    </section>
  );
}

function ImageHero({ eyebrow, title, intro, image, children }) {
  return (
    <section className="image-hero">
      <img src={image} alt={title} />
      <div className="image-hero-overlay" />
      <div className="image-hero-content">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{intro}</p>
        {children}
      </div>
    </section>
  );
}

function InfoRow({ icon, label, children }) {
  return (
    <div className="info-row">
      <span className="info-icon">{icon}</span>
      <div>
        <strong>{label}</strong>
        <p>{children}</p>
      </div>
    </div>
  );
}

function InquiryFormCard({
  title = "Factory Quotation Request",
  intro = "Share your mat type, quantity, dimensions, logo or artwork needs, and destination. We will review the practical production path.",
  submitLabel = "Submit Factory Quotation Request"
}) {
  const mailSubject = encodeURIComponent("Factory quotation request for DianShang Mats");
  const mailBody = encodeURIComponent(
    "Hello DianShang Mats,\n\nProduct category:\nQuantity:\nSize:\nMaterial:\nLogo / print:\nPackaging:\nDestination country:\nTarget delivery date:\n\nDetailed requirements:\n"
  );

  return (
    <div className="inquiry-form-card">
      <div className="form-card-head">
        <p className="eyebrow">Direct factory channel</p>
        <h2>{title}</h2>
        <p>{intro}</p>
      </div>
      <div className="quote-form-grid">
        {quoteFieldGroups.map(([label, placeholder]) => (
          <label key={label}>
            <span>{label}</span>
            <input placeholder={placeholder} />
          </label>
        ))}
        <label>
          <span>Product Category</span>
          <select defaultValue="">
            <option value="" disabled>Select a category</option>
            {catalogLinks.map((item) => (
              <option value={item.label} key={item.label}>{item.label}</option>
            ))}
            <option>Other Custom Mat Project</option>
          </select>
        </label>
        <label>
          <span>Project Type</span>
          <select defaultValue="Custom bulk order">
            <option>Custom bulk order</option>
            <option>Ready-to-ship stock order</option>
            <option>Sample before bulk order</option>
            <option>OEM/ODM development</option>
          </select>
        </label>
      </div>
      <label className="full-field">
        <span>Detailed Specifications & Custom Requirements</span>
        <textarea placeholder="Material preference, dimensions, stitching style, logo position, artwork status, packaging needs, target market..." />
      </label>
      <label className="upload-box">
        <input type="file" multiple />
        <strong>Upload Design / Technical Drawings</strong>
        <span>AI, PDF, JPG, PNG, XLS files can be connected after backend setup.</span>
      </label>
      <a className="contact-link primary submit-link" href={`mailto:${contactEmail}?subject=${mailSubject}&body=${mailBody}`}>
        {submitLabel}
      </a>
      <p className="form-note">For live forms later, connect this section to Hostinger email, WhatsApp, or a CRM form plugin.</p>
    </div>
  );
}

function QuoteSidePanel() {
  return (
    <aside className="quote-side">
      <p className="eyebrow">Precision manufacturing inquiry</p>
      <h1>Request a factory quote for your custom mat project.</h1>
      <p>
        This page is built for serious B2B buyers. The more complete the requirement, the faster we can confirm
        material direction, MOQ, sampling path, and estimated production cost.
      </p>
      <div className="quote-process">
        <h2>Inquiry Process</h2>
        {inquiryProcess.map(([number, title, text]) => (
          <div className="quote-step" key={number}>
            <span>{number}</span>
            <div>
              <strong>{title}</strong>
              <p>{text}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="facility-box">
        <strong>Facility Headquarters</strong>
        <p>Guangzhou, Guangdong, China</p>
        <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
      </div>
    </aside>
  );
}

function FactoryTour() {
  const tourItems = [
    {
      title: "Automated Production Line",
      text: "Cutting, lamination, printing, and finishing resources support repeatable bulk production.",
      image: aiImages.factory,
      featured: true
    },
    {
      title: "Raw Material Hub",
      text: "PU leather, PVC leather, microfiber, rubber, and related materials are coordinated for each project.",
      image: stitchImages.about.material
    },
    {
      title: "QC Laboratory",
      text: "Color, surface, edge, print, packing, and quantity checks are built into the production path.",
      image: stitchImages.about.lab
    }
  ];

  return (
    <section className="factory-tour section-pad">
      <div className="material-heading">
        <div>
          <p className="eyebrow">Facility Transparency</p>
          <h2>Factory Tour</h2>
          <p>Use this page to show buyers that the company has sourcing, production, inspection, and export coordination capability.</p>
        </div>
        <span>GUANGZHOU SUPPLY CHAIN</span>
      </div>
      <div className="factory-grid">
        {tourItems.map((item) => (
          <article className={item.featured ? "factory-card featured" : "factory-card"} key={item.title}>
            <img src={item.image} alt={item.title} />
            <div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          </article>
        ))}
        <article className="factory-difference">
          <h3>The DianShang Difference</h3>
          <p>
            We combine material supply, production processing, sales service, and export communication so B2B buyers
            can move from inquiry to sample to bulk order with clearer control.
          </p>
          <div>
            <span>Material support</span>
            <span>100 pcs custom MOQ</span>
            <span>Print and packaging</span>
            <span>Export-ready service</span>
          </div>
        </article>
      </div>
    </section>
  );
}

function CustomizationShowcase() {
  const items = [
    ["Digital Printing", "High-definition print support for patterns, logos, and full-surface brand artwork.", aiImages.oem],
    ["Logo Embossing", "Embossing, debossing, and premium logo effects for leather-style products.", aiImages.deskMat],
    ["Precision Die-Cutting", "Custom shapes and sizes for mats, pads, coasters, and game surfaces.", aiImages.rubberDesk]
  ];

  return (
    <section className="custom-showcase section-pad">
      <div className="section-title">
        <p className="eyebrow">Customization Capabilities</p>
        <h2>Details that make OEM/ODM projects look more credible.</h2>
        <p>Each capability should support a clear buyer use case: branding, material selection, shape, packaging, and delivery.</p>
      </div>
      <div className="custom-showcase-grid">
        {items.map(([title, text, image]) => (
          <article key={title}>
            <img src={image} alt={title} />
            <h3>{title}</h3>
            <p>{text}</p>
            <div className="mini-checks">
              <span>Bulk project</span>
              <span>Factory quote</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function HomePage({ navigate }) {
  useEffect(() => {
    document.title = "DianShang Mats | Custom Leather Placemats & Desk Mats";
  }, []);

  return (
    <>
      <Hero navigate={navigate} />
      <CategoryGrid navigate={navigate} />
      <CustomCapabilities />
      <ContactBlock />
    </>
  );
}

function ProductsCenterPage({ navigate }) {
  useEffect(() => {
    document.title = "Products Center | DianShang Mats";
  }, []);

  return (
    <section className="products-center section-pad">
      <aside className="product-sidebar">
        <p className="eyebrow">Product Catalog</p>
        {catalogLinks.map((item, index) => (
          <button key={item.label} className={index === 0 ? "active" : ""} onClick={() => navigate(item.path)}>
            <span />
            {item.label}
          </button>
        ))}
        <div className="sidebar-note">
          <h3>Need a custom dimension?</h3>
          <p>We support custom size, print, material, backing, and packaging for qualified bulk orders.</p>
          <button onClick={() => navigate("/custom-options")}>Technical Specs</button>
        </div>
      </aside>
      <div>
        <div className="products-intro">
          <p className="eyebrow">Products Center</p>
          <h1>Precision-engineered surfaces for B2B mat programs.</h1>
          <p>
            Explore core product directions for custom desk mats, placemats, rubber mouse pads, coasters, game mats,
            ready-to-ship stock, and OEM/ODM development.
          </p>
        </div>
        <div className="product-card-grid">
          {productCards.map((item, index) => (
            <article className={`product-card ${index % 2 === 1 ? "offset" : ""}`} key={item.title}>
              <button className="product-image-button" onClick={() => navigate(item.path)}>
                <img src={item.image} alt={item.title} />
              </button>
              <div className="product-card-head">
                <h3>{item.title}</h3>
                <span>{item.sku}</span>
              </div>
              <p>{item.summary}</p>
              <div className="product-card-actions">
                <button onClick={() => navigate("/request-quote")}>Request a Factory Quote</button>
                <button onClick={() => navigate(item.path)}>View Details</button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductPage({ product, navigate }) {
  useEffect(() => {
    document.title = `${product.eyebrow} | DianShang Mats`;
  }, [product.eyebrow]);

  const gallery = product.gallery || [product.image, ...categories.map((item) => item.image)].slice(0, 5);

  return (
    <>
      <section className="product-detail section-pad">
        <div className="product-gallery">
          <div className="product-main-image">
            <img src={gallery[0]} alt={product.eyebrow} />
          </div>
          <div className="product-thumbs">
            {gallery.slice(1, 5).map((image) => (
              <img key={image} src={image} alt={`${product.eyebrow} detail`} />
            ))}
          </div>
        </div>
        <div className="product-detail-copy">
          <p className="eyebrow">{product.eyebrow}</p>
          <h1>{product.title}</h1>
          <p>{product.intro}</p>
          <div className="spec-list">
            <h2>Factory Specifications</h2>
            {product.specs.map(([label, value]) => (
              <div key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
          <div className="inquiry-box">
            <h2>Manufacturing Inquiry</h2>
            <div className="form-grid">
              <label>
                <span>Full Name</span>
                <input placeholder="Your name" />
              </label>
              <label>
                <span>Company Name</span>
                <input placeholder="Company / brand" />
              </label>
              <label>
                <span>Work Email</span>
                <input placeholder={contactEmail} />
              </label>
              <label>
                <span>Target Quantity</span>
                <input placeholder="Min. 100 pcs" />
              </label>
            </div>
            <div className="radio-row">
              <label><input type="radio" name="custom" /> Custom logo / print</label>
              <label><input type="radio" name="custom" /> Plain material</label>
            </div>
            <button className="contact-link primary" onClick={() => navigate("/request-quote")}>Submit Manufacturing Inquiry</button>
          </div>
          <div className="trust-row">
            <span>SGS-style factory review ready</span>
            <span>Global export support</span>
          </div>
        </div>
      </section>
      <section className="section-pad highlights-band">
        <SectionTitle eyebrow="Highlights" title="What buyers can customize." />
        <ul className="check-list">
          {product.highlights.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
      <CustomCapabilities compact />
      <ContactBlock heading={`Request a quote for ${product.eyebrow.toLowerCase()}.`} />
    </>
  );
}

function CustomOptionsPage() {
  useEffect(() => {
    document.title = "Custom Options | DianShang Mats";
  }, []);

  return (
    <>
      <ImageHero
        eyebrow="Global Manufacturing Partner"
        title="Bespoke manufacturing and custom OEM solutions."
        intro="Transform buyer requirements into high-performance leather and rubber mat products with material, print, logo, packaging, and bulk production support."
        image={aiImages.oem}
      >
        <div className="hero-actions">
          <a className="contact-link primary" href="/request-quote">Start Your Custom Project</a>
          <a className="contact-link ghost" href="/products">View Capability Catalog</a>
        </div>
      </ImageHero>
      <Process />
      <CustomizationShowcase />
      <ContactBlock />
    </>
  );
}

function CasesPage() {
  useEffect(() => {
    document.title = "Cases | DianShang Mats";
  }, []);

  return (
    <>
      <section className="page-hero text-only section-pad">
        <div>
          <p className="eyebrow">Cases</p>
          <h1>Project examples for restaurants, offices, gifts, and OEM development.</h1>
          <p>
            These examples show the type of custom and bulk-ready work the site is built to attract. Replace mockups
            with real production photos as your asset library grows.
          </p>
        </div>
      </section>
      <CaseGrid />
      <ContactBlock />
    </>
  );
}

function AboutPage() {
  useEffect(() => {
    document.title = "About Us | DianShang Mats";
  }, []);

  return (
    <>
      <ImageHero
        eyebrow="Guangzhou Manufacturing Excellence"
        title="The precision behind the performance."
        intro="A B2B custom mat supplier connecting material sourcing, production processing, export sales, and customer service."
        image={aiImages.factory}
      >
        <div className="hero-actions">
          <a className="contact-link primary" href="/contact-us">Explore Facilities</a>
        </div>
      </ImageHero>
      <section className="section-pad two-column about-intro">
        <div>
          <img src={aiImages.oem} alt="Leather material handling and custom mat development" />
        </div>
        <div>
          <p className="eyebrow">Artisanship Meets Industry</p>
          <h2>Guangzhou-based sourcing, production, and export coordination.</h2>
          <p>
            Guangzhou DianShang Rubber Products Co., Ltd. focuses on sales and foreign trade coordination while working
            with a production base and material supply resources. The product scope includes rubber mouse pads, desk
            mats, floor mats, placemats, coasters, heated mouse pads, leather craft products, and related custom orders.
          </p>
          <div className="stat-grid">
            <div><strong>110</strong><span>Team members</span></div>
            <div><strong>100 pcs</strong><span>Typical custom MOQ</span></div>
          </div>
        </div>
      </section>
      <FactoryTour />
      <section className="section-pad two-column">
        <div>
          <h2>What we focus on</h2>
          <p>Our site is built for international B2B buyers who need custom and bulk mat programs.</p>
        </div>
        <div className="spec-table">
          <div>
            <strong>Main market</strong>
            <span>United States and Europe</span>
          </div>
          <div>
            <strong>Order type</strong>
            <span>Custom bulk orders and ready-to-ship bulk purchasing</span>
          </div>
          <div>
            <strong>Team</strong>
            <span>110 employees across product development, production, sales, and customer service</span>
          </div>
          <div>
            <strong>MOQ</strong>
            <span>Custom orders usually start from 100 pcs</span>
          </div>
        </div>
      </section>
      <ContactBlock />
    </>
  );
}

function ContactPage() {
  useEffect(() => {
    document.title = "Contact Us | DianShang Mats";
  }, []);

  return (
    <section className="contact-page section-pad">
      <div className="contact-hero-card">
        <img src={aiImages.quote} alt="DianShang Mats factory inquiry desk" />
        <div>
          <p className="eyebrow">B2B Manufacturing Relations</p>
          <h1>Contact DIANSHANGMATS</h1>
          <p>
            Connect directly with our Guangzhou-based team to discuss custom specifications, bulk production,
            ready-to-ship stock, samples, packaging, and long-term manufacturing partnerships.
          </p>
          <a className="contact-link primary" href="/request-quote">Request a Factory Quote</a>
        </div>
      </div>
      <div className="contact-layout">
        <aside className="headquarters-card">
          <h2>Factory Headquarters</h2>
          <InfoRow icon="01" label="Location">
            Guangzhou DIANSHANG Rubber Products Co., Ltd., Baiyun District, Guangzhou City, Guangdong Province, China.
          </InfoRow>
          <InfoRow icon="02" label="Direct Channel">
            {contactEmail}
          </InfoRow>
          <InfoRow icon="03" label="WhatsApp / Phone">
            Replace with your active international sales number before launch.
          </InfoRow>
          <div className="map-card">
            <img src={aiImages.factory} alt="Factory production environment" />
            <div>
              <strong>DIANSHANGMATS Main Plant</strong>
              <span>Open for scheduled B2B inspection</span>
            </div>
          </div>
        </aside>
        <InquiryFormCard
          title="B2B Manufacturing Inquiry"
          intro="Use this form layout for product development, OEM/ODM requests, stock bulk orders, sample planning, and factory quotation collection."
          submitLabel="Send Inquiry by Email"
        />
      </div>
    </section>
  );
}

function RequestQuotePage() {
  useEffect(() => {
    document.title = "Request a Factory Quote | DianShang Mats";
  }, []);

  return (
    <section className="quote-page section-pad">
      <div className="quote-layout">
        <QuoteSidePanel />
        <InquiryFormCard />
      </div>
    </section>
  );
}

function Footer({ navigate }) {
  return (
    <footer className="site-footer">
      <div className="footer-location">
        <div className="footer-brand">DIANSHANGMATS</div>
        <p>Premium custom mat production for global B2B buyers. From Guangzhou to the world.</p>
        <span>Headquarters</span>
        <strong>Guangzhou, Guangdong, China</strong>
        <span>Direct Contact</span>
        <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
      </div>
      <div>
        <h3>Connect</h3>
        <a href={`mailto:${contactEmail}`}>Email Sales</a>
        <button onClick={() => navigate("/contact-us")}>WhatsApp / Phone</button>
        <button onClick={() => navigate("/contact-us")}>LinkedIn Profile</button>
      </div>
      <div>
        <h3>Quick Actions</h3>
        <button onClick={() => navigate("/request-quote")}>B2B Inquiry Form</button>
        <button onClick={() => navigate("/custom-options")}>OEM/ODM Services</button>
        <button onClick={() => navigate("/products")}>Product Center</button>
      </div>
      <div>
        <h3>Newsletter</h3>
        <p>Get manufacturing updates and material information.</p>
        <div className="newsletter-box">
          <input type="email" placeholder="Email Address" aria-label="Email address" />
          <button onClick={() => navigate("/contact-us")}>Go</button>
        </div>
      </div>
    </footer>
  );
}

function App() {
  const { path, navigate } = useRoute();
  const product = products[path];
  const renderedPage = useMemo(() => {
    if (product) return <ProductPage product={product} navigate={navigate} />;
    if (path === "/products") return <ProductsCenterPage navigate={navigate} />;
    if (path === "/custom-options") return <CustomOptionsPage />;
    if (path === "/cases") return <CasesPage />;
    if (path === "/about-us") return <AboutPage />;
    if (path === "/contact-us") return <ContactPage />;
    if (path === "/request-quote") return <RequestQuotePage />;
    return <HomePage navigate={navigate} />;
  }, [path, product, navigate]);

  return (
    <div>
      <Header path={path} navigate={navigate} />
      <main>{renderedPage}</main>
      <Footer navigate={navigate} />
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
