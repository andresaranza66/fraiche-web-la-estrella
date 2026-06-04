"use client";

import { useMemo } from "react";

import { type PerfumeSizeMl } from "../../lib/cart/cart";
import { useCart } from "../../lib/cart/cart-context";
import { buildWhatsAppOrderMessage, buildWhatsAppUrl } from "../../lib/whatsapp";

export function CartDebug() {
  const { state, addItem, clear } = useCart();

  const message = useMemo(() => buildWhatsAppOrderMessage(state.items), [state.items]);
  const whatsappUrl = useMemo(() => buildWhatsAppUrl(message), [message]);

  return (
    <div className="rounded-xl border border-[color:var(--color-neutral-200)] bg-white/70 p-4 text-sm text-[color:var(--color-neutral-900)] shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="font-[family-name:var(--font-headline)] text-base">Cart (base test)</div>
        <div className="flex gap-2">
          <button
            className="rounded-lg bg-[color:var(--color-primary)] px-3 py-2 font-[family-name:var(--font-body)] text-white"
            type="button"
            onClick={() => {
              addItem({
                productId: "demo-1",
                slug: "demo",
                name: "Perfume demo",
                sizeMl: 50 as PerfumeSizeMl,
                feromsExtra: false,
                quantity: 1,
              });
            }}
          >
            Add demo item
          </button>
          <button
            className="rounded-lg border border-[color:var(--color-neutral-300)] px-3 py-2 font-[family-name:var(--font-body)]"
            type="button"
            onClick={clear}
          >
            Clear
          </button>
        </div>
      </div>

      <div className="mt-3 grid gap-2">
        <div className="text-[color:var(--color-neutral-700)]">Items: {state.items.length}</div>

        <a
          className="inline-flex w-fit rounded-lg bg-[color:var(--color-secondary)] px-3 py-2 font-[family-name:var(--font-body)] text-white"
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
        >
          Order on WhatsApp
        </a>

        <pre className="max-h-48 overflow-auto rounded-lg bg-[color:var(--color-neutral-100)] p-3 text-xs">
          {message}
        </pre>

        <div className="text-xs text-[color:var(--color-neutral-600)]">
          Tip: set NEXT_PUBLIC_WHATSAPP_PHONE to your Colombian number (e.g. 573001234567) to send directly.
        </div>
      </div>
    </div>
  );
}
