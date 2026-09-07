import { ArrowRight } from "lucide-react";
import { HeroArt } from "./HeroArt";

const CRED = [
  "Company Formation",
  "Tax Structure",
  "Accounting Infrastructure",
  "Golden Visa",
  "Citizenship Planning",
  "Hospitality Venture Architecture",
];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="absolute inset-0 blueprint-grid opacity-60 pointer-events-none" aria-hidden />
      <div className="container-rb pt-8 md:pt-12 pb-14 md:pb-20 relative">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-8 lg:gap-16 items-center">
          <div className="animate-rise">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-[10px] sm:text-xs tracking-[0.18em] uppercase text-foreground/70">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--berry)" }} />
              <span className="hidden sm:inline">Ambition Infrastructure · UAE & GCC</span>
              <span className="sm:hidden">UAE & GCC</span>
            </div>
            <h1 className="mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[1.08] sm:leading-[1.02] font-display">
              <span className="text-gradient">Every Ambitious Future</span><br />
              <span className="text-berry-gradient">Runs On Infrastructure.</span>
            </h1>
            <p className="mt-6 text-base sm:text-lg md:text-xl text-foreground/70 max-w-2xl leading-relaxed">
              You are not just setting up a company, relocating wealth, or planning a second passport.
              You are building the structure your next chapter depends on. Red Berry architects the
              corporate, financial, sovereign, and legacy infrastructure behind ambitious moves in the
              UAE and GCC.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href="/blueprint-tool"
                className="group inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl text-sm sm:text-base text-primary-foreground font-medium shadow-[var(--shadow-glow)] hover:shadow-[var(--shadow-lift)] transition-all"
                style={{ background: "var(--gradient-berry)" }}
              >
                Architect My Blueprint
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="#infrastructure"
                className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl glass text-sm sm:text-base font-medium text-foreground hover:bg-foreground/5 transition-colors"
              >
                Explore The Infrastructure
              </a>
            </div>

            <p className="mt-8 text-sm text-foreground/60 max-w-xl">
              Built for founders, investors, families, and entrepreneurs making defining moves in the GCC.
            </p>

            <ul className="mt-5 flex flex-wrap gap-x-3 sm:gap-x-5 gap-y-2 text-[10px] sm:text-xs text-foreground/55">
              {CRED.map((c, i) => (
                <li key={c} className="flex items-center gap-2">
                  {i > 0 && <span className="w-1 h-1 rounded-full bg-foreground/20" />}
                  {c}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative animate-float-soft self-stretch flex items-stretch min-h-[280px] sm:min-h-[360px] md:min-h-[420px] lg:min-h-[720px]">
            <HeroArt />
          </div>
        </div>
      </div>
    </section>
  );
}
