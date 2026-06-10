"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useQuery } from "convex/react";
import { useRouter } from "next/navigation";

import { api } from "../convex/api";

type PerfumeSearchProps = {
  onClose?: () => void;
  autoFocus?: boolean;
};

function useDebouncedValue<T>(value: T, delayMs: number) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = window.setTimeout(() => setDebounced(value), delayMs);
    return () => window.clearTimeout(id);
  }, [value, delayMs]);

  return debounced;
}

export default function PerfumeSearch({ onClose, autoFocus }: PerfumeSearchProps) {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const onCloseRef = useRef<PerfumeSearchProps["onClose"]>(onClose);

  const [term, setTerm] = useState("");
  const [open, setOpen] = useState(false);

  const trimmed = useMemo(() => term.trim(), [term]);
  const debounced = useDebouncedValue(trimmed, 250);

  const suggestions = useQuery(api.perfumes.searchSuggestions, { q: debounced });

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      const el = containerRef.current;
      if (!el) return;
      if (e.target instanceof Node && !el.contains(e.target)) {
        setOpen(false);
        onCloseRef.current?.();
      }
    };

    document.addEventListener("click", onClickOutside);
    return () => document.removeEventListener("click", onClickOutside);
  }, []);

  const goToResults = (q: string) => {
    const finalQ = q.trim();
    if (!finalQ) return;
    setOpen(false);
    onClose?.();
    router.push(`/buscar?q=${encodeURIComponent(finalQ)}`);
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-[520px] transition-all duration-300">
      <div className="flex items-center gap-3">
        <input
          autoFocus={autoFocus}
          value={term}
          onChange={(e) => {
            setTerm(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              goToResults(term);
            }
            if (e.key === "Escape") {
              setOpen(false);
              onClose?.();
            }
          }}
          placeholder="Buscar perfumes..."
          className="w-full rounded-xl border-2 border-[color:var(--color-primary-600)] bg-white px-4 py-3 text-sm outline-none"
        />

        <button
          type="button"
          onClick={() => goToResults(term)}
          className="rounded-xl border-2 border-[color:var(--color-primary-600)] bg-white px-4 py-3 text-sm"
        >
          Buscar
        </button>
      </div>

      {open && trimmed.length >= 2 ? (
        <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-50 overflow-hidden rounded-xl border border-[color:var(--color-neutral-200)] bg-white shadow-lg">
          {suggestions === undefined ? (
            <div className="px-4 py-3 text-sm text-[color:var(--color-neutral-700)]">Cargando...</div>
          ) : suggestions.length === 0 ? (
            <div className="px-4 py-3 text-sm text-[color:var(--color-neutral-700)]">
              No encontramos resultados.
            </div>
          ) : (
            <div className="max-h-72 overflow-auto">
              {suggestions.map((s) => (
                <button
                  key={s._id}
                  type="button"
                  onClick={() => goToResults(s.name)}
                  className="flex w-full items-center justify-between px-4 py-3 text-left text-sm hover:bg-[color:var(--color-neutral-100)]"
                >
                  <span className="font-semibold text-[color:var(--color-neutral-900)]">{s.name}</span>
                  <span className="text-xs text-[color:var(--color-neutral-700)]">{s.gender}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}