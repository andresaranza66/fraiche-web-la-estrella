"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

import {
  addToCart,
  clearCart,
  defaultCartState,
  removeItem,
  setItemQuantity,
  type CartItem,
  type CartState,
} from "./cart";

const storageKey = "fraiche:cart:v1";

type CartContextValue = {
  state: CartState;
  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  setQuantity: (
    key: Pick<CartItem, "productId" | "sizeMl" | "extraPerfumeGrams" | "feromonasGrams">,
    quantity: number,
  ) => void;
  remove: (key: Pick<CartItem, "productId" | "sizeMl" | "extraPerfumeGrams" | "feromonasGrams">) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

function safeParseCart(value: string | null): CartState {
  if (!value) return defaultCartState;

  try {
    const parsed = JSON.parse(value) as unknown;
    if (!parsed || typeof parsed !== "object") return defaultCartState;
    const items = (parsed as { items?: unknown }).items;
    if (!Array.isArray(items)) return defaultCartState;

    return {
      items: items.filter(Boolean) as CartItem[],
    };
  } catch {
    return defaultCartState;
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<CartState>(defaultCartState);

  useEffect(() => {
    setState(safeParseCart(window.localStorage.getItem(storageKey)));
  }, []);

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(state));
  }, [state]);

  const addItem = useCallback((item: Omit<CartItem, "quantity"> & { quantity?: number }) => {
    setState((prev) => addToCart(prev, item));
  }, []);

  const setQuantity = useCallback(
    (
      key: Pick<CartItem, "productId" | "sizeMl" | "extraPerfumeGrams" | "feromonasGrams">,
      quantity: number,
    ) => {
      setState((prev) => setItemQuantity(prev, key, quantity));
    },
    [],
  );

  const remove = useCallback(
    (key: Pick<CartItem, "productId" | "sizeMl" | "extraPerfumeGrams" | "feromonasGrams">) => {
    setState((prev) => removeItem(prev, key));
    },
    [],
  );

  const clear = useCallback(() => {
    setState(clearCart());
  }, []);

  const value = useMemo<CartContextValue>(
    () => ({ state, addItem, setQuantity, remove, clear }),
    [addItem, clear, remove, setQuantity, state],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
