import { createFileRoute, Link } from "@tanstack/react-router";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/products";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [
      { title: "Your Wishlist — MarkMyPlace" },
      { name: "description", content: "The magnetic bookmark designs you've saved for later." },
      { property: "og:title", content: "Your Wishlist — MarkMyPlace" },
      { property: "og:description", content: "Designs you've saved for later." },
    ],
  }),
  component: Wishlist,
});

function Wishlist() {
  const { wishlist } = useStore();
  const list = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8 lg:py-16">
      <h1 className="text-4xl sm:text-5xl">Saved for later</h1>
      {list.length === 0 ? (
        <div className="card-soft mt-10 space-y-4 p-10 text-center">
          <p className="text-muted-foreground">
            No favourites yet. Tap the heart on any design you love.
          </p>
          <Link to="/shop" className="btn-primary">
            Browse designs
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
