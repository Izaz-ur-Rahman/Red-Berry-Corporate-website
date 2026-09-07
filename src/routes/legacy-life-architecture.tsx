import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import {
  ArrowRight, ArrowUpRight, AlertTriangle, XCircle,
  Layers, Crown, Compass,
  Sparkles, Heart, ShieldCheck, Users,
} from "lucide-react";
import {
  Accordion, AccordionItem, AccordionTrigger, AccordionContent,
} from "@/components/ui/accordion";
import { SEOHead } from "@/components/common/SEOHead";
import { SiteLayout } from "@/components/site/SiteLayout";
import { LegacyLifeHeroArt } from "@/components/infrastructure/LegacyLifeHeroArt";
import { InfrastructureNavigator } from "@/components/infrastructure/InfrastructureNavigator";

// CONTENT for Legacy & Life Architecture

const EXECUTIVE_SUMMARY =
  "Legacy and Life Architecture is the infrastructure layer that turns a single life of effort into multi generational continuity. It coordinates family governance, succession planning, wills and trusts, next generation preparation, philanthropic intent, life transition planning, and the written principles that guide a family long after the founder steps back. Without it, even significant wealth dissolves within two generations, and family relationships are decided by probate courts and silent assumptions. With it, the family has a constitution, a council, a clear succession path, and a culture of stewardship that compounds value beyond a single chapter.";

const WHY_MATTERS = [
  { t: "Purpose", d: "Legacy Architecture exists to outlast the founder. It turns personal decisions into family principles that continue without you in the room." },
  { t: "Role", d: "It coordinates wills, trusts, governance, philanthropy, and next generation preparation into a single succession system." },
  { t: "Importance", d: "Seven out of ten families lose meaningful wealth in the second generation. Nine out of ten lose it in the third. The difference is architecture, not luck." },
  { t: "Strategic Value", d: "A written family constitution and a functioning council remove the conflict from succession events and protect both the relationships and the assets." },
  { t: "Long Term Impact", d: "Families with a constitution, council, and codified values remain coherent across three to five generations. Families without one rarely make it past two." },
];

const RISKS = [
  { t: "Probate Lottery", d: "No will, or a will that contradicts the holding structure. The court decides who gets what, on a timeline the family cannot control." },
  { t: "Heirs Unprepared", d: "Next generation inherits assets they were never taught to steward. The wealth arrives and the discipline does not." },
  { t: "Family Silence", d: "No conversation about succession until a health event forces it. Decisions get made in grief, not in clarity." },
  { t: "Governance Vacuum", d: "No council, no rules, no decision rights. Every family disagreement becomes a fight because there is no process to resolve it." },
  { t: "Philanthropy Without Structure", d: "Giving driven by emotion rather than intent. Capital leaves the family without creating the impact the founder hoped for." },
];

const FRAMEWORK = [
  { n: "01", t: "Family Charter", d: "The written articulation of purpose, values, and the boundaries the family operates inside. The document every later decision is measured against." },
  { n: "02", t: "Family Council Design", d: "The governance body, with defined membership, meeting cadence, decision rights, and dispute resolution rules. Where the family actually decides." },
  { n: "03", t: "Wills And Trust Architecture", d: "Wills, living trusts, foundations, and beneficiary structures designed to work with the holding architecture, across every jurisdiction the family touches." },
  { n: "04", t: "Succession Mapping", d: "Who steps into which role, on what timeline, with what preparation. Operating control, board seats, voting shares, and trusteeship sequenced deliberately." },
  { n: "05", t: "Next Generation Preparation", d: "Education, mentorship, and progressive responsibility for inheritors. Stewardship is taught before it is required, not after." },
  { n: "06", t: "Philanthropic Architecture", d: "Family foundation, endowment, or directed giving structured to express the family's purpose and to give the next generation a non commercial arena to lead in." },
  { n: "07", t: "Life Transition Protocols", d: "Documented protocols for the predictable events: marriage, divorce, illness, incapacity, death. The family is not improvising at the moment that matters most." },
];

