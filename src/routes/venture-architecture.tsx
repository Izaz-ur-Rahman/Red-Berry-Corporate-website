import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import {
  ArrowRight, ArrowUpRight, AlertTriangle, XCircle,
  Layers, BarChart3, Crown,
  Sparkles, Building2, MapPin, Coins,
} from "lucide-react";
import { SEOHead } from "@/components/common/SEOHead";
import {
  Accordion, AccordionItem, AccordionTrigger, AccordionContent,
} from "@/components/ui/accordion";
import { SiteLayout } from "@/components/site/SiteLayout";
import { VentureArchitectureHeroArt } from "@/components/infrastructure/VentureArchitectureHeroArt";
import { InfrastructureNavigator } from "@/components/infrastructure/InfrastructureNavigator";

// CONTENT for Venture Architecture

const EXECUTIVE_SUMMARY =
  "Venture Architecture is the infrastructure layer that turns a hospitality or tourism concept into an operating business. It covers concept design, licensing strategy, venue structuring, operational systems, regulatory compliance, staffing architecture, and the guest experience blueprint. A hospitality venture without architecture is a concept that never reaches opening day. With it, the venture opens on schedule, scales across locations, and maintains guest standards that drive returns.";

const WHY_MATTERS = [
  { t: "Purpose", d: "Venture Architecture translates a concept into an operating reality. It is the bridge between the idea and the first guest walking through the door." },
  { t: "Role", d: "It coordinates licensing, venue, brand, operations, and compliance into a single timeline. Each dependency mapped so the venture opens when planned." },
  { t: "Importance", d: "Hospitality ventures are among the most regulated and operationally complex businesses to launch. Without architecture, delays compound and costs escalate." },
  { t: "Strategic Value", d: "A well architected venture can replicate. The second and third locations use the same licensing playbook, operational system, and staffing model." },
  { t: "Long Term Impact", d: "The difference between a hospitality brand that scales and one that stalls is the quality of the architecture beneath the first location." },
];

const RISKS = [
  { t: "Licensing Delays Kill Momentum", d: "Tourism authority, municipality, food safety, and entertainment licenses each have their own timeline. Miss one dependency and the opening slips by months." },
  { t: "Venue And Concept Mismatch", d: "A concept designed for one space forced into another without adaptation. The guest experience suffers and the numbers never work." },
  { t: "Operational Chaos At Launch", d: "No documented systems, no trained staff, no supply chain relationships. The first month burns cash and reputation simultaneously." },
  { t: "Regulatory Penalties And Shutdowns", d: "Fire safety, health codes, labour compliance, and entertainment permits missed or filed incorrectly. Fines, closures, and media exposure follow." },
  { t: "Concept Cannot Scale", d: "A first location built around the founder's personal presence and relationships. The second location fails because nothing is documented or repeatable." },
];

const FRAMEWORK = [
  { n: "01", t: "Concept Design", d: "The guest experience, positioning, and brand narrative defined before any lease is signed. The concept decides the venue, not the other way around." },
  { n: "02", t: "Licensing Pathway", d: "Tourism authority, municipality, food safety, entertainment, and alcohol licenses mapped as a dependency chain with realistic timelines and contingencies." },
  { n: "03", t: "Venue Structuring", d: "Lease, fit out, ownership structure, and asset protection designed for the concept. The venue is a strategic asset, not just a space." },
  { n: "04", t: "Brand And Identity", d: "Name, trademark, visual identity, and digital presence built for hospitality. The brand is the first touchpoint and the last memory." },
  { n: "05", t: "Operational Systems", d: "POS, reservations, inventory, procurement, and guest management systems selected and integrated before opening. Not patched together after launch." },
  { n: "06", t: "Staffing Architecture", d: "Hiring, training, visas, payroll, and retention designed for hospitality turnover. The team is the experience." },
  { n: "07", t: "Guest Experience Blueprint", d: "The journey from discovery to departure, documented, measured, and continuously improved. Every touchpoint designed with intent." },
];

