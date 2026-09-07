const D = [
  { t: "Foundation Build", o: "A credible corporate spine — jurisdiction, entity, ownership, licensing." },
  { t: "Financial Infrastructure", o: "Books, tax, and reporting aligned with how your value actually moves." },
  { t: "Wealth Structure Design", o: "Holding architecture engineered for protection and compounding." },
  { t: "Identity Foundation", o: "Founder, family, and entity identity structured with intent." },
  { t: "Venture Architecture", o: "From concept to operational structure for hospitality and experiential ventures." },
  { t: "Sovereign Freedom", o: "Residency, Golden Visa, and citizenship pathways for genuine mobility." },
  { t: "Legacy & Life Architecture", o: "Continuity for family, wealth, and the chapters that follow yours." },
];

export function Disciplines() {
  return (
    <section className="relative py-14 md:py-20">
      <div className="container-rb">
        <header className="max-w-3xl">
          <p className="text-xs tracking-[0.2em] uppercase text-foreground/55">Disciplines</p>
          <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-display text-gradient">
            The Disciplines That Hold Ambition Together
          </h2>
        </header>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {D.map((d, i) => (
            <article
              key={d.t}
              className="relative p-5 sm:p-6 md:p-7 rounded-2xl glass overflow-hidden hover:shadow-[var(--shadow-lift)] transition-all"
            >
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-[10px] tracking-[0.2em] uppercase text-foreground/40">
                  D.{String(i + 1).padStart(2, "0")}
                </span>
                <span className="w-8 h-px bg-foreground/15" />
              </div>
              <h3 className="mt-5 text-xl sm:text-2xl font-display text-foreground leading-tight">{d.t}</h3>
              <p className="mt-3 text-sm text-foreground/65 leading-relaxed">{d.o}</p>
              <div
                className="absolute bottom-0 left-0 right-0 h-px"
                style={{ background: i % 2 ? "linear-gradient(90deg, transparent, oklch(0.62 0.16 240 / 0.5), transparent)" : "linear-gradient(90deg, transparent, oklch(0.55 0.20 25 / 0.5), transparent)" }}
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
