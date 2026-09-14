import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/shipping")({
  head: () => ({
    meta: [
      { title: "Shipping & Returns — Pagehug" },
      {
        name: "description",
        content: "India-wide shipping in 2–7 days, free over ₹499, and easy 7-day returns.",
      },
      { property: "og:title", content: "Shipping & Returns — Pagehug" },
      { property: "og:description", content: "India-wide delivery and easy 7-day returns." },
    ],
  }),
  component: Shipping,
});

function Shipping() {
  return (
    <article className="mx-auto max-w-2xl space-y-6 px-5 py-16">
      <h1 className="text-4xl">Shipping &amp; Returns</h1>
      <p className="text-muted-foreground">
        We ship across India. Orders over ₹499 ship free; below that it's a flat ₹49.
      </p>
      <h2 className="text-2xl">Delivery times</h2>
      <p className="text-muted-foreground">
        Metro cities: 2–4 working days. Rest of India: 4–7 working days. Orders are dispatched
        within 24 hours on working days, and tracking arrives by email and SMS.
      </p>
      <h2 className="text-2xl">Returns</h2>
      <p className="text-muted-foreground">
        Unused bookmarks can be returned within 7 days of delivery for a full refund. If something
        arrives damaged, send us a photo at hello@pagehug.in and we'll replace it immediately.
      </p>
    </article>
  );
}
