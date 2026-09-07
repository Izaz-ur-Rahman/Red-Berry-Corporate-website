import { Link } from "react-router-dom";
import { SiteLayout } from "@/components/site/SiteLayout";
import { WealthHeroArt } from "@/components/wealth/WealthHeroArt";
import {
  ArrowRight, ArrowUpRight, CheckCircle2, AlertTriangle, Sparkles,
  ShieldCheck, Landmark, Network, Layers, Compass, Scale, BarChart3, TrendingUp,
} from "lucide-react";
import {
  Accordion, AccordionItem, AccordionTrigger, AccordionContent,
} from "@/components/ui/accordion";
import { SEOHead } from "@/components/common/SEOHead";
const FAQS: { q: string; a: string }[] = [
  { q: "How do successful founders protect the wealth they create?", a: "Through infrastructure rather than products. Protection comes from how ownership is structured, how assets are segregated, how cash flows are made visible, and how cross border exposure is contained. A defensible wealth architecture absorbs shocks that an unstructured one transmits." },
  { q: "How should business assets be structured?", a: "Separate operating risk from ownership of value. Operating companies hold contracts and liabilities. Holding companies hold equity, intellectual property, real estate, and reserves. Above that sits a coordination layer that keeps capital, tax, and reporting aligned across the group." },
  { q: "How do investors protect capital across cycles?", a: "By treating capital as something that lives inside a structure rather than inside an account. Allocation, jurisdiction, vehicle choice, and reporting are designed together so a downturn in one area does not damage the rest of the portfolio." },
  { q: "How do I create financial visibility across multiple ventures?", a: "Through a consolidated reporting layer that sits above every operating entity. Standardised accounting, a single source of truth for performance, monthly cadence, and dashboards built around the decisions the operator actually needs to make." },
  { q: "How can tax efficiency support growth?", a: "Tax efficiency is a consequence of structure, not a tactic. Residency, holding architecture, treaty positioning, and entity choice designed together produce efficiency that compounds. Tactics deployed without structure quietly leak value across every transaction." },
  { q: "How do I build wealth beyond my operating company?", a: "By turning operating profits into structured capital. Reserves move into a holding entity, investment vehicles are built alongside the operating business, and a clear capital allocation policy directs surplus toward assets that compound independently of the trading company." },
  { q: "How do I structure wealth for future opportunities?", a: "Through architecture that accepts new ventures, new investments, and new jurisdictions without requiring a redesign. A clean holding layer, predefined vehicle templates, and a reporting spine that scales mean the next opportunity slots in cleanly instead of fragmenting what already exists." },
  { q: "How do I avoid wealth erosion?", a: "Build visibility first. Most erosion is invisible. Once cash flow, tax position, and exposure are clear, structural fixes follow naturally. Audited books, segregated entities, and reviewed jurisdictional positioning eliminate the slow leaks that compound over years." },
  { q: "How do I prepare a business for expansion?", a: "Through expansion infrastructure built before the expansion begins. That means a corporate structure that can host new markets, financial reporting that scales across entities, banking that supports cross border flows, and an operating playbook that lets new units launch without inventing the wheel each time." },
  { q: "How do I improve business valuation?", a: "Buyers and investors pay for clarity. Clean books, segregated risk, documented contracts, defensible IP ownership, and predictable cash flow consistently command stronger multiples. Most of the work that lifts valuation is structural, completed long before the conversation with a buyer begins." },
  { q: "What is wealth infrastructure?", a: "The structural layer beneath wealth — ownership, reporting, tax, banking, risk, and capital allocation — that allows growth to compound and capital to remain protected. Investments are decisions. Infrastructure is the system those decisions operate within." },
  { q: "Why is the UAE attractive for founders building wealth?", a: "Mature regulators in DIFC and ADGM, a wide treaty network, sophisticated banking, residency routes for principals, and a stable platform from which to hold international assets and investments." },
  { q: "What is the difference between wealth management and wealth structuring?", a: "Wealth management is about what you invest in. Wealth structuring is about how you own, govern, and protect what you have built. One can be replaced. The other compounds across decades. Red Berry designs the structure." },
  { q: "How do founders avoid trapping capital in the wrong places?", a: "By designing the flow of capital between the operating business, the holding layer, investment vehicles, and personal balance sheet before profits start moving. Capital trapped in the wrong entity is expensive to release later and often loses optionality entirely." },
  { q: "How do I structure ownership when I have several businesses?", a: "Through a parent holding company that owns each operating business as a subsidiary. Risk is contained inside each subsidiary, profits consolidate cleanly at the holding level, and new ventures can be added without disturbing what is already running." },
  { q: "How is cross border wealth structured?", a: "Through a layered international architecture: a credible primary holding entity, operating or asset holding subsidiaries where the activity lives, residency aligned with the principals, and treaty positioning that respects every jurisdiction involved." },
  { q: "What is capital efficiency?", a: "The discipline of getting more output from every unit of capital deployed. It combines structure, reporting, tax efficiency, and allocation policy so the same capital base produces more value, more reliably, with less exposure." },
  { q: "How do I balance growth and protection?", a: "Protection is the platform on which growth becomes sustainable. Aggressive growth without structure compounds risk. Structure without growth ambition becomes a holding pattern. The two are designed together." },
  { q: "How often should wealth structures be reviewed?", a: "Every two to three years at a minimum, and after any material event — a new venture, an acquisition, an exit, a residency change, or a regulatory shift in any jurisdiction the structure touches." },
  { q: "What does long term wealth resilience look like?", a: "A clean holding architecture, segregated asset vehicles, visible reporting across the group, a defined capital allocation policy, and a coordinated tax and residency position reviewed on a regular cadence. Designed once, operated quietly, refined as ambition grows." },
  { q: "How do investors view well structured businesses?", a: "Favourably. A clean structure, documented governance, and transparent reporting make co investment, banking, and acquisition conversations significantly faster. Structure is credibility." },
  { q: "How do I prepare for the next investment round or acquisition?", a: "Investment readiness is a structural state. Audited financials, a defensible cap table, clean intercompany positions, documented IP, and a clear corporate group. Built ahead of the conversation, never during it." },
  { q: "How do hospitality and venture founders structure wealth differently?", a: "Operating risk in hospitality is high, so structural separation between the brand, the operating company, the real estate, and the investor vehicles matters more than in most sectors. Done well, each layer can be financed, sold, or expanded independently." },
  { q: "What is the role of liquidity planning?", a: "To ensure capital is available when opportunity or risk arrives. A liquidity policy defines reserves at the operating level, the holding level, and the investment level, so the group is never forced to make a structural decision under cash pressure." },
  { q: "Why work with Red Berry on wealth infrastructure?", a: "Most advisors sell instruments. Red Berry designs the architecture — ownership, reporting, protection, tax positioning, and capital allocation — that the wealth founders and investors build can operate inside for decades. We treat wealth as infrastructure, not as a portfolio." },
];

