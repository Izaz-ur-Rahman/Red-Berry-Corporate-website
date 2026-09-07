import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const ITEMS = [
  {
    title: "Launch A Business",
    label: "For founders",
    desc: "Create a new commercial presence in the GCC — structured to operate, hire, bank, and scale from day one.",
    href: "/launch-a-business",
  },
  {
    title: "Expand Into The GCC",
    label: "For operators entering the region",
    desc: "Translate an international business into a credible, compliant, and competitive presence across the UAE and GCC.",
    href: "/expand-into-gcc",
  },
  {
    title: "Grow & Protect Wealth",
    label: "For investors & entrepreneurs",
    desc: "Build long-term financial strength — hold, compound, and protect capital across cycles and jurisdictions.",
    href: "/grow-and-protect-wealth",
  },
  {
    title: "Create Family Security",
    label: "For families",
    desc: "Stability, continuity, and future opportunities engineered for the people who come after you.",
    href: "/create-family-security",
  },
  {
    title: "Increase Global Freedom",
    label: "For individuals",
    desc: "Mobility, residency, and cross-border flexibility — designed as infrastructure, not paperwork.",
    href: "/increase-global-freedom",
  },
  {
    title: "Build A Hospitality Venture",
    label: "For founders in tourism & F&B",
    desc: "From concept and licensing to operating structure for restaurants, hotels, and experiential brands.",
    href: "/build-a-hospitality-venture",
  },
];

function ModuleShape({ i }: { i: number }) {
  return (
    <svg viewBox="0 0 64 64" className="w-12 h-12">
      <defs>
        <linearGradient id={`mg-${i}`} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.55 0.20 25)" />
          <stop offset="100%" stopColor="oklch(0.62 0.16 240)" />
        </linearGradient>
      </defs>
      {[
        <g key="a"><rect x="10" y="10" width="44" height="44" rx="6" fill="none" stroke={`url(#mg-${i})`} strokeWidth="1.5"/><rect x="22" y="22" width="20" height="20" rx="3" fill={`url(#mg-${i})`} opacity="0.85"/></g>,
        <g key="b"><circle cx="32" cy="32" r="22" fill="none" stroke={`url(#mg-${i})`} strokeWidth="1.5"/><path d="M14 32 L50 32 M32 14 L32 50" stroke={`url(#mg-${i})`} strokeWidth="1.5"/><circle cx="32" cy="32" r="5" fill={`url(#mg-${i})`}/></g>,
        <g key="c"><polygon points="32,8 56,22 56,46 32,60 8,46 8,22" fill="none" stroke={`url(#mg-${i})`} strokeWidth="1.5"/><polygon points="32,22 44,29 44,43 32,50 20,43 20,29" fill={`url(#mg-${i})`} opacity="0.85"/></g>,
        <g key="d"><path d="M12 50 L32 14 L52 50 Z" fill="none" stroke={`url(#mg-${i})`} strokeWidth="1.5"/><circle cx="32" cy="38" r="6" fill={`url(#mg-${i})`}/></g>,
        <g key="e"><rect x="12" y="20" width="40" height="28" rx="4" fill="none" stroke={`url(#mg-${i})`} strokeWidth="1.5"/><path d="M12 30 L52 30" stroke={`url(#mg-${i})`} strokeWidth="1.5"/><circle cx="22" cy="40" r="3.5" fill={`url(#mg-${i})`}/><circle cx="42" cy="40" r="3.5" fill={`url(#mg-${i})`}/></g>,
        <g key="f"><path d="M14 50 L14 26 L32 14 L50 26 L50 50" fill="none" stroke={`url(#mg-${i})`} strokeWidth="1.5"/><rect x="26" y="34" width="12" height="16" fill={`url(#mg-${i})`} opacity="0.85"/></g>,
      ][i % 6]}
    </svg>
  );
}

export function Ambitions() {
  return (
    <section id="ambitions" className="relative py-14 md:py-20">
      <div className="container-rb">
        <header className="max-w-3xl">
          <p className="text-xs tracking-[0.2em] uppercase text-foreground/55">Pathways</p>
          <h2 className="mt-3 text-4xl md:text-6xl font-display text-gradient">What Are You Building?</h2>
          <p className="mt-4 text-foreground/65 text-lg">
            Every ambition needs a different structure. Start with what you are building, and Red Berry
            will show you what it needs.
          </p>
        </header>

        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {ITEMS.map((it, i) => {
            const href = (it as { href?: string }).href ?? "/blueprint-tool";
            return (
              <Link
                key={it.title}
                to={href as never}
                className="group relative p-7 rounded-2xl glass hover:shadow-[var(--shadow-lift)] transition-all overflow-hidden"
              >
                <div
                  className="absolute inset-x-0 -top-px h-px"
                  style={{ background: "linear-gradient(90deg, transparent, oklch(0.55 0.20 25 / 0.6), transparent)" }}
                />
                <div className="flex items-start justify-between">
                  <ModuleShape i={i} />
                  <span className="text-[10px] tracking-[0.18em] uppercase text-foreground/40">
                    M.{String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="mt-6">
                  <div className="text-[11px] tracking-[0.18em] uppercase text-primary/80">{it.label}</div>
                  <h3 className="mt-2 text-2xl font-display text-foreground">{it.title}</h3>
                  <p className="mt-3 text-sm text-foreground/65 leading-relaxed">{it.desc}</p>
                </div>
                <div className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-foreground/80 group-hover:text-primary transition-colors">
                  View Infrastructure <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
