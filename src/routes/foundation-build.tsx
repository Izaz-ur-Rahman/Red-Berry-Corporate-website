import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import {
  ArrowRight, ArrowUpRight, AlertTriangle, XCircle,
  BarChart3, Fingerprint, Hotel, Crown,
  Sparkles, Building2, MapPin,
} from "lucide-react";
import {
  Accordion, AccordionItem, AccordionTrigger, AccordionContent,
} from "@/components/ui/accordion";
import { SEOHead } from "@/components/common/SEOHead";
import { SiteLayout } from "@/components/site/SiteLayout";
import { FoundationHeroArt } from "@/components/infrastructure/FoundationHeroArt";
import { InfrastructureNavigator } from "@/components/infrastructure/InfrastructureNavigator";

// CONTENT for Foundation Build

const EXECUTIVE_SUMMARY =
  "Foundation Build is the corporate spine beneath every ambition. It covers jurisdiction, entity, ownership, licensing, banking readiness, compliance, and the operating layer. This is the load bearing infrastructure that decides whether a venture can bank cleanly, scale across borders, raise capital, and remain defensible over the next ten years. Get the foundation right and everything above it becomes easier. Get it wrong and every future decision pays the cost.";

const WHY_MATTERS = [
  { t: "Purpose", d: "Foundation Build establishes the legal, regulatory, and operational base your venture stands on. Every later layer including financial, identity, sovereign, and legacy anchors to it." },
  { t: "Role", d: "It translates intent into a credible, jurisdictionally sound entity that banks, regulators, partners, and capital recognise as real." },
  { t: "Importance", d: "The foundation determines what is possible at every future inflection. That includes hiring, banking, expanding, raising, exiting, or restructuring." },
  { t: "Strategic Value", d: "A correctly engineered foundation compounds. It preserves optionality, lowers friction, and removes the silent tax of structural rework." },
  { t: "Long Term Impact", d: "Ten years out, the foundation either holds the operating system together or quietly limits the ceiling on what the venture can become." },
];

const RISKS = [
  { t: "Banking Doors Close", d: "Foundations built without substance fail underwriting. Accounts get delayed, declined, or onboarded with restrictions that distort how the business operates." },
  { t: "Scaling Stalls", d: "Activity codes too narrow, share capital misaligned, or jurisdictions unable to host the next entity force expensive restructuring exactly when momentum is highest." },
  { t: "Investor Friction", d: "Cap tables drafted on the operating entity, untidy ownership, or weak corporate housekeeping introduce diligence friction that quietly reduces valuation." },
  { t: "Tax Position Erodes", d: "Qualifying free zone income lost, IP held in the wrong layer, and treaty access misused. Value leaks every quarter, invisibly." },
  { t: "Mobility Becomes Fragile", d: "Founder, family, and team residency tied to a weak entity creates personal exposure when business decisions need to move quickly." },
];

const FRAMEWORK = [
  { n: "01", t: "Jurisdiction Architecture", d: "Mainland, free zone, hybrid, or multi jurisdiction. Each option matched to activity, banking, treaty access, and the next ten years of intent." },
  { n: "02", t: "Entity Design", d: "Holding, operating, IP, and special purpose entities sequenced so each plays a defined structural role rather than carrying everything at once." },
  { n: "03", t: "Ownership Engineering", d: "Founder, family, investor, and trust layers structured for protection, succession, and clean future capital events." },
  { n: "04", t: "Licensing Strategy", d: "Activity codes selected for the venture you are actually building. Wide enough to grow into, narrow enough to remain credible." },
  { n: "05", t: "Banking Readiness", d: "Documentation, substance, and presence engineered so banking moves on the first attempt, not the third." },
  { n: "06", t: "Compliance Spine", d: "UBO, ESR, corporate tax, VAT, AML, and audit cadence built in as infrastructure. Never patched on after the first filing deadline." },
  { n: "07", t: "Operating Layer", d: "Visas, payroll, HR, contracts, and governance documented so the entity does not just exist on paper. It actually operates." },
];

