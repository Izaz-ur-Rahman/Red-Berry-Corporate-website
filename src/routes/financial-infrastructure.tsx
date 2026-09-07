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
import { SEOHead } from "@/components/common/SEOHead";
import { SiteLayout } from "@/components/site/SiteLayout";
import { FinancialHeroArt } from "@/components/infrastructure/FinancialHeroArt";
import { InfrastructureNavigator } from "@/components/infrastructure/InfrastructureNavigator";

// CONTENT for Financial Infrastructure

const EXECUTIVE_SUMMARY =
  "Financial Infrastructure is the visibility layer beneath every venture. It covers accounting, bookkeeping, tax compliance, management reporting, treasury, and the audit trail. This is the system that decides whether founders make decisions on real numbers or guesses, whether the business can answer a bank or investor question on the same day it is asked, and whether the entity can defend every dirham that moves through it. Get this layer right and capital, credibility, and clarity compound. Get it wrong and every later inflection costs more than it should.";

const WHY_MATTERS = [
  { t: "Purpose", d: "Financial Infrastructure turns activity into intelligence. Every transaction becomes a data point that supports a decision, a filing, or a future conversation with capital." },
  { t: "Role", d: "It is the operating dashboard for the venture. Books, tax, reporting, and treasury sit inside one coherent system rather than scattered across spreadsheets and inboxes." },
  { t: "Importance", d: "Without trustworthy numbers, every other decision is a guess. Pricing, hiring, expansion, fundraising, and exit all run on the quality of this layer." },
  { t: "Strategic Value", d: "Clean financial infrastructure compresses diligence, unlocks credit, supports treaty positioning, and reduces the regulatory surface the business carries." },
  { t: "Long Term Impact", d: "Five years of clean books is an asset. Five years of patched books is a liability that surfaces at the worst possible moment." },
];

const RISKS = [
  { t: "Decisions On Bad Data", d: "Founders pricing, hiring, and committing capital from numbers that do not reconcile. The cost shows up quarters later as missed margin and unfunded obligations." },
  { t: "Tax Exposure Builds Silently", d: "Corporate tax, VAT, and transfer pricing positions left untreated for two filings accumulate penalties, interest, and a regulator file that follows the entity." },
  { t: "Banking Credibility Erodes", d: "Banks reviewing inconsistent statements, late filings, or unreconciled accounts quietly downgrade limits and ask for personal guarantees they would not otherwise require." },
  { t: "Investor Diligence Stalls", d: "A funding round that should close in eight weeks runs sixteen because the data room cannot answer basic questions without rebuilding the history." },
  { t: "Exit Value Discounted", d: "Buyers price the cost of rebuilding the financial record into the offer. Years of value can be erased by a quarter of unclean books." },
];

const FRAMEWORK = [
  { n: "01", t: "Chart Of Accounts Design", d: "A chart structured for how the venture actually earns and spends. Built once with intent, not assembled by an accountant who has never seen the business." },
  { n: "02", t: "Bookkeeping Discipline", d: "Daily and monthly close cadence with documented reconciliation. Books that are always current, never caught up at year end." },
  { n: "03", t: "Tax Architecture", d: "Corporate tax, VAT, withholding, and transfer pricing positions designed as part of the structure. Not discovered after the first filing deadline." },
  { n: "04", t: "Management Reporting", d: "A monthly pack the founder, board, and investors all read from the same source. Margins, cash, and runway, never reverse engineered from a tax return." },
  { n: "05", t: "Treasury And Cash Control", d: "Bank account architecture, signatory rules, FX policy, and working capital discipline that protect cash rather than chase it." },
  { n: "06", t: "Audit And Assurance", d: "Internal controls, audit readiness, and statutory audit cadence treated as infrastructure. The auditor becomes a confirmation step, not a forensic exercise." },
  { n: "07", t: "Capital Reporting", d: "Investor updates, lender covenants, and group consolidation produced from the same ledger. One source of truth, multiple audiences." },
];

