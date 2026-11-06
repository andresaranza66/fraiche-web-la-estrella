"use client";

import { useMutation } from "convex/react";
import { api } from "../convex/api";
import { useRef, useState } from "react";
import { Upload, Check, AlertCircle } from "lucide-react";

type Gender = "hombres" | "damas" | "unisex";

const TAG_OPTIONS = ["citrico", "floral", "dulce", "amaderado", "oriental"] as const;

export default function AdminClient() {
  const upsert = useMutation(api.perfumes.upsert);
  const generateUploadUrl = useMutation(api.perfumes.generateUploadUrl);

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [gender, setGender] = useState<Gender>("unisex");
  const [tags, setTags] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [inStock, setInStock] = useState(true);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function toggleTag(tag: string) {
    setTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!name || !slug) {
      setError("Please fill in perfume name and slug");
      return;
    }

    const sizesMl = [30, 50, 60, 80, 100];
    const pricesByMl: Record<string, number> = {
      "30": 20800,
      "50": 30200,
      "60": 32400,
      "80": 40600,
      "100": 51800,
    };
    const price = pricesByMl["30"] ?? 0;

    setSaving(true);
    try {
      let imageId: string | undefined = undefined;
      let imageFileName: string | undefined = undefined;

      if (imageFile) {
        const uploadUrl = await generateUploadUrl();
        const result = await fetch(uploadUrl, {
          method: "POST",
          headers: { "Content-Type": imageFile.type },
          body: imageFile,
        });
        if (!result.ok) {
          throw new Error(`Image upload failed: ${result.statusText}`);
        }
        const { storageId } = await result.json();
        imageId = storageId;
        imageFileName = imageFile.name;
      }

      await upsert({
        name,
        slug,
        gender,
        tags,
        description: description.trim() ? description.trim() : undefined,
        price,
        pricesByMl,
        sizesMl,
        inStock,
        imageFileName,
        imageId: imageId as Parameters<typeof upsert>[0]["imageId"],
        imageUrl: undefined,
      });

      setName("");
      setSlug("");
      setTags([]);
      setDescription("");
      setInStock(true);
      setGender("unisex");
      setImageFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error saving perfume");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="max-w-2xl space-y-8">
      {/* Basic Info Section */}
      <div className="rounded-xl border border-purple-100 bg-white p-8 shadow-sm ">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Basic Information</h2>
          <p className="mt-1 text-sm text-gray-600">Enter the perfume name and slug</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Perfume Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Yara LATAFFA"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 transition focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none"
            />
            <p className="mt-1 text-xs text-gray-500">Start with capital letter. Format: Name BRAND</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Slug *
            </label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="e.g., yara-lataffa"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 transition focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none"
            />
            <p className="mt-1 text-xs text-gray-500">URL-friendly identifier (lowercase with hyphens)</p>
          </div>
        </div>
      </div>

      {/* Category Section */}
      <div className="rounded-xl border border-purple-100 bg-white p-8 shadow-sm">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Category</h2>
          <p className="mt-1 text-sm text-gray-600">Select the perfume category</p>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Gender Category
          </label>
          <div className="relative">
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value as Gender)}
              className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 py-3 pr-10 text-gray-900 font-medium transition focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none hover:cursor-pointer"
            >
              <option value="hombres">For Men (Hombres)</option>
              <option value="damas">For Women (Damas)</option>
              <option value="unisex">Unisex</option>
            </select>
            <svg
              className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Image Section */}
      <div className="rounded-xl border border-purple-100 bg-white p-8 shadow-sm">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Perfume Image</h2>
          <p className="mt-1 text-sm text-gray-600">Upload a product image</p>
        </div>

        <div className="space-y-4">
          {!imageFile ? (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="relative cursor-pointer rounded-lg border-2 border-dashed border-purple-200 bg-purple-50/50 p-8 text-center transition hover:border-purple-400 hover:bg-purple-100/50"
            >
              <Upload className="mx-auto h-10 w-10 text-purple-500 mb-2" />
              <p className="font-medium text-gray-900">Click to upload or drag and drop</p>
              <p className="text-sm text-gray-600">PNG, JPG up to 10MB</p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
                className="hidden"
              />
            </div>
          ) : (
            <div className="relative">
              <img
                src={URL.createObjectURL(imageFile)}
                alt="Preview"
                className="h-48 w-48 rounded-lg border border-gray-300 object-cover"
              />
              <button
                type="button"
                onClick={() => {
                  setImageFile(null);
                  if (fileInputRef.current) fileInputRef.current.value = "";
                }}
                className="absolute top-2 right-2 rounded-full bg-red-500 text-white p-1 hover:bg-red-600 transition"
              >
                ✕
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Tags Section */}
      <div className="rounded-xl border border-purple-100 bg-white p-8 shadow-sm">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Fragrance Notes</h2>
          <p className="mt-1 text-sm text-gray-600">Select the characteristic notes</p>
        </div>

        <div className="flex flex-wrap gap-3">
          {TAG_OPTIONS.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => toggleTag(tag)}
              className={`rounded-full border-2 px-4 py-2 font-medium text-sm transition hover:cursor-pointer ${
                tags.includes(tag)
                  ? "border-purple-500 bg-purple-500 text-white shadow-md"
                  : "border-gray-300 bg-white text-gray-700 hover:border-purple-300"
              }`}
            >
              {tag.charAt(0).toUpperCase() + tag.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Description Section */}
      <div className="rounded-xl border border-purple-100 bg-white p-8 shadow-sm">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Description</h2>
          <p className="mt-1 text-sm text-gray-600">Add fragrance details and characteristics</p>
        </div>

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe the perfume characteristics, opening notes, heart notes, and base notes..."
          rows={5}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 transition focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none resize-none"
        />
      </div>

      {/* Availability Section */}
      <div className="rounded-xl border border-purple-100 bg-white p-8 shadow-sm">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Availability</h2>
          <p className="mt-1 text-sm text-gray-600">Set the stock status</p>
        </div>

        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={inStock}
            onChange={(e) => setInStock(e.target.checked)}
            className="w-5 h-5 rounded border-gray-300 text-purple-600 transition focus:ring-2 focus:ring-purple-500"
          />
          <span className="font-medium text-gray-900">In Stock</span>
        </label>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 flex gap-3">
          <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      {/* Submit Button */}
      <div className="flex gap-3 mt-3">
        <button
          type="submit"
          disabled={saving}
          className="flex-1 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 font-semibold text-white transition hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 hover:cursor-pointer"
        >
          {saving ? (
            <>
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Saving...
            </>
          ) : (
            <>
              <Check className="h-4 w-4" />
              Save Perfume
           </>
          )}
        </button>
      </div>
    </form>
  );
}