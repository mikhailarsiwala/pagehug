import { createFileRoute } from "@tanstack/react-router";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/products";

export const Route = createFileRoute("/bestsellers")({
  head: () => ({
    meta: [
      { title: "Bestselling Magnetic Bookmarks — Pagehug" },
      {
        name: "description",
        content: "The Pagehug designs readers keep coming back for, starting at ₹60.",
      },
      { property: "og:title", content: "Bestsellers — Pagehug" },
      { property: "og:description", content: "The designs readers keep coming back for." },
    ],
  }),
  component: Bestsellers,
});

function Bestsellers() {
  const list = products.filter((p) => p.bestseller);
  return (
    <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8 lg:py-16">
      <div className="max-w-xl space-y-3">
        <p className="eyebrow">Crowd favourites</p>
        <h1 className="text-4xl sm:text-5xl">The ones that sell out.</h1>
        <p className="text-muted-foreground">
          Voted for with wallets by a few thousand very serious readers.
        </p>
      </div>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
