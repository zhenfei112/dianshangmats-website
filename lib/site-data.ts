import { kalpadProducts } from "./kalpad-products";

export type SalesMode = "DIRECT_PURCHASE" | "QUOTE_ONLY" | "BOTH";

export type Category = {
  name: string;
  slug: string;
  image: string;
  summary: string;
  children: string[];
  featured?: boolean;
};

export type TieredPrice = {
  label: string;
  minQty: number;
  maxQty?: number;
  price: number;
};

export type Product = {
  name: string;
  slug: string;
  modelNumber: string;
  category: string;
  subcategory: string;
  salesMode: SalesMode;
  status: "ACTIVE" | "HIDDEN" | "DRAFT";
  image: string;
  gallery: string[];
  summary: string;
  description: string;
  material: string;
  surfaceMaterial: string;
  baseMaterial: string;
  surfaceTexture: string;
  shape: string;
  color: string;
  size: string;
  thickness: string;
  printingMethod: string;
  logoMethod: string;
  edgeFinish: string;
  packaging: string;
  moq: string;
  samplePrice?: number;
  price?: number;
  inventory: number;
  productionTime: string;
  tieredPrices: TieredPrice[];
  specs?: Array<{ label: string; value: string }>;
  features?: string[];
  tags: string[];
  contentSource: "manual" | "kalpad";
  needsReview: boolean;
};

export type Article = {
  title: string;
  slug: string;
  category: string;
  image: string;
  excerpt: string;
  body: string;
  needsReview: boolean;
};

export const company = {
  brand: "DIANSHANGMATS",
  legalName: "Guangzhou DIANSHANG Rubber Products Co., Ltd.",
  location: "Guangzhou, Guangdong, China",
  email: "info@dianshangmats.com",
  headline: "Custom Mats, Mouse Pads and Desk Accessories Manufacturer",
  subheadline:
    "One-Stop OEM and ODM Solutions for Mouse Pads, Desk Mats, Placemats, Coasters, Wrist Rests and Custom Game Mats."
};

export const navItems = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Customization", href: "/customization" },
  { label: "OEM/ODM Services", href: "/oem-odm-services" },
  { label: "About Us", href: "/about-us" },
  { label: "Cases", href: "/cases" },
  { label: "Knowledge", href: "/knowledge" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact Us", href: "/contact-us" }
];

export const categories: Category[] = [
  {
    name: "Office Mouse Pads",
    slug: "office-mouse-pads",
    image: "/images/kalpad/products/custom-printed-gel-wrist-mouse-pad-1-square.webp",
    summary: "Office mouse pads with ergonomic and brand-ready options.",
    children: [
      "Wrist Rest Mouse Pad",
      "Gel Mouse Pad",
      "Memory Foam Mouse Pad",
      "Crystal Gel Mouse Pad",
      "Foam Mouse Pad",
      "Leather Mouse Pad Wrist Rest",
      "Cork Ergonomic Mouse Pad"
    ],
    featured: true
  },
  {
    name: "Flat Mouse Pads",
    slug: "flat-mouse-pads",
    image: "/images/kalpad/products/leather-mouse-pad-240x200-1-square.webp",
    summary: "Flat printed pads for promotion and retail programs.",
    children: [
      "Rubber Mouse Pad",
      "PVC Mouse Pad",
      "EVA Mouse Pad",
      "Aluminum Mouse Pad",
      "Leather Mouse Pad",
      "Cork Flat Mouse Pad",
      "Rug Mouse Pad",
      "Charging Mouse Pad"
    ],
    featured: true
  },
  {
    name: "Gaming Mouse Pads",
    slug: "gaming-mouse-pads",
    image: "/images/kalpad/products/extra-large-gaming-desk-mat-1-square.webp",
    summary: "Large gaming surfaces for esports and private labels.",
    children: [
      "Rubber Gaming Mouse Pad",
      "Poron Gaming Mouse Pad",
      "RGB Gaming Mouse Pad",
      "Charging Gaming Mouse Pad",
      "Glass Gaming Mouse Pad",
      "Resin Gaming Mouse Pad",
      "Aluminum Gaming Mouse Pad"
    ],
    featured: true
  },
  {
    name: "Wrist Rests",
    slug: "wrist-rests",
    image: "/images/kalpad/products/softskin-leather-keyboard-wrist-rest-1-square.webp",
    summary: "Keyboard and mouse wrist rests for office sets.",
    children: ["Keyboard Wrist Rest", "Mouse Wrist Rest"]
  },
  {
    name: "Desk Mats",
    slug: "desk-mats",
    image: "/images/kalpad/products/leather-desk-pad-set-3-in-1-1-square.webp",
    summary: "Desk mats for office, gaming and brand programs.",
    children: [
      "Desk Pad Set",
      "Cloth Desk Mat",
      "Leather Desk Mat",
      "Cork Desk Mat",
      "Felt Desk Mat",
      "Silicone Desk Mat",
      "Heated Desk Mat"
    ],
    featured: true
  },
  {
    name: "Placemats",
    slug: "placemats",
    image: "/images/generated/product-placemat-ai.png",
    summary: "PU leather placemats for restaurant and hotel sourcing.",
    children: [
      "Rectangular Placemats",
      "Round Placemats",
      "Oval Placemats",
      "Teardrop Placemats",
      "Custom-Shaped Placemats",
      "Printed Placemats"
    ],
    featured: true
  },
  {
    name: "Coasters",
    slug: "coasters",
    image: "/images/stitch/coasters.jpg",
    summary: "Leather and printed coaster sets for hospitality buyers.",
    children: ["Individual Coasters", "Printed Coasters", "Coaster Sets", "Custom Coasters"],
    featured: true
  },
  {
    name: "Game Mats",
    slug: "game-mats",
    image: "/images/stitch/game-mat.jpg",
    summary: "Game table mats for clubs, events and retail buyers.",
    children: [
      "Mahjong Mats",
      "Chess and Card Game Mats",
      "Sports-Themed Mats",
      "Board Game Mats",
      "Custom Game Mats"
    ],
    featured: true
  }
];

