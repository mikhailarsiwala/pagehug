import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/shipping")({
  head: () => ({
    meta: [
      { title: "Shipping Information — MarkMyPlace" },
      {
        name: "description",
        content: "MarkMyPlace order dispatch and India-wide shipping information.",
      },
      { property: "og:title", content: "Shipping Information — MarkMyPlace" },
      { property: "og:description", content: "Order dispatch and India-wide shipping information." },
    ],
  }),
  component: Shipping,
});

function Shipping() {
  return (
    <article className="mx-auto max-w-2xl space-y-6 px-5 py-16">
      <h1 className="text-4xl">Shipping information</h1>
      <p className="text-muted-foreground">
        We ship across India. Orders over ₹499 ship free; below that it's a flat ₹49.
      </p>
      <h2 className="text-2xl">Dispatch and delivery</h2>
      <p className="text-muted-foreground">
        Orders are dispatched after the order form is received and confirmed. Delivery timing
        depends on the destination and courier availability.
      </p>
    </article>
  );
}
