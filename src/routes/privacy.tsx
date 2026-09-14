import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Pagehug" },
      { name: "description", content: "How Pagehug collects, uses and protects your information." },
      { property: "og:title", content: "Privacy Policy — Pagehug" },
      { property: "og:description", content: "How we handle your information." },
    ],
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <article className="mx-auto max-w-2xl space-y-6 px-5 py-16">
      <h1 className="text-4xl">Privacy Policy</h1>
      <p className="text-muted-foreground">
        We collect only what we need to deliver your order: your name, contact details and shipping
        address. We never sell your data.
      </p>
      <h2 className="text-2xl">Payments</h2>
      <p className="text-muted-foreground">
        Payments are processed by our payment partner. Card and UPI details never touch our servers.
      </p>
      <h2 className="text-2xl">Your choices</h2>
      <p className="text-muted-foreground">
        Write to hello@pagehug.in any time to access, correct or delete your information, or to
        unsubscribe from emails.
      </p>
    </article>
  );
}
