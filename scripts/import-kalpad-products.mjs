import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const ROOT = process.cwd();
const SITEMAP_URL = "https://www.kalpad.com/product-sitemap.xml";
const IMAGE_DIR = path.join(ROOT, "public", "images", "kalpad", "catalog");
const TMP_DIR = path.join(IMAGE_DIR, ".tmp");
const OUTPUT_FILE = path.join(ROOT, "lib", "kalpad-products.ts");
const REPORT_FILE = path.join(ROOT, "docs", "kalpad-import-report.json");
const PRODUCT_LIMIT = Number(process.env.KALPAD_LIMIT || 0);
const IMAGES_PER_PRODUCT = Number(process.env.KALPAD_IMAGES || 5);
const FFMPEG =
  process.env.FFMPEG ||
  "C:/Users/Administrator/Documents/Codex/2026-05-31/ffmpeg-ffmpeg-version-ffprobe-version-windows/tools/ffmpeg/ffmpeg-8.1.1-essentials_build/bin/ffmpeg.exe";

function escapeTs(value) {
  return JSON.stringify(value ?? "");
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/https?:\/\//g, "")
    .replace(/\.html$/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 110);
}

function urlSlug(url) {
  return slugify(new URL(url).pathname.split("/").pop().replace(/\.html$/, ""));
}

function preferredSlug(url, title) {
  const rawSlug = urlSlug(url);
  if (/^\d+$/.test(rawSlug) || /^pro\d*$/.test(rawSlug) || rawSlug.startsWith("kal-")) {
    return slugify(title);
  }
  return rawSlug;
}

function normalizeText(value) {
  return String(value || "")
    .replace(/Kal Pads/gi, "DIANSHANGMATS")
    .replace(/\bKAL\b/g, "DIANSHANGMATS")
    .replace(/Guangzhou Kal Plastics Manufacturing Co\., Ltd\./gi, "Guangzhou DIANSHANG Rubber Products Co., Ltd.")
    .replace(/KAL, your trusted manufacturer/gi, "DIANSHANGMATS, your trusted manufacturer")
    .replace(/鈥[^\w\s]?/g, " - ")
    .replace(/â€\u0094|â€”/g, " - ")
    .replace(/â€\u0093|â€“/g, "-")
    .replace(/[\u2013\u2014]/g, " - ")
    .replace(/ï»¿/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#34;/g, "\"")
    .replace(/&#39;/g, "'")
    .replace(/×/g, "x")
    .replace(/\u00d7/g, "x")
    .replace(/\s+/g, " ")
    .trim();
}

function stripHtml(html) {
  return normalizeText(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " ")
  );
}

function extractJsonLd(html) {
  const block = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/i)?.[1];
  if (!block) return [];
  try {
    const parsed = JSON.parse(block);
    return Array.isArray(parsed) ? parsed : [parsed];
  } catch {
    return [];
  }
}

function getTitle(html, url) {
  const rawTitle = html.match(/<title>\s*([\s\S]*?)\s*<\/title>/i)?.[1] || slugify(url);
  return normalizeText(rawTitle.replace(/\s*\|\s*Kal Pads\s*$/i, ""));
}

function getBreadcrumbs(jsonLd) {
  const breadcrumb = jsonLd.find((item) => item?.["@type"] === "BreadcrumbList");
  return (breadcrumb?.itemListElement || []).map((item) => normalizeText(item.name)).filter(Boolean);
}

