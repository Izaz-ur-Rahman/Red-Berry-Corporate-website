import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import {
  ArrowRight, ArrowUpRight, AlertTriangle, XCircle,
  Layers, Landmark, Crown,
  Sparkles, Building2, MapPin, Coins,
} from "lucide-react";
import {
  Accordion, AccordionItem, AccordionTrigger, AccordionContent,
} from "@/components/ui/accordion";
import { SiteLayout } from "@/components/site/SiteLayout";
import { WealthStructureHeroArt } from "@/components/infrastructure/WealthStructureHeroArt";
import { InfrastructureNavigator } from "@/components/infrastructure/InfrastructureNavigator";
import { SEOHead } from "@/components/common/SEOHead";
// CONTENT for Wealth Structure Design

const EXECUTIVE_SUMMARY =
  "Wealth Structure Design is the holding architecture beneath every serious balance sheet. It decides how ownership of operating companies, property, intellectual property, investments, and reserves is held, how distributions move, how risk is segregated, and how the next generation inherits without rebuilding the system. Get this layer right and wealth compounds quietly under a structure that absorbs change. Get it wrong and one event, a divorce, a dispute, a death, an audit, can collapse value that took decades to assemble.";

const WHY_MATTERS = [
  { t: "Purpose", d: "Wealth Structure Design separates ownership from operations so the value created can survive the entity that created it. It is the difference between a balance sheet and a legacy." },
  { t: "Role", d: "It is the architecture that holds everything else. Operating companies, real estate, IP, securities, and reserves all sit inside a coherent structure rather than under one personal name." },
  { t: "Importance", d: "Without it, every asset shares the same risk surface. A claim against one business reaches the family home. A founder dispute reaches the trust. There is no insulation." },
  { t: "Strategic Value", d: "A real holding structure unlocks cleaner banking, treaty positioning, succession planning, and the ability to bring in partners or capital without restructuring under pressure." },
  { t: "Long Term Impact", d: "A structure designed once and maintained quietly compounds for decades. A structure assembled in panic during an exit or a dispute costs years of value." },
];

const RISKS = [
  { t: "Everything Held Personally", d: "Operating companies, property, and investments all sitting under one name. A single claim, marriage event, or estate filing reaches every asset at once." },
  { t: "Succession Becomes A Dispute", d: "No documented ownership architecture means heirs inherit ambiguity. Years of value are consumed by family disagreement and probate process." },
  { t: "Cross Border Exposure Multiplies", d: "Assets in three countries under one personal name create three tax regimes, three estate regimes, and three sets of reporting obligations with no coordination." },
  { t: "Capital Partners Walk Away", d: "Sophisticated investors and lenders will not transact into a structure they cannot diligence. The deal dies or the terms collapse." },
  { t: "Forced Restructuring Under Pressure", d: "Restructuring during an exit, a dispute, or an illness costs five to ten times what designing the structure cold would have cost." },
];

const FRAMEWORK = [
  { n: "01", t: "Ownership Map", d: "A documented picture of who owns what, through which entity, in which jurisdiction. The starting point of every structure conversation." },
  { n: "02", t: "Holding Architecture", d: "The shell that sits above operating companies and assets. Designed for asset protection, clean diligence, and intergenerational continuity." },
  { n: "03", t: "Asset Segregation", d: "Property, intellectual property, securities, and operating risk each held in their own lane so a claim against one does not reach the others." },
  { n: "04", t: "Trust And Foundation Layer", d: "Where appropriate, a trust or foundation introduced to separate legal ownership from beneficial intent. Designed around the family, not lifted from a template." },
  { n: "05", t: "Cross Border Coordination", d: "Treaty positioning, residency, and reporting aligned across every jurisdiction the structure touches. No surprises at filing time." },
  { n: "06", t: "Succession And Continuity", d: "Defined transfer mechanics, control rights, and decision rules so the structure continues without renegotiation when ownership changes hands." },
  { n: "07", t: "Governance Layer", d: "Board, advisor, and family council structures that keep the architecture coherent across decades and personalities." },
];

