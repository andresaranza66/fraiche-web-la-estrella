import type { CartItem } from "./cart/cart";

export function buildWhatsAppOrderMessage(items: CartItem[]) {
  if (items.length === 0) {
    return "Hola! Quiero hacer un pedido.";
  }

  const lines: string[] = [];
  lines.push("Hola! Quiero hacer un pedido:");
  lines.push("");

  for (const item of items) {
    const extras = item.feromsExtra ? " + feroms extra" : "";
    lines.push(`- ${item.name} (${item.sizeMl}ml) x${item.quantity}${extras}`);
  }

  lines.push("");
  lines.push("Gracias!");

  return lines.join("\n");
}

export function buildWhatsAppUrl(message: string) {
  const encoded = encodeURIComponent(message);
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE;

  if (phone && phone.trim().length > 0) {
    return `https://wa.me/${phone.replace(/\D/g, "")}?text=${encoded}`;
  }

  return `https://wa.me/?text=${encoded}`;
}
