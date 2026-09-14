import { Link } from "@tanstack/react-router";
import { Heart, Eye, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { Stars } from "./Stars";
import { QuickView } from "./QuickView";
import { rupees, type Product } from "@/lib/products";
import { useStore } from "@/lib/store";

export function ProductCard({ product }: { product: Product }) {
  const { add, wishlist, toggleWish } = useStore();
  const [quick, setQuick] = useState(false);
  const wished = wishlist.includes(product.id);

  return (
    <>
      <article className="group card-soft overflow-hidden transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[var(--shadow-lift)]">
        <div className="relative overflow-hidden bg-sand">
          <Link to="/product/$id" params={{ id: product.id }}>
            <img
              src={product.image}
              alt={`${product.name} magnetic bookmark`}
              loading="lazy"
              width={912}
              height={912}
              className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </Link>
          {product.bestseller && (
            <span className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1 text-[0.65rem] uppercase tracking-[0.16em] text-foreground backdrop-blur">
              Bestseller
            </span>
          )}
          <button
            type="button"
            onClick={() => toggleWish(product.id)}
            aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
            className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-background/90 backdrop-blur transition-transform hover:scale-110"
          >
            <Heart size={16} className={wished ? "fill-primary text-primary" : "text-foreground"} />
          </button>
          <button
            type="button"
            onClick={() => setQuick(true)}
            className="absolute inset-x-4 bottom-4 translate-y-3 rounded-full bg-background/95 py-2.5 text-sm opacity-0 backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
          >
            <span className="inline-flex items-center gap-2">
              <Eye size={15} /> Quick view
            </span>
          </button>
        </div>

        <div className="space-y-2 p-5">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-lg leading-tight">
              <Link to="/product/$id" params={{ id: product.id }}>
                {product.name}
              </Link>
            </h3>
            <span className="eyebrow shrink-0">{product.category}</span>
          </div>
          <p className="line-clamp-2 text-sm text-muted-foreground">{product.tagline}</p>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Stars rating={product.rating} />
            <span>
              {product.rating} ({product.reviews})
            </span>
          </div>
          <div className="flex items-center justify-between pt-2">
            <p className="text-base font-medium">
              {rupees(product.price)}{" "}
              <span className="text-sm text-muted-foreground line-through">
                {rupees(product.mrp)}
              </span>
            </p>
            <button
              type="button"
              className="btn-primary px-4 py-2 text-xs"
              onClick={() =>
                add({
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  image: product.image,
                  variant: product.designs[0],
                })
              }
            >
              <ShoppingBag size={14} /> Add to cart
            </button>
          </div>
        </div>
      </article>

      {quick && <QuickView product={product} onClose={() => setQuick(false)} />}
    </>
  );
}
