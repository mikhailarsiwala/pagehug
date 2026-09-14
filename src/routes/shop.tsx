import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ProductCard } from "@/components/ProductCard";
import { CATEGORIES, products } from "@/lib/products";

type ShopSearch = { q?: string; category?: string };

export const Route = createFileRoute("/shop")({
  validateSearch: (search: Record<string, unknown>): ShopSearch => ({
    q: typeof search.q === "string" && search.q ? search.q : undefined,
    category:
      typeof search.category === "string" && search.category ? search.category : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Shop Magnetic Bookmarks — Pagehug" },
      {
        name: "description",
        content:
          "Browse every Pagehug magnetic bookmark design from ₹60 — motivational, sports, movies, scenery and book lover.",
      },
      { property: "og:title", content: "Shop Magnetic Bookmarks — Pagehug" },
      {
        property: "og:description",
        content: "Every design, from ₹60. Strong magnets, premium finish.",
      },
    ],
  }),
  component: Shop,
});

function Shop() {
  const { q, category } = Route.useSearch();
  const navigate = useNavigate({ from: "/shop" });
  const active = category ?? "All";

  const list = products.filter((p) => {
    const matchCat = active === "All" || p.category === active;
    const needle = (q ?? "").toLowerCase().trim();
    const matchQ =
      !needle ||
      [p.name, p.tagline, p.description, p.category].join(" ").toLowerCase().includes(needle);
    return matchCat && matchQ;
  });

  return (
    <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8 lg:py-16">
      <div className="max-w-xl space-y-3">
        <p className="eyebrow">The collection</p>
        <h1 className="text-4xl sm:text-5xl">Find Your Perfect Bookmark</h1>
        <p className="text-muted-foreground">Your page deserves better. Pick your personality.</p>
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 py-1">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() =>
                navigate({
                  search: (prev) => ({ ...prev, category: c === "All" ? undefined : c }),
                })
              }
              className={`shrink-0 rounded-full border px-4 py-2 text-sm transition-colors ${
                active === c
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card hover:bg-sand"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <input
          value={q ?? ""}
          onChange={(e) =>
            navigate({ search: (prev) => ({ ...prev, q: e.target.value || undefined }) })
          }
          placeholder="Search designs…"
          className="w-full rounded-full border border-border bg-card px-5 py-2.5 text-sm outline-none placeholder:text-muted-foreground focus:border-primary sm:w-64"
        />
      </div>

      {list.length === 0 ? (
        <p className="py-20 text-center text-muted-foreground">
          No bookmarks match that. Try another design or clear the search.
        </p>
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
