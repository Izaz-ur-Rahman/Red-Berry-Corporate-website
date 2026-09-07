import { ArrowRight, CheckCircle2, Building2, Coins, Shield, Globe2 } from "lucide-react";

const LAYER_PREVIEW = [
  { k: "Corporate", v: 13, label: "Strong", tone: "strong", Icon: Building2 },
  { k: "Financial", v: 11, label: "Developing", tone: "developing", Icon: Coins },
  { k: "Sovereign", v: 9, label: "Developing", tone: "developing", Icon: Globe2 },
  { k: "Legacy", v: 6, label: "Exposed", tone: "exposed", Icon: Shield },
];

const TOTAL = LAYER_PREVIEW.reduce((s, l) => s + l.v, 0); // 39 / 60
const PCT = (TOTAL / 60) * 100;
const R = 46;
const C = 2 * Math.PI * R;

export function Blueprint() {
  return (
    <section id="blueprint" className="relative py-14 md:py-20 overflow-hidden">
      <div className="container-rb">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-12 items-center">
          <div>
            <p className="text-[10px] sm:text-xs tracking-[0.2em] uppercase text-foreground/55">
              Complimentary · For Founders, Operators & Family Principals
            </p>
            <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-display text-gradient">
              Architect Your Ambition Infrastructure Blueprint
            </h2>
            <p className="mt-4 text-foreground/65 text-base sm:text-lg">
              In under 5 minutes, receive a private diagnostic of your corporate, financial,
              sovereign and legacy infrastructure — scored, mapped, and yours to keep.
            </p>

            <ul className="mt-8 space-y-3">
              {[
                "A scored view across all four infrastructure layers",
                "Identifies your strongest layer and most exposed risk",
                "Private — only you and your advisor see the result",
              ].map((x) => (
                <li key={x} className="flex items-start gap-3 text-sm sm:text-base text-foreground/80">
                  <CheckCircle2 className="h-5 w-5 mt-0.5 shrink-0 text-primary" />
                  <span>{x}</span>
                </li>
              ))}
            </ul>

            <a
              href="/blueprint-tool"
              className="mt-8 group inline-flex items-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl text-sm sm:text-base text-primary-foreground font-medium shadow-[var(--shadow-glow)] hover:shadow-[var(--shadow-lift)] transition-all"
              style={{ background: "var(--gradient-berry)" }}
            >
              Start My Blueprint
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <p className="mt-3 text-xs text-foreground/50">
              Free · No obligation · Downloadable PDF
            </p>
          </div>

          {/* Result preview — mirrors the post-completion dashboard */}
          <div className="relative w-full max-w-full">
            <div
              className="absolute -inset-4 sm:-inset-6 rounded-3xl blur-2xl opacity-40"
              style={{ background: "var(--gradient-berry)" }}
              aria-hidden
            />
            <div className="relative rounded-2xl sm:rounded-3xl glass overflow-hidden shadow-[var(--shadow-lift)]">
              <div className="flex items-center justify-between px-4 sm:px-5 py-3 border-b border-border/60">
                <div className="flex items-center gap-2">
                  <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-foreground/15" />
                  <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-foreground/15" />
                  <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-foreground/15" />
                </div>
                <div className="text-[9px] sm:text-[11px] tracking-[0.18em] uppercase text-foreground/50">
                  Ambition Blueprint · Result
                </div>
              </div>

              <div className="p-4 sm:p-5 md:p-7">
                {/* Hero score */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                  <div className="relative shrink-0">
                    <svg width="100" height="100" viewBox="0 0 120 120" className="-rotate-90 sm:w-[120px] sm:h-[120px]">
                      <circle cx="60" cy="60" r={R} fill="none" stroke="currentColor" className="text-foreground/10" strokeWidth="10" />
                      <circle
                        cx="60" cy="60" r={R} fill="none" stroke="url(#berryGrad)" strokeWidth="10" strokeLinecap="round"
                        strokeDasharray={C} strokeDashoffset={C - (C * PCT) / 100}
                      />
                      <defs>
                        <linearGradient id="berryGrad" x1="0" y1="0" x2="1" y2="1">
                          <stop offset="0%" stopColor="oklch(0.55 0.20 25)" />
                          <stop offset="100%" stopColor="oklch(0.65 0.18 350)" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <div className="text-2xl font-display text-gradient leading-none">{TOTAL}</div>
                      <div className="text-[10px] text-foreground/50 mt-0.5">/ 60</div>
                    </div>
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] tracking-[0.2em] uppercase text-foreground/50">Overall Status</div>
                    <div className="text-base sm:text-lg font-display">Foundationally Sound</div>
                    <div className="mt-1 text-xs text-foreground/60">
                      Strong corporate base. Sovereign mobility and legacy layers need architecting.
                    </div>
                  </div>
                </div>

                {/* Layer breakdown */}
                <div className="mt-6 grid grid-cols-2 gap-2.5 sm:gap-3">
                  {LAYER_PREVIEW.map(({ k, v, label, tone, Icon }) => {
                    const chip =
                      tone === "strong"
                        ? { bg: "oklch(0.85 0.13 80 / 0.2)", fg: "oklch(0.45 0.13 80)" }
                        : tone === "developing"
                        ? { bg: "oklch(0.62 0.16 240 / 0.12)", fg: "var(--azure)" }
                        : { bg: "oklch(0.55 0.20 25 / 0.12)", fg: "var(--berry)" };
                    return (
                      <div key={k} className="p-3 sm:p-3.5 rounded-xl bg-background/60 border border-border/60">
                        <div className="flex items-center justify-between gap-2">
                          <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" style={{ color: "var(--berry)" }} />
                          <span className="text-[8px] sm:text-[9px] tracking-[0.18em] uppercase px-1.5 sm:px-2 py-0.5 rounded-full whitespace-nowrap"
                                style={{ background: chip.bg, color: chip.fg }}>
                            {label}
                          </span>
                        </div>
                        <div className="mt-2 text-[10px] sm:text-[11px] tracking-[0.14em] uppercase text-foreground/55">{k}</div>
                        <div className="mt-1 flex items-end gap-1">
                          <div className="text-lg sm:text-xl font-display text-gradient leading-none">{v}</div>
                          <div className="text-foreground/40 text-[10px] pb-0.5">/ 15</div>
                        </div>
                        <div className="mt-2 h-1 rounded-full bg-foreground/10 overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: `${(v / 15) * 100}%`, background: "var(--gradient-berry)" }} />
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-2 text-[10px] sm:text-[11px] text-foreground/55">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--berry)" }} />
                    Exposure flagged · Legacy layer
                  </span>
                  <span>Sample preview</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
