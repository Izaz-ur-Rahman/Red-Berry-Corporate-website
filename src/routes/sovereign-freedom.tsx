import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import {
  ArrowRight, ArrowUpRight, AlertTriangle, XCircle,
  Layers, Crown, Compass,
  Sparkles, Globe2, MapPin, ShieldCheck,
} from "lucide-react";
import { SEOHead } from "@/components/common/SEOHead";
import {
  Accordion, AccordionItem, AccordionTrigger, AccordionContent,
} from "@/components/ui/accordion";
import { SiteLayout } from "@/components/site/SiteLayout";
import { SovereignFreedomHeroArt } from "@/components/infrastructure/SovereignFreedomHeroArt";
import { InfrastructureNavigator } from "@/components/infrastructure/InfrastructureNavigator";

// CONTENT for Sovereign Freedom

const EXECUTIVE_SUMMARY =
  "Sovereign Freedom is the infrastructure layer that gives individuals and families genuine mobility across jurisdictions. It covers residency evaluation, Golden Visa structuring, citizenship pathway planning, tax residency alignment, second base establishment, family member coordination, and the long term optionality that comes from having more than one place to call home. Without it, a family is anchored to a single jurisdiction, exposed to every policy change, and limited by the options of one government. With it, residency becomes an asset, mobility becomes a strategy, and the family retains the option to be where they need to be, when they need to be there.";

const WHY_MATTERS = [
  { t: "Purpose", d: "Sovereign Freedom creates jurisdictional optionality. It means you are never trapped by the politics, policy, or instability of a single country." },
  { t: "Role", d: "It coordinates residency, tax, family, and estate planning across multiple jurisdictions into a single coherent strategy." },
  { t: "Importance", d: "A single passport or single tax residency is a single point of failure. Diversifying where you are legally present is as important as diversifying what you own." },
  { t: "Strategic Value", d: "Multiple residency pathways unlock access to banking, investment, education, healthcare, and business structures that are unavailable to single jurisdiction residents." },
  { t: "Long Term Impact", d: "The families who have mobility options adapt faster to change. Those who do not are always reacting to circumstances they cannot control." },
];

const RISKS = [
  { t: "Single Jurisdiction Trap", d: "All residency, tax, and legal exposure concentrated in one country. A policy change or crisis leaves no alternative." },
  { t: "Golden Visa Missed Deadline", d: "Visa programs close, increase in price, or add requirements with little notice. The window to act closes while the family deliberates." },
  { t: "Tax Residency Mismatched", d: "Establishing physical presence in one country while maintaining tax residency in another. Both jurisdictions claim tax, and neither gives credit." },
  { t: "Family Members Left Behind", d: "The principal applicant secures residency but spouse, children, or parents are excluded. The family separates or the move fails." },
  { t: "Citizenship Pathway Never Started", d: "Residency held for years without progressing to citizenship. The pathway requires documented continuity that was never planned." },
];

const FRAMEWORK = [
  { n: "01", t: "Residency Evaluation", d: "Assessment of current status, eligibility, and intent across target jurisdictions. The starting point of every mobility conversation." },
  { n: "02", t: "Golden Visa Structuring", d: "The UAE Golden Visa and equivalent programs structured for the family's specific profile, investment capacity, and timeline." },
  { n: "03", t: "Citizenship Pathway Planning", d: "Long term naturalization or citizenship by investment routes mapped with realistic timelines, contingencies, and documentation requirements." },
  { n: "04", t: "Tax Residency Alignment", d: "Physical presence, economic ties, and reporting obligations coordinated so tax residency is intentional, not accidental." },
  { n: "05", t: "Second Base Establishment", d: "The practical infrastructure of a second home, banking, healthcare, education, and local relationships that make residency real." },
  { n: "06", t: "Family Coordination", d: "Spouse, children, parents, and future generations included in the mobility strategy, not treated as afterthoughts." },
  { n: "07", t: "Continuity And Renewal", d: "Documentation, timeline tracking, and compliance maintenance so the status never lapses and pathways continue to their intended outcome." },
];

