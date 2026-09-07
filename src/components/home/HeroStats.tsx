import { Globe, Crown, Building2, TrendingUp } from "lucide-react";

const STATS = [
  {
    value: "5000+",
    label: "Residency Visas Processed",
    accent: "berry" as const,
    icon: Globe,
  },
  {
    value: "100+",
    label: "Golden Visas Processed",
    accent: "azure" as const,
    icon: Crown,
  },
  {
    value: "100+",
    label: "Company Setups",
    accent: "berry" as const,
    icon: Building2,
  },
  {
    value: "$2B+",
    label: "FDI to UAE",
    accent: "azure" as const,
    icon: TrendingUp,
  },
];

export function HeroStats() {
  return (
    <section aria-label="Red Berry impact in numbers" className="relative overflow-hidden">
      {/* Kinetic background accents */}
      <div
        className="absolute -top-24 -left-16 w-60 sm:w-80 h-60 sm:h-80 rounded-full blur-3xl pointer-events-none opacity-40"
        style={{ background: "oklch(0.62 0.18 25 / 0.18)" }}
      />
      <div
        className="absolute -bottom-24 w-72 sm:w-96 h-72 sm:h-96 rounded-full blur-3xl pointer-events-none opacity-30"
        style={{ background: "oklch(0.62 0.16 240 / 0.18)" }}
      />

      <div className="container-rb pb-14 md:pb-20 relative">
        <div className="mb-12 md:mb-16 lg:mb-24">
          <p className="text-xs tracking-[0.2em] uppercase text-foreground/55">
            Impact
          </p>
          <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-display text-gradient">
            Numbers That Speak
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 md:gap-5 auto-rows-fr">
          {STATS.map((s, i) => {
            const isAzure = s.accent === "azure";
            const Icon = s.icon;
            const isFirst = i === 0;
            const isLast = i === STATS.length - 1;

            return (
              <div
                key={s.label}
                className={[
                  "group relative overflow-hidden rounded-2xl glass transition-all hover:shadow-[var(--shadow-lift)] animate-rise flex flex-col justify-between",
                  isFirst ? "sm:col-span-2 lg:col-span-5" : i === 1 ? "lg:col-span-3 lg:mt-10" : i === 2 ? "lg:col-span-4" : "sm:col-span-2 lg:col-span-4 lg:mt-12",
                  "p-5 sm:p-6 md:p-7 lg:p-8 min-h-[10rem] sm:min-h-[11rem] lg:min-h-[14rem]",
                ].join(" ")}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                {/* Ambient glow blob */}
                <div
                  className="absolute -right-10 -top-10 w-32 sm:w-40 h-32 sm:h-40 rounded-full opacity-0 group-hover:opacity-100 blur-3xl transition-opacity duration-500"
                  style={{ background: isAzure ? "oklch(0.62 0.16 240 / 0.35)" : "oklch(0.55 0.20 25 / 0.35)" }}
                />

                <div className="relative z-10 min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <div
                      className="shrink-0 mb-4 sm:mb-5 w-10 h-10 sm:w-11 sm:h-11 lg:w-14 lg:h-14 flex items-center justify-center rounded-xl"
                      style={{
                        background: isAzure
                          ? "var(--gradient-azure, var(--azure))"
                          : "var(--gradient-berry)",
                        boxShadow: isAzure
                          ? "0 10px 30px -8px oklch(0.62 0.16 240 / 0.35)"
                          : "0 10px 30px -8px oklch(0.55 0.20 25 / 0.35)",
                      }}
                    >
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white" strokeWidth={1.5} />
                    </div>
                    <span className="text-[10px] tracking-[0.22em] uppercase text-foreground/30 shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div
                    className="font-display leading-none tracking-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl break-words"
                    style={{
                      background: isAzure
                        ? "var(--gradient-azure, var(--azure))"
                        : "var(--gradient-berry)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {s.value}
                  </div>
                  <div className="mt-2 sm:mt-3 text-sm md:text-base text-foreground/65 tracking-wide leading-snug">
                    {s.label}
                  </div>
                </div>

                {/* Decorative corner index */}
                <div
                  className="absolute -right-2  -bottom-4 sm:-right-3 sm:-bottom-5 font-display font-bold select-none pointer-events-none opacity-[0.06] group-hover:opacity-[0.10] transition-opacity"
                  style={{
                    fontSize: isFirst ? "6rem" : "4rem",
                    color: isAzure ? "var(--azure)" : "var(--berry)",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>

                {/* Bottom gradient line */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-px"
                  style={{
                    background: isAzure
                      ? "linear-gradient(90deg, transparent, oklch(0.62 0.16 240 / 0.5), transparent)"
                      : "linear-gradient(90deg, transparent, oklch(0.55 0.20 25 / 0.5), transparent)",
                  }}
                />
              </div>
            );
          })}

          {/* Decorative kinetic element */}
          <div className="hidden lg:flex lg:col-span-8 items-center py-2">
            <div className="w-full h-px relative" style={{ background: "oklch(0.22 0.03 250 / 0.08)" }}>
              <div
                className="absolute right-0 -top-[3px] w-1.5 h-1.5 rotate-45"
                style={{ background: "var(--berry)" }}
              />
              <div
                className="absolute left-1/4 -top-[3px] w-1.5 h-1.5 rotate-45"
                style={{ background: "var(--azure)" }}
              />
              <div
                className="absolute left-1/2 -top-[3px] w-1.5 h-1.5 rotate-45"
                style={{ background: "var(--berry)" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
