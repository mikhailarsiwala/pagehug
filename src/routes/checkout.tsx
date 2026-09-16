import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, CheckCircle2 } from "lucide-react";
import { useState, type FormEvent } from "react";
import { rupees } from "@/lib/products";
import { useStore } from "@/lib/store";
import {
  buildOrderFormUrl,
  orderFormConfigured,
} from "@/lib/orderForm";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Pagehug" },
      { name: "description", content: "Send a Pagehug order request with your delivery and payment preference." },
      { property: "og:title", content: "Checkout — Pagehug" },
      { property: "og:description", content: "Review your order and send your delivery details." },
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

function orderDetailsText(
  items: { name: string; variant?: string | undefined; price: number; qty: number }[],
  subtotal: number,
  shipping: number,
  total: number,
) {
  const lines = items.map(
    (i) =>
      `${i.qty} × ${i.name}${i.variant ? ` — ${i.variant}` : ""} (${rupees(i.price * i.qty)})`,
  );
  lines.push(`Subtotal: ${rupees(subtotal)}`);
  lines.push(`Shipping: ${shipping === 0 ? "Free" : rupees(shipping)}`);
  lines.push(`Total: ${rupees(total)}`);
  return lines.join("\n");
}

function Checkout() {
  const { items, subtotal, shipping, total, clear } = useStore();
  const [payment, setPayment] = useState(PAYMENTS[0]);
  const [placed, setPlaced] = useState<string | null>(null);

  const placeOrder = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const get = (key: string) => String(data.get(key) ?? "");
    const fullAddress = [get("address"), get("city"), get("state"), get("pincode")]
      .filter(Boolean)
      .join(", ");
    const formUrl = buildOrderFormUrl({
      name: get("name"),
      email: get("email"),
      phone: get("phone"),
      address: fullAddress,
      city: get("city"),
      state: get("state"),
      pincode: get("pincode"),
      payment,
      orderDetails: `${orderDetailsText(items, subtotal, shipping, total)}\nPreferred payment: ${payment}`,
    });

    if (formUrl) window.open(formUrl, "_blank", "noopener");
    clear();
    setPlaced(formUrl ?? "demo");
  };


  if (placed) {
    const usingForm = placed !== "demo";
    return (
      <div className="mx-auto max-w-xl px-5 py-24 text-center">
        <CheckCircle2 size={40} className="mx-auto text-sage" />
        <h1 className="mt-6 text-4xl">{usingForm ? "One last step." : "Order placed."}</h1>
        {usingForm ? (
          <>
            <p className="mt-3 text-muted-foreground">
              Your details and order summary are ready in the Google Form. Submit that form to
              send your order request. If it did not open, use the button below.
            </p>
            <div>
              <a href={placed} target="_blank" rel="noreferrer" className="btn-primary mt-8">
                Open the order form
              </a>
            </div>
          </>
        ) : (
          <p className="mt-3 text-muted-foreground">Your order request has been recorded.</p>
        )}
        <div>
          <Link to="/shop" className="btn-ghost mt-4">
            Keep shopping
          </Link>
        </div>
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
      <ol aria-label="Checkout progress" className="mt-6 flex items-center gap-2 text-xs sm:text-sm">
        <li className="flex items-center gap-2 text-sage">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-sand"><Check size={14} /></span>
          Bag
        </li>
        <li aria-hidden="true" className="h-px flex-1 bg-border" />
        <li className="flex items-center gap-2 font-medium text-foreground">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-primary text-primary-foreground">2</span>
          Details
        </li>
        <li aria-hidden="true" className="h-px flex-1 bg-border" />
        <li className="flex items-center gap-2 text-muted-foreground">
          <span className="grid h-7 w-7 place-items-center rounded-full border border-border">3</span>
          Confirm
        </li>
      </ol>
      <form
        className="mt-10 grid gap-10 lg:grid-cols-[1.5fr_1fr]"
        onSubmit={placeOrder}
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
            <h2 className="text-xl">Payment preference</h2>
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
              {orderFormConfigured()
                ? "No payment is taken on this page. Continue to the Google Form to send the order; payment is arranged after confirmation."
                : "This is a demo checkout — no real payment is taken yet."}
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
            {orderFormConfigured() ? "Continue to order form" : `Pay ${rupees(total)}`}
          </button>
        </aside>
      </form>
    </div>
  );
}
