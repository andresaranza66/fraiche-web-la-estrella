import fs from "node:fs/promises";

process.stdout.on("error", (err) => {
  if (err && err.code === "EPIPE") process.exit(0);
  throw err;
});

function uniqueStrings(values) {
  return Array.from(new Set(values));
}

function toImportDoc(p) {
  const now = Date.now();
  const tags = uniqueStrings(p.tags ?? []);
  const pricesByMl = p.pricesByMl ?? {};
  const priceValues = Object.values(pricesByMl);
  const derivedPrice = priceValues.length ? Math.min(...priceValues) : 0;

  const doc = {
    name: p.name,
    slug: p.slug,
    gender: p.gender,
    tags,
    description: p.description,
    price: derivedPrice,
    pricesByMl,
    sizesMl: p.sizesMl ?? [],
    inStock: p.inStock ?? true,
    imageFileName: p.image?.fileName,
    createdAt: now,
    updatedAt: now,
  };

  // Optional Convex fields must be omitted (not set to null) to pass schema validation.
  if (p.imageId) doc.imageId = p.imageId;
  if (p.imageUrl) doc.imageUrl = p.imageUrl;

  return doc;
}

const inputPath = process.argv[2];
if (!inputPath) {
  console.error(
    "Usage: node scripts/preparePerfumesImport.mjs <path-to-perfumes.json>\n" +
      "Example: node scripts/preparePerfumesImport.mjs ../web/app/catalogos/damas/perfumes.json",
  );
  process.exit(1);
}

const raw = await fs.readFile(inputPath, "utf8");
const perfumes = JSON.parse(raw);

if (!Array.isArray(perfumes)) {
  throw new Error("Expected a JSON array at the top-level");
}

for (const p of perfumes) {
  const doc = toImportDoc(p);
  process.stdout.write(JSON.stringify(doc) + "\n");
}
