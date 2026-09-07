import { Link } from "react-router-dom";
import { SiteLayout } from "@/components/site/SiteLayout";
import { LaunchHeroArt } from "@/components/launch/LaunchHeroArt";
import {
  ArrowRight, ArrowUpRight, CheckCircle2, XCircle, Building2, Coins,
  Fingerprint, Network, Compass, Plane, AlertTriangle, Sparkles,
} from "lucide-react";
import {
  Accordion, AccordionItem, AccordionTrigger, AccordionContent,
} from "@/components/ui/accordion";
import { SEOHead } from "@/components/common/SEOHead";
const FAQS: { q: string; a: string }[] = [
  { q: "Can foreigners own 100% of a UAE company?", a: "Yes. Across most mainland activities and every free zone, foreign founders can hold 100% ownership. The right structure depends on the activity, jurisdiction, and your long-term plan — not a blanket answer." },
  { q: "How much does it cost to launch a business in the UAE?", a: "True cost is a function of jurisdiction, activity, share capital, visas, office solution, and post-incorporation infrastructure. The headline license fee is rarely the real number — the cost of the wrong structure is." },
  { q: "How long does setup take?", a: "A simple free zone license can be issued in days. A defensible, bank-ready, growth-ready structure typically takes 3–8 weeks once decisions are made. We compress the decisions, not the diligence." },
  { q: "Can I get a UAE visa through my company?", a: "Yes. Most structures grant founder, investor, employee, and family visas. Free zones and mainland have different visa quotas and Golden Visa pathways worth designing around early." },
  { q: "Which jurisdiction is right for me — mainland or free zone?", a: "Mainland gives unrestricted local trade and government contracting. Free zones give specialised regulatory environments, 100% ownership clarity, and sector-specific advantages. The right answer is rarely 'cheapest'." },
  { q: "Can I operate internationally from a UAE entity?", a: "Yes. UAE entities trade globally with strong banking, a wide treaty network, and credible corporate identity. Cross-border operations require deliberate tax, IP, and ownership structuring." },
  { q: "What taxes apply to a UAE business?", a: "9% corporate tax above the AED 375,000 threshold, 5% VAT where applicable, and 0% personal income tax. Qualifying free zone income can remain at 0%. Structure determines exposure." },
  { q: "Do I need a physical office?", a: "Depends on jurisdiction and activity. Options range from flexi-desks to dedicated offices to warehousing. Office choice affects visa quota, banking, and credibility — design it, don't default to it." },
  { q: "What happens after incorporation?", a: "Incorporation is the start, not the finish. Banking, accounting, VAT registration, corporate tax registration, HR setup, and operational governance form the infrastructure that actually runs your business." },
  { q: "Can I open a bank account as a foreign founder?", a: "Yes — with the right structure, documentation, and presence. Banking has tightened; readiness matters far more than speed. We build entities the bank can underwrite." },
  { q: "What documents do I need to start?", a: "Typically passport copies, KYC, business plan, proof of address, and activity-specific approvals. Specifics depend on jurisdiction, shareholders, and regulated activities." },
  { q: "Can I move my existing foreign company to the UAE?", a: "Yes — via redomiciliation, branch registration, or a fresh UAE holding structure above your operating entity. Each route has different tax, IP, and continuity implications." },
  { q: "Can family members be on the company?", a: "Yes. Spousal, parental, and child visas are issued through your entity once eligibility is met. Family-owned structures need explicit governance from day one." },
  { q: "What if I want to expand to Saudi Arabia or the wider GCC later?", a: "Design for it now. A UAE structure can act as the regional holding company for KSA, Oman, Qatar, Bahrain, and Kuwait operations — but only if the layer is built with that intent." },
  { q: "Can I run a hospitality, F&B, or tourism venture?", a: "Yes. These activities have their own licensing pathways, municipality requirements, and tourism authority approvals. They deserve a specialised venture architecture, not a generic setup." },
  { q: "What is the Golden Visa, and can my company qualify me?", a: "The Golden Visa offers 5–10 year residency for investors, founders, and specialised talent. Eligibility can be unlocked through company ownership, capital, or qualifying activity." },
  { q: "Do I need a local sponsor or service agent?", a: "For most modern mainland and free zone structures, no. Some regulated mainland activities still use a Local Service Agent. We map this for your specific activity." },
  { q: "Can I hire employees from anywhere in the world?", a: "Yes. UAE entities sponsor work visas globally with no nationality restrictions for most roles. WPS payroll, end-of-service, and labour compliance must be infrastructure, not afterthought." },
  { q: "What ongoing compliance does my company face?", a: "Annual license renewal, audited accounts where required, corporate tax filing, VAT returns where applicable, UBO and ESR filings, and visa renewals. Compliance is continuous architecture." },
  { q: "Why work with Red Berry instead of a typical formation agent?", a: "Formation agents sell licenses. Red Berry builds the corporate, financial, identity, and growth infrastructure your venture will actually run on — designed for the next ten years, not the next ten days." },
];

