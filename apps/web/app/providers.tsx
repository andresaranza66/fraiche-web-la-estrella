"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { type ReactNode, useMemo } from "react";

import { CartProvider } from "../lib/cart/cart-context";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;

export function Providers({ children }: { children: ReactNode }) {
  const client = useMemo(() => {
    if (!convexUrl) return null;
    return new ConvexReactClient(convexUrl);
  }, []);

  if (!client) {
    return <CartProvider>{children}</CartProvider>;
  }

  return (
    <ConvexProvider client={client}>
      <CartProvider>{children}</CartProvider>
    </ConvexProvider>
  );
}
