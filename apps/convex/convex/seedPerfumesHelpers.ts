import { internalMutation, internalQuery } from "./_generated/server";
import { v } from "convex/values";

const genderValidator = v.union(
  v.literal("hombres"),
  v.literal("damas"),
  v.literal("unisex"),
);

export const listIds = internalQuery({
  args: { limit: v.number() },
  handler: async (ctx, args) => {
    const docs = await ctx.db.query("perfumes").take(args.limit);
    return docs.map((d) => ({ _id: d._id }));
  },
});

export const deleteOne = internalMutation({
  args: { id: v.id("perfumes") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
    return null;
  },
});

export const getBySlugInternal = internalQuery({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("perfumes")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();
  },
});

export const insertOne = internalMutation({
  args: {
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
  },
  handler: async (ctx, args) => {
    const now = Date.now();
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
      imageId: undefined,
      imageUrl: undefined,
      createdAt: now,
      updatedAt: now,
    });
  },
});
