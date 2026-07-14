"use client";

import { useMutation } from "convex/react";
import { api } from "../convex/api";
import { useRef, useState } from "react";

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
  const fileInputRef = useRef<HTMLInputElement>(null);

  function toggleTag(tag: string) {
    setTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!name || !slug) {
      alert("Fill name and slug");
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

      alert("Perfume saved!");
      setName("");
      setSlug("");
      setTags([]);
      setDescription("");
      setInStock(true);
      setGender("unisex");
      setImageFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      alert(err instanceof Error ? err.message : "Error saving perfume");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 grid gap-3">
        <div className="flex flex-col gap-4">
<div className="border border-[color:var(--color-neutral-200)] rounded p-4">
      <input className="w-full p-2 border rounded mb-2" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nombre del Perfume: debe ser empezar con mayuscula el nombre y siguiente la casa todo en mayusculal, ejemplo: 'Yara LATAFFA' " />
      <input className="w-full p-2 border rounded" value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="Slug (ejemplo: 'yara-lataffa')" />
</div>

      <select className="bg-[color:var(--color-neutral-100)] rounded px-2 py-1 m-2" value={gender} onChange={(e) => setGender(e.target.value as Gender)}>
        <option value="hombres">hombres</option>
        <option value="damas">damas</option>
        <option value="unisex">unisex</option>
      </select>

      <div className="border border-[color:var(--color-neutral-200)] rounded p-4">
        <label className="block font-bold mb-2">Imagen del perfume</label>
        {/* <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
        /> */}
        {imageFile && (
          <img
            src={URL.createObjectURL(imageFile)}
            alt="Preview"
            className="mt-2 h-32 w-32 object-cover rounded border"
          />
        )}
      </div>

      <div className="border border-[color:var(--color-neutral-200)] rounded p-4">
        <label className="block font-bold mb-2">Tags</label>
        <div className="flex flex-wrap gap-2">
          {TAG_OPTIONS.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => toggleTag(tag)}
              className={`rounded-full border px-3 py-1 text-sm ${
                tags.includes(tag)
                  ? "bg-[color:var(--color-tertiary-500)] text-black font-bold border-transparent"
                  : "bg-transparent border-[color:var(--color-neutral-200)]"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
      <textarea className='border rounded p-2' value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description (se saca de cada es el perfume el primer parrafo de disfragancias o de fragnatica)" />

      <label>
        <input type="checkbox" checked={inStock} onChange={(e) => setInStock(e.target.checked)} />
        In stock
      </label>

      <button type="submit" disabled={saving} className="bg-[color:var(--color-tertiary-500)] text-black font-bold text-lg rounded px-4 py-2 disabled:opacity-50">{saving ? "Saving..." : "Save perfume"}</button>
      </div>
    </form>
  );
}