function getImageUrls(jsonLd) {
  return [
    ...new Set(
      jsonLd
        .filter((item) => item?.["@type"] === "ImageObject")
        .map((item) => item.contentUrl)
        .filter((src) => /^https:\/\/img\.yfisher\.com\//.test(src || ""))
        .filter((src) => !/logo|favicon|\.ico/i.test(src))
    )
  ].slice(0, IMAGES_PER_PRODUCT);
}

function cleanSpecValue(value) {
  return normalizeText(value)
    .replace(/Product Features[\s\S]*$/i, "")
    .replace(/Product Application[\s\S]*$/i, "")
    .trim();
}

function findBetween(text, startLabels, endLabels) {
  const lower = text.toLowerCase();
  let startIndex = -1;
  let startLabel = "";
  for (const label of startLabels) {
    const index = lower.indexOf(label.toLowerCase());
    if (index >= 0 && (startIndex < 0 || index < startIndex)) {
      startIndex = index;
      startLabel = label;
    }
  }
  if (startIndex < 0) return "";
  const valueStart = startIndex + startLabel.length;
  let endIndex = text.length;
  for (const label of endLabels) {
    const index = lower.indexOf(label.toLowerCase(), valueStart);
    if (index >= 0 && index < endIndex) endIndex = index;
  }
  return cleanSpecValue(text.slice(valueStart, endIndex));
}

const specLabelMap = [
  ["Product Name", ["Product Name"], ["Model Number", "Style", "Product Type", "Wireless Charging", "Shape", "Usage", "Status"]],
  ["Model Number", ["Model Number"], ["Product Type", "Style", "Usage", "Physical Specifications", "Dimensions"]],
  ["Style", ["Style"], ["Wireless Charging", "Shape", "Usage", "Status", "Physical Specifications"]],
  ["Product Type", ["Product Type"], ["Physical Specifications", "Dimensions", "Weight", "Materials"]],
  ["Usage", ["Usage"], ["Status", "Physical Specifications", "Graphic design", "Extended gaming", "Programming", "Home office"]],
  ["Dimensions", ["Dimensions (LxWxH)", "Dimensions"], ["Weight", "Height", "Logo", "Edge", "Materials"]],
  ["Thickness", ["Height:", "Height", "Thickness"], ["Other Customized", "Logo", "Edge", "Materials", "Surface Material"]],
  ["Logo", ["Logo"], ["Edge", "Materials", "Surface Material", "Base Material"]],
  ["Edge", ["Edge"], ["Materials", "Glide Control", "Surface Material", "Base Material"]],
  ["Surface Material", ["Surface Material"], ["Wrist Filled", "Base Material", "Patterns", "Compatibility", "Certifications"]],
  ["Wrist Filled", ["Wrist Filled"], ["Base Material", "Compatibility", "Certifications"]],
  ["Base Material", ["Base Material"], ["Patterns", "Compatibility", "Certifications", "Safety Standards"]],
  ["Patterns", ["Patterns"], ["Softness", "Certifications", "Safety Standards"]],
  ["Softness", ["Softness"], ["Certifications", "Safety Standards", "Package Contents"]],
  ["Certifications", ["Safety Standards", "Certifications"], ["Package Contents", "Packing", "Included Items"]],
  ["Packing", ["Packing"], ["Included Items", "Product Features", "Product Application"]],
  ["Included Items", ["Included Items"], ["Product Features", "Product Application"]]
];

function extractSpecSection(text) {
  const start = text.indexOf("Product technical specifications");
  if (start < 0) return "";
  let end = text.indexOf("Our Project Showcase", start);
  if (end < 0) end = text.indexOf("{{scoreAvg}}", start);
  if (end < 0) end = text.length;
  return text.slice(start, end);
}

function extractTableSpecs(html) {
  const specIndex = html.indexOf("Product technical specifications");
  if (specIndex < 0) return [];
  const section = html.slice(specIndex, specIndex + 90000);
  const rows = [...section.matchAll(/<tr[\s\S]*?<\/tr>/gi)].map((match) => match[0]);
  const specs = [];
  for (const row of rows) {
    const cells = [...row.matchAll(/<td[\s\S]*?<\/td>/gi)].map((match) => stripHtml(match[0]));
    if (cells.length !== 2) continue;
    const [label, value] = cells.map((cell) => normalizeText(cell));
    if (!label || !value || value.length > 700 || /^N\/A$/i.test(value)) continue;
    if (/basic information|physical specifications|materials|certifications|package contents/i.test(label)) continue;
    specs.push({ label: label.replace(/\s+/g, " "), value });
  }
  return specs;
}

function extractTextSpecs(text) {
  const section = extractSpecSection(text);
  const specs = [];
  for (const [label, starts, ends] of specLabelMap) {
    const value = findBetween(section, starts, ends);
    if (value && value.length < 700 && !/^N\/A$/i.test(value)) specs.push({ label, value });
  }
  return specs;
}

function extractSpecs(html, text) {
  const specs = extractTableSpecs(html);
  if (!specs.length) specs.push(...extractTextSpecs(text));
  const seen = new Set();
  return specs.filter((spec) => {
    const key = `${spec.label}:${spec.value}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function extractFeatures(text) {
  const start = text.indexOf("Product Features");
  if (start < 0) return [];
  let end = text.indexOf("Product Application", start);
  if (end < 0) end = text.indexOf("Our Project Showcase", start);
  if (end < 0) end = Math.min(text.length, start + 1200);
  const chunk = normalizeText(text.slice(start + "Product Features".length, end));
  const markers = [
    "Personalization Ready",
    "Smooth Leather Surface",
    "Secure Non-Slip Rubber Base",
    "Slim & Lightweight Design",
    "Easy to Clean & Maintain",
    "Custom Pattern Printing",
    "Premium Leather Desk Mat",
    "Ergonomic Memory Foam Mouse Pad",
    "Memory Foam Keyboard Wrist Rest",
    "Complete Workspace Solution",
    "Complete Workspace Protection",
    "Natural Cork Desk Mat",
    "Keyboard Wrist Rest",
    "Eco-Friendly Materials",
    "Waterproof TPU Surface",
    "Universal Keyboard Fit",
    "Advanced Gel Filling",
    "Secure PU Base",
    "Optimized 20mm Height",
    "Premium SoftSkin Leather",
    "Full-Color Custom Printing",
    "Gel-Filled Wrist Support",
    "Contoured Oval Ergonomic Design",
    "TPR Non-Slip Base",
    "Dust & Stain Resistant Surface"
  ];
  const found = markers.filter((marker) => chunk.includes(marker));
  if (found.length) return found.slice(0, 6);
  return chunk
    .split(/(?<=[.!?])\s+/)
    .map((item) => item.trim())
    .filter((item) => item.length > 25 && item.length < 180)
    .slice(0, 4);
}

function inferCategory(breadcrumbs, title) {
  const crumbText = breadcrumbs.join(" ").toLowerCase();
  const titleText = title.toLowerCase();
  if (crumbText.includes("gaming mouse pad")) return "Gaming Mouse Pads";
  if (crumbText.includes("wrist rest")) return "Wrist Rests";
  if (crumbText.includes("desk mat") || crumbText.includes("desk pad")) return "Desk Mats";
  if (crumbText.includes("office mouse pad")) return "Office Mouse Pads";
  if (crumbText.includes("flat mouse pad")) return "Flat Mouse Pads";
  const text = `${crumbText} ${titleText}`;
  if (text.includes("gaming mouse pad") || text.includes("esports")) return "Gaming Mouse Pads";
  if (text.includes("wrist rest") || text.includes("keyboard pad")) return "Wrist Rests";
  if (text.includes("desk mat") || text.includes("desk pad")) return "Desk Mats";
  if (text.includes("mouse pad")) {
    if (text.includes("wrist") || text.includes("gel") || text.includes("ergonomic")) return "Office Mouse Pads";
    return "Flat Mouse Pads";
  }
  if (text.includes("coaster")) return "Coasters";
  if (text.includes("placemat")) return "Placemats";
  if (text.includes("mahjong") || text.includes("game mat")) return "Game Mats";
  return "Flat Mouse Pads";
}

function inferSubcategory(breadcrumbs, category, title) {
  const last = breadcrumbs.slice(2, -1).reverse().find((item) => item && item !== "Product");
  if (last) return normalizeText(last).replace(/\bMouse Pad$/i, "Mouse Pad");
  const text = title.toLowerCase();
  if (category === "Gaming Mouse Pads") return text.includes("rgb") ? "RGB Gaming Mouse Pad" : "Rubber Gaming Mouse Pad";
  if (category === "Desk Mats") return text.includes("cork") ? "Cork Desk Mat" : text.includes("leather") ? "Leather Desk Mat" : "Desk Pad Set";
  if (category === "Wrist Rests") return text.includes("keyboard") ? "Keyboard Wrist Rest" : "Mouse Wrist Rest";
  if (category === "Office Mouse Pads") return text.includes("gel") ? "Gel Mouse Pad" : "Wrist Rest Mouse Pad";
  return category.replace(/s$/, "");
}

function getSpec(specs, labels, fallback = "") {
  const normalized = labels.map((label) => label.toLowerCase());
  return (
    specs.find((spec) => {
      const label = spec.label.toLowerCase();
      return normalized.some((target) => label === target || label.includes(target) || target.includes(label));
    })?.value || fallback
  );
}

function summaryFrom(title, category, subcategory) {
  return normalizeText(`${subcategory} for ${category.toLowerCase()} programs with custom logo, size and packaging quotation support.`).slice(0, 180);
}

function makeProduct({ url, html, localImages, slug }) {
  const jsonLd = extractJsonLd(html);
  const title = getTitle(html, url);
  const breadcrumbs = getBreadcrumbs(jsonLd);
  const text = stripHtml(html);
  const specs = extractSpecs(html, text);
  const features = extractFeatures(text);
  const category = inferCategory(breadcrumbs, title);
  const subcategory = inferSubcategory(breadcrumbs, category, title);
  const modelNumber = getSpec(specs, ["Model Number"], title.match(/\b(KL[A-Z0-9-]{2,}|DS[A-Z0-9-]{2,})\b/i)?.[1] || `DS-${slug.slice(0, 8).toUpperCase()}`);
  const material = [getSpec(specs, ["Surface Material"]), getSpec(specs, ["Base Material"])]
    .filter(Boolean)
    .join(" + ") || getSpec(specs, ["Product Type"], "Custom material");
  const size = getSpec(specs, ["Dimensions", "Dimensions (LxWxH)", "Size"], "Custom size available");
  const thickness = getSpec(specs, ["Thickness", "Height", "Wrist Rest Thickness"], "Custom thickness available");
  const packing = getSpec(specs, ["Packing"], "OPP packing, box packing, or custom packing");
  const logo = getSpec(specs, ["Logo"], "Logo printing, sublimation, embossing, or custom label");
  const edge = getSpec(specs, ["Edge"], "Cut edge or stitched edge");

  return {
    name: title,
    slug,
    modelNumber,
    category,
    subcategory,
    salesMode: "QUOTE_ONLY",
    status: "ACTIVE",
    image: localImages[0] || "/images/kalpad/kalpad-product-1-square.webp",
    gallery: localImages,
    summary: summaryFrom(title, category, subcategory),
    description: normalizeText(`${title} is organized for B2B inquiry. Buyers can confirm material, size, logo, edge finish, packaging and production details through the quote workflow.`),
    material,
    surfaceMaterial: getSpec(specs, ["Surface Material"], "Custom surface material"),
    baseMaterial: getSpec(specs, ["Base Material"], "Custom base material"),
    surfaceTexture: getSpec(specs, ["Style", "Product Type"], "Custom surface texture"),
    shape: getSpec(specs, ["Shape"], "Rectangle or custom shape"),
    color: "Stock colors or custom artwork",
    size,
    thickness,
    printingMethod: logo,
    logoMethod: logo,
    edgeFinish: edge,
    packaging: packing,
    moq: "100 pcs+ depending on product and customization",
    inventory: 0,
    productionTime: "To be confirmed by quotation",
    tieredPrices: [],
    specs,
    features,
    tags: [...new Set([category, subcategory, ...features.slice(0, 3)])].slice(0, 8),
    contentSource: "kalpad",
    needsReview: true
  };
}

async function fetchText(url, retries = 2) {
  for (let attempt = 0; attempt <= retries; attempt += 1) {
    try {
      const response = await fetch(url, { headers: { "user-agent": "DIANSHANGMATS product import" } });
      if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
      return await response.text();
    } catch (error) {
      if (attempt === retries) throw error;
      await new Promise((resolve) => setTimeout(resolve, 800 + attempt * 800));
    }
  }
}

async function fetchBuffer(url, retries = 2) {
  for (let attempt = 0; attempt <= retries; attempt += 1) {
    try {
      const response = await fetch(url, { headers: { "user-agent": "DIANSHANGMATS image import" } });
      if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
      return Buffer.from(await response.arrayBuffer());
    } catch (error) {
      if (attempt === retries) throw error;
      await new Promise((resolve) => setTimeout(resolve, 800 + attempt * 800));
    }
  }
}

async function convertImage(rawPath, outPath) {
  const args = [
    "-y",
    "-hide_banner",
    "-loglevel",
    "error",
    "-i",
    rawPath,
    "-vf",
    "scale='if(gt(iw,ih),-2,1000)':'if(gt(iw,ih),1000,-2)',crop='min(iw,ih)':'min(iw,ih)',scale=900:900",
    "-quality",
    "82",
    outPath
  ];
  const result = spawnSync(FFMPEG, args, { stdio: "pipe" });
  if (result.status !== 0) {
    throw new Error(result.stderr?.toString() || `ffmpeg failed for ${rawPath}`);
  }
}

async function downloadProductImages(slug, imageUrls) {
  const localImages = [];
  for (let index = 0; index < imageUrls.length; index += 1) {
    const imageUrl = imageUrls[index];
    const ext = imageUrl.match(/\.(jpg|jpeg|png|webp|gif)(?:\?|$)/i)?.[1]?.toLowerCase().replace("jpeg", "jpg") || "jpg";
    const rawPath = path.join(TMP_DIR, `${slug}-${index + 1}.${ext}`);
    const outFile = `${slug}-${index + 1}-square.webp`;
    const outPath = path.join(IMAGE_DIR, outFile);
    const publicPath = `/images/kalpad/catalog/${outFile}`;
    if (!existsSync(outPath)) {
      const buffer = await fetchBuffer(imageUrl);
      await writeFile(rawPath, buffer);
      await convertImage(rawPath, outPath);
      await rm(rawPath, { force: true });
    }
    localImages.push(publicPath);
  }
  return localImages;
}

function productToTs(product) {
  const lines = [
    "  {",
    `    name: ${escapeTs(product.name)},`,
    `    slug: ${escapeTs(product.slug)},`,
    `    modelNumber: ${escapeTs(product.modelNumber)},`,
    `    category: ${escapeTs(product.category)},`,
    `    subcategory: ${escapeTs(product.subcategory)},`,
    `    salesMode: "QUOTE_ONLY",`,
    `    status: "ACTIVE",`,
    `    image: ${escapeTs(product.image)},`,
    `    gallery: ${JSON.stringify(product.gallery)},`,
    `    summary: ${escapeTs(product.summary)},`,
    `    description: ${escapeTs(product.description)},`,
    `    material: ${escapeTs(product.material)},`,
    `    surfaceMaterial: ${escapeTs(product.surfaceMaterial)},`,
    `    baseMaterial: ${escapeTs(product.baseMaterial)},`,
    `    surfaceTexture: ${escapeTs(product.surfaceTexture)},`,
    `    shape: ${escapeTs(product.shape)},`,
    `    color: ${escapeTs(product.color)},`,
    `    size: ${escapeTs(product.size)},`,
    `    thickness: ${escapeTs(product.thickness)},`,
    `    printingMethod: ${escapeTs(product.printingMethod)},`,
    `    logoMethod: ${escapeTs(product.logoMethod)},`,
    `    edgeFinish: ${escapeTs(product.edgeFinish)},`,
    `    packaging: ${escapeTs(product.packaging)},`,
    `    moq: ${escapeTs(product.moq)},`,
    `    inventory: 0,`,
    `    productionTime: ${escapeTs(product.productionTime)},`,
    `    tieredPrices: [],`,
    `    specs: ${JSON.stringify(product.specs, null, 6).replace(/\n/g, "\n    ")},`,
    `    features: ${JSON.stringify(product.features)},`,
    `    tags: ${JSON.stringify(product.tags)},`,
    `    contentSource: "kalpad",`,
    `    needsReview: true`,
    "  }"
  ];
  return lines.join("\n");
}

async function main() {
  await mkdir(IMAGE_DIR, { recursive: true });
  await mkdir(TMP_DIR, { recursive: true });
  await mkdir(path.dirname(REPORT_FILE), { recursive: true });

  const sitemap = await fetchText(SITEMAP_URL);
  let urls = [...new Set([...sitemap.matchAll(/https:\/\/www\.kalpad\.com\/[^<]+\.html/g)].map((match) => match[0]))];
  if (PRODUCT_LIMIT > 0) urls = urls.slice(0, PRODUCT_LIMIT);

  const products = [];
  const failures = [];
  for (let index = 0; index < urls.length; index += 1) {
    const url = urls[index];
    try {
      const html = await fetchText(url);
      const title = getTitle(html, url);
      const slug = preferredSlug(url, title);
      const jsonLd = extractJsonLd(html);
      const images = getImageUrls(jsonLd);
      const localImages = await downloadProductImages(slug, images);
      const product = makeProduct({ url, html, localImages, slug });
      products.push(product);
      console.log(`${index + 1}/${urls.length} OK ${product.slug} images=${localImages.length}`);
    } catch (error) {
      failures.push({ url, error: String(error?.message || error) });
      console.warn(`${index + 1}/${urls.length} FAIL ${url} ${String(error?.message || error)}`);
    }
  }

  const seen = new Set();
  const uniqueProducts = products.filter((product) => {
    if (seen.has(product.slug)) return false;
    seen.add(product.slug);
    return true;
  });

  const output = [
    `import type { Product } from "./site-data";`,
    "",
    "// Auto-generated by scripts/import-kalpad-products.mjs.",
    "// Source brand/company/contact fields are replaced for DIANSHANGMATS.",
    `export const kalpadProducts: Product[] = [`,
    uniqueProducts.map(productToTs).join(",\n"),
    "];",
    ""
  ].join("\n");
  await writeFile(OUTPUT_FILE, output, "utf8");
  await writeFile(
    REPORT_FILE,
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        sitemap: SITEMAP_URL,
        requested: urls.length,
        imported: uniqueProducts.length,
        failures
      },
      null,
      2
    ),
    "utf8"
  );
  await rm(TMP_DIR, { recursive: true, force: true });
  console.log(`Imported ${uniqueProducts.length}/${urls.length} products. Failures: ${failures.length}`);
  console.log(`Output: ${OUTPUT_FILE}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