const MISTAKES = [
  { t: "Treating Wills As The Plan", d: "Writing a will and assuming the work is done. A will is one document inside a system; without the system around it, the will is a starting point for litigation.", how: "Build the holding architecture, governance, and trust structures around the will so they reinforce each other rather than contradict." },
  { t: "Postponing The Conversation", d: "Deferring succession discussion until a diagnosis or crisis forces it. The decisions then get made under emotional pressure, with incomplete information.", how: "Start the conversation while the founder is healthy and engaged. Treat it as a quarterly working session, not a one off legal event." },
  { t: "Equal Distribution As A Default", d: "Splitting assets equally between heirs regardless of role, capacity, or interest. The result is paralysis in the operating business and resentment in the family.", how: "Distinguish between equal and equitable. Match assets to capacity and interest, with offsetting distributions where useful." },
  { t: "Ignoring The Spouses", d: "Designing succession only around blood relatives, leaving spouses outside the room. The structure breaks the first time a marriage or divorce changes the cast.", how: "Define the role of in-married spouses explicitly in the charter, with clear participation, voting, and exit terms." },
  { t: "Philanthropy As An Afterthought", d: "Adding charitable intent late, after the structure is already locked. The result is inefficient giving that does not match the family's actual purpose.", how: "Design philanthropy at the same time as the holding architecture so the structures reinforce one another and the tax treatment is intentional." },
  { t: "No Trustee Continuity", d: "Naming one trustee with no successor and no oversight. When that person is unavailable, the trust drifts or is contested.", how: "Always name successor trustees, an independent protector or oversight committee, and a defined replacement process." },
];


const RELATED_AMBITIONS = [
  { slug: "create-family-security", title: "Create Family Security", d: "Family security is the outcome. Legacy Architecture is the system that makes it real across generations.", icon: Heart, href: "/create-family-security" },
  { slug: "grow-and-protect-wealth", title: "Grow & Protect Wealth", d: "Wealth that compounds across generations is wealth held inside an architecture, not just on a balance sheet.", icon: ShieldCheck, href: "/grow-and-protect-wealth" },
  { slug: "increase-global-freedom", title: "Increase Global Freedom", d: "Mobility and continuity reinforce each other. A family that can move is also a family that can plan.", icon: Users, href: "/increase-global-freedom" },
];

const RELATED_LAYERS = [
  { slug: "wealth-structure-design", title: "Wealth Structure Design", d: "Holding architecture is the asset spine the legacy structures hang on.", icon: Crown, href: "/wealth-structure-design" },
  { slug: "sovereign-freedom", title: "Sovereign Freedom", d: "Multi jurisdictional residency shapes which estate and trust rules actually apply.", icon: Compass, href: "/sovereign-freedom" },
  { slug: "foundation-build", title: "Foundation Build", d: "The corporate spine succession plans transfer through.", icon: Layers, href: "/foundation-build" },
];

const FAQS_BEGINNER = [
  { q: "What is Legacy and Life Architecture?", a: "It is the infrastructure layer that coordinates wills, trusts, family governance, succession, and next generation preparation into a single continuity system." },
  { q: "Why do most family fortunes disappear by the third generation?", a: "Because the first generation builds, the second spends, and the third dissolves. Without governance and preparation, the discipline that created the wealth is not transferred with it." },
  { q: "What is a family charter?", a: "A written document that captures the family's purpose, values, and the rules it agrees to operate inside. It guides every later decision about wealth, business, and succession." },
  { q: "What is a family council?", a: "A formal body inside the family with defined membership, meeting cadence, and decision rights. It is where governance actually happens." },
  { q: "Do I need a will if I have a trust?", a: "Yes. The will and the trust play different roles. The will handles assets outside the trust and names guardians for minors. They are designed to work together." },
  { q: "When should we start succession planning?", a: "When the founder is healthy, engaged, and able to lead the conversation. Waiting until a crisis is the most common, and most expensive, mistake." },
  { q: "Should every child get an equal share?", a: "Equal is not always equitable. Distribution should account for role, capacity, and interest. The principles should be agreed and written down, not improvised." },
  { q: "What is a trustee?", a: "A person or institution that holds and manages assets on behalf of beneficiaries under the terms of a trust. The trustee owes fiduciary duty to those beneficiaries." },
];