const commonGallery = [
  "/images/kalpad/kalpad-product-1-square.webp",
  "/images/kalpad/kalpad-product-2-square.webp",
  "/images/kalpad/kalpad-product-3-square.webp",
  "/images/stitch/single-main.jpg",
  "/images/stitch/single-stitching.jpg"
];

const productImages = {
  leatherMousePad: [
    "/images/kalpad/products/leather-mouse-pad-240x200-1-square.webp",
    "/images/kalpad/products/leather-mouse-pad-240x200-2-square.webp",
    "/images/kalpad/products/leather-mouse-pad-240x200-3-square.webp",
    "/images/kalpad/products/leather-mouse-pad-240x200-4-square.webp",
    "/images/kalpad/products/leather-mouse-pad-240x200-5-square.webp",
    "/images/kalpad/products/leather-mouse-pad-240x200-6-square.webp"
  ],
  leatherDeskSet: [
    "/images/kalpad/products/leather-desk-pad-set-3-in-1-1-square.webp",
    "/images/kalpad/products/leather-desk-pad-set-3-in-1-2-square.webp",
    "/images/kalpad/products/leather-desk-pad-set-3-in-1-3-square.webp",
    "/images/kalpad/products/leather-desk-pad-set-3-in-1-4-square.webp",
    "/images/kalpad/products/leather-desk-pad-set-3-in-1-5-square.webp",
    "/images/kalpad/products/leather-desk-pad-set-3-in-1-6-square.webp",
    "/images/kalpad/products/leather-desk-pad-set-3-in-1-7-square.webp"
  ],
  corkDeskSet: [
    "/images/kalpad/products/cork-desk-pad-set-3-in-1-1-square.webp",
    "/images/kalpad/products/cork-desk-pad-set-3-in-1-2-square.webp",
    "/images/kalpad/products/cork-desk-pad-set-3-in-1-3-square.webp",
    "/images/kalpad/products/cork-desk-pad-set-3-in-1-4-square.webp",
    "/images/kalpad/products/cork-desk-pad-set-3-in-1-5-square.webp",
    "/images/kalpad/products/cork-desk-pad-set-3-in-1-6-square.webp",
    "/images/kalpad/products/cork-desk-pad-set-3-in-1-7-square.webp"
  ],
  ultraSmoothGaming: [
    "/images/kalpad/products/ultra-smooth-gaming-mouse-pad-1-square.webp",
    "/images/kalpad/products/ultra-smooth-gaming-mouse-pad-2-square.webp",
    "/images/kalpad/products/ultra-smooth-gaming-mouse-pad-3-square.webp",
    "/images/kalpad/products/ultra-smooth-gaming-mouse-pad-4-square.webp",
    "/images/kalpad/products/ultra-smooth-gaming-mouse-pad-5-square.webp",
    "/images/kalpad/products/ultra-smooth-gaming-mouse-pad-6-square.webp"
  ],
  waterproofGaming: [
    "/images/kalpad/products/waterproof-gaming-mouse-pad-1-square.webp",
    "/images/kalpad/products/waterproof-gaming-mouse-pad-2-square.webp",
    "/images/kalpad/products/waterproof-gaming-mouse-pad-3-square.webp",
    "/images/kalpad/products/waterproof-gaming-mouse-pad-4-square.webp",
    "/images/kalpad/products/waterproof-gaming-mouse-pad-5-square.webp",
    "/images/kalpad/products/waterproof-gaming-mouse-pad-6-square.webp"
  ],
  extraLargeGaming: [
    "/images/kalpad/products/extra-large-gaming-desk-mat-1-square.webp",
    "/images/kalpad/products/extra-large-gaming-desk-mat-2-square.webp",
    "/images/kalpad/products/extra-large-gaming-desk-mat-3-square.webp",
    "/images/kalpad/products/extra-large-gaming-desk-mat-4-square.webp",
    "/images/kalpad/products/extra-large-gaming-desk-mat-5-square.webp",
    "/images/kalpad/products/extra-large-gaming-desk-mat-6-square.webp"
  ],
  gelWristMousePad: [
    "/images/kalpad/products/custom-printed-gel-wrist-mouse-pad-1-square.webp",
    "/images/kalpad/products/custom-printed-gel-wrist-mouse-pad-2-square.webp",
    "/images/kalpad/products/custom-printed-gel-wrist-mouse-pad-3-square.webp",
    "/images/kalpad/products/custom-printed-gel-wrist-mouse-pad-4-square.webp",
    "/images/kalpad/products/custom-printed-gel-wrist-mouse-pad-5-square.webp",
    "/images/kalpad/products/custom-printed-gel-wrist-mouse-pad-6-square.webp",
    "/images/kalpad/products/custom-printed-gel-wrist-mouse-pad-7-square.webp"
  ],
  keyboardWristRest: [
    "/images/kalpad/products/softskin-leather-keyboard-wrist-rest-1-square.webp",
    "/images/kalpad/products/softskin-leather-keyboard-wrist-rest-2-square.webp",
    "/images/kalpad/products/softskin-leather-keyboard-wrist-rest-3-square.webp",
    "/images/kalpad/products/softskin-leather-keyboard-wrist-rest-4-square.webp",
    "/images/kalpad/products/softskin-leather-keyboard-wrist-rest-5-square.webp",
    "/images/kalpad/products/softskin-leather-keyboard-wrist-rest-6-square.webp",
    "/images/kalpad/products/softskin-leather-keyboard-wrist-rest-7-square.webp"
  ]
};

