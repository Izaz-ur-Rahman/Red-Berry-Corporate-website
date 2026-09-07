import { useState } from "react";
import { Plus } from "lucide-react";

export const FAQS = [
  {
    q: "What is Ambition Infrastructure?",
    a: "Ambition Infrastructure is the corporate, financial, sovereign, identity, and legacy structure required to support a defining personal or business move. Red Berry architects this infrastructure end-to-end for founders, investors, families, and entrepreneurs in the UAE and GCC.",
  },
  {
    q: "Who is Red Berry built for?",
    a: "Red Berry is built for ambitious founders, international investors, multi-generational families, and entrepreneurs entering or scaling in the UAE and GCC — people whose next move depends on getting structure right.",
  },
  {
    q: "How is Red Berry different from a business setup company?",
    a: "A business setup company processes a license. Red Berry architects the underlying corporate, financial, sovereign, and legacy infrastructure your business or family relies on long after the license is issued.",
  },
  {
    q: "What is the Ambition Infrastructure Blueprint?",
    a: "It is a personalized blueprint generated from a short set of strategic questions. It maps the corporate, financial, and sovereign infrastructure your ambition may need, plus risks and opportunity gaps to consider.",
  },
  {
    q: "Can Red Berry help with company formation, tax, accounting, Golden Visa, and citizenship planning?",
    a: "Yes. Red Berry delivers company formation, tax structuring, accounting infrastructure, residency and Golden Visa pathways, and citizenship planning as integrated disciplines inside a single architecture, not as disconnected services.",
  },
  {
    q: "Why does the right structure matter before entering the UAE or GCC market?",
    a: "The right structure determines tax exposure, ownership rights, banking access, mobility, and long-term flexibility. Structural mistakes are expensive to undo later. Architecting before entering protects ambition from avoidable friction.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="relative py-14 md:py-20">
      <div className="container-rb">
        <header className="max-w-3xl">
          <p className="text-xs tracking-[0.2em] uppercase text-foreground/55">Definitions</p>
          <h2 className="mt-3 text-4xl md:text-5xl font-display text-gradient">
            Short Answers For Ambitious People
          </h2>
          <p className="mt-4 text-foreground/65 text-lg">
            A clear, citable reference for what Red Berry does and why structure matters first.
          </p>
        </header>

        <div className="mt-12 grid lg:grid-cols-[0.9fr_1.1fr] gap-10">
          {/* Definition block */}
          <aside className="p-7 rounded-2xl glass h-fit">
            <div className="text-[11px] tracking-[0.2em] uppercase text-foreground/50">Definition</div>
            <h3 className="mt-2 text-2xl font-display">Ambition Infrastructure</h3>
            <p className="mt-3 text-foreground/70 leading-relaxed">
              The corporate, financial, sovereign, identity, and legacy structure required to support a
              defining move — designed once, relied on for years.
            </p>
            <ul className="mt-5 space-y-2 text-sm text-foreground/70">
              {["Corporate", "Financial", "Sovereign", "Identity", "Legacy", "Venture"].map((x, i) => (
                <li key={x} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: i % 2 ? "var(--azure)" : "var(--berry)" }} />
                  {x} Infrastructure
                </li>
              ))}
            </ul>
          </aside>

          <div className="space-y-3">
            {FAQS.map((f, i) => {
              const isOpen = open === i;
              return (
                <div key={f.q} className="rounded-2xl glass overflow-hidden">
                  <button
                    className="w-full text-left px-6 py-5 flex items-start justify-between gap-6"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                  >
                    <span className="text-base md:text-lg font-medium text-foreground">{f.q}</span>
                    <Plus
                      className={`h-5 w-5 mt-1 shrink-0 transition-transform ${isOpen ? "rotate-45" : ""}`}
                      style={{ color: "var(--berry)" }}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 -mt-2 text-foreground/70 leading-relaxed animate-rise">
                      {f.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