const FRAMEWORK = [
  { icon: Sparkles, t: "Wealth Creation", d: "The base layer. The operating businesses, ventures, and investments that generate the wealth everything else protects and compounds." },
  { icon: BarChart3, t: "Financial Visibility", d: "Consolidated reporting across every entity. Clean books, monthly cadence, and decision ready dashboards that turn activity into clarity." },
  { icon: ShieldCheck, t: "Capital Protection", d: "Operating risk separated from ownership of value. Segregated entities, defensible contracts, and exposure contained by design rather than in reaction." },
  { icon: Layers, t: "Strategic Structuring", d: "Holding architecture, asset vehicles, and ownership layers that absorb tax, jurisdictional, and operational complexity cleanly." },
  { icon: TrendingUp, t: "Growth Optimization", d: "Capital efficiency, allocation discipline, and operating leverage tuned so every unit of capital deployed produces stronger outcomes." },
  { icon: Scale, t: "Investment Readiness", d: "A structural state. Audited financials, clean cap tables, defensible IP, and a credible corporate group ready for capital partners or buyers." },
  { icon: Compass, t: "Long Term Wealth Resilience", d: "An architecture designed against a long horizon and reviewed on a regular cadence. Built to absorb cycles, jurisdictions, and ambition that keeps expanding." },
];

