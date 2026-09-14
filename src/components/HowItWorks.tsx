const STEPS = [
  { n: "01", title: "Open", body: "Place the bookmark over the page you're on." },
  { n: "02", title: "Fold", body: "Let the two sides meet around the page." },
  { n: "03", title: "Keep Reading", body: "The magnets lock together and keep your place." },
];

export function FoldDiagram() {
  return (
    <svg viewBox="0 0 320 140" className="w-full max-w-sm" role="img" aria-label="Diagram showing the bookmark folding over a page">
      <g fill="none" strokeWidth="2" stroke="currentColor" opacity="0.35">
        <rect x="14" y="30" width="80" height="90" rx="4" />
        <rect x="124" y="30" width="80" height="90" rx="4" />
        <rect x="234" y="30" width="72" height="90" rx="4" />
      </g>
      <g fill="var(--primary)">
        <path d="M40 14h28v44a4 4 0 0 1-4 4H44a4 4 0 0 1-4-4z" opacity="0.9" />
        <path d="M150 14h28v30l-14 10-14-10z" opacity="0.9" />
        <path d="M258 18h26v26a13 13 0 0 1-26 0z" opacity="0.9" />
      </g>
      <g fill="var(--gold)">
        <circle cx="54" cy="52" r="3" />
        <circle cx="164" cy="40" r="3" />
        <circle cx="271" cy="34" r="3" />
      </g>
    </svg>
  );
}

export function HowItWorks() {
  return (
    <section className="bg-sand/60 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="max-w-xl space-y-3">
          <p className="eyebrow">How it works</p>
          <h2 className="text-4xl sm:text-5xl">Three seconds. That's it.</h2>
        </div>
        <div className="mt-10 grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
          <ol className="space-y-6">
            {STEPS.map((s) => (
              <li key={s.n} className="flex gap-5">
                <span className="font-display text-3xl text-primary">{s.n}</span>
                <div>
                  <h3 className="text-lg">{s.title}</h3>
                  <p className="text-sm text-muted-foreground">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="card-soft grid place-items-center p-8 text-foreground">
            <FoldDiagram />
          </div>
        </div>
      </div>
    </section>
  );
}
