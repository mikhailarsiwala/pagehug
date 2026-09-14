import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  variant?: string | undefined;
  qty: number;
};

type StoreValue = {
  items: CartItem[];
  wishlist: string[];
  cartOpen: boolean;
  setCartOpen: (v: boolean) => void;
  add: (item: Omit<CartItem, "qty">, qty?: number) => void;
  remove: (key: string) => void;
  setQty: (key: string, qty: number) => void;
  clear: () => void;
  toggleWish: (id: string) => void;
  count: number;
  subtotal: number;
  shipping: number;
  total: number;
};

const StoreContext = createContext<StoreValue | null>(null);

const keyOf = (i: { id: string; variant?: string }) => `${i.id}__${i.variant ?? ""}`;

function usePersisted<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(initial);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw) setValue(JSON.parse(raw) as T);
    } catch {
      /* ignore */
    }
    setLoaded(true);
  }, [key]);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* ignore */
    }
  }, [key, value, loaded]);

  return [value, setValue] as const;
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = usePersisted<CartItem[]>("pagehug.cart", []);
  const [wishlist, setWishlist] = usePersisted<string[]>("pagehug.wishlist", []);
  const [cartOpen, setCartOpen] = useState(false);

  const value = useMemo<StoreValue>(() => {
    const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
    const shipping = subtotal === 0 || subtotal >= 499 ? 0 : 49;
    return {
      items,
      wishlist,
      cartOpen,
      setCartOpen,
      add: (item, qty = 1) => {
        setItems((prev) => {
          const k = keyOf(item);
          const found = prev.find((p) => keyOf(p) === k);
          if (found) {
            return prev.map((p) => (keyOf(p) === k ? { ...p, qty: p.qty + qty } : p));
          }
          return [...prev, { ...item, qty }];
        });
        setCartOpen(true);
      },
      remove: (key) => setItems((prev) => prev.filter((p) => keyOf(p) !== key)),
      setQty: (key, qty) =>
        setItems((prev) =>
          prev
            .map((p) => (keyOf(p) === key ? { ...p, qty: Math.max(0, qty) } : p))
            .filter((p) => p.qty > 0),
        ),
      clear: () => setItems([]),
      toggleWish: (id) =>
        setWishlist((prev) => (prev.includes(id) ? prev.filter((w) => w !== id) : [...prev, id])),
      count: items.reduce((s, i) => s + i.qty, 0),
      subtotal,
      shipping,
      total: subtotal + shipping,
    };
  }, [items, wishlist, cartOpen, setItems, setWishlist]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}

export const cartKey = keyOf;
