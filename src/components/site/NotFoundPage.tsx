import { Link } from "react-router-dom";
import { SiteLayout } from "./SiteLayout";
import { AMBITIONS } from "@/lib/platform";
import { ArrowRight, Compass, Home, Mail } from "lucide-react";

export function NotFoundPage() {
  return (
    <SiteLayout>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 blueprint-grid opacity-40 pointer-events-none" aria-hidden />
        <div className="container-rb pt-14 md:pt-24 pb-12 relative">
          <div className="max-w-3xl">
            <div className="text-xs tracking-[0.22em] uppercase text-foreground/55">Lost signal</div>
            <h1 className="mt-3 text-5xl md:text-7xl font-display text-gradient leading-[1.05]">
              404
            </h1>
            <p className="mt-5 text-lg md:text-xl text-foreground/70 max-w-2xl leading-relaxed">
              This path does not exist in the infrastructure yet. But the destination you are seeking probably does.
            </p>
          </div>
        </div>
      </section>

      <section className="container-rb pb-24">
        <div className="grid md:grid-cols-3 gap-5 mb-16">
          <Link
            to="/"
            className="group relative p-7 rounded-2xl glass overflow-hidden hover:shadow-[var(--shadow-lift)] transition-all"
          >
            <div className="flex items-baseline justify-between">
              <span className="text-[10px] tracking-[0.2em] uppercase text-foreground/40">01</span>
              <Home className="h-4 w-4 text-foreground/40 group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
            </div>
            <div className="mt-6 flex items-center gap-3">
              <span className="grid place-items-center w-10 h-10 rounded-xl border border-border/60 bg-card text-[var(--berry)]">
                <Home className="h-5 w-5" />
              </span>
              <h2 className="text-xl font-display text-foreground">Home</h2>
            </div>
            <p className="mt-3 text-sm text-foreground/70 leading-relaxed">
              Return to the Red Berry platform and start from the top.
            </p>
          </Link>

          <Link
            to="/blueprint-tool"
            className="group relative p-7 rounded-2xl glass overflow-hidden hover:shadow-[var(--shadow-lift)] transition-all"
          >
            <div className="flex items-baseline justify-between">
              <span className="text-[10px] tracking-[0.2em] uppercase text-foreground/40">02</span>
              <Compass className="h-4 w-4 text-foreground/40 group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
            </div>
            <div className="mt-6 flex items-center gap-3">
              <span className="grid place-items-center w-10 h-10 rounded-xl border border-border/60 bg-card text-[var(--azure)]">
                <Compass className="h-5 w-5" />
              </span>
              <h2 className="text-xl font-display text-foreground">Blueprint Tool</h2>
            </div>
            <p className="mt-3 text-sm text-foreground/70 leading-relaxed">
              Run the Ambition Infrastructure Blueprint and map your next move.
            </p>
          </Link>

          <Link
            to="/about/contact"
            className="group relative p-7 rounded-2xl glass overflow-hidden hover:shadow-[var(--shadow-lift)] transition-all"
          >
            <div className="flex items-baseline justify-between">
              <span className="text-[10px] tracking-[0.2em] uppercase text-foreground/40">03</span>
              <Mail className="h-4 w-4 text-foreground/40 group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
            </div>
            <div className="mt-6 flex items-center gap-3">
              <span className="grid place-items-center w-10 h-10 rounded-xl border border-border/60 bg-card text-[var(--berry)]">
                <Mail className="h-5 w-5" />
              </span>
              <h2 className="text-xl font-display text-foreground">Talk to an Advisor</h2>
            </div>
            <p className="mt-3 text-sm text-foreground/70 leading-relaxed">
              Speak with a Red Berry advisor and we will point you to the right infrastructure.
            </p>
          </Link>
        </div>

        <div className="max-w-3xl">
          <h3 className="text-xs tracking-[0.22em] uppercase text-foreground/55 mb-6">Or choose an ambition</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {AMBITIONS.map((item, i) => (
              <Link
                key={item.slug}
                to={`/ambitions/${item.slug}`}
                className="group relative p-7 rounded-2xl glass overflow-hidden hover:shadow-[var(--shadow-lift)] transition-all"
              >
                <div className="flex items-baseline justify-between">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-foreground/40">
                    A.{String(i + 1).padStart(2, "0")}
                  </span>
                  <ArrowRight className="h-4 w-4 text-foreground/40 group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
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
        </div>
      </section>
    </SiteLayout>
  );
}
