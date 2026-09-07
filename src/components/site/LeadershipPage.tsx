//import { SiteLayout } from "@/components/site/SiteLayout";
import { LeadershipSection } from "@/components/site/LeadershipSection";
import type { Section, NodeItem } from "@/lib/platform";

export function LeadershipPage({ section, item }: { section: Section; item: NodeItem }) {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 blueprint-grid opacity-60 pointer-events-none" aria-hidden />
        <div className="container-rb pt-14 md:pt-20 pb-10 relative">
          <nav className="text-xs text-foreground/55 flex items-center gap-2">
            <a href="/" className="hover:text-foreground">Red Berry</a>
            <span>/</span>
            <a href={section.to} className="hover:text-foreground">{section.label}</a>
            <span>/</span>
            <span className="text-foreground/80">{item.title}</span>
          </nav>

          <div className="mt-6 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-[10px] tracking-[0.22em] uppercase text-foreground/70">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--berry)" }} />
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
          </div>
        </div>
      </section>

      <LeadershipSection />
    </>
  );
}