const LAYERS = [
  { icon: Building2, t: "Foundation Build", d: "Jurisdiction, entity, ownership, licensing — the load-bearing corporate spine." },
  { icon: Coins, t: "Financial Infrastructure", d: "Books, banking, VAT, corporate tax — visibility into how value actually moves." },
  { icon: Fingerprint, t: "Identity Foundation", d: "Trademark, founder identity, and brand protection structured with intent." },
  { icon: Network, t: "Operational Readiness", d: "Visas, payroll, HR, governance — the systems that make the entity actually operate." },
  { icon: Compass, t: "Growth Infrastructure", d: "Holding architecture, investor-readiness, and scaling pathways designed in from day one." },
  { icon: Plane, t: "Mobility Infrastructure", d: "Founder visas, Golden Visa, and family residency aligned to the corporate plan." },
];

const ROADMAP = [
  { n: "01", t: "Idea Validation", d: "Pressure-test the activity, market entry assumptions, and revenue model before structure is chosen." },
  { n: "02", t: "Structure Selection", d: "Holding vs operating, single vs multi-entity, founder ownership architecture." },
  { n: "03", t: "Jurisdiction Selection", d: "Mainland, free zone, or hybrid — matched to activity, banking, and growth horizon." },
  { n: "04", t: "License Application", d: "Activity codes, approvals, share capital, MOA — engineered to support the next decision, not just this one." },
  { n: "05", t: "Identity Foundation", d: "Trademark, founder identity, and brand protection registered alongside incorporation." },
  { n: "06", t: "Bank Account Readiness", d: "Documentation, presence, and substance positioned so banking moves cleanly." },
  { n: "07", t: "Financial Infrastructure Setup", d: "Accounting, VAT, corporate tax registration, and reporting cadence." },
  { n: "08", t: "Operational Launch", d: "Visas issued, contracts in place, payroll live, governance documented." },
  { n: "09", t: "Growth Readiness", d: "Investor-ready cap table, regional expansion architecture, and continuity planning." },
];

const COMPARISON = [
  { k: "Foreign Ownership", m: "100% across most activities", f: "100% in every free zone" },
  { k: "Local UAE Trade", m: "Unrestricted across the UAE", f: "Through distributors or a mainland branch" },
  { k: "Government Contracts", m: "Eligible", f: "Generally not directly eligible" },
  { k: "Office Requirement", m: "Physical office typically required", f: "Flexi-desk to full office options" },
  { k: "Visa Eligibility", m: "Quota tied to office size", f: "Quota tied to package and facility" },
  { k: "Regulatory Environment", m: "Federal & emirate-level authorities", f: "Specialised free zone authority" },
  { k: "Best For", m: "Local trade, government work, retail, services", f: "Holding, tech, media, finance, trading, IP" },
];

const PITFALLS = [
  { t: "Wrong Jurisdiction", d: "Choosing the cheapest license, then discovering it cannot bank, cannot trade locally, or cannot scale." },
  { t: "Poor Ownership Structure", d: "Founders on the operating entity directly — instead of through a holding layer engineered for protection and exits." },
  { t: "Hidden Costs", d: "Renewals, visa quotas, share capital, NOC fees, deposits, and audit costs that surface only after the license is issued." },
  { t: "Compliance Confusion", d: "UBO, ESR, corporate tax, VAT, WPS — discovered late, fixed expensively." },
  { t: "Scaling Limitations", d: "Activity codes too narrow, share capital too low, or jurisdiction unable to host the next entity." },
  { t: "Tax Planning Gaps", d: "Qualifying free zone income lost, treaty access misused, IP held in the wrong layer." },
  { t: "Banking Challenges", d: "Entity formed without the substance and documentation banks now require." },
  { t: "Visa Uncertainty", d: "Founder, family, and team visas blocked by quota or activity mismatches." },
];