const manualProducts: Product[] = [
  {
    name: "Non-Slip Leather Mouse Pad 240x200mm",
    slug: "non-slip-leather-mouse-pad-240x200",
    modelNumber: "DS-LMP-240",
    category: "Flat Mouse Pads",
    subcategory: "Leather Mouse Pad",
    salesMode: "BOTH",
    status: "ACTIVE",
    image: productImages.leatherMousePad[0],
    gallery: productImages.leatherMousePad,
    summary: "Leather surface mouse pad with natural rubber base and custom logo options.",
    description:
      "A compact leather mouse pad for office, home, laptop and promotional use. Standard size can be sampled first, while color, logo and packaging are confirmed by quote.",
    material: "Leather surface + natural rubber base",
    surfaceMaterial: "Leather",
    baseMaterial: "Natural rubber",
    surfaceTexture: "Smooth leather touch",
    shape: "Rectangle",
    color: "Multiple stock colors, custom color available",
    size: "240x200x3mm, 300x250x3mm, custom size",
    thickness: "3mm",
    printingMethod: "Silk printing, sublimation",
    logoMethod: "Print, embossing, debossing",
    edgeFinish: "Cut edge",
    packaging: "OPP packing or box packing",
    moq: "100 pcs for custom logo",
    samplePrice: 6.5,
    price: 2.9,
    inventory: 300,
    productionTime: "7-15 days after artwork approval",
    tieredPrices: [
      { label: "100-299 pcs", minQty: 100, maxQty: 299, price: 3.2 },
      { label: "300-999 pcs", minQty: 300, maxQty: 999, price: 2.9 },
      { label: "1000+ pcs", minQty: 1000, price: 2.45 }
    ],
    specs: [
      { label: "Style", value: "Non-slip, scratch-resistant, easy clean" },
      { label: "Usage", value: "Office / Home / Laptop / Promotion" },
      { label: "Dimensions", value: "240x200x3mm, 300x250x3mm, custom size" },
      { label: "Surface Material", value: "Leather" },
      { label: "Base Material", value: "Natural rubber" },
      { label: "Logo", value: "Silk printing / sublimation / embossing" },
      { label: "Certifications", value: "RoHS, REACH, Prop 65 compliant" },
      { label: "Packing", value: "OPP packing / box packing" }
    ],
    features: [
      "Smooth leather surface for daily office use",
      "Natural rubber base keeps the pad stable",
      "Slim 3mm profile for laptop bags and remote work",
      "Ready for custom logo, text and packaging"
    ],
    tags: ["Leather", "Office", "Logo", "Stock Sample"],
    contentSource: "kalpad",
    needsReview: true
  },
  {
    name: "3-in-1 Leather Desk Pad Set",
    slug: "3-in-1-leather-desk-pad-set",
    modelNumber: "KLDS-003",
    category: "Desk Mats",
    subcategory: "Desk Pad Set",
    salesMode: "BOTH",
    status: "ACTIVE",
    image: productImages.leatherDeskSet[0],
    gallery: productImages.leatherDeskSet,
    summary: "Leather desk mat set with keyboard wrist rest and mouse wrist support.",
    description:
      "A complete professional workspace set for office, gifting and brand programs. It combines a large desk pad, memory foam keyboard support and ergonomic mouse pad.",
    material: "Faux leather, memory foam, SBR and suede backing",
    surfaceMaterial: "Faux leather",
    baseMaterial: "Anti-slip suede and SBR base",
    surfaceTexture: "Waterproof leather touch",
    shape: "Desk pad set",
    color: "Custom print and standard color options",
    size: "Desk pad 800x400x3mm; keyboard rest 425x90x15mm; mouse pad 230x220x22mm",
    thickness: "3mm desk pad, 15mm keyboard rest, 22mm mouse wrist pad",
    printingMethod: "Full-color custom printing",
    logoMethod: "Print, debossing, label, custom packaging",
    edgeFinish: "Cut edge",
    packaging: "Box packing",
    moq: "100 sets for custom orders",
    samplePrice: 28,
    price: 13.8,
    inventory: 120,
    productionTime: "12-20 days after sample approval",
    tieredPrices: [
      { label: "100-299 sets", minQty: 100, maxQty: 299, price: 15.5 },
      { label: "300-999 sets", minQty: 300, maxQty: 999, price: 13.8 },
      { label: "1000+ sets", minQty: 1000, price: 11.9 }
    ],
    specs: [
      { label: "Product Type", value: "Waterproof, ergonomic, non-slip, easy clean" },
      { label: "Included Items", value: "Desk pad, keyboard wrist rest, mouse pad with wrist rest" },
      { label: "Dimensions", value: "800x400x3mm; 425x90x15mm; 230x220x22mm" },
      { label: "Surface Material", value: "Faux leather" },
      { label: "Wrist Fill", value: "Memory foam" },
      { label: "Base Material", value: "Anti-slip suede and SBR base" },
      { label: "Mouse Compatibility", value: "Optical / laser" },
      { label: "Packing", value: "Box packing" }
    ],
    features: [
      "Complete desk setup for office buyers",
      "Large leather surface protects the desktop",
      "Memory foam support reduces typing and mouse fatigue",
      "Good option for corporate gifts and retail sets"
    ],
    tags: ["Desk Set", "Leather", "Ergonomic", "Gift"],
    contentSource: "kalpad",
    needsReview: true
  },
  {
    name: "3-in-1 Cork Desk Pad Set",
    slug: "3-in-1-cork-desk-pad-set",
    modelNumber: "KLDS-003C",
    category: "Desk Mats",
    subcategory: "Cork Desk Mat",
    salesMode: "BOTH",
    status: "ACTIVE",
    image: productImages.corkDeskSet[0],
    gallery: productImages.corkDeskSet,
    summary: "Eco-style cork desk set with ergonomic keyboard and mouse wrist supports.",
    description:
      "A natural cork workspace set for office, home and eco-friendly programs. It includes desk protection, mouse wrist support and keyboard support in one set.",
    material: "Cork, memory foam, anti-slip suede and SBR",
    surfaceMaterial: "Cork",
    baseMaterial: "Anti-slip suede and SBR base",
    surfaceTexture: "Natural cork texture",
    shape: "Desk pad set",
    color: "Natural cork, custom print available",
    size: "Desk pad 800x400x3mm; keyboard rest 440x80x18mm; mouse pad 230x220x22mm",
    thickness: "3mm desk pad, 18mm keyboard rest, 22mm mouse wrist pad",
    printingMethod: "Digital print, screen print",
    logoMethod: "Print, laser, label, custom sleeve",
    edgeFinish: "Cut edge",
    packaging: "Box packing",
    moq: "100 sets for custom orders",
    samplePrice: 29,
    price: 14.5,
    inventory: 80,
    productionTime: "12-20 days after artwork approval",
    tieredPrices: [
      { label: "100-299 sets", minQty: 100, maxQty: 299, price: 16.2 },
      { label: "300-999 sets", minQty: 300, maxQty: 999, price: 14.5 },
      { label: "1000+ sets", minQty: 1000, price: 12.4 }
    ],
    specs: [
      { label: "Product Type", value: "Eco-friendly, ergonomic, non-slip, complete set" },
      { label: "Included Items", value: "Cork desk pad, keyboard wrist rest, mouse wrist pad" },
      { label: "Dimensions", value: "800x400x3mm; 440x80x18mm; 230x220x22mm" },
      { label: "Surface Material", value: "Cork" },
      { label: "Wrist Fill", value: "Memory foam" },
      { label: "Base Material", value: "Anti-slip suede and SBR base" },
      { label: "Mouse Compatibility", value: "Optical / laser" },
      { label: "Packing", value: "Box packing" }
    ],
    features: [
      "Natural cork surface with warm office styling",
      "Large mat protects the desk and supports writing",
      "Memory foam wrist supports improve comfort",
      "Suitable for eco-positioned brand programs"
    ],
    tags: ["Cork", "Desk Set", "Eco", "Ergonomic"],
    contentSource: "kalpad",
    needsReview: true
  },
  {
    name: "Ultra Smooth Gaming Mouse Pad",
    slug: "ultra-smooth-gaming-mouse-pad",
    modelNumber: "KLHX-029",
    category: "Gaming Mouse Pads",
    subcategory: "Rubber Gaming Mouse Pad",
    salesMode: "QUOTE_ONLY",
    status: "ACTIVE",
    image: productImages.ultraSmoothGaming[0],
    gallery: productImages.ultraSmoothGaming,
    summary: "High-DPI gaming surface with anti-slip rubber base and custom size options.",
    description:
      "A performance gaming mouse pad for esports, private labels and gaming accessory programs. Surface texture, size, softness and packaging can be confirmed after inquiry.",
    material: "Fabric surface + anti-slip rubber base",
    surfaceMaterial: "Fabric",
    baseMaterial: "Anti-slip rubber",
    surfaceTexture: "Low-friction smooth control surface",
    shape: "Rectangle",
    color: "Custom artwork",
    size: "S to 3XL standard sizes, custom size available",
    thickness: "3mm, 4mm, 5mm",
    printingMethod: "Silk printing, sublimation",
    logoMethod: "Full-surface print, logo print",
    edgeFinish: "Stitched edge",
    packaging: "Cardboard tube, flat pack, folded pack, zipper pouch, book-style box",
    moq: "300 pcs depending on size",
    samplePrice: 18,
    inventory: 0,
    productionTime: "15-25 days after sample approval",
    tieredPrices: [
      { label: "300-499 pcs", minQty: 300, maxQty: 499, price: 7.8 },
      { label: "500-999 pcs", minQty: 500, maxQty: 999, price: 6.5 },
      { label: "1000+ pcs", minQty: 1000, price: 5.4 }
    ],
    specs: [
      { label: "Style", value: "Anti-slip gaming surface" },
      { label: "Usage", value: "Gaming / office" },
      { label: "Standard Sizes", value: "250x210mm to 1220x590mm" },
      { label: "Thickness", value: "3mm / 4mm / 5mm" },
      { label: "Surface Material", value: "Fabric" },
      { label: "Base Material", value: "Anti-slip rubber" },
      { label: "Softness", value: "MID, SOFT, XSOFT" },
      { label: "Packing", value: "Tube, flat pack, folded pack, zipper pouch, book-style box" }
    ],
    features: [
      "Smooth control surface for high-DPI gaming mice",
      "Anti-slip rubber base improves desk stability",
      "Multiple standard sizes from small to 3XL",
      "Custom artwork and packaging for gaming brands"
    ],
    tags: ["Gaming", "Rubber", "Esports", "Custom Print"],
    contentSource: "kalpad",
    needsReview: true
  },
  {
    name: "Waterproof Stitched Gaming Mouse Pad",
    slug: "waterproof-stitched-gaming-mouse-pad",
    modelNumber: "DS-GMP-WP",
    category: "Gaming Mouse Pads",
    subcategory: "Rubber Gaming Mouse Pad",
    salesMode: "QUOTE_ONLY",
    status: "ACTIVE",
    image: productImages.waterproofGaming[0],
    gallery: productImages.waterproofGaming,
    summary: "Waterproof printed gaming mouse pad with stitched edge and rubber base.",
    description:
      "A durable gaming mouse pad for custom artwork programs. The stitched edge helps reduce fraying, while the rubber base keeps the mat steady during play.",
    material: "Textured cloth + anti-slip rubber",
    surfaceMaterial: "Fabric",
    baseMaterial: "Anti-slip rubber",
    surfaceTexture: "Water-resistant cloth texture",
    shape: "Rectangle",
    color: "Custom full-color artwork",
    size: "S to 3XL standard sizes, custom size available",
    thickness: "3mm, 4mm, 5mm",
    printingMethod: "Silk printing, sublimation",
    logoMethod: "Full-surface print",
    edgeFinish: "Stitched edge",
    packaging: "Cardboard tube, flat pack, folded pack, zipper pouch, book-style box",
    moq: "300 pcs depending on size",
    samplePrice: 18,
    inventory: 0,
    productionTime: "15-25 days after artwork approval",
    tieredPrices: [
      { label: "300-499 pcs", minQty: 300, maxQty: 499, price: 7.9 },
      { label: "500-999 pcs", minQty: 500, maxQty: 999, price: 6.6 },
      { label: "1000+ pcs", minQty: 1000, price: 5.5 }
    ],
    specs: [
      { label: "Style", value: "Waterproof, anti-slip, stitched edge" },
      { label: "Usage", value: "Gaming / office / brand promotion" },
      { label: "Standard Sizes", value: "250x210mm to 1220x590mm" },
      { label: "Thickness", value: "3mm / 4mm / 5mm" },
      { label: "Surface Material", value: "Fabric" },
      { label: "Base Material", value: "Anti-slip rubber" },
      { label: "Logo", value: "Silk printing / sublimation" },
      { label: "Packing", value: "Tube, flat pack, folded pack, zipper pouch, book-style box" }
    ],
    features: [
      "Water-resistant surface for daily use",
      "Stitched edge improves durability",
      "Anti-slip rubber backing for gaming desks",
      "Custom artwork for esports and retail programs"
    ],
    tags: ["Gaming", "Waterproof", "Stitched Edge", "Custom Print"],
    contentSource: "kalpad",
    needsReview: true
  },
  {
    name: "Extra Large Gaming Desk Mat",
    slug: "extra-large-gaming-desk-mat",
    modelNumber: "DS-GDM-XL",
    category: "Gaming Mouse Pads",
    subcategory: "Rubber Gaming Mouse Pad",
    salesMode: "QUOTE_ONLY",
    status: "ACTIVE",
    image: productImages.extraLargeGaming[0],
    gallery: productImages.extraLargeGaming,
    summary: "XL desk mat gaming pad with fabric surface, rubber base and full custom print.",
    description:
      "A larger gaming desk mat for keyboard and mouse setups. It supports multiple size grades, surface textures, printed artwork and B2B packaging options.",
    material: "Fabric surface + anti-slip rubber base",
    surfaceMaterial: "Fabric",
    baseMaterial: "Anti-slip rubber",
    surfaceTexture: "Glide control surface",
    shape: "Rectangle",
    color: "Custom full-color artwork",
    size: "S: 250x210mm; M: 310x240mm; L: 420x330mm; XL: 490x420mm; XXL: 900x400mm; 3XL: 1220x590mm",
    thickness: "3mm, 4mm, 5mm",
    printingMethod: "Silk printing, sublimation",
    logoMethod: "Full-surface print, brand logo print",
    edgeFinish: "Stitched edge",
    packaging: "Cardboard tube, flat pack, folded pack, zipper pouch, book-style box",
    moq: "300 pcs depending on size",
    samplePrice: 20,
    inventory: 0,
    productionTime: "15-25 days after sample approval",
    tieredPrices: [
      { label: "300-499 pcs", minQty: 300, maxQty: 499, price: 8.5 },
      { label: "500-999 pcs", minQty: 500, maxQty: 999, price: 7.1 },
      { label: "1000+ pcs", minQty: 1000, price: 5.9 }
    ],
    specs: [
      { label: "Style", value: "Anti-slip, waterproof surface" },
      { label: "Usage", value: "Gaming" },
      { label: "Standard Sizes", value: "250x210mm to 1220x590mm" },
      { label: "Thickness", value: "3mm / 4mm / 5mm" },
      { label: "Surface Material", value: "Fabric" },
      { label: "Base Material", value: "Anti-slip rubber" },
      { label: "Patterns", value: "Four texture options" },
      { label: "Certifications", value: "RoHS, REACH, Prop 65 compliant" }
    ],
    features: [
      "Extra-large surface for keyboard and mouse setups",
      "Rubber backing helps keep the desk mat stable",
      "Custom size, texture and packaging options",
      "Suitable for gaming brands and promotional programs"
    ],
    tags: ["Gaming Desk Mat", "XL", "Rubber", "Custom Print"],
    contentSource: "kalpad",
    needsReview: true
  },
  {
    name: "Custom Printed Gel Wrist Mouse Pad",
    slug: "custom-printed-gel-wrist-mouse-pad",
    modelNumber: "KLH-P-003",
    category: "Office Mouse Pads",
    subcategory: "Wrist Rest Mouse Pad",
    salesMode: "BOTH",
    status: "ACTIVE",
    image: productImages.gelWristMousePad[0],
    gallery: productImages.gelWristMousePad,
    summary: "Ergonomic gel wrist mouse pad with full-color custom printing.",
    description:
      "An office mouse pad with gel wrist support, TPR non-slip base and custom printed surface. It is suitable for ergonomic office programs and promotional gifts.",
    material: "Silky cloth, PU gel and TPR base",
    surfaceMaterial: "Silky smooth cloth",
    baseMaterial: "TPR non-slip base",
    surfaceTexture: "Full-color printed cloth surface",
    shape: "Oval ergonomic shape",
    color: "Custom print",
    size: "225x260x25mm",
    thickness: "25mm wrist support",
    printingMethod: "Silk printing, sublimation",
    logoMethod: "Full-color custom printing",
    edgeFinish: "Wrist rest edge",
    packaging: "Poly bag with header, OPP bag, double blister card, color box",
    moq: "100 pcs for custom print",
    samplePrice: 9.5,
    price: 4.8,
    inventory: 240,
    productionTime: "10-18 days after artwork approval",
    tieredPrices: [
      { label: "100-299 pcs", minQty: 100, maxQty: 299, price: 5.5 },
      { label: "300-999 pcs", minQty: 300, maxQty: 999, price: 4.8 },
      { label: "1000+ pcs", minQty: 1000, price: 4.1 }
    ],
    specs: [
      { label: "Product Type", value: "Mark-free grip, odor-free, full-color customization" },
      { label: "Usage", value: "Office / home / gaming / design" },
      { label: "Dimensions", value: "225x260x25mm" },
      { label: "Surface Material", value: "Silky smooth cloth" },
      { label: "Wrist Fill", value: "PU gel" },
      { label: "Base Material", value: "TPR" },
      { label: "Logo", value: "Silk printing / sublimation" },
      { label: "Packing", value: "Header bag, OPP bag, blister card, color box" }
    ],
    features: [
      "Gel wrist support reduces fatigue",
      "Custom full-color print for logos and patterns",
      "TPR base improves grip without strong odor",
      "Dust and stain resistant treated surface"
    ],
    tags: ["Wrist Rest", "Gel", "Office", "Custom Print"],
    contentSource: "kalpad",
    needsReview: true
  },
  {
    name: "SoftSkin Leather Gel Keyboard Wrist Rest",
    slug: "softskin-leather-gel-keyboard-wrist-rest",
    modelNumber: "KLJ-5085L",
    category: "Wrist Rests",
    subcategory: "Keyboard Wrist Rest",
    salesMode: "BOTH",
    status: "ACTIVE",
    image: productImages.keyboardWristRest[0],
    gallery: productImages.keyboardWristRest,
    summary: "Leather gel keyboard wrist rest with waterproof TPU surface.",
    description:
      "A premium keyboard wrist rest for office, design, programming and gaming use. The waterproof TPU surface and gel filling provide comfortable daily support.",
    material: "Polyurethane leather, PU gel and PU base",
    surfaceMaterial: "Waterproof TPU / polyurethane leather",
    baseMaterial: "PU",
    surfaceTexture: "SoftSkin leather touch",
    shape: "Rectangle",
    color: "Standard and custom color options",
    size: "440x80x20mm",
    thickness: "20mm",
    printingMethod: "Silk printing",
    logoMethod: "Logo print, debossing, label",
    edgeFinish: "Anti-fray fused edge",
    packaging: "OPP packing, drawstring bag, blister packing, box packing, custom pack",
    moq: "100 pcs for custom logo",
    samplePrice: 12,
    price: 5.9,
    inventory: 160,
    productionTime: "10-18 days after artwork approval",
    tieredPrices: [
      { label: "100-299 pcs", minQty: 100, maxQty: 299, price: 6.8 },
      { label: "300-999 pcs", minQty: 300, maxQty: 999, price: 5.9 },
      { label: "1000+ pcs", minQty: 1000, price: 5.1 }
    ],
    specs: [
      { label: "Style", value: "Waterproof, non-slip, ergonomic, easy clean" },
      { label: "Usage", value: "Office, design, programming, gaming, home office" },
      { label: "Dimensions", value: "440x80x20mm" },
      { label: "Surface Material", value: "Polyurethane leather / TPU surface" },
      { label: "Wrist Fill", value: "PU gel" },
      { label: "Base Material", value: "PU" },
      { label: "Edge", value: "Anti-fray fused edge" },
      { label: "Packing", value: "OPP, drawstring bag, blister pack, box pack, custom pack" }
    ],
    features: [
      "Waterproof TPU surface is easy to clean",
      "Gel filling supports long typing sessions",
      "440x80mm size fits most keyboards",
      "Premium leather-touch finish for office programs"
    ],
    tags: ["Keyboard Wrist Rest", "Gel", "Leather", "Office"],
    contentSource: "kalpad",
    needsReview: true
  },
  {
    name: "PU Leather Restaurant Placemat",
    slug: "pu-leather-restaurant-placemat",
    modelNumber: "DSPM-100",
    category: "Placemats",
    subcategory: "Rectangular Placemats",
    salesMode: "BOTH",
    status: "ACTIVE",
    image: "/images/generated/product-placemat-ai.png",
    gallery: ["/images/generated/product-placemat-ai.png", "/images/stitch/placemats.jpg", ...commonGallery],
    summary: "PU leather placemat for restaurants, hotels and private-label programs.",
    description:
      "A clean, easy-care placemat program for professional hospitality buyers. Standard colors can be ordered as samples or stock, while custom size, logo, color, stitching, and packaging are handled through the inquiry workflow.",
    material: "PU leather",
    surfaceMaterial: "Textured synthetic leather",
    baseMaterial: "Non-slip PU backing",
    surfaceTexture: "Fine leather grain",
    shape: "Rectangle",
    color: "Brown, black, gray, custom colors",
    size: "45 x 30 cm",
    thickness: "1.8-2.2 mm",
    printingMethod: "UV printing, screen printing",
    logoMethod: "Embossing, debossing, foil stamping, print",
    edgeFinish: "Cut edge or stitched edge",
    packaging: "Bulk pack or custom sleeve",
    moq: "100 pcs for custom orders",
    samplePrice: 9.9,
    price: 4.8,
    inventory: 360,
    productionTime: "7-15 days after sample approval",
    tieredPrices: [
      { label: "10-49 Pieces", minQty: 10, maxQty: 49, price: 6.2 },
      { label: "50-199 Pieces", minQty: 50, maxQty: 199, price: 5.4 },
      { label: "200-499 Pieces", minQty: 200, maxQty: 499, price: 4.8 },
      { label: "500+ Pieces", minQty: 500, price: 4.2 }
    ],
    tags: ["Restaurant", "Hotel", "Logo", "Stock Sample"],
    contentSource: "manual",
    needsReview: true
  },
  {
    name: "Leather Executive Desk Mat",
    slug: "leather-executive-desk-mat",
    modelNumber: "DSDM-220",
    category: "Desk Mats",
    subcategory: "Leather Desk Mat",
    salesMode: "BOTH",
    status: "ACTIVE",
    image: "/images/kalpad/kalpad-product-5-square.webp",
    gallery: ["/images/kalpad/kalpad-product-5-square.webp", "/images/kalpad/kalpad-product-6-square.webp", ...commonGallery],
    summary: "Leather desk mat for corporate gifts and office branding.",
    description:
      "Designed for office buyers who need a refined writing and mouse surface with custom logo and packaging options. Samples and standard colors can be purchased directly; custom programs remain quote-based.",
    material: "PU leather or recycled leather",
    surfaceMaterial: "Smooth leather-touch surface",
    baseMaterial: "Suede-like or rubber backing",
    surfaceTexture: "Smooth / fine grain",
    shape: "Rectangle",
    color: "Black, brown, navy, gray, custom Pantone match",
    size: "80 x 40 cm",
    thickness: "2.0-3.0 mm",
    printingMethod: "Digital print, UV print, screen print",
    logoMethod: "Embossing, debossing, foil stamping",
    edgeFinish: "Stitched or clean cut",
    packaging: "Gift box, kraft box, bulk pack",
    moq: "100 pcs for logo customization",
    samplePrice: 18,
    price: 12.5,
    inventory: 180,
    productionTime: "10-20 days after artwork approval",
    tieredPrices: [
      { label: "10-49 Pieces", minQty: 10, maxQty: 49, price: 15.5 },
      { label: "50-199 Pieces", minQty: 50, maxQty: 199, price: 13.6 },
      { label: "200-499 Pieces", minQty: 200, maxQty: 499, price: 12.5 },
      { label: "500+ Pieces", minQty: 500, price: 10.8 }
    ],
    tags: ["Corporate Gift", "Office", "Leather", "Logo"],
    contentSource: "manual",
    needsReview: true
  },
  {
    name: "Rubber Backed Composite Desk Mat",
    slug: "rubber-backed-composite-desk-mat",
    modelNumber: "DSRB-360",
    category: "Desk Mats",
    subcategory: "Desk Pad Set",
    salesMode: "QUOTE_ONLY",
    status: "ACTIVE",
    image: "/images/kalpad/kalpad-product-6-square.webp",
    gallery: ["/images/kalpad/kalpad-product-6-square.webp", "/images/kalpad/kalpad-product-4-square.webp", ...commonGallery],
    summary: "Rubber-backed desk mat for anti-slip custom programs.",
    description:
      "A project-based desk mat for buyers who need material selection, custom dimensions, printed artwork, rubber backing, and packing requirements confirmed before production.",
    material: "PU leather, fabric, rubber composite",
    surfaceMaterial: "PU leather or fabric surface",
    baseMaterial: "Natural rubber / SBR rubber",
    surfaceTexture: "Leather grain or cloth texture",
    shape: "Custom rectangle or die-cut shape",
    color: "Custom",
    size: "Custom size",
    thickness: "2.5-5.0 mm",
    printingMethod: "Sublimation, UV, screen printing",
    logoMethod: "Printed logo, embossed logo",
    edgeFinish: "Stitched edge or die-cut edge",
    packaging: "Rolled pack, sleeve, box, custom carton",
    moq: "300 pcs depending on construction",
    samplePrice: 25,
    inventory: 0,
    productionTime: "15-30 days after sample approval",
    tieredPrices: [
      { label: "200-499 Pieces", minQty: 200, maxQty: 499, price: 9.8 },
      { label: "500+ Pieces", minQty: 500, price: 7.9 }
    ],
    tags: ["Rubber Backing", "OEM", "Custom Print"],
    contentSource: "manual",
    needsReview: true
  },
  {
    name: "Printed Rubber Mouse Pad",
    slug: "printed-rubber-mouse-pad",
    modelNumber: "DSMP-510",
    category: "Flat Mouse Pads",
    subcategory: "Rubber Mouse Pad",
    salesMode: "BOTH",
    status: "ACTIVE",
    image: "/images/kalpad/kalpad-product-3-square.webp",
    gallery: ["/images/kalpad/kalpad-product-3-square.webp", "/images/kalpad/kalpad-product-2-square.webp", ...commonGallery],
    summary: "Printed rubber mouse pad for promotion and office sourcing.",
    description:
      "A flexible sample and inquiry product. Standard samples can be ordered quickly, while custom artwork, shape, packaging, and wholesale volume need inquiry confirmation.",
    material: "Polyester fabric + rubber",
    surfaceMaterial: "Polyester fabric",
    baseMaterial: "Natural rubber",
    surfaceTexture: "Low-friction cloth",
    shape: "Rectangle, round, custom die cut",
    color: "Full color print",
    size: "22 x 18 cm or custom",
    thickness: "2-5 mm",
    printingMethod: "Sublimation, heat transfer, screen printing",
    logoMethod: "Full surface print",
    edgeFinish: "Cut edge or stitched edge",
    packaging: "OPP bag, paper card, custom retail pack",
    moq: "100 pcs",
    samplePrice: 6.5,
    price: 2.8,
    inventory: 520,
    productionTime: "7-18 days depending on artwork",
    tieredPrices: [
      { label: "10-49 Pieces", minQty: 10, maxQty: 49, price: 3.9 },
      { label: "50-199 Pieces", minQty: 50, maxQty: 199, price: 3.2 },
      { label: "200-499 Pieces", minQty: 200, maxQty: 499, price: 2.8 },
      { label: "500+ Pieces", minQty: 500, price: 2.3 }
    ],
    tags: ["Mouse Pad", "Promotion", "Custom Print"],
    contentSource: "manual",
    needsReview: true
  },
  {
    name: "Leather Coaster Set",
    slug: "leather-coaster-set",
    modelNumber: "DSCS-410",
    category: "Coasters",
    subcategory: "Coaster Sets",
    salesMode: "DIRECT_PURCHASE",
    status: "ACTIVE",
    image: "/images/stitch/coasters.jpg",
    gallery: ["/images/stitch/coasters.jpg", "/images/generated/product-ready-stock-ai.png", ...commonGallery],
    summary: "Ready-to-ship coaster sets for sampling, gifting, hospitality trials, and quick stock orders.",
    description:
      "A stock-oriented small item designed for sample orders and ready-to-ship programs. Custom logo and packaging can be handled through the inquiry workflow.",
    material: "PU leather",
    surfaceMaterial: "Leather-touch PU",
    baseMaterial: "PU backing",
    surfaceTexture: "Fine grain",
    shape: "Round or square",
    color: "Brown, black, gray",
    size: "10 x 10 cm",
    thickness: "2 mm",
    printingMethod: "UV print",
    logoMethod: "Embossing, print",
    edgeFinish: "Cut edge",
    packaging: "4 pcs / set",
    moq: "10 sets for stock",
    samplePrice: 4.9,
    price: 3.8,
    inventory: 860,
    productionTime: "Ready stock or 7-12 days for logo",
    tieredPrices: [
      { label: "10-49 Pieces", minQty: 10, maxQty: 49, price: 4.2 },
      { label: "50-199 Pieces", minQty: 50, maxQty: 199, price: 3.8 },
      { label: "200-499 Pieces", minQty: 200, maxQty: 499, price: 3.3 },
      { label: "500+ Pieces", minQty: 500, price: 2.8 }
    ],
    tags: ["Stock", "Coaster", "Hospitality"],
    contentSource: "manual",
    needsReview: true
  },
  {
    name: "Custom Mahjong Game Mat",
    slug: "custom-mahjong-game-mat",
    modelNumber: "DSGM-720",
    category: "Game Mats",
    subcategory: "Mahjong Mats",
    salesMode: "QUOTE_ONLY",
    status: "ACTIVE",
    image: "/images/stitch/game-mat.jpg",
    gallery: ["/images/stitch/game-mat.jpg", "/images/generated/product-game-mat-ai.png", ...commonGallery],
    summary: "Custom game table surface for mahjong, chess, card games, club events, and entertainment brands.",
    description:
      "A project-based custom mat requiring confirmation of table size, surface material, backing, print artwork, storage method, and packaging before inquiry review.",
    material: "Fabric, PU, rubber composite",
    surfaceMaterial: "Cloth, PU leather, or printed textile",
    baseMaterial: "Rubber or foam backing",
    surfaceTexture: "Game-friendly low-friction surface",
    shape: "Square, rectangle, custom",
    color: "Custom artwork",
    size: "Custom",
    thickness: "2-6 mm",
    printingMethod: "Sublimation, UV, screen printing",
    logoMethod: "Printed logo or woven label",
    edgeFinish: "Stitched or cut edge",
    packaging: "Roll tube, carton, carry bag",
    moq: "100 pcs depending on size",
    samplePrice: 22,
    inventory: 0,
    productionTime: "15-25 days after sample approval",
    tieredPrices: [
      { label: "100-199 Pieces", minQty: 100, maxQty: 199, price: 16.5 },
      { label: "200-499 Pieces", minQty: 200, maxQty: 499, price: 14.2 },
      { label: "500+ Pieces", minQty: 500, price: 11.8 }
    ],
    tags: ["Mahjong", "Game Mat", "Custom"],
    contentSource: "manual",
    needsReview: true
  }
];

