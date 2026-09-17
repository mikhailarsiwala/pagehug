import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2 } from "lucide-react";
import { rupees } from "@/lib/products";
import { cartKey, useStore } from "@/lib/store";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Bag — MarkMyPlace" },
      { name: "description", content: "Review your magnetic bookmarks before checkout." },
      { property: "og:title", content: "Your Bag — MarkMyPlace" },
      { property: "og:description", content: "Review your magnetic bookmarks before checkout." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { items, setQty, remove, subtotal, shipping, total } = useStore();

  return (
    <div className="mx-auto max-w-5xl px-5 py-12 lg:py-16">
      <h1 className="text-4xl sm:text-5xl">Your bag</h1>

      {items.length === 0 ? (
        <div className="card-soft mt-10 space-y-4 p-10 text-center">
          <p className="text-muted-foreground">Nothing here yet. Your page deserves better.</p>
          <Link to="/shop" className="btn-primary">
            Shop bookmarks
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-10 lg:grid-cols-[1.6fr_1fr]">
          <div className="divide-y divide-border border-y border-border">
            {items.map((item) => {
              const k = cartKey(item);
              return (
                <div key={k} className="flex gap-5 py-5">
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    className="h-28 w-24 rounded-2xl object-cover"
                  />
                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        {item.variant && (
                          <p className="text-xs text-muted-foreground">{item.variant}</p>
                        )}
                      </div>
                      <p className="text-sm">{rupees(item.price * item.qty)}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="inline-flex items-center gap-4 rounded-full border border-border px-4 py-1.5">
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
                      <button
                        type="button"
                        onClick={() => remove(k)}
                        className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary"
                      >
                        <Trash2 size={13} /> Remove
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <aside className="card-soft h-fit space-y-3 p-6">
            <h2 className="text-xl">Summary</h2>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Subtotal</span>
              <span>{rupees(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Shipping</span>
              <span>{shipping === 0 ? "Free" : rupees(shipping)}</span>
            </div>
            <div className="flex justify-between border-t border-border pt-3 text-base font-medium">
              <span>Total</span>
              <span>{rupees(total)}</span>
            </div>
            <Link to="/checkout" className="btn-primary mt-2 w-full">
              Proceed to checkout
            </Link>
            <p className="text-center text-xs text-muted-foreground">
              Free shipping on orders over ₹499
            </p>
          </aside>
        </div>
      )}
    </div>
  );
}
