import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { Heart, Minus, Plus, Truck } from "lucide-react";
import { useState } from "react";
import { FoldDiagram } from "@/components/HowItWorks";
import { ProductCard } from "@/components/ProductCard";
import { Reviews } from "@/components/Reviews";
import { getProduct, products, rupees } from "@/lib/products";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Unavailable — Pagehug" }, { name: "robots", content: "noindex" }] };
    }
    const p = loaderData.product;
    return {
      meta: [
        { title: `${p.name} Magnetic Bookmark — Pagehug` },
        { name: "description", content: `${p.tagline}. ${p.description}` },
        { property: "og:title", content: `${p.name} — Pagehug` },
        { property: "og:description", content: p.tagline },
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { add, wishlist, toggleWish } = useStore();
  const navigate = useNavigate();
  const [img, setImg] = useState(0);
  const [design, setDesign] = useState(product.designs[0]);
  const [qty, setQty] = useState(1);
  const wished = wishlist.includes(product.id);

  const addToCart = () =>
    add(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        variant: design,
      },
      qty,
    );

  const related = products.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8 lg:py-14">
      <nav className="mb-8 text-xs text-muted-foreground">
        <Link to="/shop" className="hover:text-foreground">
          Shop
        </Link>{" "}
        / <span>{product.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="space-y-4">
          <img
            src={product.gallery[img]}
            alt={`${product.name} magnetic bookmark`}
            className="aspect-square w-full rounded-4xl object-cover shadow-[var(--shadow-soft)]"
          />
          <div className="flex gap-3">
            {product.gallery.map((g, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setImg(i)}
                aria-label={`View image ${i + 1}`}
                className={`overflow-hidden rounded-2xl border transition-colors ${
                  i === img ? "border-primary" : "border-border"
                }`}
              >
                <img src={g} alt="" loading="lazy" className="h-20 w-20 object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <p className="eyebrow">{product.category}</p>
            <h1 className="text-4xl sm:text-5xl">{product.name}</h1>
            <p className="text-2xl">
              {rupees(product.price)}{" "}
              <span className="text-base text-muted-foreground line-through">
                {rupees(product.mrp)}
              </span>
            </p>
            <p className="text-muted-foreground">{product.description}</p>
          </div>

          <div className="space-y-2">
            <p className="eyebrow">Design</p>
            <div className="flex flex-wrap gap-2">
              {product.designs.map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDesign(d)}
                  className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                    design === d
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card hover:bg-sand"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-4 rounded-full border border-border px-4 py-2.5">
              <button
                type="button"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
              >
                <Minus size={14} />
              </button>
              <span className="w-5 text-center text-sm">{qty}</span>
              <button type="button" onClick={() => setQty((q) => q + 1)} aria-label="Increase quantity">
                <Plus size={14} />
              </button>
            </div>
            <button type="button" className="btn-primary" onClick={addToCart}>
              Add to cart
            </button>
            <button
              type="button"
              className="btn-ghost"
              onClick={() => {
                addToCart();
                navigate({ to: "/checkout" });
              }}
            >
              Buy now
            </button>
            <button
              type="button"
              onClick={() => toggleWish(product.id)}
              aria-label="Toggle wishlist"
              className="grid h-11 w-11 place-items-center rounded-full border border-border transition-colors hover:bg-sand"
            >
              <Heart size={16} className={wished ? "fill-primary text-primary" : ""} />
            </button>
          </div>

          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            <Truck size={16} /> Free shipping over ₹499 · Delivered in 2–7 days across India
          </p>

          <dl className="card-soft divide-y divide-border p-6 text-sm">
            <div className="grid grid-cols-3 gap-4 pb-3">
              <dt className="text-muted-foreground">Dimensions</dt>
              <dd className="col-span-2">50 × 25 mm folded (50 × 50 mm open)</dd>
            </div>
            <div className="grid grid-cols-3 gap-4 py-3">
              <dt className="text-muted-foreground">Materials</dt>
              <dd className="col-span-2">300gsm laminated art card, two neodymium magnets</dd>
            </div>
            <div className="grid grid-cols-3 gap-4 pt-3">
              <dt className="text-muted-foreground">Care</dt>
              <dd className="col-span-2">Wipe with a dry cloth. Keep away from screens and cards.</dd>
            </div>
          </dl>

          <div className="card-soft flex flex-col items-center gap-4 p-6 text-foreground sm:flex-row">
            <FoldDiagram />
            <p className="text-sm text-muted-foreground">
              Open, fold around the page, and the magnets lock. That's the whole instruction manual.
            </p>
          </div>
        </div>
      </div>

      <div className="-mx-5 mt-8">
        <Reviews
          productId={product.id}
          eyebrow="Reader reviews"
          heading={`Readers love ${product.name}`}
        />
      </div>

      <section className="mt-8">
        <h2 className="text-3xl">You might also love</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
