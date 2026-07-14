import type { QueryCtx } from "./_generated/server";
import { internalMutation, mutation, query } from "./_generated/server";
import { v } from "convex/values";
import type { Doc } from "./_generated/dataModel";
import type { MutationCtx } from "./_generated/server";


const genderValidator = v.union(
  v.literal("hombres"),
  v.literal("damas"),
  v.literal("unisex"),
);

function isNotNull<T>(value: T): value is NonNullable<T> {
  return value !== null;
}

type PerfumeWithImageUrl = Omit<Doc<"perfumes">, "imageUrl"> & { imageUrl: string | null };

async function withImageUrl(ctx: QueryCtx, perfume: null): Promise<null>;
async function withImageUrl(ctx: QueryCtx, perfume: Doc<"perfumes">): Promise<PerfumeWithImageUrl>;
async function withImageUrl(
  ctx: QueryCtx,
  perfume: Doc<"perfumes"> | null,
): Promise<PerfumeWithImageUrl | null>;
async function withImageUrl(
  ctx: QueryCtx,
  perfume: Doc<"perfumes"> | null,
): Promise<PerfumeWithImageUrl | null> {
  if (perfume === null) return null;
  const derivedUrl = perfume.imageId ? await ctx.storage.getUrl(perfume.imageId) : null;
  return {
    ...perfume,
    imageUrl: derivedUrl ?? perfume.imageUrl ?? null,
  };
}

export const list = query({
  args: {},
  handler: async (ctx) => {
    const perfumes = await ctx.db.query("perfumes").order("desc").take(200);
    const withUrls = await Promise.all(perfumes.map((p) => withImageUrl(ctx, p)));
    
    return withUrls.filter(isNotNull);
  },
});

export const listByGender = query({
  args: { gender: genderValidator },
  handler: async (ctx, args) => {
    const perfumes = await ctx.db
      .query("perfumes")
      .withIndex("by_gender", (q) => q.eq("gender", args.gender))
      .order("desc")
      .take(200);
    const withUrls = await Promise.all(perfumes.map((p) => withImageUrl(ctx, p)));
    return withUrls.filter(isNotNull);
  },
});

export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const perfume = await ctx.db
      .query("perfumes")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();
    return await withImageUrl(ctx, perfume);
  },
});

/// !SEARCH SUGGESTION QUERIES

export const searchSuggestions = query({
  args: { q: v.string() },
  handler: async (ctx, args) => {
    const q = args.q.trim().toLowerCase();
    if (q.length < 2) return [];

    const results = await ctx.db
      .query("perfumes")
      .withSearchIndex("search_perfumes", (q2) => q2.search("searchText", q))
      .take(8);

    return results.map((p) => ({
      _id: p._id,
      name: p.name,
      slug: p.slug,
      gender: p.gender,
      imageFileName: p.imageFileName ?? null,
    }));
  },
});

//FINALLY SEARCH QUERY

export const search = query({
  args: { q: v.string() },
  handler: async (ctx, args) => {
    const q = args.q.trim().toLowerCase();
    if (q.length < 2) return [];

    const results = await ctx.db
      .query("perfumes")
      .withSearchIndex("search_perfumes", (q2) => q2.search("searchText", q))
      .take(25);

    return results;
  },
});

//Queries down here

export const upsert = mutation({
  args: {
    id: v.optional(v.id("perfumes")),
    name: v.string(),
    slug: v.string(),
    gender: genderValidator,
    tags: v.array(v.string()),
    description: v.optional(v.string()),
    price: v.number(),
    pricesByMl: v.record(v.string(), v.number()),
    sizesMl: v.array(v.number()),
    inStock: v.boolean(),
    imageFileName: v.optional(v.string()),
    imageId: v.optional(v.id("_storage")),
    imageUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await assertEmployee(ctx);
    const now = Date.now();
    const searchText = [args.name, ...args.tags, args.description ?? ""]
    .join(" ")
    .toLowerCase();

    if (args.id) {
      await ctx.db.patch(args.id, {
        name: args.name,
        slug: args.slug,
        gender: args.gender,
        tags: args.tags,
        description: args.description,
        price: args.price,
        pricesByMl: args.pricesByMl,
        sizesMl: args.sizesMl,
        inStock: args.inStock,
        imageFileName: args.imageFileName,
        imageId: args.imageId,
        imageUrl: args.imageUrl,
        updatedAt: now,
        searchText,
      });
      return args.id;
    }

    return await ctx.db.insert("perfumes", {
      name: args.name,
      slug: args.slug,
      gender: args.gender,
      tags: args.tags,
      description: args.description,
      price: args.price,
      pricesByMl: args.pricesByMl,
      sizesMl: args.sizesMl,
      inStock: args.inStock,
      imageFileName: args.imageFileName,
      imageId: args.imageId,
      imageUrl: args.imageUrl,
      createdAt: now,
      updatedAt: now,
      searchText,
    });
  },
});

export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    await assertEmployee(ctx);
    return await ctx.storage.generateUploadUrl();
  },
});

export const remove = mutation({

  args: { id: v.id("perfumes") },
  handler: async (ctx, args) => {
    await assertEmployee(ctx);
    await ctx.db.delete(args.id);
  },
});

export const fixBrokenPrices = internalMutation({
  args: {},
  handler: async (ctx) => {
    const perfumes = await ctx.db.query("perfumes").take(1000);

    let updated = 0;
    for (const p of perfumes) {
      const fixedPrices: Record<string, number> = {};
      let changed = false;
      for (const [ml, value] of Object.entries(p.pricesByMl ?? {})) {
        if (value > 0 && value < 1000) {
          fixedPrices[ml] = Math.round(value * 1000);
          changed = true;
        } else {
          fixedPrices[ml] = value;
        }
      }

      const newPrice = p.price === 0 ? (fixedPrices["30"] ?? p.price) : p.price;

      if (changed || newPrice !== p.price) {
        await ctx.db.patch(p._id, { pricesByMl: fixedPrices, price: newPrice });
        updated++;
      }
    }

    return { updated };
  },
});

export const backfillSearchText = mutation({
  args: {},
  handler: async (ctx) => {
    await assertEmployee(ctx);
    const perfumes = await ctx.db.query("perfumes").take(1000);

    for (const p of perfumes) {
      const searchText = [p.name, ...(p.tags ?? []), p.description ?? ""]
        .join(" ")
        .toLowerCase();

      await ctx.db.patch(p._id, { searchText });
    }

    return { updated: perfumes.length };
  },
});

//Security For Perfumes and just having employees to add perfumes.
async function assertEmployee(ctx: MutationCtx) {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity?.email) {
    throw new Error("Not authenticated");
  }

  const allowed = (process.env.EMPLOYEE_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);

  if (!allowed.includes(identity.email.toLowerCase())) {
    throw new Error("Not authorized");
  }
}