const MISTAKES = [
  { t: "Concept Chases The Venue", d: "A beautiful space found before the concept is defined. The team reverse engineers a concept to fit the space. It rarely works.", how: "Define the concept first. The venue is chosen because it enables the experience, not because it is available." },
  { t: "Licenses Treated As Paperwork", d: "Licensing seen as an administrative task rather than the critical path. Applications filed late, incomplete, or without understanding dependencies.", how: "Build the licensing pathway as a project plan with owners, deadlines, and contingencies from day one." },
  { t: "No Operating Manual Before Launch", d: "Everything in the founder's head. No documented recipes, procedures, service standards, or escalation paths. The team improvises.", how: "Write the manual before hiring. Train to the manual, improve the manual, and replicate the manual." },
  { t: "Underestimating Working Capital", d: "Budget covers fit out and opening but not the six to twelve months of operating losses while the concept finds its audience.", how: "Model cash flow for eighteen months post opening. Raise or reserve enough to survive the ramp." },
  { t: "Founder As The Only Operator", d: "The founder personally manages every detail. No management layer, no succession, and no capacity to open a second location.", how: "Hire and train management early. The founder's role is to design and oversee the system, not to run the shift." },
  { t: "Ignoring The Numbers", d: "A concept built on instinct without unit economics, breakeven analysis, or sensitivity to occupancy and average spend. The venture runs out of cash.", how: "Model the unit economics before signing the lease. Know the breakeven occupancy and the sensitivity to price changes." },
];


const RELATED_AMBITIONS = [
  { slug: "build-a-hospitality-venture", title: "Build A Hospitality Venture", d: "Venture Architecture is the operating system behind every successful hospitality concept.", icon: Building2, href: "/build-a-hospitality-venture" },
  { slug: "launch-a-business", title: "Launch A Business", d: "Every new venture benefits from architecture, hospitality most of all.", icon: MapPin, href: "/launch-a-business" },
  { slug: "expand-into-the-gcc", title: "Expand Into The GCC", d: "Regional expansion of hospitality requires replicable architecture.", icon: Coins, href: "/expand-into-gcc" },
];

const RELATED_LAYERS = [
  { slug: "foundation-build", title: "Foundation Build", d: "The corporate spine that licenses and operates the venture.", icon: Layers, href: "/foundation-build" },
  { slug: "financial-infrastructure", title: "Financial Infrastructure", d: "The reporting and cash flow management the venture depends on.", icon: BarChart3, href: "/financial-infrastructure" },
  { slug: "identity-foundation", title: "Identity Foundation", d: "Trademark and brand protection for the hospitality concept.", icon: Crown, href: "/identity-foundation" },
];

const FAQS_BEGINNER = [
  { q: "What does Venture Architecture include?", a: "Concept design, licensing pathway, venue structuring, brand and identity, operational systems, staffing architecture, and guest experience blueprint." },
  { q: "How is this different from company setup?", a: "Company setup registers the entity. Venture Architecture designs the operating system that makes the entity actually function as a hospitality business." },
  { q: "How long does it take to open a restaurant in the UAE?", a: "A well architected F&B concept typically takes four to eight months from concept to opening, assuming licensing proceeds on schedule." },
  { q: "What licenses does a hotel need?", a: "Tourism authority classification, municipality trade license, fire safety approval, health and safety, food safety if F&B is included, and any entertainment or alcohol permits." },
  { q: "Can a foreigner own a hospitality business in the UAE?", a: "Yes, across mainland and free zone structures. The right structure depends on the concept, the location, and the intended scale." },
  { q: "What is the biggest reason hospitality ventures fail?", a: "Most commonly, insufficient working capital combined with operational chaos at launch. The concept may be good but the business runs out of cash before finding traction." },
  { q: "Do I need a local partner?", a: "For mainland hospitality activities, a local service agent or partner may be required depending on the activity. Free zones and certain structures offer alternatives." },
  { q: "What is a concept design?", a: "The definition of the guest experience, the positioning, the menu or offering, the aesthetic, and the brand narrative. Everything that makes the venture distinct." },
];

