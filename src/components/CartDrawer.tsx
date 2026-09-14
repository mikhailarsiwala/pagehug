import { Link } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { rupees } from "@/lib/products";
import { cartKey, useStore } from "@/lib/store";

export function CartDrawer() {
  const { cartOpen, setCartOpen, items, setQty, remove, subtotal, shipping, total } = useStore();
  if (!cartOpen) return null;

  return (
    <div className="fixed inset-0 z-70">
      <button
        type="button"
        aria-label="Close cart"
        onClick={() => setCartOpen(false)}
        className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
      />
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md translate-x-0 flex-col bg-card shadow-[var(--shadow-lift)] duration-300 animate-in slide-in-from-right">
        <header className="flex items-center justify-between border-b border-border px-6 py-5">
          <h2 className="text-xl">Your bag</h2>
          <button type="button" onClick={() => setCartOpen(false)} aria-label="Close">
            <X size={18} />
          </button>
        </header>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <ShoppingBag size={28} className="text-muted-foreground" />
            <p className="text-muted-foreground">Your bag is empty. Your page deserves better.</p>
            <Link to="/shop" onClick={() => setCartOpen(false)} className="btn-primary">
              Shop bookmarks
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-4 overflow-y-auto px-6 py-5">
              {items.map((item) => {
                const k = cartKey(item);
                return (
                  <div key={k} className="flex gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                      className="h-24 w-20 rounded-2xl object-cover"
                    />
                    <div className="flex-1 space-y-1">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-medium">{item.name}</p>
                        <button type="button" onClick={() => remove(k)} aria-label="Remove item">
                          <Trash2 size={15} className="text-muted-foreground hover:text-primary" />
                        </button>
                      </div>
                      {item.variant && (
                        <p className="text-xs text-muted-foreground">{item.variant}</p>
                      )}
                      <div className="flex items-center justify-between pt-1">
                        <div className="inline-flex items-center gap-3 rounded-full border border-border px-3 py-1">
                          <button
                            type="button"
                            onClick={() => setQty(k, item.qty - 1)}
                            aria-label="Decrease quantity"
                          >
                            <Minus size={13} />
                          </button>
                          <span className="w-4 text-center text-sm">{item.qty}</span>
                          <button
                            type="button"
                            onClick={() => setQty(k, item.qty + 1)}
                            aria-label="Increase quantity"
                          >
                            <Plus size={13} />
                          </button>
                        </div>
                        <p className="text-sm">{rupees(item.price * item.qty)}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <footer className="space-y-3 border-t border-border px-6 py-5">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Subtotal</span>
                <span>{rupees(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Shipping</span>
                <span>{shipping === 0 ? "Free" : rupees(shipping)}</span>
              </div>
              <div className="flex justify-between text-base font-medium">
                <span>Total</span>
                <span>{rupees(total)}</span>
              </div>
              <div className="flex flex-col gap-2 pt-1">
                <Link
                  to="/checkout"
                  onClick={() => setCartOpen(false)}
                  className="btn-primary w-full"
                >
                  Proceed to checkout
                </Link>
                <Link to="/cart" onClick={() => setCartOpen(false)} className="btn-ghost w-full">
                  View full cart
                </Link>
              </div>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}