const MISTAKES = [
  { t: "Treating Residency As A Transaction", d: "Buying a property to qualify for a visa without planning how the residency integrates with tax, estate, and family life. The visa is secured, the strategy is missing.", how: "Design residency as part of a broader family and financial strategy. The visa is a tool, not the destination." },
  { t: "Choosing The Wrong Jurisdiction", d: "Selecting a country for lifestyle reasons without understanding tax treaties, exit taxes, or the difficulty of reversing the decision.", how: "Evaluate jurisdictions on tax, treaty, banking, healthcare, education, and exit cost before committing." },
  { t: "Golden Visa Without The Visa", d: "Investing the required amount but failing the medical, background, or documentation requirements. The money is spent, the visa is not secured.", how: "Begin the documentation and diligence process before committing capital. Confirm eligibility before investing." },
  { t: "Ignoring Exit Tax", d: "Leaving a high tax jurisdiction without understanding the departure tax, deemed disposition, or continued filing obligations.", how: "Model the full cost of departure, including exit tax, ongoing filing, and treaty implications, before the move." },
  { t: "Letting Permits Lapse", d: "Missing renewal deadlines because no one is tracking the calendar. The status evaporates and the process must restart from the beginning.", how: "Build a compliance calendar with renewal alerts, documentation requirements, and a responsible party for each jurisdiction." },
  { t: "No Family Contingency", d: "Planning only for the principal applicant. When circumstances change, the rest of the family has no legal pathway.", how: "Include every family member in the initial strategy. Define their status, their pathway, and their fallback options." },
];


const RELATED_AMBITIONS = [
  { slug: "increase-global-freedom", title: "Increase Global Freedom", d: "Sovereign Freedom is the infrastructure that turns mobility from a dream into a documented strategy.", icon: Globe2, href: "/increase-global-freedom" },
  { slug: "expand-into-the-gcc", title: "Expand Into The GCC", d: "Regional expansion begins with residency. Sovereign Freedom anchors every cross border move.", icon: MapPin, href: "/expand-into-gcc" },
  { slug: "create-family-security", title: "Create Family Security", d: "Family security includes the option to be elsewhere if circumstances require it.", icon: ShieldCheck, href: "/create-family-security" },
];

const RELATED_LAYERS = [
  { slug: "foundation-build", title: "Foundation Build", d: "The corporate spine that holds operating entities across jurisdictions.", icon: Layers, href: "/foundation-build" },
  { slug: "wealth-structure-design", title: "Wealth Structure Design", d: "The holding architecture that protects assets as they move across borders.", icon: Crown, href: "/wealth-structure-design" },
  { slug: "legacy-life-architecture", title: "Legacy And Life Architecture", d: "Continuity planning that spans the jurisdictions the family calls home.", icon: Compass, href: "/legacy-life-architecture" },
];

const FAQS_BEGINNER = [
  { q: "What is Sovereign Freedom?", a: "Sovereign Freedom is the infrastructure layer that gives individuals and families genuine mobility across jurisdictions through residency, Golden Visa, citizenship pathways, and tax alignment." },
  { q: "What is a Golden Visa?", a: "A long term residency visa granted to investors, entrepreneurs, or exceptional talent in exchange for a qualifying investment or contribution. The UAE Golden Visa is among the most sought after in the world." },
  { q: "How long does UAE Golden Visa take?", a: "A well prepared application typically takes four to twelve weeks from submission to issuance, assuming documentation is complete and eligibility is confirmed." },
  { q: "Can my family come with me?", a: "Yes. The UAE Golden Visa allows inclusion of spouse, children, and in some cases parents. Family coordination is part of the infrastructure design." },
  { q: "Do I need to live in the UAE full time?", a: "No. The Golden Visa does not require full time residence. However, tax residency and physical presence rules in other jurisdictions must be considered." },
  { q: "What is tax residency?", a: "Tax residency is the jurisdiction that has the primary right to tax your worldwide income. It is determined by physical presence, economic ties, and domestic law, not by citizenship alone." },
  { q: "Can I have residency in more than one country?", a: "Yes. Many individuals hold residency in multiple jurisdictions. The key is to ensure tax residency is intentional and properly aligned to avoid double taxation." },
  { q: "What happens if I let my residency lapse?", a: "Lapsed residency means the loss of legal status, banking access, and pathway progress. Renewal deadlines must be tracked and met." },
];

