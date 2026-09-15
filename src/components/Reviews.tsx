import { Star } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Stars } from "@/components/Stars";
import { useReviews } from "@/lib/reviews";

function RatingPicker({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          aria-label={`${n} star${n > 1 ? "s" : ""}`}
          onClick={() => onChange(n)}
          className="transition-transform hover:scale-110"
        >
          <Star
            size={22}
            className={n <= value ? "fill-gold text-gold" : "text-border"}
          />
        </button>
      ))}
    </div>
  );
}

export function Reviews({
  productId,
  heading = "Readers Are Obsessed.",
  eyebrow = "Reviews",
}: {
  productId?: string | undefined;
  heading?: string;
  eyebrow?: string;
}) {
  const { reviews, count, average, submit } = useReviews(productId);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [done, setDone] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim().slice(0, 60);
    const city = String(data.get("city") ?? "").trim().slice(0, 60);
    const text = String(data.get("text") ?? "").trim().slice(0, 600);
    if (!name || !text) return;
    submit({ name, city, rating, text });
    e.currentTarget.reset();
    setRating(5);
    setOpen(false);
    setDone(true);
  };

  return (
    <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
      <div className="flex flex-wrap items-end justify-between gap-5">
        <div className="max-w-xl space-y-3">
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="text-4xl sm:text-5xl">{count > 0 ? heading : "Be the first to review."}</h2>
          {count > 0 ? (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Stars rating={average} />
              <span>
                {average.toFixed(1)} · {count} {count === 1 ? "review" : "reviews"}
              </span>
            </div>
          ) : (
            <p className="text-muted-foreground">
              No reviews yet. If a bookmark has earned a spot in your book, tell us about it.
            </p>
          )}
        </div>
        <button type="button" className="btn-primary" onClick={() => setOpen((v) => !v)}>
          {open ? "Cancel" : "Write a review"}
        </button>
      </div>

      {done && !open ? (
        <p className="mt-6 text-sm text-sage">Thanks — your review is up.</p>
      ) : null}

      {open ? (
        <form onSubmit={onSubmit} className="card-soft mt-8 space-y-4 p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-1.5 text-sm">
              <span className="text-muted-foreground">Your name</span>
              <input
                required
                name="name"
                maxLength={60}
                className="w-full rounded-2xl border border-border bg-card px-4 py-3 text-sm outline-none focus:border-primary"
              />
            </label>
            <label className="space-y-1.5 text-sm">
              <span className="text-muted-foreground">City (optional)</span>
              <input
                name="city"
                maxLength={60}
                className="w-full rounded-2xl border border-border bg-card px-4 py-3 text-sm outline-none focus:border-primary"
              />
            </label>
          </div>
          <div className="space-y-1.5 text-sm">
            <span className="text-muted-foreground">Rating</span>
            <RatingPicker value={rating} onChange={setRating} />
          </div>
          <label className="space-y-1.5 text-sm">
            <span className="text-muted-foreground">Your review</span>
            <textarea
              required
              name="text"
              rows={4}
              maxLength={600}
              className="w-full rounded-2xl border border-border bg-card px-4 py-3 text-sm outline-none focus:border-primary"
            />
          </label>
          <button type="submit" className="btn-primary">
            Post review
          </button>
        </form>
      ) : null}

      {count > 0 ? (
        <div className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4">
          {reviews.map((r) => (
            <figure
              key={r.id}
              className="card-soft w-[min(85vw,22rem)] shrink-0 snap-start space-y-4 p-6"
            >
              <Stars rating={r.rating} />
              <blockquote className="text-sm leading-relaxed text-foreground">
                “{r.text}”
              </blockquote>
              <figcaption className="text-xs text-muted-foreground">
                {r.name}
                {r.city ? ` · ${r.city}` : ""}
              </figcaption>
            </figure>
          ))}
        </div>
      ) : null}
    </section>
  );
}