const EROSION = [
  { t: "Poor Visibility", d: "Operators making structural decisions on incomplete numbers. Without consolidated reporting, every choice is partially blind and small leaks compound quietly." },
  { t: "Weak Ownership Structures", d: "Personal ownership of operating businesses, property, and intellectual property exposes the entire base to operating risk and to inefficient transfer." },
  { t: "Tax Inefficiencies", d: "Holding architecture and residency that were never designed together. The result is value quietly leaking from every cross border flow and every distribution." },
  { t: "Expansion Mistakes", d: "Entering new markets without the corporate, financial, and operational infrastructure to host them. Expansion costs multiply when structure follows growth instead of leading it." },
  { t: "Capital Trapped In The Wrong Places", d: "Profits sitting inside entities where they cannot be redeployed efficiently. Trapped capital loses optionality and often loses value before it is released." },
  { t: "Lack Of Strategic Planning", d: "Reacting to opportunities and threats rather than positioning ahead of them. The most expensive planning is the planning that arrives after the event." },
  { t: "Unstructured Growth", d: "Adding ventures, partners, and jurisdictions onto a foundation that was never designed to carry them. Complexity grows faster than the system supporting it." },
  { t: "Reactive Decision Making", d: "Structural changes made under pressure rather than from a defined policy. Decisions made in haste are rarely the decisions that build long term wealth." },
];

const INFRASTRUCTURE_LAYERS = [
  { icon: BarChart3, t: "Financial Infrastructure", d: "Accounting, tax, and reporting built so every entity rolls up cleanly. The system that turns operating activity into the visibility decisions depend on." },
  { icon: Layers, t: "Wealth Structure Design", d: "Holding architecture, asset vehicles, and ownership layers that separate risk, organise capital, and absorb complexity instead of transmitting it." },
  { icon: TrendingUp, t: "Capital Efficiency", d: "Allocation discipline, intercompany flows, and treasury structure tuned so the same capital base produces more output with less drag." },
  { icon: Sparkles, t: "Business Performance Visibility", d: "Operator dashboards, cadenced reviews, and standardised metrics across every venture. Performance becomes a system rather than an instinct." },
  { icon: Network, t: "Expansion Infrastructure", d: "Corporate, financial, and operational scaffolding designed to host new markets and new ventures before they arrive — not improvised once they do." },
  { icon: Compass, t: "Strategic Advisory", d: "A coordination layer that keeps structure, tax, banking, and capital strategy aligned as the business grows and as jurisdictions evolve." },
];

const PROTECTING = [
  { t: "Business Assets", d: "Operating companies, holding entities, contracts, and key relationships. Segregated and structured so risk in one part of the group cannot collapse the whole." },
  { t: "Property Holdings", d: "Commercial and investment real estate held through structures designed for tax efficiency, financing flexibility, and protection from operating exposure." },
  { t: "Intellectual Property", d: "Brands, technology, processes, and know how custodied at a level above the operating business. Licensed in, never trapped, and defensible in a transaction." },
  { t: "Investment Portfolios", d: "Liquid and illiquid investments organised through vehicles that report cleanly, allocate efficiently, and sit inside a coherent ownership framework." },
  { t: "Cross Border Interests", d: "International assets, residencies, and entities reconciled into a single architecture rather than maintained as a scatter of jurisdictions." },
  { t: "Future Opportunities", d: "The architecture that lets the next venture, acquisition, or investment slot in without restructuring everything around it." },
];