const FAQS_INTERMEDIATE = [
  { q: "How is the licensing pathway structured?", a: "Each license identified with prerequisites, timelines, dependencies, and fallback options. The critical path is mapped so delays in one area do not cascade." },
  { q: "What is venue structuring?", a: "The legal and commercial design of the venue relationship. Lease terms, ownership of fit out, asset protection, and exit rights all configured for the concept." },
  { q: "How do operating systems integrate?", a: "POS, reservations, inventory, procurement, accounting, and guest management selected for compatibility and integrated so data flows across the business." },
  { q: "What is a staffing architecture?", a: "The org chart, hiring plan, training program, visa and payroll infrastructure, and retention strategy designed for hospitality turnover rates." },
  { q: "How is guest experience measured?", a: "Through defined metrics at each touchpoint: discovery, booking, arrival, service, product quality, departure, and recommendation. Feedback systems built in from day one." },
  { q: "How do I design for scale from location one?", a: "Document everything. Build systems, not personalities. Create a playbook that can be handed to a new management team and executed with fidelity." },
  { q: "What is the role of technology in hospitality?", a: "Technology should be invisible to the guest and empowering to the team. The right stack reduces friction, captures data, and enables personalisation without replacing human connection." },
  { q: "How is procurement designed for hospitality?", a: "Supplier relationships, quality standards, delivery schedules, and cost controls defined before opening. Not improvised under pressure after launch." },
  { q: "What is a soft opening?", a: "A controlled launch period with limited guests, reduced marketing, and explicit learning objectives. Issues are identified and resolved before full public exposure." },
  { q: "How do I handle hospitality regulations?", a: "Every jurisdiction has specific health, safety, labour, and entertainment regulations. Compliance is designed into the operating system, not checked after the fact." },
];

const FAQS_ADVANCED = [
  { q: "How is a hospitality group structured for multiple locations?", a: "Typically a holding entity above operating entities for each venue or cluster. Shared services for procurement, marketing, and finance. Each location retains local accountability." },
  { q: "What is the role of franchise in hospitality expansion?", a: "Franchising accelerates expansion using the capital and local knowledge of franchisees. It requires a protected brand, documented systems, and strong quality control." },
  { q: "How is intellectual property protected in hospitality?", a: "Trademarks for the brand name, logos, and trade dress. Recipes and processes as trade secrets. Design elements and content as copyright. Licensed to operating entities." },
  { q: "How does venture architecture interact with investment?", a: "Investors diligence the licensing status, the operational readiness, the management team, and the scalability of the concept. A complete architecture reduces risk and improves terms." },
  { q: "What is a management agreement in hospitality?", a: "An agreement where the owner of the venue engages a management company to operate the hospitality concept. Common in hotel and large F&B developments." },
  { q: "How is a hotel asset protected?", a: "Through the lease or ownership structure, insurance, operational compliance, and the legal separation of the property vehicle from the operating company." },
  { q: "What governance scales across hospitality locations?", a: "A central brand and quality team, regional operations directors, local general managers with defined autonomy, and a reporting cadence that surfaces issues before they become crises." },
];

const FAQS_ALL = [...FAQS_BEGINNER, ...FAQS_INTERMEDIATE, ...FAQS_ADVANCED];

// HEALTH CHECK

