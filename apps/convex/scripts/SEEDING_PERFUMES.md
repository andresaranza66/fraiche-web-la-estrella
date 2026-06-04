# Seeding perfumes into Convex (learning version)

## Why your `internalAction` approach failed
Convex functions run in a sandboxed environment.
They **cannot read files from your monorepo** using `fs.readFile`.
That’s why you saw `ENOENT: no such file or directory`.

The lock icon in the Convex dashboard means the function is **internal** (not callable from clients). That’s expected.

## Recommended seeding method
We will:
1) Convert your existing `apps/web/app/catalogos/damas/perfumes.json` into a Convex import file (JSONL).
2) Use `npx convex import` to upload it into the `perfumes` table.

## Step-by-step
### 1) Generate the JSONL import file
From `apps/convex`:

```bash
node scripts/preparePerfumesImport.mjs ../web/app/catalogos/damas/perfumes.json > perfumes_import.jsonl
```

### 2) Import into Convex
Make sure `convex dev` is running.

Then from `apps/convex`:

```bash
npx convex import perfumes perfumes_import.jsonl --replace
```

### 3) Verify
Open Convex dashboard → Data → `perfumes`.

You should see the seeded rows.

## Notes
- The script deduplicates tags.
- `price` is derived as the minimum of `pricesByMl`.
- Images are kept as `imageFileName` so the web app can load them from `/images/<fileName>`.
