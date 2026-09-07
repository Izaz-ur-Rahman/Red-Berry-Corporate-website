import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { NodeItem, Section } from "@/lib/platform";

export function DetailPage({
  section, item, related, relatedSection, relatedHeading,
}: { section: Section; item: NodeItem; related: NodeItem[]; relatedSection?: Section; relatedHeading?: string }) {
  const accent = item.accent === "azure" ? "var(--azure)" : "var(--berry)";
  const relSection = relatedSection ?? section;
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 blueprint-grid opacity-60 pointer-events-none" aria-hidden />
        <div className="container-rb pt-14 md:pt-20 pb-10 relative">
          <nav className="text-xs text-foreground/55 flex items-center gap-2">
            <Link to="/" className="hover:text-foreground">Red Berry</Link>
            <span>/</span>
            <Link to={section.to} className="hover:text-foreground">{section.label}</Link>
            <span>/</span>
            <span className="text-foreground/80">{item.title}</span>
          </nav>

          <div className="mt-6 grid lg:grid-cols-[1.4fr_1fr] gap-10 items-start">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-[10px] tracking-[0.22em] uppercase text-foreground/70">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: accent }} />
                {section.label} · {item.title}
              </div>
              <h1 className="mt-5 text-4xl md:text-6xl font-display leading-[1.05] text-gradient">
                {item.title}
              </h1>
              <p className="mt-5 text-lg md:text-xl text-foreground/75 max-w-2xl leading-relaxed">
                {item.tagline}
              </p>
              {item.outcome && (
                <p className="mt-3 text-base text-foreground/65 max-w-2xl leading-relaxed">{item.outcome}</p>
              )}

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link
                  to="/blueprint-tool"
                  className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-primary-foreground font-medium shadow-[var(--shadow-glow)] hover:shadow-[var(--shadow-lift)] transition-all"
                  style={{ background: "var(--gradient-berry)" }}
                >
                  Start The Blueprint
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link
                  to="/about/contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl glass font-medium text-foreground hover:bg-foreground/5 transition-colors"
                >
                  Talk To An Advisor
                </Link>
              </div>
            </div>

            <aside className="rounded-3xl glass p-6 md:p-8">
              <div className="text-[10px] tracking-[0.22em] uppercase text-foreground/55">Infrastructure Brief</div>
              <ul className="mt-5 space-y-4">
                {["Purpose", "Outcome", "Strategic Value"].map((k, idx) => (
                  <li key={k} className="border-t border-border/50 pt-3 first:border-t-0 first:pt-0">
                    <div className="text-[10px] tracking-[0.22em] uppercase text-foreground/45">{k}</div>
                    <div className="mt-1.5 text-sm text-foreground/80 leading-relaxed">
                      {idx === 0 && `Establish ${item.title.toLowerCase()} as a load-bearing layer of your future.`}
                      {idx === 1 && (item.outcome ?? "A coherent, defensible structure aligned with your ambition.")}
                      {idx === 2 && "Reduces friction at every future inflection — funding, mobility, succession, exit."}
                    </div>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </div>
      </section>

      <section className="container-rb pb-16">
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { t: "What It Is", b: "An engineered infrastructure layer — not a one-off service. We design it to fit the way you actually operate today and intend to operate tomorrow." },
            { t: "How We Build It", b: "Diagnose your ambition, map the gaps, sequence the structure, and operate it with you. Every decision is documented and revisable." },
            { t: "What Changes", b: "Less ambiguity. Faster moves. Cleaner conversations with banks, regulators, partners, and the people you care about." },
          ].map((c) => (
            <article key={c.t} className="p-6 rounded-2xl glass">
              <div className="text-[10px] tracking-[0.22em] uppercase text-foreground/50">{c.t}</div>
              <p className="mt-3 text-sm text-foreground/75 leading-relaxed">{c.b}</p>
            </article>
          ))}
        </div>
      </section>

      {related.length > 0 && (
        <section className="container-rb pb-24">
          <div className="flex items-end justify-between">
            <h2 className="text-2xl md:text-3xl font-display text-foreground">
              {relatedHeading ?? `Related in ${relSection.label}`}
            </h2>
            <Link to={relSection.to} className="text-sm text-foreground/70 hover:text-foreground inline-flex items-center gap-1">
              See all <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-6 grid md:grid-cols-3 gap-5">
            {related.map((r) => (
              <Link
                key={r.slug}
                to={`${relSection.to}/${r.slug}`}
                className="group p-6 rounded-2xl glass hover:shadow-[var(--shadow-lift)] transition-all"
              >
                <div className="flex items-center gap-3">
                  <span
                    className="grid place-items-center w-9 h-9 rounded-lg border border-border/60 bg-card"
                    style={{ color: r.accent === "berry" ? "var(--berry)" : "var(--azure)" }}
                  >
                    <r.icon className="h-4 w-4" />
                  </span>
                  <h3 className="text-lg font-display">{r.title}</h3>
                </div>
                <p className="mt-3 text-sm text-foreground/65">{r.tagline}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