const MISTAKES = [
  { t: "Spreadsheet Accounting", d: "Running a real business on a spreadsheet works until it does not. The day the bank, the regulator, or an investor asks for a trial balance, the gap is exposed.", how: "Move to a proper ledger from day one. The cost is trivial relative to the credibility it buys." },
  { t: "Bookkeeping Caught Up Quarterly", d: "Books reconstructed every quarter mean three months of decisions made blind. Errors compound, anomalies hide, and the auditor finds them.", how: "Close monthly. Reconcile bank, receivables, payables, and intercompany every period." },
  { t: "Tax As An Afterthought", d: "Corporate tax registered late, VAT scope misread, and qualifying free zone income lost because the structure was never reviewed against the activity.", how: "Treat tax as design, not paperwork. Review positions before the first filing, not after." },
  { t: "One Bank Account For Everything", d: "Operating, holding, payroll, and tax money flowing through a single account that nobody can audit cleanly. Cash discipline collapses under the simplest stress.", how: "Segregate by purpose. Operating, tax reserve, payroll, and capital each in their own lane." },
  { t: "Reporting Built In The CFO Inbox", d: "Numbers pulled together in a different way every month for every audience. The board, the bank, and the founder all reading different versions of the same business.", how: "Build one reporting pack from the ledger. Every audience reads the same numbers." },
  { t: "Audit Treated As An Annual Panic", d: "The audit becomes a forensic rebuild of the year, with adjustments that materially change the picture investors and lenders relied on.", how: "Run the year as if the audit is continuous. Period close means audit ready close." },
];


const RELATED_AMBITIONS = [
  { slug: "launch-a-business", title: "Launch A Business", d: "Financial Infrastructure makes the first year defensible, not improvised.", icon: Building2, href: "/launch-a-business" },
  { slug: "grow-and-protect-wealth", title: "Grow And Protect Wealth", d: "Wealth compounds on visibility. Visibility comes from clean books.", icon: Coins, href: "/grow-and-protect-wealth" },
  { slug: "expand-into-the-gcc", title: "Expand Into The GCC", d: "Multi entity expansion only works on top of a real reporting layer.", icon: MapPin, href: "/expand-into-gcc" },
];

const RELATED_LAYERS = [
  { slug: "foundation-build", title: "Foundation Build", d: "The corporate spine the financial layer reports against.", icon: Layers, href: "/foundation-build" },
  { slug: "wealth-structure-design", title: "Wealth Structure Design", d: "Holding architecture that this layer feeds with reliable numbers.", icon: Landmark, href: "/infrastructure/wealth-structure-design" },
  { slug: "sovereign-freedom", title: "Sovereign Freedom", d: "Residency and treaty positions depend on documented financial substance.", icon: Crown, href: "/infrastructure/sovereign-freedom" },
];

const FAQS_BEGINNER = [
  { q: "What does Financial Infrastructure actually include?", a: "Chart of accounts, bookkeeping, tax registrations and filings, management reporting, treasury and bank account architecture, audit readiness, and investor or lender reporting." },
  { q: "Is bookkeeping the same as Financial Infrastructure?", a: "No. Bookkeeping is one component. Financial Infrastructure is the full system that turns transactions into reliable decisions, filings, and capital conversations." },
  { q: "Do small businesses need this?", a: "Yes. Smaller ventures benefit even more because there is no margin for rework. A clean foundation from day one is dramatically cheaper than retrofitting later." },
  { q: "Which accounting standard applies in the UAE?", a: "IFRS is the standard. Small entities often use IFRS for SMEs. Free zones increasingly require audited IFRS accounts on renewal." },
  { q: "Do I need an audit?", a: "Most mainland and many free zone entities now require an annual audit on renewal. Even where it is optional, audited accounts strengthen banking and investor positions." },
  { q: "What is the corporate tax rate?", a: "Nine percent above the AED 375,000 taxable income threshold. Qualifying free zone income can remain at zero when the structure, substance, and activity all align." },
  { q: "When does VAT apply?", a: "Registration becomes mandatory once taxable supplies exceed AED 375,000 in twelve months. Voluntary registration is available above AED 187,500." },
  { q: "How often should I close my books?", a: "Monthly. Reconciliations, accruals, and review should complete within the first ten working days of the following month." },
];