const STRUCTURE_LAYERS = [
  { t: "Ownership Structures", d: "Holding companies and investment vehicles that separate economic interest, control, and operating risk cleanly across the group." },
  { t: "Tax Efficiency", d: "Residency, treaty, and entity choices designed together. Efficiency as a consequence of architecture rather than a sequence of tactics." },
  { t: "Asset Segregation", d: "Operating risk, investment risk, and personal balance sheet held in different vehicles so exposure in one cannot reach the others." },
  { t: "Risk Management", d: "Insurance, indemnity, and contingency layered on top of structural protection — used as reinforcement, never as a substitute." },
  { t: "Cross Border Structuring", d: "International ownership, substance, reporting, and disclosure designed as one framework rather than a set of per jurisdiction patches." },
  { t: "Capital Allocation", d: "A defined policy for how surplus moves between operating, holding, and investment layers. Capital deployed with intent instead of by default." },
  { t: "Liquidity Planning", d: "Reserves and access to capital structured across the group so opportunity and risk can be met without forcing a structural decision under pressure." },
];

const QUESTIONS = [
  { q: "How do successful founders protect their wealth?", a: "Through architecture. Ownership, segregation, reporting, and tax positioning designed together rather than bolted on after the fact." },
  { q: "How should business assets be structured?", a: "Operating companies hold contracts and liabilities. Holding companies hold equity, IP, real estate, and reserves. The group runs as a coordinated structure." },
  { q: "How do investors protect capital?", a: "By allocating inside vehicles designed for the asset class, the jurisdiction, and the horizon. Structure absorbs the volatility that an unstructured account transmits." },
  { q: "How do I create financial visibility across ventures?", a: "Through a consolidated reporting layer above every operating entity. One source of truth, standardised metrics, monthly cadence, decisions built on evidence." },
  { q: "How can tax efficiency support growth?", a: "Tax efficiency frees capital that would otherwise leak. Reinvested cleanly, that capital compounds, funding the next venture or the next expansion without external dilution." },
  { q: "How do I build wealth beyond my operating company?", a: "Move surplus into a holding layer with a defined allocation policy. Build investment vehicles alongside the operating business rather than as an afterthought." },
  { q: "How do I structure wealth for future opportunities?", a: "Use templates. Pre defined entity, banking, and reporting patterns let new ventures slot in without redesigning the structure around them." },
  { q: "How do I avoid wealth erosion?", a: "Build visibility, then build structure. Most erosion is invisible. Once cash flow, tax position, and exposure are clear, the fixes are direct." },
  { q: "How do I prepare for expansion?", a: "Set up the corporate, financial, and operational scaffolding for the new market before the first revenue lands. Expansion is structural before it is commercial." },
  { q: "How do I improve business valuation?", a: "Buyers pay for clarity. Clean books, segregated risk, documented contracts, and predictable cash flow consistently lift multiples." },
];

const COST_OF_WEAK = [
  "Capital trapped in the wrong entity",
  "Slow leaks across every cross border flow",
  "Inflated tax exposure on growth",
  "Operating risk reaching personal assets",
  "Lost optionality on the next opportunity",
  "Weak valuation at investment or exit",
  "Banking friction that compounds with scale",
  "Reactive decisions made under pressure",
];

const AUDIENCES = [
  "Entrepreneurs", "Founders", "Business Owners", "Investors",
  "Scale Up Companies", "Growth Stage Businesses", "Hospitality Entrepreneurs",
  "International Business Builders", "Regional Expansion Leaders", "Professionals Building Wealth",
];