const MISTAKES = [
  { t: "Choosing The Cheapest License", d: "The headline fee is rarely the real number. Cheap licenses often cannot bank cleanly, trade locally, or host the next entity, and the rework costs more than the original.", how: "Decide jurisdiction by activity, banking, and growth horizon. Never by price alone." },
  { t: "Founders On The Operating Entity", d: "Direct ownership on the trading company exposes founders personally and creates a messy cap table the first investor will rewrite anyway.", how: "Hold operating entities through a clean holding layer engineered from day one." },
  { t: "Narrow Activity Codes", d: "Licenses scoped to today's product block tomorrow's pivot, partnership, or adjacent revenue line. Amendments are slow and visible.", how: "Scope activities to the venture the founder is actually building, not the first SKU." },
  { t: "Banking As An Afterthought", d: "Entities formed without the substance banks now require, such as office, directors, and transaction logic, face declined applications and restricted accounts.", how: "Design the entity so the underwriter's questions answer themselves." },
  { t: "Compliance Patched On Late", d: "UBO, ESR, corporate tax, and VAT discovered after the first deadline create avoidable penalties and a regulator file that follows the entity for years.", how: "Build compliance as part of the foundation, not a service bought reactively." },
  { t: "IP In The Wrong Layer", d: "Trademarks, software, and brand assets registered to the operating entity become harder to protect, license, or move during a future deal.", how: "Hold IP in a dedicated entity that can license to operating companies." },
];


const RELATED_AMBITIONS = [
  { slug: "launch-a-business", title: "Launch A Business", d: "Foundation Build is the spine of every new venture.", icon: Building2, href: "/launch-a-business" },
  { slug: "expand-into-the-gcc", title: "Expand Into The GCC", d: "Regional expansion runs through the foundation that anchors it.", icon: MapPin, href: "/expand-into-gcc" },
  { slug: "build-a-hospitality-venture", title: "Build A Hospitality Venture", d: "Hospitality requires a multi entity foundation from day one.", icon: Hotel, href: "/build-a-hospitality-venture" },
];

const RELATED_LAYERS = [
  { slug: "financial-infrastructure", title: "Financial Infrastructure", d: "Books, banking, and reporting that anchor to the foundation.", icon: BarChart3 },
  { slug: "identity-foundation", title: "Identity Foundation", d: "Trademark and founder identity protected at the spine.", icon: Fingerprint },
  { slug: "sovereign-freedom", title: "Sovereign Freedom", d: "Residency and mobility built on the entity that issues them.", icon: Crown },
];

const FAQS_BEGINNER = [
  { q: "What does Foundation Build actually include?", a: "Jurisdiction selection, entity design, ownership engineering, licensing strategy, banking readiness, compliance setup, and the operating layer covering visas, payroll, contracts, and governance." },
  { q: "Is Foundation Build the same as company setup?", a: "No. Company setup is a transaction. Foundation Build is the infrastructure layer that determines whether the entity can bank, scale, raise, and remain defensible long term." },
  { q: "Can foreigners own 100% of the entity?", a: "Yes, across most mainland activities and every free zone. The right ownership structure depends on activity, jurisdiction, and long term plan." },
  { q: "How long does Foundation Build take?", a: "A licence can issue in days. A bank ready, growth ready foundation typically takes three to eight weeks once decisions are made." },
  { q: "Do I need an office?", a: "It depends on jurisdiction and activity. Options range from flexi desks to dedicated offices. The choice affects visa quota, banking, and credibility, so design it with intent." },
  { q: "Mainland or free zone?", a: "Mainland enables unrestricted local trade and government work. Free zones offer specialised regulators, clear ownership, and qualifying tax treatment. The right answer depends on activity and growth horizon." },
  { q: "What taxes apply?", a: "9% corporate tax above the AED 375,000 threshold, 5% VAT where applicable, and 0% personal income tax. Qualifying free zone income can remain at 0% when structured correctly." },
  { q: "Can I run multiple activities under one license?", a: "Often yes, if the activities are grouped and the jurisdiction allows them. Activity scoping is a deliberate decision, not a checkbox." },
];

const FAQS_INTERMEDIATE = [
  { q: "When should I add a holding entity?", a: "From day one if there are co founders, expected investors, IP value, or any intent to operate more than one entity. Adding it later is possible but disruptive." },
  { q: "Where should IP be held?", a: "In a dedicated holding or IP entity that licenses to the operating company. Never on the operating entity itself." },
  { q: "How do I structure for future investors?", a: "Use a clean holding company with documented share classes, a defensible cap table, and tidy housekeeping. Investors price diligence friction." },
  { q: "What does banking readiness actually require?", a: "Substance, documentation, transparent ownership, transaction logic the bank can underwrite, and presence the bank can verify." },
  { q: "How does corporate tax interact with the foundation?", a: "Entity, activity, and group structure all influence whether income qualifies for the 0% free zone rate or falls under the 9% bracket. Foundation choices set the exposure." },
  { q: "Can I restructure later?", a: "Yes, but restructuring is expensive, visible, and often forces conversations with banks and regulators. Build correctly first." },
  { q: "Do I need separate entities for property, brand, and operations?", a: "For most ventures with real asset or IP value, yes. Separation protects each layer and simplifies future deals." },
  { q: "What is UBO and why does it matter?", a: "Ultimate Beneficial Ownership filings are mandatory. Late or inconsistent filings sit on the regulator file and surface during banking and due diligence." },
  { q: "How does ESR apply to my entity?", a: "Economic Substance Regulations apply to entities conducting relevant activities. Filing is mandatory and substance must be demonstrable." },
  { q: "How do family members fit into the foundation?", a: "Through defined ownership at the holding level. Never added ad hoc to the operating entity. Governance is documented from day one." },
];

