import { useState } from "react";

const STAGES = [
  { k: "Vision", d: "Understand what you are actually building — before any structure is drawn." },
  { k: "Foundation", d: "Build the right corporate structure for your jurisdiction, ownership, and intent." },
  { k: "Financial Clarity", d: "Keep accounting, tax, and reporting aligned with how value actually moves." },
  { k: "Protection", d: "Protect identity, ownership, IP, and future growth from avoidable exposure." },
  { k: "Mobility", d: "Structure residency, Golden Visa, and citizenship pathways for genuine optionality." },
  { k: "Legacy", d: "Build for family, continuity, and long-term confidence across generations and borders." },
];

export function Methodology() {
  const [active, setActive] = useState(0);
  return (
    <section id="infrastructure" className="relative py-14 md:py-20">
      <div className="container-rb">
        <header className="max-w-3xl">
          <p className="text-xs tracking-[0.2em] uppercase text-foreground/55">Methodology</p>
          <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-display text-gradient">
            The Ambition Infrastructure Map<span className="text-primary"></span>
          </h2>
          <p className="mt-4 text-foreground/65 text-base sm:text-lg">
            A clear structure for people building companies, wealth, freedom, and legacy in the GCC.
          </p>
        </header>

        <div className="mt-14 relative p-4 sm:p-6 md:p-10 rounded-3xl glass">
          {/* Horizontal map */}
          <div className="relative">
            <div className="hidden md:block absolute left-0 right-0 top-5 h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent" />
            <ol className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 md:gap-2 relative">
              {STAGES.map((s, i) => (
                <li key={s.k}>
                  <button
                    onClick={() => setActive(i)}
                    className="group w-full text-left"
                    aria-pressed={active === i}
                  >
                    <div className="flex items-center md:flex-col md:items-start gap-3">
                      <span
                        className={`relative w-10 h-10 shrink-0 rounded-full flex items-center justify-center font-display text-sm transition-all ${
                          active === i ? "text-primary-foreground shadow-[var(--shadow-glow)]" : "bg-background text-foreground/70 border border-border"
                        }`}
                        style={active === i ? { background: "var(--gradient-berry)" } : undefined}
                      >
                        {i + 1}
                      </span>
                      <div className="md:mt-3 min-w-0">
                        <div className={`text-sm font-medium tracking-tight ${active === i ? "text-foreground" : "text-foreground/70 group-hover:text-foreground"}`}>
                          {s.k}
                        </div>
                      </div>
                    </div>
                  </button>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-8 md:mt-10 grid md:grid-cols-[1fr_1.4fr] gap-6 md:gap-8 items-start">
            <div>
              <div className="text-[11px] tracking-[0.2em] uppercase text-foreground/50">Stage {active + 1} of 6</div>
              <h3 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-display text-foreground">{STAGES[active].k}</h3>
            </div>
            <p className="text-base sm:text-lg text-foreground/70 leading-relaxed">{STAGES[active].d}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