function GrowAndProtectWealthPage() {
  return (
    <SiteLayout>
      {/* HERO */}
       <SEOHead
      title="Grow & Protect Wealth in the UAE | Red Berry"
      description="Wealth needs architecture as much as it needs returns. Structures that let capital grow in the UAE while staying protected across borders and time."
      url="https://redberry.ae/grow-and-protect-wealth"
    />
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 blueprint-grid opacity-60 pointer-events-none" aria-hidden />
        <div className="container-rb pt-14 md:pt-20 pb-12 md:pb-16 relative">
          <nav aria-label="Breadcrumb" className="text-xs text-foreground/55 flex items-center gap-2">
            <Link to="/" className="hover:text-foreground">Red Berry</Link>
            <span>/</span>
            <Link to="/ambitions" className="hover:text-foreground">Ambitions</Link>
            <span>/</span>
            <span className="text-foreground/80">Grow & Protect Wealth</span>
          </nav>

          <div className="mt-6 grid lg:grid-cols-[1.45fr_1fr] gap-10 items-start">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-[10px] tracking-[0.22em] uppercase text-foreground/70">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--berry)" }} />
                For Founders, Investors & Entrepreneurs
              </div>
              <h1 className="mt-5 text-4xl md:text-6xl font-display leading-[1.05] text-gradient speakable">
                Grow Wealth With Structure. Protect Wealth With Infrastructure.
              </h1>
              <p className="mt-5 text-lg md:text-xl text-foreground/75 max-w-2xl leading-relaxed speakable">
                Building wealth takes ambition. Keeping it protected, visible, scalable, and strategically positioned requires the right infrastructure beneath it.
              </p>
              <p className="mt-3 text-base md:text-lg text-foreground/65 max-w-2xl leading-relaxed">
                Red Berry helps founders, investors, and entrepreneurs build wealth structures designed for long term growth and confidence.
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
              <WealthHeroArt />
            </div>
          </div>
        </div>
      </section>

      {/* WHY SUCCESSFUL ENTREPRENEURS LOSE WEALTH */}
      <section className="container-rb py-14 md:py-20" aria-labelledby="why-lost">
        <header className="max-w-3xl">
          <p className="text-xs tracking-[0.2em] uppercase text-foreground/55">The Quiet Pattern</p>
          <h2 id="why-lost" className="mt-3 text-3xl md:text-5xl font-display text-foreground">
            Why Successful Entrepreneurs Lose Wealth
          </h2>
          <p className="mt-4 text-foreground/65 text-lg leading-relaxed">
            Most wealth erosion does not happen through bad investments. It happens because the infrastructure
            beneath the wealth was never designed in the first place. The leaks are quiet, structural, and they compound.
          </p>
        </header>
        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {EROSION.map((e) => (
            <article key={e.t} className="p-5 rounded-2xl glass">
              <AlertTriangle className="h-5 w-5 text-primary/80" aria-hidden />
              <h3 className="mt-3 text-base font-display text-foreground">{e.t}</h3>
              <p className="mt-2 text-sm text-foreground/65 leading-relaxed">{e.d}</p>
            </article>
          ))}
        </div>
      </section>

      {/* WEALTH INFRASTRUCTURE FRAMEWORK */}
      <section className="container-rb py-14 md:py-20" aria-labelledby="framework">
        <header className="max-w-3xl">
          <p className="text-xs tracking-[0.2em] uppercase text-foreground/55">The Infrastructure Map</p>
          <h2 id="framework" className="mt-3 text-3xl md:text-5xl font-display text-gradient">
            The Wealth Infrastructure Framework
          </h2>
          <p className="mt-4 text-foreground/65 text-lg leading-relaxed">
            Seven load bearing layers. Designed together, sequenced together, operated together across the arc
            from wealth creation to long term resilience.
          </p>
        </header>
        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FRAMEWORK.map((l, i) => (
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

      {/* THE INFRASTRUCTURE BEHIND WEALTH GROWTH */}
      <section className="container-rb py-14 md:py-20" aria-labelledby="infrastructure">
        <header className="max-w-3xl">
          <p className="text-xs tracking-[0.2em] uppercase text-foreground/55">Architecture, Not Luck</p>
          <h2 id="infrastructure" className="mt-3 text-3xl md:text-5xl font-display text-foreground">
            The Infrastructure Behind Wealth Growth
          </h2>
          <p className="mt-4 text-foreground/65 text-lg leading-relaxed">
            Wealth that compounds reliably sits on top of a system. Six coordinated layers that turn operating
            activity into structured capital and turn structured capital into growing wealth.
          </p>
        </header>
        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {INFRASTRUCTURE_LAYERS.map((l) => (
            <article key={l.t} className="p-6 rounded-2xl glass hover:shadow-[var(--shadow-lift)] transition-all">
              <span className="grid place-items-center w-10 h-10 rounded-xl border border-border/60 bg-card text-primary">
                <l.icon className="h-5 w-5" aria-hidden />
              </span>
              <h3 className="mt-5 text-lg font-display text-foreground">{l.t}</h3>
              <p className="mt-2 text-sm text-foreground/70 leading-relaxed">{l.d}</p>
            </article>
          ))}
        </div>
      </section>

      {/* PROTECTING WHAT YOU HAVE BUILT */}
      <section className="container-rb py-14 md:py-20" aria-labelledby="protecting">
        <header className="max-w-3xl">
          <p className="text-xs tracking-[0.2em] uppercase text-foreground/55">The Asset Base</p>
          <h2 id="protecting" className="mt-3 text-3xl md:text-5xl font-display text-gradient">
            Protecting What You Have Built
          </h2>
          <p className="mt-4 text-foreground/65 text-lg leading-relaxed">
            Wealth is rarely a single thing. It is a portfolio of businesses, property, intellectual property,
            investments, and cross border interests. Each requires its own protective architecture.
          </p>
        </header>
        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROTECTING.map((p) => (
            <article key={p.t} className="p-6 rounded-2xl glass hover:shadow-[var(--shadow-lift)] transition-all">
              <ShieldCheck className="h-5 w-5 text-primary/80" aria-hidden />
              <h3 className="mt-3 text-lg font-display text-foreground">{p.t}</h3>
              <p className="mt-2 text-sm text-foreground/70 leading-relaxed">{p.d}</p>
            </article>
          ))}
        </div>
      </section>

      {/* WEALTH STRUCTURE DESIGN */}
      <section className="container-rb py-14 md:py-20" aria-labelledby="structure-design">
        <div className="rounded-3xl glass p-8 md:p-12 relative overflow-hidden">
          <div
            className="absolute -top-24 -left-24 w-80 h-80 rounded-full blur-3xl opacity-40"
            style={{ background: "var(--gradient-berry)" }}
            aria-hidden
          />
          <div className="relative">
            <p className="text-xs tracking-[0.2em] uppercase text-foreground/55">Architecture, Not Products</p>
            <h2 id="structure-design" className="mt-3 text-3xl md:text-5xl font-display text-foreground">
              Wealth Structure Design
            </h2>
            <p className="mt-4 text-foreground/70 text-lg leading-relaxed max-w-3xl">
              Red Berry does not sell instruments. We design the architecture that wealth — built through operating
              businesses, ventures, and investments — can sit inside for decades. Ownership, segregation,
              jurisdiction, risk, and growth treated as a single coherent structure.
            </p>
          </div>
          <div className="relative mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {STRUCTURE_LAYERS.map((s) => (
              <div key={s.t} className="p-5 rounded-2xl bg-card/70 border border-border/50">
                <Landmark className="h-5 w-5 text-primary/80" aria-hidden />
                <h3 className="mt-3 text-base font-display text-foreground">{s.t}</h3>
                <p className="mt-2 text-sm text-foreground/70 leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COST OF WEAK WEALTH INFRASTRUCTURE */}
      <section className="container-rb py-14 md:py-20">
        <div className="rounded-3xl glass p-8 md:p-12 relative overflow-hidden">
          <div
            className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full blur-3xl opacity-40"
            style={{ background: "var(--gradient-berry)" }}
            aria-hidden
          />
          <div className="relative max-w-3xl">
            <p className="text-xs tracking-[0.2em] uppercase text-foreground/55">The Quiet Tax</p>
            <h2 className="mt-3 text-3xl md:text-5xl font-display text-foreground">
              The Cost Of Weak Wealth Infrastructure
            </h2>
            <p className="mt-4 text-foreground/70 text-lg leading-relaxed">
              Weak wealth infrastructure rarely fails loudly. It compounds quietly through every transaction, every
              cross border flow, every missed opportunity to act in time.
            </p>
          </div>
          <div className="relative mt-8 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {COST_OF_WEAK.map((x) => (
              <div key={x} className="p-5 rounded-2xl bg-card/80 border border-border/50">
                <AlertTriangle className="h-5 w-5 text-destructive" aria-hidden />
                <p className="mt-3 text-sm text-foreground/80 leading-relaxed">{x}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUESTIONS AMBITIOUS FOUNDERS ASK */}
      <section className="container-rb py-14 md:py-20" aria-labelledby="questions">
        <header className="max-w-3xl">
          <p className="text-xs tracking-[0.2em] uppercase text-foreground/55">Decision Inputs</p>
          <h2 id="questions" className="mt-3 text-3xl md:text-5xl font-display text-gradient">
            Questions Ambitious Founders Ask
          </h2>
        </header>
        <div className="mt-10 grid md:grid-cols-2 gap-4">
          {QUESTIONS.map((f) => (
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
                <Sparkles className="h-3 w-3" /> Wealth Infrastructure Blueprint
              </div>
              <h2 className="mt-4 text-3xl md:text-5xl font-display leading-[1.05]">
                Map The Infrastructure Your Wealth Depends On
              </h2>
              <p className="mt-4 text-base md:text-lg text-primary-foreground/85 max-w-2xl leading-relaxed">
                A strategic blueprint designed to identify the protection, structure, visibility, and growth
                infrastructure your businesses and investments may need.
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
            <ul className="space-y-3" aria-label="Red Berry wealth infrastructure blueprint">
              {[
                "Ownership architecture review",
                "Financial visibility diagnosis",
                "Cross border structure scorecard",
                "Growth and investment readiness",
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


      {/* WHO THIS IS FOR */}
      <section className="container-rb py-14 md:py-20">
        <header className="max-w-3xl">
          <p className="text-xs tracking-[0.2em] uppercase text-foreground/55">The Audience</p>
          <h2 className="mt-3 text-3xl md:text-5xl font-display text-foreground">Who This Page Is For</h2>
          <p className="mt-4 text-foreground/65 text-lg leading-relaxed">
            Built for the people actively creating wealth through business and investment activity — and who refuse
            to let weak infrastructure limit what they build.
          </p>
        </header>
        <div className="mt-8 flex flex-wrap gap-3">
          {AUDIENCES.map((a) => (
            <span key={a} className="px-4 py-2 rounded-full glass text-sm text-foreground/80">
              {a}
            </span>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="container-rb py-14 md:py-20" aria-labelledby="faq">
        <header className="max-w-3xl">
          <p className="text-xs tracking-[0.2em] uppercase text-foreground/55">Frequently Asked</p>
          <h2 id="faq" className="mt-3 text-3xl md:text-5xl font-display text-gradient">
            Everything Founders And Investors Ask About Wealth Infrastructure
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
            Your Wealth Deserves The Same Structure As Your Ambition
          </h2>
          <p className="mt-4 text-foreground/70 text-lg max-w-2xl mx-auto leading-relaxed">
            We will help you design the infrastructure your wealth needs to grow, scale, and stay protected for decades.
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

export default GrowAndProtectWealthPage;
