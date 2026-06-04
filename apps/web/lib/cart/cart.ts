export type PerfumeSizeMl = number;

export type CartItem = {
  productId: string;
  slug: string;
  name: string;
  sizeMl: PerfumeSizeMl;
  baseUnitPrice: number;
  unitPrice: number;
  quantity: number;
  extraPerfumeGrams: number;
  feromonasGrams: number;
};

export type CartState = {
  items: CartItem[];
};

export const defaultCartState: CartState = {
  items: [],
};

export function addToCart(state: CartState, item: Omit<CartItem, "quantity"> & { quantity?: number }): CartState {
  const quantity = item.quantity ?? 1;

  const existingIndex = state.items.findIndex(
    (x) =>
      x.productId === item.productId &&
      x.sizeMl === item.sizeMl &&
      x.extraPerfumeGrams === item.extraPerfumeGrams &&
      x.feromonasGrams === item.feromonasGrams,
  );

  if (existingIndex >= 0) {
    const items = [...state.items];
    const existingItem = items[existingIndex];

    if (!existingItem) return state;

    items[existingIndex] = {
      ...existingItem,
      quantity: existingItem.quantity + quantity,
    };
    return { ...state, items };
  }

  return {
    ...state,
    items: [...state.items, { ...item, quantity } as CartItem],
  };
}

export function setItemQuantity(
  state: CartState,
  key: Pick<CartItem, "productId" | "sizeMl" | "extraPerfumeGrams" | "feromonasGrams">,
  quantity: number,
): CartState {
  const items = state.items
    .map((x) => {
      const match =
        x.productId === key.productId &&
        x.sizeMl === key.sizeMl &&
        x.extraPerfumeGrams === key.extraPerfumeGrams &&
        x.feromonasGrams === key.feromonasGrams;
      if (!match) return x;
      return { ...x, quantity };
    })
    .filter((x) => x.quantity > 0);

  return { ...state, items };
}

export function removeItem(
  state: CartState,
  key: Pick<CartItem, "productId" | "sizeMl" | "extraPerfumeGrams" | "feromonasGrams">,
): CartState {
  const items = state.items.filter(
    (x) =>
      !(
        x.productId === key.productId &&
        x.sizeMl === key.sizeMl &&
        x.extraPerfumeGrams === key.extraPerfumeGrams &&
        x.feromonasGrams === key.feromonasGrams
      ),
  );
  return { ...state, items };
}

export function clearCart(): CartState {
  return defaultCartState;
}