const FAQS_INTERMEDIATE = [
  { q: "How is a Golden Visa structured?", a: "It begins with eligibility confirmation, then investment structuring, documentation preparation, application submission, medical and background checks, and finally visa issuance and Emirates ID." },
  { q: "What is the difference between residency and citizenship?", a: "Residency grants the right to live and work in a country. Citizenship grants full membership, including a passport and voting rights. Residency is often a pathway to citizenship." },
  { q: "How does tax residency work across borders?", a: "Most countries tax residents on worldwide income. If you are resident in two countries, a tax treaty determines which has priority. Without a treaty, double taxation may apply." },
  { q: "Which jurisdictions work best for Golden Visa?", a: "The UAE, Portugal, Greece, Spain, and Malta are among the most popular. The right choice depends on tax, lifestyle, banking, and the family's specific objectives." },
  { q: "How is family included in the application?", a: "Each jurisdiction has different rules. Typically spouse and minor children are included. Some programs extend to parents and adult children under certain conditions." },
  { q: "What is the minimum investment for UAE Golden Visa?", a: "The public investment threshold is AED 2 million in real estate or an approved investment fund. Business and talent categories have different criteria." },
  { q: "Do I need to renounce my current citizenship?", a: "Not for residency. Citizenship by investment in some countries may require renunciation depending on your existing citizenship. The UAE does not currently offer citizenship by investment." },
  { q: "How is healthcare handled in second residency?", a: "Each jurisdiction has its own healthcare system. In the UAE, private health insurance is mandatory for residents. The quality is high and coverage is widely available." },
  { q: "What documentation is typically required?", a: "Passport, photographs, proof of investment or eligibility, police clearance, medical certificate, and in some cases proof of address and financial means." },
  { q: "How does residency affect banking access?", a: "Residency typically unlocks local banking, lending, and investment products. Multi residency can provide access to banking in multiple jurisdictions with different currency and product advantages." },
];

const FAQS_ADVANCED = [
  { q: "How is multi-jurisdictional residency structured?", a: "Each residency chosen for a specific purpose: business, banking, lifestyle, or tax. The combination must be coordinated so residency claims do not conflict and tax obligations are clear." },
  { q: "What is citizenship by investment?", a: "A program that grants citizenship in exchange for a significant investment in the country's economy. Different from residency, it provides a passport and full membership rights." },
  { q: "How does exit tax planning work?", a: "Exit tax is a charge on unrealized gains when leaving a high tax jurisdiction. Planning includes timing the departure, structuring assets, and using treaties or exemptions where available." },
  { q: "What is the role of a family office in mobility?", a: "A family office coordinates residency, tax, estate, investment, and compliance across all jurisdictions the family touches. It is the central nervous system of sovereign freedom." },
  { q: "How is estate planning coordinated across jurisdictions?", a: "Each jurisdiction has different forced heirship, probate, and tax rules. Estate planning must be designed to work in all relevant jurisdictions simultaneously." },
  { q: "What are the compliance obligations of multiple residencies?", a: "Each residency carries its own reporting, renewal, physical presence, and tax filing obligations. A compliance calendar and central tracking system are essential." },
  { q: "How does sovereign freedom interact with wealth structure?", a: "The holding architecture and the residency strategy must align. Where you are resident affects how your structure is taxed, reported, and enforced." },
];

const FAQS_ALL = [...FAQS_BEGINNER, ...FAQS_INTERMEDIATE, ...FAQS_ADVANCED];

// HEALTH CHECK

