import { createFileRoute } from "@tanstack/react-router";
import { BundleGrid } from "@/components/BundleGrid";

export const Route = createFileRoute("/bundles")({
  head: () => ({
    meta: [
      { title: "Bookmark Bundles & Gift Sets — MarkMyPlace" },
      {
        name: "description",
        content: "Save on sets of 3 and 5 magnetic bookmarks. Gift-ready sleeves, shipped India-wide.",
      },
      { property: "og:title", content: "More Books. More Bookmarks. — MarkMyPlace" },
      { property: "og:description", content: "Bundle up and save on gift-ready bookmark sets." },
    ],
  }),
  component: Bundles,
});

function Bundles() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8 lg:py-16">
      <div className="max-w-xl space-y-3">
        <p className="eyebrow">Bundles</p>
        <h1 className="text-4xl sm:text-5xl">More Books. More Bookmarks.</h1>
        <p className="text-muted-foreground">
          Buy more, save more, gift better. Every set arrives in a kraft sleeve.
        </p>
      </div>
      <div className="mt-10">
        <BundleGrid />
      </div>
    </div>
  );
}
