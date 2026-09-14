import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — Pagehug" },
      { name: "description", content: "The terms that apply when you shop with Pagehug." },
      { property: "og:title", content: "Terms of Service — Pagehug" },
      { property: "og:description", content: "The terms that apply when you shop with us." },
    ],
  }),
  component: Terms,
});

function Terms() {
  return (
    <article className="mx-auto max-w-2xl space-y-6 px-5 py-16">
      <h1 className="text-4xl">Terms of Service</h1>
      <p className="text-muted-foreground">
        By placing an order with Pagehug you agree to these terms. Prices are in Indian Rupees and
        include applicable taxes.
      </p>
      <h2 className="text-2xl">Orders</h2>
      <p className="text-muted-foreground">
        We may cancel and refund an order if a design is out of stock or a pricing error occurs.
      </p>
      <h2 className="text-2xl">Product care</h2>
      <p className="text-muted-foreground">
        Our bookmarks contain magnets. Keep them away from screens, cards with magnetic strips and
        small children.
      </p>
    </article>
  );
}