const FAQS_ADVANCED = [
  { q: "How should a group be designed for multi jurisdiction operations?", a: "Typically a UAE holding above operating entities in each jurisdiction, with IP and treasury layered for treaty access and capital flow efficiency." },
  { q: "Can I redomicile a foreign company into the UAE?", a: "Yes, depending on the originating jurisdiction. Redomiciliation preserves the legal personality and contractual continuity of the entity." },
  { q: "How does the foundation interact with succession planning?", a: "The foundation defines the ownership layer succession transfers through. Without it, succession is a renegotiation, not a transfer." },
  { q: "What changes when the venture raises institutional capital?", a: "Investors require a clean holding, documented governance, ESOP capacity, and a foundation that can absorb new share classes without restructuring." },
  { q: "How do trusts and foundations integrate into the corporate spine?", a: "Trusts and private foundations sit above the holding entity as ownership vehicles. Never on the operating company directly." },
  { q: "How is the foundation designed for an eventual exit?", a: "A clean holding with defined ownership, separated IP, audited financials, and tidy compliance enables a clean share sale rather than a forced asset deal." },
  { q: "What does substance look like in practice?", a: "Local directors, office, employees, board cadence, and decisions made and minuted in jurisdiction. Never signatures applied from elsewhere." },
];

const FAQS_ALL = [...FAQS_BEGINNER, ...FAQS_INTERMEDIATE, ...FAQS_ADVANCED];

// HEALTH CHECK: 7 questions, client side scoring, no lead form