const FAQS_INTERMEDIATE = [
  { q: "What should a management reporting pack actually contain?", a: "Profit and loss with channel or segment view, balance sheet, cash flow, working capital position, and a short narrative on variances. Everything sourced from the ledger, not built fresh each month." },
  { q: "How do I structure bank accounts?", a: "Separate accounts for operating, tax reserve, payroll, and capital. Signatory rules and approval thresholds documented and enforced through the bank, not through trust." },
  { q: "How does transfer pricing apply in the UAE?", a: "Related party transactions must be priced at arm's length, with documentation proportionate to the size and complexity of the group. The corporate tax law and OECD guidelines apply." },
  { q: "What does audit readiness look like?", a: "Reconciled balances, supporting documentation filed and retrievable, policies documented, related party transactions disclosed, and management estimates supported." },
  { q: "How do I handle multi currency operations?", a: "Define a functional currency per entity. Translate at consistent rates. Hold FX policy explicitly rather than letting it drift through the income statement." },
  { q: "How are accruals and provisions treated?", a: "Recognised in the period they relate to, supported by documentation, and reviewed monthly. Cash basis accounting is not sufficient for entities preparing IFRS accounts." },
  { q: "What is needed for VAT compliance beyond the return?", a: "Tax invoice formatting, input tax recovery support, reverse charge documentation, partial exemption calculations where relevant, and a retention policy for records." },
  { q: "How does corporate tax interact with free zone income?", a: "Qualifying free zone persons can apply zero percent on qualifying income. Non qualifying income falls to nine percent. The boundary is technical and must be reviewed entity by entity." },
  { q: "What does intercompany discipline require?", a: "Documented agreements, arm's length pricing, timely settlement or formal recognition of loans, and consistent treatment across both sides of every transaction." },
  { q: "How should working capital be managed?", a: "Daily cash position, weekly forecast, monthly working capital review. Receivables and payables managed against target days, not letting cash drift through inertia." },
];

const FAQS_ADVANCED = [
  { q: "How is group consolidation built without manual rework?", a: "A harmonised chart across entities, a consolidation tool layered above the ledgers, and disciplined intercompany elimination. Consolidation becomes a control step, not a project." },
  { q: "How do covenants influence financial infrastructure?", a: "Debt covenants dictate the calculations, frequency, and format of reporting. They must be embedded into the close calendar, not produced reactively when the lender requests them." },
  { q: "What does treasury policy cover in a multi entity group?", a: "Cash pooling rules, FX hedging policy, counterparty limits, signatory matrix, intercompany funding terms, and the framework for distributions across the group." },
  { q: "How is reporting structured for a board?", a: "A standing pack covering performance, cash, risk, and forward outlook, supported by management commentary. The board reads the same numbers operations runs on, not a reconciled alternative." },
  { q: "How do I prepare financials for an exit process?", a: "Three years of audited IFRS accounts, normalised earnings supported by working schedules, clean intercompany history, and a tax position documented across every active filing." },
  { q: "How does ESR interact with financial reporting?", a: "Economic Substance reports rely on financial data the entity must already produce. Misalignment between ESR submissions and the audited accounts is a regulator flag." },
  { q: "What controls actually matter at scale?", a: "Segregation of duties on payments, dual approval above defined thresholds, vendor onboarding controls, periodic access reviews, and reconciliation sign offs evidenced in the close." },
];

const FAQS_ALL = [...FAQS_BEGINNER, ...FAQS_INTERMEDIATE, ...FAQS_ADVANCED];

// HEALTH CHECK

