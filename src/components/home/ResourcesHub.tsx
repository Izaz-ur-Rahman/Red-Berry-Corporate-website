import { ArrowUpRight } from "lucide-react";

const PILLARS = [
  { t: "The Ambition Library", s: "Frameworks, primers, and field notes for building seriously in the GCC." },
  { t: "Sovereign Freedom & The Open World", s: "Residency, citizenship, and mobility for the globally mobile." },
  { t: "Founder Resources", s: "For operators building from the front." },
  { t: "Investor Resources", s: "For allocators deploying capital in the region." },
  { t: "Family Office Resources", s: "For multi-generational capital and continuity." },
];

export function ResourcesHub() {
  return (
    <section id="resources-hub" className="relative py-14 md:py-20">
      <div className="container-rb">
        <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 max-w-5xl">
          <div className="min-w-0">
            <p className="text-xs tracking-[0.2em] uppercase text-foreground/55">Resources Hub</p>
            <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-display text-gradient">The Ambition Library</h2>
            <p className="mt-4 text-foreground/65 text-base sm:text-lg max-w-2xl">
              Strategic resources for founders, investors, families, and entrepreneurs building in the GCC.
            </p>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl glass font-medium hover:bg-foreground/5 text-sm sm:text-base whitespace-nowrap"
          >
            Explore Resources Hub <ArrowUpRight className="h-4 w-4" />
          </a>
        </header>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {PILLARS.map((p, i) => (
            <article
              key={p.t}
              className="group p-5 sm:p-6 md:p-7 rounded-2xl glass hover:shadow-[var(--shadow-lift)] transition-all"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 shrink-0 rounded-lg flex items-center justify-center text-primary-foreground text-xs font-display"
                  style={{ background: i % 2 ? "var(--gradient-azure)" : "var(--gradient-berry)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="text-[10px] tracking-[0.2em] uppercase text-foreground/45">Pillar</div>
              </div>
              <h3 className="mt-5 text-lg sm:text-xl font-display text-foreground leading-tight">{p.t}</h3>
              <p className="mt-2 text-sm text-foreground/65 leading-relaxed">{p.s}</p>
              <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-foreground/80 group-hover:text-primary transition-colors">
                Read pillar <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