export const products: Product[] = [...kalpadProducts, ...manualProducts];

export const articles: Article[] = [
  {
    title: "How to Choose the Right Surface for Custom Mouse Pads",
    slug: "choose-custom-mouse-pad-surface",
    category: "Material Guide",
    image: "/images/stitch/knowledge-1.jpg",
    excerpt: "A sourcing guide for comparing cloth, rubber, leather, cork, and composite mouse pad surfaces.",
    body:
      "Professional buyers should compare surface friction, printing method, backing stability, edge finish, and packaging before confirming a mouse pad program.",
    needsReview: true
  },
  {
    title: "PU Leather Placemats for Restaurants and Hotels",
    slug: "pu-leather-placemats-restaurants-hotels",
    category: "Hospitality",
    image: "/images/stitch/knowledge-2.jpg",
    excerpt: "What hospitality buyers should confirm before ordering leather placemats in bulk.",
    body:
      "The main factors are material thickness, color consistency, edge finish, cleaning performance, logo method, and carton packing.",
    needsReview: true
  },
  {
    title: "OEM Desk Mat Production Flow",
    slug: "oem-desk-mat-production-flow",
    category: "OEM/ODM",
    image: "/images/stitch/knowledge-3.jpg",
    excerpt: "From artwork review to mass production, understand the typical desk mat development path.",
    body:
      "A reliable OEM process includes requirement confirmation, artwork review, material selection, sampling, inspection, packing, and shipment.",
    needsReview: true
  }
];

