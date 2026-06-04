import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  perfumes: defineTable({
    name: v.string(),
    slug: v.string(),
    gender: v.union(v.literal("hombres"), v.literal("damas"), v.literal("unisex")),
    tags: v.array(v.string()),
    description: v.optional(v.string()),
    price: v.number(),
    pricesByMl: v.record(v.string(), v.number()),
    sizesMl: v.array(v.number()),
    inStock: v.boolean(),
    imageFileName: v.optional(v.string()),
    imageId: v.optional(v.id("_storage")),
    imageUrl: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
    searchText: v.optional(v.string()),
  })
    .index("by_slug", ["slug"])
    .index("by_gender", ["gender"])
    .searchIndex("search_perfumes", {
      searchField: "searchText",
      filterFields: ["gender"],
    }),
    
});