const HEALTH_QUESTIONS = [
  { q: "Are your books closed and reconciled within ten working days of month end?", k: "close" },
  { q: "Do you produce the same management reporting pack every month from the ledger?", k: "reporting" },
  { q: "Are corporate tax and VAT positions documented and current?", k: "tax" },
  { q: "Are your bank accounts segregated by purpose with documented signatory rules?", k: "treasury" },
  { q: "Could you hand a data room to an investor without rebuilding the history?", k: "diligence" },
  { q: "Are intercompany balances reconciled and supported by written agreements?", k: "intercompany" },
  { q: "Is your audit a confirmation step rather than a forensic rebuild?", k: "audit" },
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
      ? "Your financial infrastructure produces reliable numbers on time. The work now is to keep the cadence as complexity grows."
      : tier === "Workable"
        ? "Your financial layer operates, but carries reporting drag. A targeted reset would lower friction at the next banking, investor, or audit moment."
        : "Your financial layer is exposed at multiple points. A deliberate reset now is materially cheaper than the rebuild a future event will force.";

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
              Answer the seven questions. Your financial infrastructure tier appears here, with no lead form and no email required.
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
                Assess My Financials
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

function FinancialInfrastructurePage() {
  return (
    <SiteLayout>
        <SEOHead
        title="Financial Infrastructure | Red Berry"
        description="Banking, treasury and compliance arranged so money moves without friction. The financial rails ambitious businesses in the UAE and GCC run on."
        url="https://redberry.ae/financial-infrastructure"
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
            <span className="text-foreground/80">Financial Infrastructure</span>
          </nav>

          <div className="mt-6 grid lg:grid-cols-[1.45fr_1fr] gap-10 items-start">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-[10px] tracking-[0.22em] uppercase text-foreground/70">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--berry)" }} />
                Infrastructure Layer · 02 / 07
              </div>
              <h1 className="mt-5 text-4xl md:text-6xl font-display leading-[1.05] text-gradient speakable">
                Financial Infrastructure
              </h1>
              <p className="mt-5 text-lg md:text-xl text-foreground/75 max-w-2xl leading-relaxed speakable">
                The visibility layer beneath every venture. Accounting, tax, management reporting, treasury, and audit engineered as one system.
              </p>
              <p className="mt-3 text-base md:text-lg text-foreground/65 max-w-2xl leading-relaxed">
                Financial Infrastructure is not bookkeeping. It is the system that decides whether founders run on real numbers, whether banks and investors trust what they see, and whether the venture can answer any financial question on the day it is asked.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link
                  to="/blueprint-tool"
                  className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-primary-foreground font-medium shadow-[var(--shadow-glow)] hover:shadow-[var(--shadow-lift)] transition-all"
                  style={{ background: "var(--gradient-berry)" }}
                >
                  Assess My Financials
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
              <FinancialHeroArt />
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
      <InfrastructureNavigator currentSlug="financial-infrastructure" />

      {/* WHY THIS LAYER MATTERS */}
      <section className="container-rb py-14 md:py-20" aria-labelledby="why-matters">
        <header className="max-w-3xl">
          <p className="text-xs tracking-[0.2em] uppercase text-foreground/55">The Role</p>
          <h2 id="why-matters" className="mt-3 text-3xl md:text-5xl font-display text-foreground">
            Why The Financial Layer Matters
          </h2>
          <p className="mt-4 text-foreground/65 text-lg leading-relaxed">
            Every decision the venture makes about pricing, hiring, investment, and capital runs through the financial layer. Get this right and every conversation with banks, regulators, and investors becomes shorter and more credible.
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
            What Happens Without Real Financial Infrastructure
          </h2>
          <p className="mt-4 text-foreground/65 text-lg leading-relaxed">
            Weak financial infrastructure rarely fails on a single day. It charges a quiet tax on every banking review, every diligence, and every cross border move.
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
            The Financial Infrastructure Framework
          </h2>
          <p className="mt-4 text-foreground/65 text-lg leading-relaxed">
            Seven layers, engineered as one system. Decisions in any one layer constrain or unlock decisions in the next.
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
            The Financial Infrastructure Health Check
          </h2>
          <p className="mt-4 text-foreground/65 text-lg leading-relaxed">
            Seven questions. An immediate read on whether your financial layer is At Risk, Workable, or Investor Grade. No form, no email, just structural clarity.
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
            Common Financial Infrastructure Mistakes
          </h2>
          <p className="mt-4 text-foreground/65 text-lg leading-relaxed">
            The most expensive financial mistakes look reasonable at the time. Each one quietly limits the venture for years.
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
              Where Financial Infrastructure Shows Up
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
            Financial Infrastructure does not stand alone. These layers attach directly to it.
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
            Financial Infrastructure Questions
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
                Assess My Financials
              </h2>
              <p className="mt-4 text-base md:text-lg text-primary-foreground/85 leading-relaxed max-w-2xl">
                Map your current books, tax positions, reporting cadence, treasury, and audit posture against the financial infrastructure your ambition will actually require.
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
            Visibility Determines Outcomes
          </h2>
          <p className="mt-4 text-foreground/70 text-lg leading-relaxed max-w-2xl mx-auto">
            Tell us what you are building. We will show you which financial controls, reporting, and tax positions actually decide whether it scales.
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

export default FinancialInfrastructurePage;
