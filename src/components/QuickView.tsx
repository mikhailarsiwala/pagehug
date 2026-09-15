import { Link } from "@tanstack/react-router";
import { X } from "lucide-react";
import { useState } from "react";
import { Stars } from "./Stars";
import { rupees, type Product } from "@/lib/products";
import { useStore } from "@/lib/store";

export function QuickView({ product, onClose }: { product: Product; onClose: () => void }) {
  const { add } = useStore();
  const [design, setDesign] = useState(product.designs[0]);

  return (
    <div className="fixed inset-0 z-60 flex items-end justify-center bg-ink/40 p-0 backdrop-blur-sm sm:items-center sm:p-6">
      <div className="fade-up relative w-full max-w-3xl overflow-hidden rounded-t-4xl bg-card sm:rounded-4xl">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close quick view"
          className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full bg-background/90"
        >
          <X size={16} />
        </button>
        <div className="grid gap-0 sm:grid-cols-2">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="aspect-square w-full object-cover"
          />
          <div className="space-y-4 p-6 sm:p-8">
            <p className="eyebrow">{product.category}</p>
            <h3 className="text-2xl">{product.name}</h3>
            <p className="text-sm text-muted-foreground">{product.description}</p>
            <p className="text-xl">{rupees(product.price)}</p>
            <div className="flex flex-wrap gap-2">
              {product.designs.map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDesign(d)}
                  className={`rounded-full border px-4 py-1.5 text-xs transition-colors ${
                    design === d ? "border-primary bg-primary text-primary-foreground" : "bg-card"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                type="button"
                className="btn-primary"
                onClick={() => {
                  add({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    variant: design,
                  });
                  onClose();
                }}
              >
                Add to cart
              </button>
              <Link
                to="/product/$id"
                params={{ id: product.id }}
                onClick={onClose}
                className="btn-ghost"
              >
                Full details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