const HEALTH_QUESTIONS = [
  { q: "Is your concept defined before any venue is chosen?", k: "concept" },
  { q: "Do you have a documented licensing pathway with timelines?", k: "licensing" },
  { q: "Are your operating systems selected and budgeted before launch?", k: "systems" },
  { q: "Do you have eighteen months of working capital reserved?", k: "capital" },
  { q: "Is there an operating manual that a new manager could follow?", k: "manual" },
  { q: "Is your staffing plan designed for hospitality turnover?", k: "staffing" },
  { q: "Could you open a second location without rebuilding the system?", k: "scale" },
];

function HealthCheck() {
  const [answers, setAnswers] = useState<Record<string, "yes" | "no" | "unsure" | undefined>>({});
  const score = useMemo(() => {
    return HEALTH_QUESTIONS.reduce((acc, q) => {
      const v = answers[q.k];
      if (v === "yes") return acc + 2;
      if (v === "unsure") return acc + 1;
      return acc;
    }, 0);
  }, [answers]);
  const answered = HEALTH_QUESTIONS.every((q) => answers[q.k]);
  const tier = score >= 12 ? "Investor Grade" : score >= 7 ? "Workable" : "At Risk";
  const tierColor = tier === "Investor Grade" ? "var(--azure)" : tier === "Workable" ? "var(--berry)" : "oklch(0.62 0.20 25)";
  const tierNote =
    tier === "Investor Grade"
      ? "Your venture architecture is ready for launch and scale. The work now is to maintain fidelity as you replicate."
      : tier === "Workable"
        ? "Your venture can open but carries operational risk. A targeted reset would protect the investment before full public launch."
        : "Your venture is exposed at multiple critical points. A deliberate architecture now is materially cheaper than a failed opening.";

  return (
    
    <div className="rounded-3xl glass p-6 md:p-10">
      <div className="grid lg:grid-cols-[1.4fr_1fr] gap-8">
        <ol className="space-y-5">
          {HEALTH_QUESTIONS.map((q, i) => (
            <li key={q.k} className="border-b border-border/40 pb-5 last:border-0 last:pb-0">
              <div className="flex items-start gap-3">
                <span className="shrink-0 text-[10px] tracking-[0.22em] uppercase text-foreground/45 pt-1">
                  Q{String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-base text-foreground/85 leading-relaxed">{q.q}</p>
              </div>
              <div className="mt-3 ml-12 flex flex-wrap gap-2">
                {(["yes", "unsure", "no"] as const).map((opt) => {
                  const active = answers[q.k] === opt;
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setAnswers((a) => ({ ...a, [q.k]: opt }))}
                      className={[
                        "px-4 py-1.5 rounded-full text-xs border transition-all capitalize",
                        active
                          ? "border-transparent text-primary-foreground shadow-[var(--shadow-glow)]"
                          : "border-border/60 text-foreground/70 hover:text-foreground hover:bg-foreground/5",
                      ].join(" ")}
                      style={active ? { background: "var(--gradient-berry)" } : undefined}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </li>
          ))}
        </ol>

        <aside className="rounded-2xl bg-card/70 border border-border/50 p-6 lg:sticky lg:top-40 self-start">
          <div className="text-[10px] tracking-[0.22em] uppercase text-foreground/55">Live Result</div>
          {!answered ? (
            <p className="mt-4 text-sm text-foreground/65 leading-relaxed">
              Answer the seven questions. Your venture architecture tier appears here, with no lead form and no email required.
            </p>
          ) : (
            <>
              <div className="mt-4 text-3xl font-display" style={{ color: tierColor }}>
                {tier}
              </div>
              <div className="mt-1 text-xs text-foreground/55">Score {score} / 14</div>
              <p className="mt-4 text-sm text-foreground/75 leading-relaxed">{tierNote}</p>
              <Link
                to="/blueprint-tool"
                className="mt-6 group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-primary-foreground text-sm font-medium shadow-[var(--shadow-glow)] hover:shadow-[var(--shadow-lift)] transition-all"
                style={{ background: "var(--gradient-berry)" }}
              >
                Assess My Venture
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </>
          )}
        </aside>
      </div>
    </div>
  );
}

// ROUTE

function VentureArchitecturePage() {
  return (
    <SiteLayout>
      <SEOHead
        title="Venture Architecture | Red Berry"
        description="Design a venture that can take investment, partners and growth. Ownership, entities and governance shaped before the pressure of scale arrives."
        url="https://redberry.ae/venture-architecture"
      />
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 blueprint-grid opacity-60 pointer-events-none" aria-hidden />
        <div className="container-rb pt-14 md:pt-20 pb-12 md:pb-16 relative">
          <nav aria-label="Breadcrumb" className="text-xs text-foreground/55 flex items-center gap-2">
            <Link to="/" className="hover:text-foreground">Red Berry</Link>
            <span>/</span>
            <Link to="/infrastructure" className="hover:text-foreground">Infrastructure</Link>
            <span>/</span>
            <span className="text-foreground/80">Venture Architecture</span>
          </nav>

          <div className="mt-6 grid lg:grid-cols-[1.45fr_1fr] gap-10 items-start">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-[10px] tracking-[0.22em] uppercase text-foreground/70">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--berry)" }} />
                Infrastructure Layer · 05 / 07
              </div>
              <h1 className="mt-5 text-4xl md:text-6xl font-display leading-[1.05] text-gradient speakable">
                Venture Architecture
              </h1>
              <p className="mt-5 text-lg md:text-xl text-foreground/75 max-w-2xl leading-relaxed speakable">
                The infrastructure that turns a hospitality or tourism concept into an operating business that opens on schedule and scales with fidelity.
              </p>
              <p className="mt-3 text-base md:text-lg text-foreground/65 max-w-2xl leading-relaxed">
                Venture Architecture is not a business plan. It is the system that coordinates concept, licensing, venue, operations, and guest experience into a single, executable blueprint.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link
                  to="/blueprint-tool"
                  className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-primary-foreground font-medium shadow-[var(--shadow-glow)] hover:shadow-[var(--shadow-lift)] transition-all"
                  style={{ background: "var(--gradient-berry)" }}
                >
                  Assess My Venture
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link
                  to={`/about/${"contact"}`}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl glass font-medium text-foreground hover:bg-foreground/5 transition-colors"
                >
                  Talk To An Advisor
                </Link>
              </div>
            </div>

            <div className="relative self-stretch flex items-stretch min-h-[320px] sm:min-h-[420px] lg:min-h-[560px] animate-float-soft">
              <VentureArchitectureHeroArt />
            </div>
          </div>
        </div>
      </section>

      {/* EXECUTIVE SUMMARY */}
      <section className="container-rb pb-10" aria-labelledby="exec-summary">
        <div className="rounded-3xl glass p-6 md:p-10">
          <p className="text-[10px] tracking-[0.22em] uppercase text-foreground/55">Executive Summary</p>
          <h2 id="exec-summary" className="sr-only">Executive Summary</h2>
          <p className="mt-3 text-lg md:text-xl text-foreground/80 leading-relaxed speakable">
            {EXECUTIVE_SUMMARY}
          </p>
        </div>
      </section>

      {/* INFRASTRUCTURE NAVIGATOR */}
      <InfrastructureNavigator currentSlug="venture-architecture" />

      {/* WHY THIS LAYER MATTERS */}
      <section className="container-rb py-14 md:py-20" aria-labelledby="why-matters">
        <header className="max-w-3xl">
          <p className="text-xs tracking-[0.2em] uppercase text-foreground/55">The Role</p>
          <h2 id="why-matters" className="mt-3 text-3xl md:text-5xl font-display text-foreground">
            Why Venture Architecture Matters
          </h2>
          <p className="mt-4 text-foreground/65 text-lg leading-relaxed">
            Hospitality ventures are among the most complex businesses to launch. Architecture is the difference between a concept that opens and one that never reaches its first guest.
          </p>
        </header>
        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {WHY_MATTERS.map((m) => (
            <article key={m.t} className="p-6 rounded-2xl glass">
              <div className="text-[10px] tracking-[0.22em] uppercase text-foreground/50">{m.t}</div>
              <p className="mt-3 text-sm text-foreground/75 leading-relaxed">{m.d}</p>
            </article>
          ))}
        </div>
      </section>

      {/* WHAT HAPPENS WITHOUT IT */}
      <section className="container-rb py-14 md:py-20" aria-labelledby="without-it">
        <header className="max-w-3xl">
          <p className="text-xs tracking-[0.2em] uppercase text-foreground/55">The Cost Of Absence</p>
          <h2 id="without-it" className="mt-3 text-3xl md:text-5xl font-display text-gradient">
            What Happens Without Real Venture Architecture
          </h2>
          <p className="mt-4 text-foreground/65 text-lg leading-relaxed">
            Weak architecture rarely fails quietly. It fails visibly, with delayed openings, regulatory shutdowns, and cash burned before the first guest arrives.
          </p>
        </header>
        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-5 gap-4">
          {RISKS.map((r) => (
            <article key={r.t} className="p-5 rounded-2xl glass">
              <AlertTriangle className="h-5 w-5 text-primary/80" aria-hidden />
              <h3 className="mt-3 text-base font-display text-foreground">{r.t}</h3>
              <p className="mt-2 text-sm text-foreground/70 leading-relaxed">{r.d}</p>
            </article>
          ))}
        </div>
      </section>

      {/* FRAMEWORK */}
      <section className="container-rb py-14 md:py-20" aria-labelledby="framework">
        <header className="max-w-3xl">
          <p className="text-xs tracking-[0.2em] uppercase text-foreground/55">Proprietary Framework</p>
          <h2 id="framework" className="mt-3 text-3xl md:text-5xl font-display text-foreground">
            The Venture Architecture Framework
          </h2>
          <p className="mt-4 text-foreground/65 text-lg leading-relaxed">
            Seven layers, engineered as one system. Each layer constrains or unlocks the next.
          </p>
        </header>

        <Accordion type="single" collapsible className="mt-10 rounded-2xl glass overflow-hidden">
          {FRAMEWORK.map((s) => (
            <AccordionItem key={s.n} value={s.n} className="border-b border-border/40 last:border-0 px-6">
              <AccordionTrigger className="py-5">
                <div className="flex items-center gap-4 text-left">
                  <span
                    className="text-[10px] tracking-[0.22em] uppercase font-medium"
                    style={{ color: "var(--berry)" }}
                  >
                    Layer {s.n}
                  </span>
                  <span className="text-lg font-display text-foreground">{s.t}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-sm text-foreground/75 leading-relaxed pb-2 pl-[88px]">{s.d}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* HEALTH CHECK */}
      <section className="container-rb py-14 md:py-20" aria-labelledby="health-check">
        <header className="max-w-3xl">
          <p className="text-xs tracking-[0.2em] uppercase text-foreground/55">Interactive Self Diagnosis</p>
          <h2 id="health-check" className="mt-3 text-3xl md:text-5xl font-display text-gradient">
            The Venture Architecture Health Check
          </h2>
          <p className="mt-4 text-foreground/65 text-lg leading-relaxed">
            Seven questions. An immediate read on whether your venture architecture is At Risk, Workable, or Investor Grade. No form, no email, just structural clarity.
          </p>
        </header>
        <div className="mt-10">
          <HealthCheck />
        </div>
      </section>

      {/* MISTAKES */}
      <section className="container-rb py-14 md:py-20" aria-labelledby="mistakes">
        <header className="max-w-3xl">
          <p className="text-xs tracking-[0.2em] uppercase text-foreground/55">Field Notes</p>
          <h2 id="mistakes" className="mt-3 text-3xl md:text-5xl font-display text-foreground">
            Common Venture Architecture Mistakes
          </h2>
          <p className="mt-4 text-foreground/65 text-lg leading-relaxed">
            The most expensive hospitality mistakes look reasonable at the time. Each one quietly limits the venture for years.
          </p>
        </header>
        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {MISTAKES.map((m) => (
            <article key={m.t} className="p-6 rounded-2xl glass">
              <XCircle className="h-5 w-5 text-destructive" aria-hidden />
              <h3 className="mt-3 text-lg font-display text-foreground">{m.t}</h3>
              <p className="mt-2 text-sm text-foreground/70 leading-relaxed">{m.d}</p>
              <div className="mt-4 pt-4 border-t border-border/40">
                <div className="text-[10px] tracking-[0.22em] uppercase text-foreground/45">How To Prevent</div>
                <p className="mt-1.5 text-sm text-foreground/75 leading-relaxed">{m.how}</p>
              </div>
            </article>
          ))}
        </div>
      </section>


      {/* RELATED AMBITIONS */}
      <section className="container-rb py-14 md:py-20" aria-labelledby="related-ambitions">
        <header className="flex items-end justify-between gap-6 flex-wrap">
          <div className="max-w-2xl">
            <p className="text-xs tracking-[0.2em] uppercase text-foreground/55">Ambitions This Layer Powers</p>
            <h2 id="related-ambitions" className="mt-3 text-3xl md:text-4xl font-display text-foreground">
              Where Venture Architecture Shows Up
            </h2>
          </div>
          <Link to="/ambitions" className="text-sm text-foreground/70 hover:text-foreground inline-flex items-center gap-1">
            See all ambitions <ArrowUpRight className="h-4 w-4" />
          </Link>
        </header>
        <div className="mt-8 grid md:grid-cols-3 gap-5">
          {RELATED_AMBITIONS.map((a) => (
            <Link
              key={a.slug}
              to={a.href}
              className="group p-6 rounded-2xl glass hover:shadow-[var(--shadow-lift)] transition-all"
            >
              <div className="flex items-center gap-3">
                <span
                  className="grid place-items-center w-9 h-9 rounded-lg border border-border/60 bg-card"
                  style={{ color: "var(--berry)" }}
                >
                  <a.icon className="h-4 w-4" aria-hidden />
                </span>
                <h3 className="text-lg font-display">{a.title}</h3>
              </div>
              <p className="mt-3 text-sm text-foreground/70 leading-relaxed">{a.d}</p>
              <div className="mt-4 text-xs text-foreground/55 inline-flex items-center gap-1 group-hover:text-foreground transition-colors">
                Explore <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* RELATED INFRASTRUCTURE LAYERS */}
      <section className="container-rb py-14 md:py-20" aria-labelledby="related-layers">
        <header className="max-w-3xl">
          <p className="text-xs tracking-[0.2em] uppercase text-foreground/55">Connected Layers</p>
          <h2 id="related-layers" className="mt-3 text-3xl md:text-4xl font-display text-foreground">
            Adjacent Infrastructure
          </h2>
          <p className="mt-4 text-foreground/65 text-base leading-relaxed">
            Venture Architecture does not stand alone. These layers attach directly to it.
          </p>
        </header>
        <div className="mt-8 grid md:grid-cols-3 gap-5">
          {RELATED_LAYERS.map((l) => (
            <Link
              key={l.slug}
              to={l.href}
              className="group p-6 rounded-2xl glass hover:shadow-[var(--shadow-lift)] transition-all"
            >
              <div className="flex items-center gap-3">
                <span
                  className="grid place-items-center w-9 h-9 rounded-lg border border-border/60 bg-card"
                  style={{ color: "var(--azure)" }}
                >
                  <l.icon className="h-4 w-4" aria-hidden />
                </span>
                <h3 className="text-lg font-display">{l.title}</h3>
              </div>
              <p className="mt-3 text-sm text-foreground/70 leading-relaxed">{l.d}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* FAQ HUB */}
      <section className="container-rb py-14 md:py-20" aria-labelledby="faq-hub">
        <header className="max-w-3xl">
          <p className="text-xs tracking-[0.2em] uppercase text-foreground/55">FAQ Hub</p>
          <h2 id="faq-hub" className="mt-3 text-3xl md:text-5xl font-display text-foreground">
            Venture Architecture Questions
          </h2>
          <p className="mt-4 text-foreground/65 text-lg leading-relaxed">
            Twenty five questions structured for beginners, operators, and advanced groups.
          </p>
        </header>

        {[
          { h: "Beginner", items: FAQS_BEGINNER },
          { h: "Intermediate", items: FAQS_INTERMEDIATE },
          { h: "Advanced", items: FAQS_ADVANCED },
        ].map((group) => (
          <div key={group.h} className="mt-10">
            <div className="flex items-center gap-3">
              <span className="text-[10px] tracking-[0.22em] uppercase" style={{ color: "var(--berry)" }}>
                {group.h}
              </span>
              <span className="h-px flex-1 bg-border/50" />
            </div>
            <Accordion type="single" collapsible className="mt-4 rounded-2xl glass overflow-hidden">
              {group.items.map((f, i) => (
                <AccordionItem key={f.q} value={`${group.h}-${i}`} className="border-b border-border/40 last:border-0 px-6">
                  <AccordionTrigger className="py-4 text-base font-display">{f.q}</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm text-foreground/75 leading-relaxed pb-2">{f.a}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        ))}
      </section>

      {/* BLUEPRINT INTEGRATION */}
      <section className="container-rb py-14 md:py-20">
        <div
          className="rounded-3xl p-8 md:p-12 relative overflow-hidden text-primary-foreground"
          style={{ background: "var(--gradient-berry)" }}
        >
          <div className="absolute inset-0 blueprint-grid opacity-20 pointer-events-none" aria-hidden />
          <div className="relative grid lg:grid-cols-[1.4fr_1fr] gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 text-[10px] tracking-[0.22em] uppercase">
                <Sparkles className="h-3 w-3" aria-hidden />
                Blueprint Integration
              </div>
              <h2 className="mt-4 text-3xl md:text-5xl font-display leading-tight">
                Assess My Venture
              </h2>
              <p className="mt-4 text-base md:text-lg text-primary-foreground/85 leading-relaxed max-w-2xl">
                Map your current concept, licensing, venue, operations, and guest experience positions against the architecture your hospitality ambition will actually require.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 lg:items-end">
              <Link
                to="/blueprint-tool"
                className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white text-foreground font-medium hover:bg-white/90 transition-colors"
              >
                Open The Blueprint Tool
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                to={`/about/${"contact"}`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-white/30 text-primary-foreground hover:bg-white/10 transition-colors"
              >
                Talk To An Advisor
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL INFRASTRUCTURE CTA */}
      <section className="container-rb pb-24" aria-labelledby="final-cta">
        <div className="rounded-3xl glass p-8 md:p-14 text-center">
          <h2 id="final-cta" className="text-3xl md:text-5xl font-display text-gradient">
            Architecture Determines Opening
          </h2>
          <p className="mt-4 text-foreground/70 text-lg leading-relaxed max-w-2xl mx-auto">
            Tell us what you are creating. We will show you which concept, licensing, venue, and operational choices actually decide whether the door opens on schedule.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/blueprint-tool"
              className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-primary-foreground font-medium shadow-[var(--shadow-glow)] hover:shadow-[var(--shadow-lift)] transition-all"
              style={{ background: "var(--gradient-berry)" }}
            >
              Start The Blueprint
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              to="/infrastructure"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl glass font-medium text-foreground hover:bg-foreground/5 transition-colors"
            >
              See All Infrastructure Layers
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

export default VentureArchitecturePage;