const FAQS_INTERMEDIATE = [
  { q: "How is a family council structured?", a: "Membership is defined in the charter. Common patterns include the founder, adult children, in-married spouses, and sometimes independent advisors. Meeting cadence is usually quarterly with an annual full assembly." },
  { q: "What is a family constitution?", a: "A longer, more formal document than a charter. It includes the charter, the council rules, the succession framework, distribution principles, and the dispute resolution process." },
  { q: "How do trusts and the holding company interact?", a: "Trusts typically own shares in the holding company. The trustee exercises voting rights inside the structure, with guidance from a letter of wishes and oversight from a protector." },
  { q: "What is a letter of wishes?", a: "A non binding document from the settlor to the trustee describing intent. It guides how discretion is exercised without making the trust rigid or contestable." },
  { q: "What is a protector?", a: "An independent role that oversees the trustee, can replace them, and ensures the trust is administered in line with the family's intent." },
  { q: "How do we prepare the next generation?", a: "Through education, mentorship, progressive responsibility, and a non commercial arena like a family foundation. Stewardship is a skill, not a status." },
  { q: "What is a family office?", a: "A coordinated team that manages investments, governance, philanthropy, and administration on behalf of the family. It can be single family or multi family." },
  { q: "How do we handle in-married spouses?", a: "The charter should define their role explicitly. Common patterns include observer status, full participation, or participation conditional on tenure and prenuptial agreements." },
  { q: "Should the family business be transferred to all children?", a: "Not necessarily. Operating control should go to those with capacity and interest. Others can be compensated through other assets or through non operating equity." },
  { q: "How does philanthropy fit into the architecture?", a: "A family foundation or endowment expresses purpose, can provide tax efficiency, and gives the next generation a low risk environment to learn governance and allocation." },
];

const FAQS_ADVANCED = [
  { q: "How are cross jurisdictional estates structured?", a: "Each jurisdiction has its own forced heirship, probate, and tax rules. Wills and trusts must be drafted to work in all relevant jurisdictions, often with situs specific instruments." },
  { q: "What is forced heirship and how do we plan for it?", a: "Forced heirship is a legal rule in many civil law jurisdictions that reserves a fixed share for specific heirs. Planning involves choice of law, situs of assets, and use of trusts where recognized." },
  { q: "How is incapacity handled inside the architecture?", a: "Through living trusts, powers of attorney, advance directives, and pre defined protocols in the family charter. The system continues operating without the founder making decisions." },
  { q: "How do we resolve disputes inside the family council?", a: "The constitution should define a tiered process: discussion, mediation, an independent panel, and finally a binding arbitration clause. The aim is to resolve early, not to litigate." },
  { q: "How does the charter interact with prenuptial agreements?", a: "The charter often requires prenuptial agreements as a condition of inheritance or council participation. The instruments must be coordinated to avoid contradiction." },
  { q: "How is philanthropic capital deployed strategically?", a: "Through a defined theory of change, a giving committee, measurable outcomes, and a multi year commitment horizon. Strategic philanthropy is governed like any other allocation." },
  { q: "How do we plan for the founder's exit from operations?", a: "Through a phased handover with defined milestones, a clear last day for operating authority, and an ongoing role like chair, advisor, or council head if appropriate." },
];

const FAQS_ALL = [...FAQS_BEGINNER, ...FAQS_INTERMEDIATE, ...FAQS_ADVANCED];

// HEALTH CHECK

