import { createFileRoute } from "@tanstack/react-router";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/products";

export const Route = createFileRoute("/bestsellers")({
  head: () => ({
    meta: [
      { title: "Bestselling Magnetic Bookmarks — MarkMyPlace" },
      {
        name: "description",
        content: "A featured collection of MarkMyPlace magnetic bookmark designs, starting at ₹60.",
      },
      { property: "og:title", content: "Bestsellers — MarkMyPlace" },
      { property: "og:description", content: "A featured collection of magnetic bookmark designs." },
    ],
  }),
  component: Bestsellers,
});

function Bestsellers() {
  const list = products.filter((p) => p.bestseller);
  return (
    <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8 lg:py-16">
      <div className="max-w-xl space-y-3">
        <p className="eyebrow">Bestsellers</p>
        <h1 className="text-4xl sm:text-5xl">Featured favourites.</h1>
        <p className="text-muted-foreground">
          A handpicked set of MarkMyPlace designs, ready for your next chapter.
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
