import { ArrowRight } from "lucide-react";
import { InfrastructureEngine } from "./InfrastructureEngine";

export function FinalCTA() {
  return (
    <section id="contact" className="relative py-14 md:py-20">
      <div className="container-rb">
        <div className="relative rounded-3xl glass overflow-hidden p-8 md:p-14">
          <div className="absolute inset-0 blueprint-grid opacity-50" aria-hidden />
          <div
            className="absolute -top-32 -right-32 w-96 h-96 rounded-full blur-3xl opacity-40"
            style={{ background: "var(--gradient-berry)" }}
            aria-hidden
          />
          <div
            className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full blur-3xl opacity-40"
            style={{ background: "var(--gradient-azure)" }}
            aria-hidden
          />

          <div className="relative grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-foreground/55">Begin</p>
              <h2 className="mt-3 text-4xl md:text-6xl font-display text-gradient leading-[1.05]">
                Tell Us What You Are Building.
              </h2>
              <p className="mt-5 text-lg text-foreground/70 max-w-xl">
                Red Berry will show you the infrastructure it needs.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <a
                  href="/blueprint-tool"
                  className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-primary-foreground font-medium shadow-[var(--shadow-glow)] hover:shadow-[var(--shadow-lift)] transition-all"
                  style={{ background: "var(--gradient-berry)" }}
                >
                  Architect My Blueprint
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </a>
                <a
                  href="/about/contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-background/70 border border-border font-medium hover:bg-foreground/5 transition-colors"
                >
                  Talk To An Advisor
                </a>
              </div>
            </div>

            <div className="relative">
              <InfrastructureEngine formed />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