const HEALTH_QUESTIONS = [
  { q: "Do you have a written family charter or constitution?", k: "charter" },
  { q: "Is there a functioning family council with defined decision rights?", k: "council" },
  { q: "Are your wills and trusts coordinated with your holding structure?", k: "trusts" },
  { q: "Have you mapped succession for operating, board, and trustee roles?", k: "succession" },
  { q: "Is the next generation being prepared with real responsibility?", k: "nextgen" },
  { q: "Is your philanthropic intent structured and documented?", k: "philanthropy" },
  { q: "Do you have protocols for incapacity, divorce, and death?", k: "protocols" },
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
      ? "Your legacy architecture is well designed. The focus now is rhythm: regular council meetings, ongoing next generation development, and reviewing the charter as the family evolves."
      : tier === "Workable"
        ? "You have some continuity infrastructure but with material gaps. A targeted reset would close the vulnerabilities while everyone is still able to lead the conversation."
        : "Your family is exposed to succession risk. Probate, ambiguity, and unprepared heirs are the most common outcomes. A deliberate architecture now is materially cheaper than reacting to a crisis.";

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
              Answer the seven questions. Your legacy tier appears here, with no lead form and no email required.
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
                Architect My Legacy
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

function LegacyLifeArchitecturePage() {
  return (
    <SiteLayout>
      <SEOHead
        title="Legacy & Life Architecture | Red Berry"
        description="What outlasts you should be designed, not left to chance. Succession, governance and legacy planning for families building across generations"
        url="https://redberry.ae/legacy-life-architecture"
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
            <span className="text-foreground/80">Legacy & Life Architecture</span>
          </nav>

          <div className="mt-6 grid lg:grid-cols-[1.45fr_1fr] gap-10 items-start">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-[10px] tracking-[0.22em] uppercase text-foreground/70">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--berry)" }} />
                Infrastructure Layer · 07 / 07
              </div>
              <h1 className="mt-5 text-4xl md:text-6xl font-display leading-[1.05] text-gradient speakable">
                Legacy & Life Architecture
              </h1>
              <p className="mt-5 text-lg md:text-xl text-foreground/75 max-w-2xl leading-relaxed speakable">
                The infrastructure that turns a single life of effort into multi generational continuity through governance, succession, and the written principles that outlast the founder.
              </p>
              <p className="mt-3 text-base md:text-lg text-foreground/65 max-w-2xl leading-relaxed">
                Legacy Architecture is not estate planning. It is the system that coordinates charter, council, trusts, succession, and next generation preparation into one continuity strategy.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link
                  to="/blueprint-tool"
                  className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-primary-foreground font-medium shadow-[var(--shadow-glow)] hover:shadow-[var(--shadow-lift)] transition-all"
                  style={{ background: "var(--gradient-berry)" }}
                >
                  Architect My Legacy
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
              <LegacyLifeHeroArt />
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
      <InfrastructureNavigator currentSlug="legacy-life-architecture" />

      {/* WHY THIS LAYER MATTERS */}
      <section className="container-rb py-14 md:py-20" aria-labelledby="why-matters">
        <header className="max-w-3xl">
          <p className="text-xs tracking-[0.2em] uppercase text-foreground/55">The Role</p>
          <h2 id="why-matters" className="mt-3 text-3xl md:text-5xl font-display text-foreground">
            Why Legacy Architecture Matters
          </h2>
          <p className="mt-4 text-foreground/65 text-lg leading-relaxed">
            Wealth is the easy part. Continuity is the hard part. Legacy Architecture is what stops a single generation of effort from dissolving inside the next two.
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
            What Happens Without Real Legacy Architecture
          </h2>
          <p className="mt-4 text-foreground/65 text-lg leading-relaxed">
            The absence of architecture is rarely visible until the founder steps back. Then everything that was implicit becomes a question, and the questions become disputes.
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
            The Legacy Architecture Framework
          </h2>
          <p className="mt-4 text-foreground/65 text-lg leading-relaxed">
            Seven layers, engineered as one continuity system. Each layer is a precondition for the next.
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
            The Legacy Architecture Health Check
          </h2>
          <p className="mt-4 text-foreground/65 text-lg leading-relaxed">
            Seven questions. An immediate read on whether your family continuity is At Risk, Workable, or Legacy Grade. No form, no email, just structural clarity.
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
            Common Legacy Architecture Mistakes
          </h2>
          <p className="mt-4 text-foreground/65 text-lg leading-relaxed">
            The most expensive continuity mistakes are quiet at the time and irreversible later. Each one shows up as a dispute the family never expected to have.
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
              Where Legacy Architecture Shows Up
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
            Legacy Architecture does not stand alone. These layers attach directly to it.
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
            Legacy Architecture Questions
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
                Architect My Legacy
              </h2>
              <p className="mt-4 text-base md:text-lg text-primary-foreground/85 leading-relaxed max-w-2xl">
                Map your current charter, council, succession, and trust positions against the continuity your family will actually require across the next two generations.
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
            Continuity Is Infrastructure
          </h2>
          <p className="mt-4 text-foreground/70 text-lg leading-relaxed max-w-2xl mx-auto">
            Tell us what the family looks like today and what you want it to look like in three generations. We will show you which charter, council, succession, and trust choices actually decide whether the answer is yes.
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

export default LegacyLifeArchitecturePage;
