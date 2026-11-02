const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");

function html(path) {
  return fs.readFileSync(`.next/server/app/${path}.html`, "utf8");
}

test("home and quote page have one heading and no local-test disclaimer", () => {
  for (const path of ["index", "request-quote"]) {
    const content = html(path);
    assert.equal((content.match(/<h1\b/g) || []).length, 1);
    assert.doesNotMatch(content, /The local version stores/);
  }
});

test("unreviewed article has noindex and no developer placeholder", () => {
  const content = html("knowledge/pu-leather-placemats-restaurants-hotels");
  assert.match(content, /<meta name="robots" content="noindex/);
  assert.doesNotMatch(content, /This article is seeded as review content/);
  const sitemap = fs.readFileSync(".next/server/app/sitemap.xml.body", "utf8");
  assert.ok(sitemap.includes("<loc>https://dianshangmats.com/knowledge</loc>"));
  assert.ok(!sitemap.includes("/knowledge/pu-leather-placemats-restaurants-hotels"));
});

test("desk mat output excludes conflicting wrist data and has honest Product JSON-LD", () => {
  const content = html("products/office-esports-high-end-desk-mat");
  assert.doesNotMatch(content, /20 mm gel cushion|Wrist Rest Thickness/);
  assert.doesNotMatch(content, />Product Type<[^]*?>Gel Wrist Support</);
  const blocks = Array.from(content.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g));
  const product = blocks.map((item) => JSON.parse(item[1])).find((item) => item["@type"] === "Product");
  assert.ok(product);
  assert.equal(product.sku, "KLP-002");
  assert.equal(product.name, "Office & Esports High-End Desk Mat");
  assert.ok(product.image.every((image) => image.startsWith("https://dianshangmats.com/")));
  assert.equal(product.offers, undefined);
  assert.equal(product.aggregateRating, undefined);
});
