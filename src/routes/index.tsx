import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Feather, Magnet, Sparkles } from "lucide-react";
import hero from "@/assets/hero.jpg";
import life1 from "@/assets/life-1.jpg";
import life2 from "@/assets/life-2.jpg";
import life3 from "@/assets/life-3.jpg";
import life4 from "@/assets/life-4.jpg";
import { ProductCard } from "@/components/ProductCard";
import { Reviews } from "@/components/Reviews";
import { BundleGrid } from "@/components/BundleGrid";
import { HowItWorks } from "@/components/HowItWorks";
import { products } from "@/lib/products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pagehug — Magnetic Bookmarks That Never Fall Out" },
      {
        name: "description",
        content:
          "Premium magnetic bookmarks from ₹60. Strong magnets, premium finish, made for everyday reading. Free shipping across India over ₹499.",
      },
      { property: "og:title", content: "Pagehug — Never Lose Your Page Again" },
      {
        property: "og:description",
        content: "Magnetic bookmarks designed to stay put, look good, and make reading better.",
      },
    ],
  }),
  component: Home,
});

const BENEFITS = [
  {
    icon: Magnet,
    title: "Stays in Place",
    body: "Strong magnetic closure keeps your page securely marked, even in a packed tote bag.",
  },
  {
    icon: BookOpen,
    title: "No More Falling Out",
    body: "Unlike paper bookmarks, it folds over the page and simply refuses to slip.",
  },
  {
    icon: Feather,
    title: "Book-Friendly",
    body: "Compact and lightweight, designed to hold the page without creasing or marking it.",
  },
  {
    icon: Sparkles,
    title: "Looks Good",
    body: "Functional stationery with personality. Your shelf is about to get a lot more you.",
  },
];

const GALLERY = [life1, life2, life3, life4];

function Home() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-5 pb-16 pt-10 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:pb-24 lg:pt-16">
        <div className="fade-up space-y-6">
          <p className="eyebrow">Magnetic bookmarks · Made in India</p>
          <h1 className="text-[2.6rem] leading-[1.05] sm:text-6xl">Never Lose Your Page Again.</h1>
          <p className="max-w-md text-base text-muted-foreground sm:text-lg">
            Magnetic bookmarks designed to stay put, look good, and make every reading session
            better.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/shop" className="btn-primary">
              Shop Bookmarks <ArrowRight size={16} />
            </Link>
            <a href="#designs" className="btn-ghost">
              Explore Designs
            </a>
          </div>
          <p className="text-xs tracking-wide text-muted-foreground">
            Strong magnets • Premium finish • Made for everyday reading
          </p>
        </div>

        <div className="fade-up relative">
          <img
            src={hero}
            alt="Magnetic bookmark clipped onto the page of an open book"
            width={1408}
            height={1104}
            className="w-full rounded-4xl object-cover shadow-[var(--shadow-lift)]"
          />
        </div>
      </section>

      {/* Why magnetic */}
      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24">
        <div className="max-w-xl space-y-3">
          <p className="eyebrow">Why magnetic?</p>
          <h2 className="text-4xl sm:text-5xl">Small Bookmark. Big Upgrade.</h2>
          <p className="text-muted-foreground">
            It folds over the page, two magnets click together, and that's it. Your place is safe.
          </p>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map((b) => (
            <div
              key={b.title}
              className="card-soft group p-6 transition-transform duration-500 hover:-translate-y-1.5"
            >
              <span className="grid h-11 w-11 place-items-center rounded-full bg-sand text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <b.icon size={18} />
              </span>
              <h3 className="mt-5 text-lg">{b.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{b.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Products */}
      <section id="designs" className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="space-y-3">
            <p className="eyebrow">The collection</p>
            <h2 className="text-4xl sm:text-5xl">Find Your Perfect Bookmark</h2>
          </div>
          <Link to="/shop" className="btn-ghost">
            View all designs <ArrowRight size={15} />
          </Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Bundles */}
      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
        <div className="max-w-xl space-y-3">
          <p className="eyebrow">Bundles</p>
          <h2 className="text-4xl sm:text-5xl">More Books. More Bookmarks.</h2>
          <p className="text-muted-foreground">
            Reading three at once? Same. Bundle up and save while you're at it.
          </p>
        </div>
        <div className="mt-10">
          <BundleGrid />
        </div>
      </section>

      <HowItWorks />

      <Reviews />

      {/* Social */}
      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
        <div className="max-w-xl space-y-3">
          <p className="eyebrow">@pagehug</p>
          <h2 className="text-4xl sm:text-5xl">Made for Your Bookshelf.</h2>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {GALLERY.map((src, i) => (
            <img
              key={i}
              src={src}
              alt="Reading corner with books, coffee and magnetic bookmarks"
              loading="lazy"
              className="aspect-square w-full rounded-3xl object-cover transition-transform duration-500 hover:scale-[1.03]"
            />
          ))}
        </div>
        <div className="mt-8">
          <a href="https://instagram.com" className="btn-ghost">
            Follow the Reading Club <ArrowRight size={15} />
          </a>
        </div>
      </section>
    </>
  );
}
