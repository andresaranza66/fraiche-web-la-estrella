import { v } from "convex/values";
import { query, mutation, action } from "./_generated/server";
import { api } from "./_generated/api";

// Write your Convex functions in any file inside this directory (`convex`).
// See https://docs.convex.dev/functions for more.

// You can read data from the database via a query:
export const listPerfumes = query({
  // Validators for arguments.
  args: {
    count: v.number(),
  },

  // Query implementation.
  handler: async (ctx, args) => {
    //// Read the database as many times as you need here.
    //// See https://docs.convex.dev/database/reading-data.
    const perfumes = await ctx.db
      .query("perfumes")
      // Ordered by _creationTime, return most recent
      .order("desc")
      .take(args.count);
    return {
      viewer: (await ctx.auth.getUserIdentity())?.name ?? null,
      perfumes: perfumes.reverse().map((perfume) => ({
        id: perfume._id,
        name: perfume.name,
        slug: perfume.slug,
        price: perfume.price,
        sizesMl: perfume.sizesMl,
        inStock: perfume.inStock,
      })),
    };
  },
});

// You can write data to the database via a mutation:
export const addPerfume = mutation({
  // Validators for arguments.
  args: {
    name: v.string(),
    slug: v.string(),
    gender: v.union(v.literal("hombres"), v.literal("damas"), v.literal("unisex")),
    tags: v.array(v.string()),
    price: v.number(),
    pricesByMl: v.record(v.string(), v.number()),
    sizesMl: v.array(v.number()),
    inStock: v.boolean(),
    description: v.optional(v.string()),
    imageFileName: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
  },

  // Mutation implementation.
  handler: async (ctx, args) => {
    //// Insert or modify documents in the database here.
    //// Mutations can also read from the database like queries.
    //// See https://docs.convex.dev/database/writing-data.
    const now = Date.now();
    const id = await ctx.db.insert("perfumes", {
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
      imageUrl: args.imageUrl,
      createdAt: now,
      updatedAt: now,
    });

    return id;
  },
});

// You can fetch data from and send data to third-party APIs via an action:
export const myAction = action({
  // Validators for arguments.
  args: {
    first: v.number(),
    second: v.string(),
  },

  // Action implementation.
  handler: async (ctx, args) => {
    //// Use the browser-like `fetch` API to send HTTP requests.
    //// See https://docs.convex.dev/functions/actions#calling-third-party-apis-and-using-npm-packages.
    // const response = await fetch("https://api.thirdpartyservice.com");
    // const data = await response.json();

    //// Query data by running Convex queries.
    const data: { viewer: string | null } = await ctx.runQuery(api.myFunctions.listPerfumes, {
      count: 10,
    });
    console.log(data);

    //// Write data by running Convex mutations.
    await ctx.runMutation(api.myFunctions.addPerfume, {
      name: `Perfume ${args.first}`,
      slug: `perfume-${args.first}`,
      gender: "damas",
      tags: ["dulce"],
      price: args.first,
      pricesByMl: { "50": args.first },
      sizesMl: [50],
      inStock: true,
    });
  },
});