export const faqs = [
  {
    question: "Can I buy samples before a bulk order?",
    answer:
      "Yes. Standard products and selected ready-stock items can support sample purchase. Custom samples can also be arranged after artwork and material confirmation."
  },
  {
    question: "What is the normal MOQ for custom products?",
    answer:
      "Many custom mat projects start from 100 pieces, but MOQ depends on material, size, printing method, packaging, and production process."
  },
  {
    question: "Can DIANSHANGMATS support logo and packaging customization?",
    answer:
      "Yes. We support logo printing, embossing, debossing, foil stamping, labels, retail boxes, shipping marks, and barcode requirements."
  },
  {
    question: "Why do some products show price while others request a quote?",
    answer:
      "Standard, sample, and stock items can show direct purchase cost details. Custom printing, special sizes, special packaging, and large wholesale orders need inquiry confirmation."
  }
];

export const processSteps = [
  "Submit Requirements",
  "Product Recommendation",
  "inquiry confirmation",
  "Artwork Review",
  "Material Selection",
  "Sample Production",
  "Sample Approval",
  "Mass Production",
  "Quality Inspection",
  "Packing and Shipping"
];

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getCategory(slug: string) {
  return categories.find((category) => category.slug === slug);
}

export function getProductsByCategory(slug: string) {
  const category = getCategory(slug);
  if (!category) return [];
  return products.filter((product) => product.category === category.name);
}

export function getActiveProductsByCategory(slug: string) {
  return getProductsByCategory(slug).filter((product) => product.status === "ACTIVE");
}

export function getSubcategoriesForCategory(slug: string) {
  const category = getCategory(slug);
  if (!category) return [];
  return [
    ...new Set([
      ...category.children,
      ...products.filter((product) => product.category === category.name).map((product) => product.subcategory)
    ])
  ].filter(Boolean);
}

export function getVisibleSubcategoriesForCategory(slug: string) {
  const categoryProducts = getActiveProductsByCategory(slug);
  const counts = new Map<string, number>();
  categoryProducts.forEach((product) => {
    counts.set(product.subcategory, (counts.get(product.subcategory) || 0) + 1);
  });

  return getSubcategoriesForCategory(slug)
    .map((name) => ({ name, count: counts.get(name) || 0 }))
    .filter((subcategory) => subcategory.count > 0);
}

