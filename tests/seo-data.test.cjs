const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const ts = require("typescript");

function loadTs(file, dependencies = {}) {
  const source = fs.readFileSync(file, "utf8");
  const output = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  const context = { exports: {}, require: (name) => {
    if (!(name in dependencies)) throw new Error(`Unexpected dependency: ${name}`);
    return dependencies[name];
  } };
  vm.runInNewContext(output, context, { filename: file });
  return context.exports;
}

test("desk mat fixes remove conflicting wrist data without changing original imports", () => {
  const imported = loadTs("lib/kalpad-products.ts");
  const { products } = loadTs("lib/site-data.ts", { "./kalpad-products": imported });
  for (const model of ["KLP-001", "KLP-002"]) {
    const source = imported.kalpadProducts.find((product) => product.modelNumber === model);
    const product = products.find((item) => item.modelNumber === model);
    assert.equal(source.thickness, "20 mm gel cushion");
    assert.equal(product.thickness, "To be confirmed");
    assert.equal(product.surfaceTexture, "To be confirmed");
    assert.ok(!product.specs.some(({ label }) => /wrist rest thickness|product type/i.test(label)));
    assert.equal(product.status, source.status);
    assert.equal(product.slug, source.slug);
  }
  const felt = products.find((product) => product.modelNumber === "KLP-001");
  assert.equal(felt.material, "To be confirmed");
  assert.equal(felt.surfaceMaterial, "To be confirmed");
  assert.equal(felt.baseMaterial, "To be confirmed");
  const wrist = products.find((product) => product.modelNumber === "KLHX-028");
  const sourceWrist = imported.kalpadProducts.find((product) => product.modelNumber === "KLHX-028");
  assert.equal(wrist.surfaceTexture, sourceWrist.surfaceTexture);
});

test("draft articles stay out of sitemap until reviewed", () => {
  const imported = loadTs("lib/kalpad-products.ts");
  const data = loadTs("lib/site-data.ts", { "./kalpad-products": imported });
  const sitemap = loadTs("app/sitemap.ts", { "@/lib/site-data": data }).default();
  for (const article of data.articles) {
    assert.equal(sitemap.some(({ url }) => url.endsWith(`/knowledge/${article.slug}`)), !article.needsReview);
  }
  assert.ok(sitemap.some(({ url }) => url.endsWith("/knowledge")));
});