const AUDIENCES = [
  "Founders", "Startups", "SMEs", "International Entrepreneurs",
  "Investors", "Hospitality Ventures", "Family Businesses", "Business Expansion Projects",
];

function LaunchABusinessPage() {
  return (
    <SiteLayout>
      {/* HERO */}
      <SEOHead
  title="Launch a Business in the UAE | Red Berry"
  description="Set up in the UAE on foundations built to hold. Licence, structure, banking and residency handled as one build, not a checklist. Start with clarity."
  url="https://redberry.ae/launch-a-business"
/>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 blueprint-grid opacity-60 pointer-events-none" aria-hidden />
        <div className="container-rb pt-14 md:pt-20 pb-12 md:pb-16 relative">
          <nav aria-label="Breadcrumb" className="text-xs text-foreground/55 flex items-center gap-2">
            <Link to="/" className="hover:text-foreground">Red Berry</Link>
            <span>/</span>
            <Link to="/ambitions" className="hover:text-foreground">Ambitions</Link>
            <span>/</span>
            <span className="text-foreground/80">Launch A Business</span>
          </nav>

          <div className="mt-6 grid lg:grid-cols-[1.45fr_1fr] gap-10 items-start">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-[10px] tracking-[0.22em] uppercase text-foreground/70">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--berry)" }} />
                For Founders · UAE & GCC
              </div>
              <h1 className="mt-5 text-4xl md:text-6xl font-display leading-[1.05] text-gradient speakable">
                Launch A Business Worth Building Right
              </h1>
              <p className="mt-5 text-lg md:text-xl text-foreground/75 max-w-2xl leading-relaxed speakable">
                Starting a business in the UAE is not paperwork. It is the foundation of your next venture.
              </p>
              <p className="mt-3 text-base md:text-lg text-foreground/65 max-w-2xl leading-relaxed">
                Red Berry helps founders build the corporate, financial, and strategic infrastructure their
                ambitions need to grow with confidence in Dubai, Abu Dhabi, and across the GCC.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link
                  to="/blueprint-tool"
                  className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-primary-foreground font-medium shadow-[var(--shadow-glow)] hover:shadow-[var(--shadow-lift)] transition-all"
                  style={{ background: "var(--gradient-berry)" }}
                >
                  Start My Blueprint
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
              <LaunchHeroArt />
            </div>
          </div>
        </div>
      </section>

      {/* WHY MOST LAUNCHES STRUGGLE */}
      <section className="container-rb py-14 md:py-20" aria-labelledby="why-struggle">
        <header className="max-w-3xl">
          <p className="text-xs tracking-[0.2em] uppercase text-foreground/55">The Reality</p>
          <h2 id="why-struggle" className="mt-3 text-3xl md:text-5xl font-display text-foreground">
            Why Most Business Launches Struggle
          </h2>
          <p className="mt-4 text-foreground/65 text-lg leading-relaxed">
            Most founders focus on registration. Successful founders focus on infrastructure. The difference
            shows up at the first banking conversation, the first investor diligence, the first hire, and the
            first cross-border move.
          </p>
        </header>
        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {PITFALLS.map((p) => (
            <article key={p.t} className="p-5 rounded-2xl glass">
              <AlertTriangle className="h-5 w-5 text-primary/80" aria-hidden />
              <h3 className="mt-3 text-base font-display text-foreground">{p.t}</h3>
              <p className="mt-2 text-sm text-foreground/65 leading-relaxed">{p.d}</p>
            </article>
          ))}
        </div>
      </section>

      {/* WHAT LAUNCHING ACTUALLY REQUIRES */}
      <section className="container-rb py-14 md:py-20" aria-labelledby="what-launching">
        <header className="max-w-3xl">
          <p className="text-xs tracking-[0.2em] uppercase text-foreground/55">The Infrastructure Map</p>
          <h2 id="what-launching" className="mt-3 text-3xl md:text-5xl font-display text-gradient">
            What Does Launching A Business Actually Require?
          </h2>
          <p className="mt-4 text-foreground/65 text-lg leading-relaxed">
            Six load-bearing layers. Designed together, sequenced together, operated together.
          </p>
        </header>
        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {LAYERS.map((l, i) => (
            <article key={l.t} className="group p-6 rounded-2xl glass hover:shadow-[var(--shadow-lift)] transition-all">
              <div className="flex items-center justify-between">
                <span
                  className="grid place-items-center w-10 h-10 rounded-xl border border-border/60 bg-card"
                  style={{ color: i % 2 ? "var(--azure)" : "var(--berry)" }}
                >
                  <l.icon className="h-5 w-5" aria-label={`${l.t} icon`} />
                </span>
                <span className="text-[10px] tracking-[0.2em] uppercase text-foreground/40">
                  L.{String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-5 text-xl font-display text-foreground">{l.t}</h3>
              <p className="mt-2 text-sm text-foreground/70 leading-relaxed">{l.d}</p>
            </article>
          ))}
        </div>
      </section>

      {/* MAINLAND VS FREE ZONE */}
      <section className="container-rb py-14 md:py-20" aria-labelledby="mainland-vs-freezone">
        <header className="max-w-3xl">
          <p className="text-xs tracking-[0.2em] uppercase text-foreground/55">The First Big Decision</p>
          <h2 id="mainland-vs-freezone" className="mt-3 text-3xl md:text-5xl font-display text-foreground">
            Mainland vs Free Zone
          </h2>
          <p className="mt-4 text-foreground/65 text-lg leading-relaxed">
            Neither is universally better. The right choice depends on your activity, customer base, banking,
            and where the next entity in your structure needs to live.
          </p>
        </header>

        <div className="mt-10 overflow-x-auto rounded-2xl glass" role="region" aria-label="Mainland and free zone decision framework">
          <table className="w-full text-sm">
            <thead className="text-left">
              <tr className="border-b border-border/60">
                <th className="px-5 py-4 text-[11px] tracking-[0.2em] uppercase text-foreground/50">Dimension</th>
                <th className="px-5 py-4 text-[11px] tracking-[0.2em] uppercase text-foreground/50">Mainland</th>
                <th className="px-5 py-4 text-[11px] tracking-[0.2em] uppercase text-foreground/50">Free Zone</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON.map((row) => (
                <tr key={row.k} className="border-b border-border/40 last:border-0">
                  <td className="px-5 py-4 font-medium text-foreground/85">{row.k}</td>
                  <td className="px-5 py-4 text-foreground/70">{row.m}</td>
                  <td className="px-5 py-4 text-foreground/70">{row.f}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 grid md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl glass">
            <CheckCircle2 className="h-5 w-5 text-primary" aria-hidden />
            <h3 className="mt-3 font-display text-lg">Choose Mainland When…</h3>
            <p className="mt-2 text-sm text-foreground/70 leading-relaxed">
              You need to trade directly across the UAE, win government contracts, open physical retail, or
              operate regulated activities that mainland authorities license.
            </p>
          </div>
          <div className="p-5 rounded-2xl glass">
            <CheckCircle2 className="h-5 w-5" style={{ color: "var(--azure)" }} aria-hidden />
            <h3 className="mt-3 font-display text-lg">Choose Free Zone When…</h3>
            <p className="mt-2 text-sm text-foreground/70 leading-relaxed">
              You are building a holding, tech, media, finance, IP, or international trading business — and
              want a specialised regulator, clear ownership, and qualifying tax treatment.
            </p>
          </div>
        </div>
      </section>

      {/* ROADMAP */}
      <section className="container-rb py-14 md:py-20" aria-labelledby="roadmap">
        <header className="max-w-3xl">
          <p className="text-xs tracking-[0.2em] uppercase text-foreground/55">Step By Step</p>
          <h2 id="roadmap" className="mt-3 text-3xl md:text-5xl font-display text-gradient">
            The UAE Business Launch Roadmap
          </h2>
          <p className="mt-4 text-foreground/65 text-lg leading-relaxed">
            Nine stages, sequenced. Each one a decision — not a form.
          </p>
        </header>

        <ol className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-5" aria-label="Corporate infrastructure roadmap">
          {ROADMAP.map((s) => (
            <li key={s.n} className="relative p-6 rounded-2xl glass">
              <div
                className="text-xs tracking-[0.22em] uppercase font-medium"
                style={{ color: "var(--berry)" }}
              >
                Step {s.n}
              </div>
              <h3 className="mt-3 text-lg font-display text-foreground">{s.t}</h3>
              <p className="mt-2 text-sm text-foreground/70 leading-relaxed">{s.d}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* COST OF WRONG STRUCTURE */}
      <section className="container-rb py-14 md:py-20">
        <div className="rounded-3xl glass p-8 md:p-12 relative overflow-hidden">
          <div
            className="absolute -top-24 -right-24 w-80 h-80 rounded-full blur-3xl opacity-40"
            style={{ background: "var(--gradient-berry)" }}
            aria-hidden
          />
          <div className="relative max-w-3xl">
            <p className="text-xs tracking-[0.2em] uppercase text-foreground/55">The Hidden Tax</p>
            <h2 className="mt-3 text-3xl md:text-5xl font-display text-foreground">
              The Cost Of The Wrong Structure
            </h2>
            <p className="mt-4 text-foreground/70 text-lg leading-relaxed">
              The cheapest license is rarely the cheapest decision. Wrong structure compounds quietly —
              through every quarter, every hire, every funding round, every cross-border move.
            </p>
          </div>
          <div className="relative mt-8 grid md:grid-cols-3 gap-4">
            {[
              "Tax inefficiencies that erode margin",
              "Scaling limitations that block the next entity",
              "Investor complications during diligence",
              "Operational restrictions on activity and trade",
              "Restructuring costs and downtime",
              "Lost opportunities — partners, banking, mandates",
            ].map((x) => (
              <div key={x} className="p-5 rounded-2xl bg-card/80 border border-border/50">
                <XCircle className="h-5 w-5 text-destructive" aria-hidden />
                <p className="mt-3 text-sm text-foreground/80 leading-relaxed">{x}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO THIS IS FOR */}
      <section className="container-rb py-14 md:py-20">
        <header className="max-w-3xl">
          <p className="text-xs tracking-[0.2em] uppercase text-foreground/55">The Audience</p>
          <h2 className="mt-3 text-3xl md:text-5xl font-display text-foreground">Who This Page Is For</h2>
        </header>
        <div className="mt-8 flex flex-wrap gap-3">
          {AUDIENCES.map((a) => (
            <span key={a} className="px-4 py-2 rounded-full glass text-sm text-foreground/80">
              {a}
            </span>
          ))}
        </div>
      </section>

      {/* COMMON QUESTIONS — short answer blocks */}
      <section className="container-rb py-14 md:py-20" aria-labelledby="common-questions">
        <header className="max-w-3xl">
          <p className="text-xs tracking-[0.2em] uppercase text-foreground/55">Decision Inputs</p>
          <h2 id="common-questions" className="mt-3 text-3xl md:text-5xl font-display text-gradient">
            Common Questions Founders Ask
          </h2>
        </header>
        <div className="mt-10 grid md:grid-cols-2 gap-4">
          {FAQS.slice(0, 8).map((f) => (
            <article key={f.q} className="p-6 rounded-2xl glass">
              <h3 className="text-base font-display text-foreground">{f.q}</h3>
              <p className="mt-2 text-sm text-foreground/70 leading-relaxed">{f.a}</p>
            </article>
          ))}
        </div>
      </section>

      {/* BLUEPRINT TOOL */}
      <section className="container-rb py-14 md:py-20">
        <div
          className="rounded-3xl p-8 md:p-12 relative overflow-hidden text-primary-foreground"
          style={{ background: "var(--gradient-berry)" }}
        >
          <div className="absolute inset-0 blueprint-grid opacity-20 pointer-events-none" aria-hidden />
          <div className="relative grid lg:grid-cols-[1.4fr_1fr] gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-[10px] tracking-[0.22em] uppercase">
                <Sparkles className="h-3 w-3" /> Launch A Business Blueprint
              </div>
              <h2 className="mt-4 text-3xl md:text-5xl font-display leading-[1.05]">
                Get Your Personal Launch Blueprint
              </h2>
              <p className="mt-4 text-base md:text-lg text-primary-foreground/85 max-w-2xl leading-relaxed">
                A personalised roadmap that helps ambitious founders understand the infrastructure their
                venture needs — before making decisions that are expensive to reverse.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Link
                  to="/blueprint-tool"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white text-foreground font-medium hover:bg-white/90 transition-colors"
                >
                  Start My Blueprint
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/about/contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 border border-white/20 font-medium hover:bg-white/20 transition-colors"
                >
                  Talk To An Advisor
                </Link>
              </div>
            </div>
            <ul className="space-y-3" aria-label="Red Berry Ambition Infrastructure blueprint">
              {[
                "Corporate layer diagnosis",
                "Financial layer diagnosis",
                "Identity & sovereign layer diagnosis",
                "Tailored recommendations & roadmap",
              ].map((x) => (
                <li key={x} className="flex items-start gap-3 p-4 rounded-xl bg-white/10 border border-white/15">
                  <CheckCircle2 className="h-5 w-5 mt-0.5 shrink-0" />
                  <span className="text-sm">{x}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FOUNDER JOURNEY */}
      <section className="container-rb py-14 md:py-20" aria-labelledby="founder-journey">
        <header className="max-w-3xl">
          <p className="text-xs tracking-[0.2em] uppercase text-foreground/55">Founder Journeys</p>
          <h2 id="founder-journey" className="mt-3 text-3xl md:text-5xl font-display text-foreground">
            From Idea To Operating Venture
          </h2>
          <p className="mt-4 text-foreground/65 text-lg leading-relaxed">
            Not testimonials. Transformations — the path ambitious founders take through Red Berry's infrastructure layers.
          </p>
        </header>
        <div className="mt-10 grid md:grid-cols-5 gap-3" aria-label="Business expansion pathway into GCC markets">
          {["Idea", "UAE Entry", "Foundation Build", "Financial Infrastructure", "Growth"].map((s, i, arr) => (
            <div key={s} className="relative p-5 rounded-2xl glass">
              <div className="text-[10px] tracking-[0.22em] uppercase text-foreground/50">Stage {i + 1}</div>
              <div className="mt-2 text-lg font-display">{s}</div>
              {i < arr.length - 1 && (
                <ArrowRight className="hidden md:block absolute top-1/2 -right-2.5 -translate-y-1/2 h-4 w-4 text-foreground/40" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="container-rb py-14 md:py-20" aria-labelledby="faq">
        <header className="max-w-3xl">
          <p className="text-xs tracking-[0.2em] uppercase text-foreground/55">Frequently Asked</p>
          <h2 id="faq" className="mt-3 text-3xl md:text-5xl font-display text-gradient">
            Everything Founders Ask About Launching In The UAE
          </h2>
        </header>
        <div className="mt-8 rounded-2xl glass p-2 md:p-4">
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((f, i) => (
              <AccordionItem key={f.q} value={`q-${i}`} className="px-4">
                <AccordionTrigger className="text-left text-base font-display text-foreground">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-foreground/75 leading-relaxed">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="container-rb pb-24">
        <div className="rounded-3xl glass p-8 md:p-14 text-center">
          <h2 className="text-3xl md:text-5xl font-display text-gradient leading-tight">
            Tell Us What You Are Building
          </h2>
          <p className="mt-4 text-foreground/70 text-lg max-w-2xl mx-auto leading-relaxed">
            We will show you the infrastructure it needs.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/blueprint-tool"
              className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-primary-foreground font-medium shadow-[var(--shadow-glow)] hover:shadow-[var(--shadow-lift)] transition-all"
              style={{ background: "var(--gradient-berry)" }}
            >
              Start My Blueprint
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              to="/about/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl glass font-medium text-foreground hover:bg-foreground/5 transition-colors"
            >
              Talk To An Advisor
            </Link>
          </div>
          <div className="mt-8">
            <Link to="/ambitions" className="text-sm text-foreground/60 hover:text-foreground inline-flex items-center gap-1.5">
              Explore other ambitions <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

export default LaunchABusinessPage;
