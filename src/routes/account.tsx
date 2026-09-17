import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "Account — MarkMyPlace" },
      { name: "description", content: "Your saved MarkMyPlace bag and wishlist information." },
      { property: "og:title", content: "Account — MarkMyPlace" },
      { property: "og:description", content: "Your saved bag and wishlist information." },
    ],
  }),
  component: Account,
});

function Account() {
  return (
    <div className="mx-auto max-w-md px-5 py-20">
      <h1 className="text-4xl">Your account</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        Accounts are coming soon. For now, your bag and wishlist are saved right here on your
        device.
      </p>
      <form
        className="card-soft mt-8 space-y-4 p-6"
        onSubmit={(e) => e.preventDefault()}
      >
        <label className="block space-y-1.5 text-sm">
          <span className="text-muted-foreground">Email</span>
          <input
            type="email"
            required
            placeholder="you@example.com"
            className="w-full rounded-2xl border border-border bg-card px-4 py-3 text-sm outline-none focus:border-primary"
          />
        </label>
        <button type="submit" className="btn-primary w-full">
          Notify me when accounts launch
        </button>
      </form>
      <Link to="/shop" className="btn-ghost mt-6">
        Back to shopping
      </Link>
    </div>
  );
}
