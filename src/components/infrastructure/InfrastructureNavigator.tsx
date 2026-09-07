import { Link } from "react-router-dom";
import { DISCIPLINES } from "@/lib/platform";

// Persistent navigator across all 7 Infrastructure layers.
// Pages that have a canonical route are linked; others fall back to the
// generic /infrastructure/:slug detail page until their canonical pages ship.
const CANONICAL: Record<string, string> = {
  "foundation-build": "/foundation-build",
  "financial-infrastructure": "/financial-infrastructure",
  "wealth-structure-design": "/wealth-structure-design",
  "identity-foundation": "/identity-foundation",
  "venture-architecture": "/venture-architecture",
  "sovereign-freedom": "/sovereign-freedom",
  "legacy-life-architecture": "/legacy-life-architecture",
};

export function InfrastructureNavigator({ currentSlug }: { currentSlug: string }) {
  return (
    <nav
      aria-label="Infrastructure layers"
      className="sticky top-16 z-30 py-2"
    >
      <div className="container-rb">
        <div className="flex w-full items-center gap-2 rounded-full border border-border/50 bg-background/75 p-1 shadow-[var(--shadow-soft)] backdrop-blur-md">
          <span className="hidden lg:inline-block shrink-0 text-[10px] tracking-[0.22em] uppercase text-foreground/45 pl-2 pr-3 border-r border-border/50">
            Infrastructure
          </span>
          <div
            className="flex min-w-0 flex-1 items-center gap-1 overflow-x-auto no-scrollbar snap-x snap-mandatory sm:gap-1.5"
            style={{
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0, #000 16px, #000 calc(100% - 16px), transparent 100%)",
              maskImage:
                "linear-gradient(to right, transparent 0, #000 16px, #000 calc(100% - 16px), transparent 100%)",
            }}
          >
            {DISCIPLINES.map((d) => {
              const href = CANONICAL[d.slug] ?? `/infrastructure/${d.slug}`;
              const active = d.slug === currentSlug;
              return (
                <Link
                  key={d.slug}
                  to={href}
                  className={[
                    "snap-start shrink-0 inline-flex items-center gap-1.5 rounded-full border px-2 py-1 text-[11px] leading-none transition-all sm:px-2.5 sm:py-1.5 sm:text-xs",
                    active
                      ? "text-foreground border-transparent shadow-[var(--shadow-glow)]"
                      : "text-foreground/70 hover:text-foreground border-border/60 hover:bg-foreground/5",
                  ].join(" ")}
                  style={
                    active
                      ? { background: "var(--gradient-berry)", color: "var(--primary-foreground)" }
                      : undefined
                  }
                  aria-current={active ? "page" : undefined}
                >
                  <d.icon className="h-3.5 w-3.5" aria-hidden />
                  <span className="whitespace-nowrap">{d.title}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
