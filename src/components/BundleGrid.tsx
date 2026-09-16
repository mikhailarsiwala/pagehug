import { bundleImage, bundles, rupees } from "@/lib/products";
import { useStore } from "@/lib/store";

export function BundleGrid() {
  const { add } = useStore();

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {bundles.map((b) => {
        const save = b.mrp - b.price;
        return (
          <div
            key={b.id}
            className="card-soft relative flex flex-col overflow-hidden transition-transform duration-500 hover:-translate-y-1.5"
          >
            <img
              src={bundleImage}
              alt={`${b.name} of magnetic bookmarks`}
              loading="lazy"
              className="h-48 w-full object-cover"
            />
            <div className="flex flex-1 flex-col gap-3 p-6">
              <h3 className="text-xl">{b.name}</h3>
              <p className="flex-1 text-sm text-muted-foreground">{b.blurb}</p>
              <p className="text-lg">
                {rupees(b.price)}{" "}
                <span className="text-sm text-muted-foreground line-through">{rupees(b.mrp)}</span>{" "}
                <span className="text-sm text-sage">Save {rupees(save)}</span>
              </p>
              <button
                type="button"
                className="btn-primary w-full"
                onClick={() =>
                  add({ id: b.id, name: b.name, price: b.price, image: bundleImage })
                }
              >
                Add bundle to cart
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