const HEALTH_QUESTIONS = [
  { q: "Do you have residency in more than one jurisdiction?", k: "multi" },
  { q: "Is your tax residency intentional and documented?", k: "tax" },
  { q: "Does your family have a coordinated mobility plan?", k: "family" },
  { q: "Have you established a second base with banking and healthcare?", k: "base" },
  { q: "Are your permits and documentation current and tracked?", k: "permits" },
  { q: "Do you have a citizenship pathway with a documented timeline?", k: "citizenship" },
  { q: "Would a policy change in your home country leave you with options?", k: "options" },
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
  const tier = score >= 12 ? "Sovereign Grade" : score >= 7 ? "Workable" : "At Risk";
  const tierColor = tier === "Sovereign Grade" ? "var(--azure)" : tier === "Workable" ? "var(--berry)" : "oklch(0.62 0.20 25)";
  const tierNote =
    tier === "Sovereign Grade"
      ? "Your sovereign freedom architecture is well designed. The focus now is maintenance, renewal tracking, and preparing the next generation."
      : tier === "Workable"
        ? "You have some mobility optionality but with gaps. A targeted reset would close the vulnerabilities before they become problems."
        : "Your family is exposed to single jurisdiction risk. A deliberate sovereign freedom strategy now is materially cheaper than reacting to a crisis.";

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
              Answer the seven questions. Your sovereign freedom tier appears here, with no lead form and no email required.
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
                Assess My Mobility
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

function SovereignFreedomPage() {
  return (
    <SiteLayout>
      {/* HERO */}
       <SEOHead
        title="Sovereign Freedom | Red Berry"
        description="Citizenship, residency and jurisdiction chosen deliberately. Sovereign positioning that gives founders real optionality over where they live and hold."
        url="https://redberry.ae/sovereign-freedom"
      />
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 blueprint-grid opacity-60 pointer-events-none" aria-hidden />
        <div className="container-rb pt-14 md:pt-20 pb-12 md:pb-16 relative">
          <nav aria-label="Breadcrumb" className="text-xs text-foreground/55 flex items-center gap-2">
            <Link to="/" className="hover:text-foreground">Red Berry</Link>
            <span>/</span>
            <Link to="/infrastructure" className="hover:text-foreground">Infrastructure</Link>
            <span>/</span>
            <span className="text-foreground/80">Sovereign Freedom</span>
          </nav>

          <div className="mt-6 grid lg:grid-cols-[1.45fr_1fr] gap-10 items-start">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-[10px] tracking-[0.22em] uppercase text-foreground/70">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--berry)" }} />
                Infrastructure Layer · 06 / 07
              </div>
              <h1 className="mt-5 text-4xl md:text-6xl font-display leading-[1.05] text-gradient speakable">
                Sovereign Freedom
              </h1>
              <p className="mt-5 text-lg md:text-xl text-foreground/75 max-w-2xl leading-relaxed speakable">
                The infrastructure that gives individuals and families genuine mobility across jurisdictions through residency, Golden Visa, and citizenship pathways.
              </p>
              <p className="mt-3 text-base md:text-lg text-foreground/65 max-w-2xl leading-relaxed">
                Sovereign Freedom is not a travel plan. It is the system that coordinates residency, tax, family, and estate planning into a single coherent mobility strategy.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link
                  to="/blueprint-tool"
                  className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-primary-foreground font-medium shadow-[var(--shadow-glow)] hover:shadow-[var(--shadow-lift)] transition-all"
                  style={{ background: "var(--gradient-berry)" }}
                >
                  Assess My Mobility
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
              <SovereignFreedomHeroArt />
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
      <InfrastructureNavigator currentSlug="sovereign-freedom" />

      {/* WHY THIS LAYER MATTERS */}
      <section className="container-rb py-14 md:py-20" aria-labelledby="why-matters">
        <header className="max-w-3xl">
          <p className="text-xs tracking-[0.2em] uppercase text-foreground/55">The Role</p>
          <h2 id="why-matters" className="mt-3 text-3xl md:text-5xl font-display text-foreground">
            Why Sovereign Freedom Matters
          </h2>
          <p className="mt-4 text-foreground/65 text-lg leading-relaxed">
            In a world where policy changes overnight, a single jurisdiction is a single point of failure. Sovereign Freedom is the architecture of optionality.
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
            What Happens Without Real Sovereign Freedom
          </h2>
          <p className="mt-4 text-foreground/65 text-lg leading-relaxed">
            Weak sovereign freedom rarely fails quietly. It fails when a policy changes, a visa closes, or a family needs to move and has nowhere to go.
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
            The Sovereign Freedom Framework
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
            The Sovereign Freedom Health Check
          </h2>
          <p className="mt-4 text-foreground/65 text-lg leading-relaxed">
            Seven questions. An immediate read on whether your sovereign freedom is At Risk, Workable, or Sovereign Grade. No form, no email, just structural clarity.
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
            Common Sovereign Freedom Mistakes
          </h2>
          <p className="mt-4 text-foreground/65 text-lg leading-relaxed">
            The most expensive mobility mistakes look reasonable at the time. Each one quietly limits the family for years.
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
              Where Sovereign Freedom Shows Up
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
            Sovereign Freedom does not stand alone. These layers attach directly to it.
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
            Sovereign Freedom Questions
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
                Assess My Mobility
              </h2>
              <p className="mt-4 text-base md:text-lg text-primary-foreground/85 leading-relaxed max-w-2xl">
                Map your current residency, tax, family, and citizenship positions against the architecture your mobility ambition will actually require.
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
            Freedom Is Infrastructure
          </h2>
          <p className="mt-4 text-foreground/70 text-lg leading-relaxed max-w-2xl mx-auto">
            Tell us where you are and where you want to be. We will show you which residency, tax, and citizenship choices actually decide whether your family has options when they need them.
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

export default SovereignFreedomPage;
