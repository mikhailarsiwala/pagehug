import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { rupees } from "@/lib/products";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Pagehug" },
      { name: "description", content: "Secure checkout with UPI, cards, net banking and wallets." },
      { property: "og:title", content: "Checkout — Pagehug" },
      { property: "og:description", content: "UPI, cards, net banking and wallets supported." },
    ],
  }),
  component: Checkout,
});

const PAYMENTS = ["UPI", "Credit / Debit Card", "Net Banking", "Wallets"];

const FIELDS = [
  { name: "name", label: "Full name", type: "text", span: 2 },
  { name: "email", label: "Email", type: "email", span: 1 },
  { name: "phone", label: "Phone", type: "tel", span: 1 },
  { name: "address", label: "Address", type: "text", span: 2 },
  { name: "city", label: "City", type: "text", span: 1 },
  { name: "state", label: "State", type: "text", span: 1 },
  { name: "pincode", label: "Pincode", type: "text", span: 1 },
] as const;

function Checkout() {
  const { items, subtotal, shipping, total, clear } = useStore();
  const [payment, setPayment] = useState(PAYMENTS[0]);
  const [placed, setPlaced] = useState(false);

  if (placed) {
    return (
      <div className="mx-auto max-w-xl px-5 py-24 text-center">
        <CheckCircle2 size={40} className="mx-auto text-sage" />
        <h1 className="mt-6 text-4xl">Order placed.</h1>
        <p className="mt-3 text-muted-foreground">
          Your bookmarks are being packed. We've emailed you the details and tracking will follow.
        </p>
        <Link to="/shop" className="btn-primary mt-8">
          Keep shopping
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-5 py-24 text-center">
        <h1 className="text-4xl">Nothing to check out</h1>
        <p className="mt-3 text-muted-foreground">Add a bookmark or two first.</p>
        <Link to="/shop" className="btn-primary mt-8">
          Shop bookmarks
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-5 py-12 lg:py-16">
      <h1 className="text-4xl sm:text-5xl">Checkout</h1>
      <form
        className="mt-10 grid gap-10 lg:grid-cols-[1.5fr_1fr]"
        onSubmit={(e) => {
          e.preventDefault();
          clear();
          setPlaced(true);
        }}
      >
        <div className="space-y-8">
          <section className="space-y-4">
            <h2 className="text-xl">Delivery details</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {FIELDS.map((f) => (
                <label
                  key={f.name}
                  className={`space-y-1.5 text-sm ${f.span === 2 ? "sm:col-span-2" : ""}`}
                >
                  <span className="text-muted-foreground">{f.label}</span>
                  <input
                    required
                    name={f.name}
                    type={f.type}
                    className="w-full rounded-2xl border border-border bg-card px-4 py-3 text-sm outline-none focus:border-primary"
                  />
                </label>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl">Payment method</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {PAYMENTS.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPayment(p)}
                  className={`rounded-2xl border px-5 py-4 text-left text-sm transition-colors ${
                    payment === p ? "border-primary bg-sand" : "border-border bg-card hover:bg-sand"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              This is a demo checkout — no real payment is taken yet.
            </p>
          </section>
        </div>

        <aside className="card-soft h-fit space-y-4 p-6">
          <h2 className="text-xl">Order summary</h2>
          <div className="space-y-3">
            {items.map((i) => (
              <div key={`${i.id}-${i.variant}`} className="flex items-center gap-3 text-sm">
                <img src={i.image} alt="" loading="lazy" className="h-14 w-12 rounded-xl object-cover" />
                <div className="flex-1">
                  <p>{i.name}</p>
                  <p className="text-xs text-muted-foreground">Qty {i.qty}</p>
                </div>
                <span>{rupees(i.price * i.qty)}</span>
              </div>
            ))}
          </div>
          <div className="space-y-2 border-t border-border pt-3 text-sm text-muted-foreground">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{rupees(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{shipping === 0 ? "Free" : rupees(shipping)}</span>
            </div>
          </div>
          <div className="flex justify-between border-t border-border pt-3 text-base font-medium">
            <span>Total</span>
            <span>{rupees(total)}</span>
          </div>
          <button type="submit" className="btn-primary w-full">
            Pay {rupees(total)}
          </button>
        </aside>
      </form>
    </div>
  );
}