const MISTAKES = [
  { t: "Copy Pasted Holding Structure", d: "A structure lifted from a template or another family's setup, applied without reference to actual assets, jurisdictions, or intent. Looks tidy on paper, fails under stress.", how: "Design from the asset and family inventory up. Templates inform, they do not decide." },
  { t: "Trust Set Up And Forgotten", d: "A trust signed once, never reviewed, with assets that never actually transferred. On paper it exists. In substance it does not protect anything.", how: "Treat the trust as a living instrument. Annual review, documented transfers, and a working relationship with the trustee." },
  { t: "Holding Company With No Substance", d: "A holding entity in a treaty jurisdiction with no directors, no minutes, no real activity. Treaty benefits denied at the first review.", how: "Substance is non negotiable. Directors, decisions, and documentation in the jurisdiction that issues the benefit." },
  { t: "Mixed Personal And Holding Assets", d: "The family home held inside the operating holding company. Personal investments routed through the trading entity. Risk and tax both rise.", how: "Segregate by purpose. Personal, operating, investment, and legacy each in their own lane." },
  { t: "Succession Left Verbal", d: "Intentions communicated at the dinner table, never documented. When the event arrives, every heir remembers a different conversation.", how: "Write it down. A will, a trust deed, or a shareholder agreement, signed and current." },
  { t: "Structure Designed Around One Person", d: "Every decision routed through the founder, with no continuity if the founder steps back. The structure works until the day it does not.", how: "Design control rights and decision rules that survive the founder, not depend on them." },
];


const RELATED_AMBITIONS = [
  { slug: "grow-and-protect-wealth", title: "Grow And Protect Wealth", d: "Wealth Structure Design is how protection becomes structural, not aspirational.", icon: Coins, href: "/grow-and-protect-wealth" },
  { slug: "create-family-security", title: "Create Family Security", d: "Family security depends on a structure that survives the people inside it.", icon: Building2, href: "/create-family-security" },
  { slug: "expand-into-the-gcc", title: "Expand Into The GCC", d: "Regional expansion sits cleanest under a holding architecture built for it.", icon: MapPin, href: "/expand-into-gcc" },
];

const RELATED_LAYERS = [
  { slug: "foundation-build", title: "Foundation Build", d: "The corporate spine the holding structure sits above.", icon: Layers, href: "/foundation-build" },
  { slug: "financial-infrastructure", title: "Financial Infrastructure", d: "The reporting layer that feeds the holding structure with reliable numbers.", icon: Landmark, href: "/financial-infrastructure" },
  { slug: "sovereign-freedom", title: "Sovereign Freedom", d: "Residency and treaty positioning that the holding architecture relies on.", icon: Crown, href: "/infrastructure/sovereign-freedom" },
];

const FAQS_BEGINNER = [
  { q: "What is Wealth Structure Design?", a: "It is the holding architecture that decides how ownership of operating companies, property, intellectual property, investments, and reserves is held and transferred." },
  { q: "Is this the same as estate planning?", a: "Estate planning is one outcome the structure supports. Wealth Structure Design is the underlying architecture that makes estate planning, asset protection, and succession all coherent." },
  { q: "Do I need a holding company?", a: "Most founders and investors with more than one asset benefit from a holding layer. It separates ownership from operating risk and creates a clean point to receive proceeds and distribute." },
  { q: "When should I think about this?", a: "Before assets are concentrated, before a transaction, and before a generational transfer. The earlier the structure is in place, the lower the cost of every later move." },
  { q: "Is a trust always needed?", a: "No. Trusts are powerful where legal ownership needs to be separated from beneficial intent. They are the wrong instrument when the family wants direct control without intermediation." },
  { q: "Can a single holding company hold everything?", a: "It can, but it should not. Mixing operating risk, real estate, and personal assets in one entity defeats the point of having a structure at all." },
  { q: "What is the difference between a trust and a foundation?", a: "A trust is a relationship in which a trustee holds assets for beneficiaries. A foundation is a legal entity that owns assets in its own name under defined rules. Both segregate ownership, with different control mechanics." },
  { q: "Does this only matter for very large balance sheets?", a: "No. The principles scale down. A founder with one operating company and a home benefits from the same logic that protects a multi entity group." },
];