const HEALTH_QUESTIONS = [
  { q: "Is your operating entity owned through a holding layer?", k: "holding" },
  { q: "Are your activity codes wide enough to accommodate adjacent revenue?", k: "activity" },
  { q: "Is your IP held outside the operating entity?", k: "ip" },
  { q: "Could your entity open a new bank account today without escalation?", k: "banking" },
  { q: "Are UBO, ESR, and corporate tax filings current and consistent?", k: "compliance" },
  { q: "Is ownership documented in a way a future investor would accept as is?", k: "ownership" },
  { q: "Is the foundation designed to host another entity without restructuring?", k: "scaling" },
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
      ? "Your foundation is structurally sound. The work now is to keep it current as the venture moves through its next inflection."
      : tier === "Workable"
        ? "Your foundation operates, but carries structural drag. A targeted reset would lower friction at the next banking, investor, or expansion moment."
        : "Your foundation is exposed at multiple layers. A deliberate reset is materially cheaper now than after the next inflection forces it.";

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
              Answer the seven questions. Your foundation tier appears here, with no lead form and no email required.
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
                Assess My Foundation
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

function FoundationBuildPage() {
  return (
    <SiteLayout>
      {/* HERO */}
      <SEOHead
        title="Foundation Build | Red Berry"
        description="The first structure everything else rests on. Company formation, licensing and residency in the UAE, built once and built to carry what comes next."
        url="https://redberry.ae/foundation-build"
      />
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 blueprint-grid opacity-60 pointer-events-none" aria-hidden />
        <div className="container-rb pt-14 md:pt-20 pb-12 md:pb-16 relative">
          <nav aria-label="Breadcrumb" className="text-xs text-foreground/55 flex items-center gap-2">
            <Link to="/" className="hover:text-foreground">Red Berry</Link>
            <span>/</span>
            <Link to="/infrastructure" className="hover:text-foreground">Infrastructure</Link>
            <span>/</span>
            <span className="text-foreground/80">Foundation Build</span>
          </nav>

          <div className="mt-6 grid lg:grid-cols-[1.45fr_1fr] gap-10 items-start">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-[10px] tracking-[0.22em] uppercase text-foreground/70">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--berry)" }} />
                Infrastructure Layer · 01 / 07
              </div>
              <h1 className="mt-5 text-4xl md:text-6xl font-display leading-[1.05] text-gradient speakable">
                Foundation Build
              </h1>
              <p className="mt-5 text-lg md:text-xl text-foreground/75 max-w-2xl leading-relaxed speakable">
                The corporate spine beneath every ambition. Jurisdiction, entity, ownership, licensing, banking, compliance, and operating layer engineered as one system.
              </p>
              <p className="mt-3 text-base md:text-lg text-foreground/65 max-w-2xl leading-relaxed">
                A foundation is not a license. It is the infrastructure that decides whether your venture can bank cleanly, scale across borders, raise capital, and remain defensible over the next ten years.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link
                  to="/blueprint-tool"
                  className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-primary-foreground font-medium shadow-[var(--shadow-glow)] hover:shadow-[var(--shadow-lift)] transition-all"
                  style={{ background: "var(--gradient-berry)" }}
                >
                  Assess My Foundation
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link
                  to="/about/contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl glass font-medium text-foreground hover:bg-foreground/5 transition-colors"
                >
                  Talk To An Advisor
                </Link>
              </div>
            </div>

            <div className="relative self-stretch flex items-stretch min-h-[320px] sm:min-h-[420px] lg:min-h-[560px] animate-float-soft">
              <FoundationHeroArt />
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
      <InfrastructureNavigator currentSlug="foundation-build" />

      {/* WHY THIS LAYER MATTERS */}
      <section className="container-rb py-14 md:py-20" aria-labelledby="why-matters">
        <header className="max-w-3xl">
          <p className="text-xs tracking-[0.2em] uppercase text-foreground/55">The Role</p>
          <h2 id="why-matters" className="mt-3 text-3xl md:text-5xl font-display text-foreground">
            Why The Foundation Layer Matters
          </h2>
          <p className="mt-4 text-foreground/65 text-lg leading-relaxed">
            Every ambition the venture pursues, from banking and hiring to raising, expanding, and exiting, runs through the foundation. Get this layer right and every later layer becomes easier.
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
            What Happens Without A Real Foundation
          </h2>
          <p className="mt-4 text-foreground/65 text-lg leading-relaxed">
            Weak foundations rarely fail loudly. They charge a silent tax on every banking conversation, every diligence, and every cross border move.
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

      {/* FOUNDATION ARCHITECTURE FRAMEWORK */}
      <section className="container-rb py-14 md:py-20" aria-labelledby="framework">
        <header className="max-w-3xl">
          <p className="text-xs tracking-[0.2em] uppercase text-foreground/55">Proprietary Framework</p>
          <h2 id="framework" className="mt-3 text-3xl md:text-5xl font-display text-foreground">
            The Foundation Architecture Framework
          </h2>
          <p className="mt-4 text-foreground/65 text-lg leading-relaxed">
            Seven layers, engineered as a single system. Decisions in any one layer constrain or unlock decisions in the next.
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

      {/* FOUNDATION HEALTH CHECK */}
      <section className="container-rb py-14 md:py-20" aria-labelledby="health-check">
        <header className="max-w-3xl">
          <p className="text-xs tracking-[0.2em] uppercase text-foreground/55">Interactive Self Diagnosis</p>
          <h2 id="health-check" className="mt-3 text-3xl md:text-5xl font-display text-gradient">
            The Foundation Health Check
          </h2>
          <p className="mt-4 text-foreground/65 text-lg leading-relaxed">
            Seven questions. An immediate read on whether your foundation is At Risk, Workable, or Investor Grade. No form, no email, just structural clarity.
          </p>
        </header>
        <div className="mt-10">
          <HealthCheck />
        </div>
      </section>

      {/* COMMON FOUNDATION MISTAKES */}
      <section className="container-rb py-14 md:py-20" aria-labelledby="mistakes">
        <header className="max-w-3xl">
          <p className="text-xs tracking-[0.2em] uppercase text-foreground/55">Field Notes</p>
          <h2 id="mistakes" className="mt-3 text-3xl md:text-5xl font-display text-foreground">
            Common Foundation Mistakes
          </h2>
          <p className="mt-4 text-foreground/65 text-lg leading-relaxed">
            The most expensive structural mistakes look reasonable at the time. Each one quietly limits the venture for years.
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
              Where Foundation Build Shows Up
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
            Foundation Build does not stand alone. These layers attach directly to the spine.
          </p>
        </header>
        <div className="mt-8 grid md:grid-cols-3 gap-5">
          {RELATED_LAYERS.map((l) => (
            <Link
              key={l.slug}
              to={`/infrastructure/${l.slug}`}
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
            Foundation Build Questions
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
                Assess My Foundation
              </h2>
              <p className="mt-4 text-base md:text-lg text-primary-foreground/85 leading-relaxed max-w-2xl">
                Map your current spine including jurisdiction, entities, ownership, banking, compliance, and operating layer against the structure your ambition will actually require.
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
                to="/about/contact"
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
            Infrastructure Determines Outcomes
          </h2>
          <p className="mt-4 text-foreground/70 text-lg leading-relaxed max-w-2xl mx-auto">
            Tell us what you are building. We will show you which infrastructure layers, starting with the foundation, actually decide whether it scales.
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

export default FoundationBuildPage;
