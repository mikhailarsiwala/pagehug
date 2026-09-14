import { createFileRoute } from "@tanstack/react-router";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

const FAQS = [
  {
    q: "How strong are the magnets?",
    a: "Strong enough to survive a tote bag, gentle enough for thin paperback pages. Two neodymium magnets hold the fold shut with a satisfying click.",
  },
  {
    q: "Will it damage my book?",
    a: "No. The bookmark rests over the page edge and spreads its grip, so there's no crease, tear or ink transfer.",
  },
  {
    q: "What materials are the bookmarks made from?",
    a: "300gsm laminated art card with a matte premium finish and two embedded neodymium magnets.",
  },
  {
    q: "How many bookmarks come in a set?",
    a: "Single, Set of 3, or the Reader's Pack with 5. Bundles arrive in a kraft gift sleeve.",
  },
  {
    q: "Do you ship across India?",
    a: "Yes, all-India shipping. Orders over ₹499 ship free; below that it's a flat ₹49.",
  },
  {
    q: "How long does delivery take?",
    a: "Metro cities usually 2–4 working days, rest of India 4–7. You'll get tracking by email and SMS.",
  },
  {
    q: "Can I gift them?",
    a: "Absolutely — that's most of our orders. Add a free handwritten note at checkout in the order notes.",
  },
  {
    q: "What is your return policy?",
    a: "Unused bookmarks can be returned within 7 days of delivery. Damaged in transit? Message us with a photo and we'll replace it, no fuss.",
  },
];

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Magnetic Bookmarks, Shipping & Returns | Pagehug" },
      {
        name: "description",
        content:
          "Answers on magnet strength, materials, India-wide shipping, delivery times, gifting and returns.",
      },
      { property: "og:title", content: "FAQ — Pagehug" },
      { property: "og:description", content: "Everything about magnets, shipping and returns." },
    ],
  }),
  component: Faq,
});

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="mx-auto max-w-3xl px-5 py-12 lg:py-20">
      <div className="space-y-3">
        <p className="eyebrow">Good questions</p>
        <h1 className="text-4xl sm:text-5xl">Ask away.</h1>
      </div>
      <div className="mt-10 divide-y divide-border border-y border-border">
        {FAQS.map((f, i) => (
          <div key={f.q}>
            <button
              type="button"
              onClick={() => setOpen(open === i ? null : i)}
              className="flex w-full items-center justify-between gap-6 py-5 text-left"
              aria-expanded={open === i}
            >
              <span className="text-base">{f.q}</span>
              {open === i ? <Minus size={16} /> : <Plus size={16} />}
            </button>
            {open === i && <p className="pb-5 text-sm text-muted-foreground">{f.a}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