const FAQS_INTERMEDIATE = [
  { q: "How is a holding company in the UAE typically used?", a: "As a clean shareholder for operating companies, a vehicle to receive dividends and proceeds, and a base from which to deploy capital into new ventures or assets without disturbing the operating layer." },
  { q: "What does asset segregation actually look like?", a: "Operating risk in one entity, real estate in another, intellectual property in a third, and investments in a fourth. Each entity owned through the holding layer, with no cross contamination of liability." },
  { q: "How do trusts work in the UAE context?", a: "DIFC and ADGM both recognise common law trusts. Onshore civil law does not. The choice of jurisdiction inside the structure decides whether a trust is the right instrument or whether a foundation fits better." },
  { q: "What is a foundation and where does it fit?", a: "Foundations under DIFC, ADGM, and RAK ICC operate as orphan entities owning assets under a charter. They are commonly used where the family wants legal separation without the trustee relationship of a trust." },
  { q: "How are cross border holdings coordinated?", a: "Treaty positions, residency, beneficial ownership reporting, and CRS exchange all reviewed together. The structure is designed so every jurisdiction sees a consistent picture." },
  { q: "How does the structure interact with corporate tax?", a: "Holding companies must consider participation exemption, qualifying income tests, and transfer pricing between group entities. The structure is designed with these in mind, not retrofitted around them." },
  { q: "What is the role of a shareholder agreement inside the structure?", a: "It documents how decisions are made, how shares transfer, how disputes resolve, and how new partners or heirs join. It is the operating system of the holding layer." },
  { q: "How is succession built into the structure?", a: "Through documented share transfer mechanics, defined control rights, golden share or veto positions where appropriate, and a will or trust that aligns with the structure rather than contradicts it." },
  { q: "Should I appoint independent directors?", a: "For substance, governance, and continuity, yes. Independent directors strengthen the structure against challenge and provide oversight that family only boards rarely deliver." },
  { q: "How often should the structure be reviewed?", a: "Annually as a minimum, and on every triggering event. New jurisdiction, new asset class, marriage, birth, death, or material transaction all warrant a review." },
];

const FAQS_ADVANCED = [
  { q: "How is substance demonstrated in a UAE holding company?", a: "Directors resident or meeting in the UAE, board minutes prepared and signed locally, qualifying expenditure incurred, and decisions evidenced as taken in jurisdiction rather than ratified from elsewhere." },
  { q: "How do participation exemption rules apply in the UAE?", a: "Qualifying participations can be exempt from corporate tax on dividends and capital gains where ownership, holding period, and subject to tax tests are met. The structure must be designed to satisfy each test." },
  { q: "How is ESR addressed inside the holding layer?", a: "Each entity assessed against the relevant activity. Holding company activity has lighter substance requirements, but the structure must still document the test and submit accurately." },
  { q: "How does CRS interact with trusts and foundations?", a: "Settlors, protectors, beneficiaries, and controllers are all reportable persons under CRS. The structure must be designed knowing every relevant party will be reported to their tax residency." },
  { q: "How are minority shareholders handled inside the structure?", a: "Documented in shareholder agreements with defined rights, tag and drag provisions, valuation mechanics, and exit pathways. Minorities left undocumented become friction at every later event." },
  { q: "How is intellectual property best held?", a: "Often in a dedicated IP holding entity in a jurisdiction with strong enforcement and clear royalty taxation. Licensed to the operating companies on documented arm's length terms." },
  { q: "What governance structures actually scale across generations?", a: "A board with independent representation, a family council with defined remit, a charter or constitution that documents values and decision rules, and a succession protocol reviewed every five years." },
];

const FAQS_ALL = [...FAQS_BEGINNER, ...FAQS_INTERMEDIATE, ...FAQS_ADVANCED];

// HEALTH CHECK

