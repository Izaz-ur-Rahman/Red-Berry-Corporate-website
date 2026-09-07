import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import type { NodeItem, Section } from "@/lib/platform";

export function HubPage({ section, items }: { section: Section; items: NodeItem[] }) {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 blueprint-grid opacity-60 pointer-events-none" aria-hidden />
        <div className="container-rb pt-14 md:pt-20 pb-12 relative">
          <div className="max-w-3xl">
            <div className="text-xs tracking-[0.22em] uppercase text-foreground/55">{section.panelKicker}</div>
            <h1 className="mt-3 text-5xl md:text-6xl font-display text-gradient leading-[1.05]">
              {section.panelTitle}
            </h1>
            <p className="mt-5 text-lg md:text-xl text-foreground/70 max-w-2xl leading-relaxed">
              {section.panelDescription}
            </p>
          </div>
        </div>
      </section>

      <section className="container-rb pb-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((item, i) => (
            <Link
              key={item.slug}
              to={`${section.to}/${item.slug}`}
              className="group relative p-7 rounded-2xl glass overflow-hidden hover:shadow-[var(--shadow-lift)] transition-all"
            >
              <div className="flex items-baseline justify-between">
                <span className="text-[10px] tracking-[0.2em] uppercase text-foreground/40">
                  {section.label.charAt(0)}.{String(i + 1).padStart(2, "0")}
                </span>
                <ArrowUpRight className="h-4 w-4 text-foreground/40 group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
              </div>
              <div className="mt-6 flex items-center gap-3">
                <span
                  className="grid place-items-center w-10 h-10 rounded-xl border border-border/60 bg-card"
                  style={{ color: item.accent === "berry" ? "var(--berry)" : "var(--azure)" }}
                >
                  <item.icon className="h-5 w-5" />
                </span>
                <h2 className="text-xl font-display text-foreground">{item.title}</h2>
              </div>
              <p className="mt-3 text-sm text-foreground/70 leading-relaxed">{item.tagline}</p>
              {item.outcome && <p className="mt-2 text-sm text-foreground/55 leading-relaxed">{item.outcome}</p>}
              <div
                className="absolute bottom-0 left-0 right-0 h-px"
                style={{
                  background:
                    item.accent === "azure"
                      ? "linear-gradient(90deg, transparent, oklch(0.62 0.16 240 / 0.5), transparent)"
                      : "linear-gradient(90deg, transparent, oklch(0.55 0.20 25 / 0.5), transparent)",
                }}
              />
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
