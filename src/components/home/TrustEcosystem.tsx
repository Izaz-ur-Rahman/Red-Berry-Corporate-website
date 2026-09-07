const METRICS = [
  { k: "Companies Structured", v: "320+" },
  { k: "GCC Market Entries Supported", v: "140+" },
  { k: "Financial Structures Designed", v: "200+" },
  { k: "Residency & Mobility Pathways", v: "180+" },
  { k: "Hospitality Ventures Architected", v: "40+" },
  { k: "Families Supported Across Borders", v: "75+" },
];

export function TrustEcosystem() {
  return (
    <section className="relative py-14 md:py-20">
      <div className="container-rb">
        <header className="max-w-2xl">
          <p className="text-xs tracking-[0.2em] uppercase text-foreground/55">Evidence</p>
          <h2 className="mt-3 text-3xl md:text-5xl font-display text-gradient">
            The Infrastructure Behind Ambitious Moves
          </h2>
          <p className="mt-4 text-foreground/65 text-lg">
            Not vanity metrics — a snapshot of the structures Red Berry has helped architect across the GCC.
          </p>
        </header>

        <div className="relative mt-14">
          <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden>
            <defs>
              <linearGradient id="trustLine" x1="0" x2="1">
                <stop offset="0%" stopColor="oklch(0.55 0.20 25)" stopOpacity="0.35" />
                <stop offset="100%" stopColor="oklch(0.62 0.16 240)" stopOpacity="0.35" />
              </linearGradient>
            </defs>
          </svg>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 relative">
            {METRICS.map((m, i) => (
              <div
                key={m.k}
                className="group relative p-6 md:p-7 rounded-2xl glass hover:shadow-[var(--shadow-lift)] transition-all overflow-hidden"
              >
                <div
                  className="absolute -right-10 -top-10 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 blur-2xl transition-opacity"
                  style={{ background: i % 2 ? "oklch(0.62 0.16 240 / 0.4)" : "oklch(0.55 0.20 25 / 0.4)" }}
                />
                <div className="relative flex items-start gap-4">
                  <div
                    className="mt-1 w-2 h-2 rounded-full"
                    style={{ background: i % 2 ? "var(--azure)" : "var(--berry)" }}
                  />
                  <div>
                    <div className="text-4xl font-display tracking-tight text-foreground">{m.v}</div>
                    <div className="mt-1 text-sm text-foreground/65">{m.k}</div>
                  </div>
                </div>
                <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-foreground/15 to-transparent" />
                <div className="mt-3 text-[11px] tracking-[0.18em] uppercase text-foreground/40">
                  Node {String(i + 1).padStart(2, "0")} · GCC
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
