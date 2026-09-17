import { createFileRoute, Link } from "@tanstack/react-router";
import life2 from "@/assets/life-2.jpg";
import { HowItWorks } from "@/components/HowItWorks";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our Story — MarkMyPlace Magnetic Bookmarks" },
      {
        name: "description",
        content:
          "MarkMyPlace makes magnetic bookmarks in India for readers who love their books too much to fold them.",
      },
      { property: "og:title", content: "Our Story — MarkMyPlace" },
      { property: "og:description", content: "Small studio, strong magnets, a lot of books." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <>
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-12 lg:grid-cols-2 lg:px-8 lg:py-20">
        <div className="space-y-5">
          <p className="eyebrow">Our story</p>
          <h1 className="text-4xl sm:text-5xl">For people who dog-ear books emotionally.</h1>
          <p className="text-muted-foreground">
            MarkMyPlace started in a very small room with a very tall to-be-read pile. We were tired of
            paper bookmarks sliding out and tired of folding corners we'd later regret.
          </p>
          <p className="text-muted-foreground">
            So we made one that holds on: two slim magnets, a premium matte finish, and designs that
            actually feel like you. Printed and packed in India, priced so you can buy one for every
            book on the pile.
          </p>
          <Link to="/shop" className="btn-primary">
            Shop the collection
          </Link>
        </div>
        <img
          src={life2}
          alt="Study desk with books, notebooks and warm lamp light"
          loading="lazy"
          className="w-full rounded-4xl object-cover shadow-[var(--shadow-lift)]"
        />
      </section>
      <HowItWorks />
    </>
  );
}