const HEALTH_QUESTIONS = [
  { q: "Do you have a documented ownership map of every asset you control?", k: "map" },
  { q: "Are operating companies held through a real holding entity rather than personally?", k: "holding" },
  { q: "Are personal assets segregated from operating risk?", k: "segregation" },
  { q: "If a trust or foundation is part of the structure, has it been reviewed in the last twelve months?", k: "trust" },
  { q: "Are cross border positions coordinated rather than handled jurisdiction by jurisdiction?", k: "crossborder" },
  { q: "Is succession documented through wills, trust deeds, or shareholder agreements?", k: "succession" },
  { q: "Could the structure continue functioning without you for six months?", k: "continuity" },
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
  const tier = score >= 12 ? "Legacy Grade" : score >= 7 ? "Workable" : "At Risk";
  const tierColor = tier === "Legacy Grade" ? "var(--azure)" : tier === "Workable" ? "var(--berry)" : "oklch(0.62 0.20 25)";
  const tierNote =
    tier === "Legacy Grade"
      ? "Your wealth structure is designed for continuity. The work now is to keep it current as the family, the assets, and the jurisdictions evolve."
      : tier === "Workable"
        ? "Your structure functions but carries unaddressed exposures. A targeted reset would protect the value already built before the next inflection."
        : "Your wealth is exposed at multiple structural points. A deliberate design now is materially cheaper than the restructuring a future event will force.";

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
              Answer the seven questions. Your wealth structure tier appears here, with no lead form and no email required.
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
                Assess My Structure
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

function WealthStructureDesignPage() {
  return (
    <SiteLayout>
        <SEOHead
        title="Wealth Structure Design | Red Berry"
        description="Holding companies, foundations and trusts designed around your assets and intentions. Wealth structuring in the UAE for founders and families."
        url="https://redberry.ae/wealth-structure-design"
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
            <span className="text-foreground/80">Wealth Structure Design</span>
          </nav>

          <div className="mt-6 grid lg:grid-cols-[1.45fr_1fr] gap-10 items-start">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-[10px] tracking-[0.22em] uppercase text-foreground/70">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--berry)" }} />
                Infrastructure Layer · 03 / 07
              </div>
              <h1 className="mt-5 text-4xl md:text-6xl font-display leading-[1.05] text-gradient speakable">
                Wealth Structure Design
              </h1>
              <p className="mt-5 text-lg md:text-xl text-foreground/75 max-w-2xl leading-relaxed speakable">
                The holding architecture beneath every serious balance sheet. Designed so wealth compounds quietly under a structure that absorbs change.
              </p>
              <p className="mt-3 text-base md:text-lg text-foreground/65 max-w-2xl leading-relaxed">
                Wealth Structure Design is not paperwork. It is the system that decides how ownership is held, how risk is segregated, how distributions flow, and how the next generation inherits without rebuilding everything.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link
                  to="/blueprint-tool"
                  className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-primary-foreground font-medium shadow-[var(--shadow-glow)] hover:shadow-[var(--shadow-lift)] transition-all"
                  style={{ background: "var(--gradient-berry)" }}
                >
                  Assess My Structure
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
              <WealthStructureHeroArt />
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
      <InfrastructureNavigator currentSlug="wealth-structure-design" />

      {/* WHY THIS LAYER MATTERS */}
      <section className="container-rb py-14 md:py-20" aria-labelledby="why-matters">
        <header className="max-w-3xl">
          <p className="text-xs tracking-[0.2em] uppercase text-foreground/55">The Role</p>
          <h2 id="why-matters" className="mt-3 text-3xl md:text-5xl font-display text-foreground">
            Why Wealth Structure Matters
          </h2>
          <p className="mt-4 text-foreground/65 text-lg leading-relaxed">
            Wealth that is built without a structure is wealth that depends on the person who built it. Design the structure and the value becomes durable, transferable, and defensible.
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
            What Happens Without A Real Wealth Structure
          </h2>
          <p className="mt-4 text-foreground/65 text-lg leading-relaxed">
            Weak wealth structure rarely fails on an ordinary day. It fails at the precise moment value matters most, an exit, a dispute, a death, an audit.
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
            The Wealth Structure Framework
          </h2>
          <p className="mt-4 text-foreground/65 text-lg leading-relaxed">
            Seven layers, engineered as one structure. Each layer constrains or unlocks the next.
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
            The Wealth Structure Health Check
          </h2>
          <p className="mt-4 text-foreground/65 text-lg leading-relaxed">
            Seven questions. An immediate read on whether your wealth structure is At Risk, Workable, or Legacy Grade. No form, no email, just structural clarity.
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
            Common Wealth Structure Mistakes
          </h2>
          <p className="mt-4 text-foreground/65 text-lg leading-relaxed">
            The most expensive structural mistakes look reasonable at the time. Each one quietly limits the family for decades.
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
              Where Wealth Structure Shows Up
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
            Wealth Structure Design does not stand alone. These layers attach directly to it.
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
            Wealth Structure Questions
          </h2>
          <p className="mt-4 text-foreground/65 text-lg leading-relaxed">
            Twenty five questions structured for beginners, operators, and advanced families.
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
                Assess My Structure
              </h2>
              <p className="mt-4 text-base md:text-lg text-primary-foreground/85 leading-relaxed max-w-2xl">
                Map your current ownership, holding companies, trusts, foundations, and succession positions against the structure your wealth will actually require.
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
            Structure Decides Legacy
          </h2>
          <p className="mt-4 text-foreground/70 text-lg leading-relaxed max-w-2xl mx-auto">
            Tell us what you hold. We will show you which holding, trust, foundation, and governance choices actually decide whether the value survives.
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

export default WealthStructureDesignPage;
