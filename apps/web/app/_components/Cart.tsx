"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { useMemo } from "react";

import { useCart } from "../../lib/cart/cart-context";

type CartProps = {
  open: boolean;
  onClose: () => void;
};

function formatMoney(value: number) {
  return `${value.toLocaleString()}$`;
}

function buildWhatsAppMessage(items: ReturnType<typeof useCart>["state"]["items"]) {
  const lines: string[] = ["Hola, quiero hacer un pedido:", ""];

  items.forEach((item, i) => {
    const extras: string[] = [];
    if (item.extraPerfumeGrams > 0) extras.push(`+${item.extraPerfumeGrams}g perfume`);
    if (item.feromonasGrams > 0) extras.push(`+${item.feromonasGrams}g feromonas`);

    const extrasText = extras.length ? ` (${extras.join(", ")})` : "";
    lines.push(`${i + 1}) ${item.name} - ${item.sizeMl}ml x${item.quantity}${extrasText}`);
  });

  return lines.join("\n");
}

export default function Cart({ open, onClose }: CartProps) {
  const { state, setQuantity, remove, clear } = useCart();

  const phone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE;

  const itemsCount = useMemo(
    () => state.items.reduce((sum, x) => sum + x.quantity, 0),
    [state.items],
  );

  const subtotal = useMemo(
    () => state.items.reduce((sum, x) => sum + x.unitPrice * x.quantity, 0),
    [state.items],
  );

  const canSend = Boolean(phone) && state.items.length > 0;

  const onSendWhatsApp = () => {
    if (!phone) return;
    if (state.items.length === 0) return;

    const message = buildWhatsAppMessage(state.items);
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    onClose();
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      className={`fixed inset-0 z-[60] transition ${
        open ? "pointer-events-auto" : "pointer-events-none"
      }`}
      aria-hidden={!open}
    >
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity ${
          open ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      <aside
        className={`absolute right-0 top-0 h-full w-full max-w-[420px] transform bg-white shadow-2xl transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-[color:var(--color-neutral-200)] p-5">
            <div>
              <div className="text-lg font-semibold text-[color:var(--color-neutral-900)] font-[family-name:var(--font-headline)]">
                Carrito
              </div>
              <div className="mt-1 text-xs text-[color:var(--color-neutral-700)]">
                {itemsCount} artículo(s)
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-2 transition hover:bg-[color:var(--color-neutral-100)] cursor-pointer"
              aria-label="Cerrar carrito"
            >
              <X size={18} />
            </button>
          </div>

          <div className="flex-1 overflow-auto p-5">
            {state.items.length === 0 ? (
              <div className="rounded-2xl border border-[color:var(--color-neutral-200)] bg-white p-5 text-sm text-[color:var(--color-neutral-700)]">
                Tu carrito está vacío.
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {state.items.map((item) => {
                  const key = {
                    productId: item.productId,
                    sizeMl: item.sizeMl,
                    extraPerfumeGrams: item.extraPerfumeGrams,
                    feromonasGrams: item.feromonasGrams,
                  };

                  return (
                    <div
                      key={`${item.productId}-${item.sizeMl}-${item.extraPerfumeGrams}-${item.feromonasGrams}`}
                      className="rounded-2xl border border-[color:var(--color-neutral-200)] bg-white p-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <Link
                            href={`/catalogos/${item.slug}`}
                            onClick={onClose}
                            className="block truncate text-sm font-semibold text-[color:var(--color-neutral-900)] font-[family-name:var(--font-headline)]"
                          >
                            {item.name}
                          </Link>

                          <div className="mt-1 text-xs text-[color:var(--color-neutral-700)]">
                            {item.sizeMl}ml
                            {item.extraPerfumeGrams > 0
                              ? ` · +${item.extraPerfumeGrams}g perfume`
                              : ""}
                            {item.feromonasGrams > 0
                              ? ` · +${item.feromonasGrams}g feromonas`
                              : ""}
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => remove(key)}
                          className="rounded-lg px-2 py-1 text-xs text-[color:var(--color-neutral-700)] transition hover:bg-[color:var(--color-neutral-100)] cursor-pointer"
                        >
                          Quitar
                        </button>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <div className="text-xs text-[color:var(--color-neutral-700)]">
                          {formatMoney(item.unitPrice)} c/u
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setQuantity(key, item.quantity - 1)}
                            className="h-8 w-8 rounded-lg border border-[color:var(--color-neutral-200)] bg-white text-sm transition hover:bg-[color:var(--color-neutral-100)] cursor-pointer"
                            aria-label="Disminuir cantidad"
                          >
                            -
                          </button>

                          <div className="w-10 text-center text-sm font-semibold text-[color:var(--color-neutral-900)]">
                            {item.quantity}
                          </div>

                          <button
                            type="button"
                            onClick={() => setQuantity(key, item.quantity + 1)}
                            className="h-8 w-8 rounded-lg border border-[color:var(--color-neutral-200)] bg-white text-sm transition hover:bg-[color:var(--color-neutral-100)] cursor-pointer"
                            aria-label="Aumentar cantidad"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="border-t border-[color:var(--color-neutral-200)] p-5">
            <div className="flex items-center justify-between text-sm">
              <div className="text-[color:var(--color-neutral-700)]">Subtotal</div>
              <div className="font-semibold text-[color:var(--color-neutral-900)]">
                {formatMoney(subtotal)}
              </div>
            </div>

            {!phone ? (
              <div className="mt-3 rounded-xl border border-[color:var(--color-neutral-200)] bg-[color:var(--color-neutral-100)] p-3 text-xs text-[color:var(--color-neutral-700)]">
                Falta configurar <span className="font-semibold">NEXT_PUBLIC_WHATSAPP_PHONE</span>.
              </div>
            ) : null}

            <div className="mt-4 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={clear}
                disabled={state.items.length === 0}
                className="rounded-xl border border-[color:var(--color-neutral-200)] bg-white px-4 py-3 text-sm font-semibold text-[color:var(--color-neutral-900)] disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
              >
                Vaciar
              </button>

              <button
                type="button"
                onClick={onSendWhatsApp}
                disabled={!canSend}
                className="rounded-xl bg-[color:var(--color-primary-700)] px-4 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
              >
                Enviar WhatsApp
              </button>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}