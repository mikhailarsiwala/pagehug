import { useCallback, useSyncExternalStore } from "react";

export type Review = {
  id: string;
  productId: string | null;
  name: string;
  city: string;
  rating: number;
  text: string;
  date: string;
};

const KEY = "markmyplace.reviews";
const LEGACY_KEY = "pagehug.reviews";

let cache: Review[] = [];
let loaded = false;
const listeners = new Set<() => void>();

function read(): Review[] {
  try {
    const raw = localStorage.getItem(KEY) ?? localStorage.getItem(LEGACY_KEY);
    return raw ? (JSON.parse(raw) as Review[]) : [];
  } catch {
    return [];
  }
}

function emit() {
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  if (!loaded) {
    loaded = true;
    cache = read();
  }
  listeners.add(listener);
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) {
      cache = read();
      emit();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

const EMPTY: Review[] = [];
const getSnapshot = () => (loaded ? cache : EMPTY);
const getServerSnapshot = () => EMPTY;

export function addReview(review: Omit<Review, "id" | "date">) {
  const next: Review = {
    ...review,
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    date: new Date().toISOString(),
  };
  cache = [next, ...(loaded ? cache : read())];
  loaded = true;
  try {
    localStorage.setItem(KEY, JSON.stringify(cache));
  } catch {
    /* ignore */
  }
  emit();
  return next;
}

export function useReviews(productId?: string) {
  const all = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const reviews = productId ? all.filter((r) => r.productId === productId) : all;
  const average =
    reviews.length > 0 ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 0;
  const submit = useCallback(
    (values: Omit<Review, "id" | "date" | "productId">) =>
      addReview({ ...values, productId: productId ?? null }),
    [productId],
  );
  return { reviews, count: reviews.length, average, submit };
}
