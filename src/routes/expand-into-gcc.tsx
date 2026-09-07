import { Link } from "react-router-dom";
import { SiteLayout } from "@/components/site/SiteLayout";
import { ExpandHeroArt } from "@/components/expand/ExpandHeroArt";
import {
  ArrowRight, ArrowUpRight, CheckCircle2, AlertTriangle, Sparkles,
  Globe2, Compass, Building2, Coins, Network, Layers, TrendingUp, MapPin,
} from "lucide-react";
import {
  Accordion, AccordionItem, AccordionTrigger, AccordionContent,
} from "@/components/ui/accordion";
import { SEOHead } from "@/components/common/SEOHead";
const FAQS: { q: string; a: string }[] = [
  { q: "Which GCC country should I enter first?", a: "It depends on your sector, customer base, and capital horizon. The UAE is the most common entry point because of regulatory clarity, banking depth, and regional connectivity. KSA leads on market scale and giga-project demand. The right answer is the one your structure can support across the next three moves, not just the first one." },
  { q: "Why do most international companies choose the UAE as a regional hub?", a: "Because the UAE compresses the most decisions into the cleanest structure: 100% foreign ownership, mature free zones, a sophisticated banking system, double-tax treaties with 140+ countries, world-class logistics, and the regulatory infrastructure to host regional headquarters that operate into KSA, Qatar, Oman, Bahrain, and Kuwait." },
  { q: "How long does GCC expansion typically take?", a: "A defensible market-entry structure usually takes 6–14 weeks per jurisdiction once direction is set. Multi-market regional rollouts run 6–18 months. The slowest part is not licensing — it is governance, banking, and operational design done properly the first time." },
  { q: "Do I need a local partner in the GCC?", a: "In the UAE, most activities no longer require one. In KSA, foreign investment via MISA generally permits 100% ownership in qualifying sectors. Qatar, Oman, Bahrain, and Kuwait each have their own ownership models. The question is not 'do I need one' — it is 'what governance and economic substance does this market expect from a serious entrant'." },
  { q: "What is the best corporate structure for GCC expansion?", a: "Most serious operators use a UAE regional holding entity that owns operating subsidiaries in each target market. This isolates risk, simplifies investor diligence, optimises tax across jurisdictions, and lets each market be added or restructured without disturbing the others." },
  { q: "How much investment is required to expand into the GCC?", a: "Capital requirements range from modest (a UAE free-zone regional office) to substantial (a KSA operating entity with localisation and substance commitments). The real number is dictated by sector regulation, visa quotas, office substance, and the speed at which you intend to scale — not by license fees." },
  { q: "Can we expand gradually, one market at a time?", a: "Yes, and most successful operators do exactly that. Phase one is usually a regional base (typically UAE). Phase two is the primary demand market (often KSA or Qatar). Phase three is the satellite markets that round out the GCC footprint. Each phase should be designed assuming the next one will happen." },
  { q: "Which industries perform best in GCC expansion?", a: "Financial services, technology, hospitality, professional services, consumer brands, healthcare, education, logistics, real estate, and energy-adjacent services all have proven expansion playbooks. Sector-specific regulation determines structure — there is no single right answer." },
  { q: "How does corporate tax work across the GCC?", a: "UAE: 9% corporate tax above AED 375,000, with qualifying free zone income eligible for 0%. KSA: 20% corporate income tax on non-Saudi shareholders plus zakat for Saudi/GCC shareholders. Qatar: 10%. Bahrain, Kuwait, Oman each have their own regimes. A regional structure is how that complexity is absorbed cleanly." },
  { q: "What are the biggest expansion risks?", a: "Entering the wrong market first; choosing the wrong jurisdiction inside a market; under-resourcing the regional headquarters; weak local governance; banking that cannot service multi-entity flows; and treating each market as a standalone project instead of a connected portfolio." },
  { q: "Do I need a regional headquarters?", a: "A formal regional headquarters is required to win KSA government contracts and to qualify for certain UAE Golden Visa and tax advantages. Even where it is optional, a designed regional HQ accelerates banking, investor confidence, and operational governance." },
  { q: "How does Saudi Arabia compare to the UAE as an entry market?", a: "KSA is the largest GCC economy by GDP and population, with massive giga-project demand and strong localisation incentives. The UAE is the most operationally mature and globally connected. Many international companies enter the UAE first to build the regional layer, then deploy into KSA from it." },
  { q: "What about hospitality, F&B, and tourism expansion?", a: "Hospitality has its own licensing, municipality, and tourism authority approvals in every GCC market. Brands expanding regionally need specialised venture architecture covering master franchise, regional management entities, and operating subsidiaries — not generic incorporation." },
  { q: "How do we handle banking across multiple GCC markets?", a: "With a regional banking architecture: a primary corporate account at the holding level (typically UAE), operating accounts per subsidiary, and cross-border treasury arrangements. Banking has tightened across the GCC — substance and documentation now decide outcomes more than relationships." },
  { q: "Can a UAE entity be used to invoice clients across the GCC?", a: "Yes, with care. Cross-border invoicing must respect each market's permanent establishment rules, VAT registration thresholds, and withholding tax positions. A regional holding architecture is what makes this clean rather than aggressive." },
  { q: "What does economic substance mean in practice?", a: "Across the GCC, regulators expect that an entity earning relevant income has real activity in-country: directors, employees, premises, decisions made locally. Substance is what protects qualifying free zone tax treatment, treaty access, and banking. It is infrastructure, not paperwork." },
  { q: "How do we recruit and structure a regional team?", a: "Through a combination of regional HQ employment, local subsidiary employment, and intercompany secondments. Visa quotas, end-of-service, payroll (WPS in UAE, GOSI in KSA), and labour law differ in every market and must be designed together, not separately." },
  { q: "How do investors view GCC expansion?", a: "Favourably — when the structure is investor-ready. A clean regional holding, transparent intercompany arrangements, audited financials, and defensible governance make diligence faster. A patchwork of disconnected market entries does the opposite." },
  { q: "How does intellectual property travel across the GCC?", a: "Trademarks and IP rights are jurisdiction-specific. A regional IP strategy typically holds core IP at the holding level under a license model, with operating subsidiaries paying intercompany royalties. Done properly, this protects brand value and creates tax efficiency." },
  { q: "What is the difference between expansion and incorporation?", a: "Incorporation is registering a company. Expansion is building the regional infrastructure that lets a company actually operate, scale, hire, bank, win contracts, and protect value across multiple jurisdictions. One is a form. The other is architecture." },
  { q: "Do we need physical offices in every GCC market?", a: "Not in every market, and not from day one. A regional HQ usually needs a dedicated office; satellite markets can begin with flexible or shared facilities. Office substance affects visas, banking, tender eligibility, and qualifying tax treatment — design it, do not default into it." },
  { q: "How is technology / SaaS expansion structured?", a: "Typically through a UAE regional entity that licenses platform IP to local distribution subsidiaries, with data residency, regulatory compliance (SAMA, CBUAE, NCA, etc. where relevant), and cross-border revenue recognition all designed in. Pure remote-selling rarely survives sustained growth." },
  { q: "How do we manage compliance across multiple GCC markets?", a: "Through a single regional compliance calendar that maps every renewal, filing, audit, and disclosure across every entity. UBO, ESR, corporate tax, VAT, zakat, payroll, immigration — managed as one program, not as scattered tasks." },
  { q: "How do family businesses approach GCC expansion?", a: "Family-owned international groups typically establish a UAE regional holding governed by a family charter, with succession, governance, and dispute resolution designed upfront. The GCC is then entered through that vehicle so that family alignment scales with commercial growth." },
  { q: "Why work with Red Berry on GCC expansion?", a: "Most market-entry providers sell licenses. Red Berry designs the regional infrastructure — corporate, financial, operational, sovereign, and legacy layers — that ambitious operators run on. We treat your GCC expansion as a multi-market portfolio with a ten-year horizon, not a one-time transaction." },
  { q: "Can we restructure an existing GCC presence?", a: "Yes. Many international companies arrive in the GCC through ad-hoc entities created over years and discover the structure is blocking growth, banking, or investor confidence. A clean redesign — holding, subsidiaries, IP, intercompany — typically pays for itself inside the first cycle." },
];

const FRAMEWORK = [
  { icon: Compass, t: "Market Intelligence", d: "Quantified read on demand, competition, regulation, and substance requirements before a single entity is registered." },
  { icon: MapPin, t: "Entry Strategy", d: "Sequencing across UAE, KSA, Qatar, Oman, Bahrain, and Kuwait — designed as a portfolio, not a series of standalone moves." },
  { icon: Building2, t: "Corporate Structure", d: "Regional holding, operating subsidiaries, intercompany framework, governance — built to absorb the next market, not just the current one." },
  { icon: Coins, t: "Financial Infrastructure", d: "Cross-border banking, treasury, audit cadence, transfer pricing, and tax positioning across every jurisdiction you operate in." },
  { icon: Network, t: "Operational Readiness", d: "Visas, payroll, HR, IT, and governance systems engineered to run multi-market operations without leaking value or attention." },
  { icon: TrendingUp, t: "Regional Scaling", d: "The architecture that lets you add the next market, the next product line, or the next round of capital without restructuring." },
  { icon: Globe2, t: "Long-Term Expansion", d: "A ten-year regional posture: succession, IP custody, family governance, and continuity for the GCC footprint you are building." },
];

const MARKETS = [
  { code: "UAE", name: "United Arab Emirates", best: "Regional headquarters, holding structures, financial services, tech, media, hospitality.", size: "Most globally connected GCC economy", ease: "High — mature free zones and 100% ownership", advantage: "Regulatory clarity, banking depth, treaty network, talent." },
  { code: "KSA", name: "Saudi Arabia", best: "Operators serving giga-projects, government contractors, large consumer brands, industrial.", size: "Largest GCC economy by GDP and population", ease: "Medium — RHQ programme and MISA license pathway", advantage: "Demand scale, localisation incentives, Vision 2030 capex." },
  { code: "QAT", name: "Qatar", best: "Energy services, premium hospitality, financial services, professional advisory.", size: "Highest GDP per capita in the region", ease: "Medium — QFC and mainland options", advantage: "Capital intensity, premium positioning, regulatory stability." },
  { code: "BHR", name: "Bahrain", best: "Fintech, regulated finance, regional back-office, light industry.", size: "Compact, agile, financial-services oriented", ease: "High — long-standing foreign investor framework", advantage: "Speed, fintech sandbox, low operating cost, GCC access." },
  { code: "KWT", name: "Kuwait", best: "Industrial, consumer brands, family-business partnerships, defence-adjacent services.", size: "Strong consumer market with high purchasing power", ease: "Medium — local partnership models common", advantage: "Spending power, family-business ecosystem, capital depth." },
  { code: "OMN", name: "Oman", best: "Logistics, mining, tourism, manufacturing, energy transition.", size: "Strategic logistics gateway outside the Strait of Hormuz", ease: "Medium — investor-friendly reforms underway", advantage: "Geography, free zones, diversification incentives, lower cost base." },
];

const PITFALLS = [
  { t: "Entering The Wrong Market First", d: "Choosing a market based on familiarity or excitement rather than where your model has the cleanest fit and the fastest commercial proof." },
  { t: "Using The Wrong Jurisdiction", d: "Selecting a free zone or mainland structure based on cost rather than fit with activity, banking, and the next market in your sequence." },
  { t: "Poor Ownership Architecture", d: "Founders or parent companies directly owning operating subsidiaries — instead of through a regional holding designed for tax, governance, and exits." },
  { t: "Lack Of Financial Visibility", d: "Multi-market operations without consolidated reporting, intercompany clarity, or treasury control. Value leaks quietly." },
  { t: "No Regional Scaling Plan", d: "Each market entered as a standalone project, then discovered to be incompatible with the next one. Restructuring follows." },
  { t: "Underestimating Compliance", d: "UBO, ESR, corporate tax, VAT, zakat, transfer pricing, RHQ obligations — discovered late, fixed expensively." },
  { t: "Weak Local Partnerships", d: "Choosing partners for convenience rather than alignment, with no clear governance, exit, or performance framework." },
  { t: "Reactive Decision Making", d: "Letting regulators, banks, or counterparties dictate structure decisions one by one — instead of designing the architecture upfront." },
];

const AUDIENCES = [
  "International Businesses", "Growing SMEs", "Regional Companies", "Hospitality Brands",
  "Technology Companies", "Family Businesses", "Investors", "Professional Services Firms",
  "Consumer Brands", "Industrial Businesses", "Scale-Ups", "Family Offices",
];

const REASONS = [
  { t: "Access To High-Growth Markets", d: "GCC economies are among the fastest growing globally, with sustained capex programmes through 2030." },
  { t: "Regional Headquarters Opportunities", d: "RHQ regimes in UAE and KSA unlock tax positioning, government access, and investor credibility." },
  { t: "Investment Ecosystem", d: "Sovereign funds, family offices, and institutional capital deploying actively across the region." },
  { t: "Global Connectivity", d: "Three major hub airlines, world-class logistics, and direct access to Africa, South Asia, and Europe." },
  { t: "Tax Advantages", d: "Competitive corporate tax regimes, qualifying free-zone treatment, and an extensive double-tax treaty network." },
  { t: "Government Initiatives", d: "Vision 2030, We the UAE 2031, Qatar National Vision 2030, and parallel programmes funding regional growth." },
  { t: "Infrastructure Investment", d: "Trillions deployed in transport, energy, digital, and urban infrastructure — creating sustained demand." },
  { t: "Tourism & Consumer Demand", d: "Record visitor numbers and rising domestic consumption across hospitality, retail, F&B, and lifestyle." },
  { t: "Business-Friendly Environment", d: "100% foreign ownership across most activities, fast-tracked licensing, and modernised regulators." },
  { t: "Talent Access", d: "Deep multinational talent pools, regional and global mobility, and Golden Visa pathways for senior leadership." },
];

const DIFFERENCES = [
  { t: "Different Regulations", d: "Every GCC market has its own commercial code, foreign investment law, and sectoral regulators." },
  { t: "Different Jurisdictions", d: "Free zones, mainland, financial centres (DIFC, ADGM, QFC) — each with distinct rules, treaties, and substance expectations." },
  { t: "Different Business Cultures", d: "Relationship cadence, governance expectations, and decision-making vary significantly across markets." },
  { t: "Different Ownership Models", d: "Foreign ownership rules, local content requirements, and sponsorship frameworks differ in every jurisdiction." },
  { t: "Different Operational Requirements", d: "Visa systems, payroll regimes (WPS, GOSI), and labour laws each demand market-specific design." },
  { t: "Different Tax Considerations", d: "Corporate tax, zakat, withholding tax, VAT, and transfer pricing positions vary across markets." },
  { t: "Different Expansion Risks", d: "Banking, regulatory, geopolitical, and operational risks compound across markets without a regional architecture." },
];

const SHORT_QUESTIONS = [
  { q: "Which GCC country should I enter first?", a: "Most international operators enter the UAE first to build a regional layer, then deploy into KSA or Qatar from there. The answer depends on sector, capital, and how fast you intend to scale." },
  { q: "Why do companies choose UAE as a regional hub?", a: "Regulatory clarity, 100% ownership, mature banking, treaty network, and the ability to host subsidiaries that trade into every other GCC market." },
  { q: "How long does expansion take?", a: "A defensible market-entry structure runs 6–14 weeks per jurisdiction. Multi-market regional rollouts run 6–18 months." },
  { q: "Do I need a local partner?", a: "Across most modern UAE structures, no. KSA, Qatar, Oman, Bahrain, and Kuwait each have specific frameworks worth designing into upfront." },
  { q: "What is the best corporate structure?", a: "A UAE regional holding owning operating subsidiaries in each target market — isolates risk, simplifies diligence, and scales cleanly." },
  { q: "How much investment is required?", a: "Determined by sector regulation, substance, and the speed of rollout — not by license fees. Plan for the structure, not the SKU." },
  { q: "Can I expand gradually?", a: "Yes. Most successful operators phase regional rollouts across 12–36 months — each phase designed assuming the next one will happen." },
  { q: "Which industries perform best?", a: "Financial services, technology, hospitality, professional services, consumer brands, healthcare, education, logistics, real estate." },
  { q: "How do taxes work across GCC markets?", a: "Each market has its own corporate tax regime. A regional structure is how that complexity is absorbed cleanly across jurisdictions." },
  { q: "What are the biggest expansion risks?", a: "Wrong market first, wrong jurisdiction inside that market, weak holding architecture, and treating markets as projects instead of a portfolio." },
];

function ExpandIntoGccPage() {
  return (
    <SiteLayout>
      {/* HERO */}
       <SEOHead
        title="Expand Into the GCC | Red Berry"
        description="Take a proven business into Saudi, Qatar and the wider GCC. Entity structure, licensing and local requirements mapped before you commit capital."
        url="https://redberry.ae/expand-into-gcc"
      />
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 blueprint-grid opacity-60 pointer-events-none" aria-hidden />
        <div className="container-rb pt-14 md:pt-20 pb-12 md:pb-16 relative">
          <nav aria-label="Breadcrumb" className="text-xs text-foreground/55 flex items-center gap-2">
            <Link to="/" className="hover:text-foreground">Red Berry</Link>
            <span>/</span>
            <Link to="/ambitions" className="hover:text-foreground">Ambitions</Link>
            <span>/</span>
            <span className="text-foreground/80">Expand Into The GCC</span>
          </nav>

          <div className="mt-6 grid lg:grid-cols-[1.45fr_1fr] gap-10 items-start">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-[10px] tracking-[0.22em] uppercase text-foreground/70">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--berry)" }} />
                For Established Operators · UAE & GCC
              </div>
              <h1 className="mt-5 text-4xl md:text-6xl font-display leading-[1.05] text-gradient speakable">
                Expand Into The GCC With Infrastructure Built For Growth
              </h1>
              <p className="mt-5 text-lg md:text-xl text-foreground/75 max-w-2xl leading-relaxed speakable">
                Entering a new market is easy. Building a presence that scales across the GCC requires the right structure beneath it.
              </p>
              <p className="mt-3 text-base md:text-lg text-foreground/65 max-w-2xl leading-relaxed">
                Red Berry helps ambitious businesses, investors, and family enterprises establish the regional
                infrastructure needed to expand confidently across the UAE, Saudi Arabia, Qatar, Bahrain, Kuwait, and Oman.
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
              <ExpandHeroArt />
            </div>
          </div>
        </div>
      </section>

      {/* WHY GCC EXPANSION IS DIFFERENT */}
      <section className="container-rb py-14 md:py-20" aria-labelledby="why-different">
        <header className="max-w-3xl">
          <p className="text-xs tracking-[0.2em] uppercase text-foreground/55">The Reality</p>
          <h2 id="why-different" className="mt-3 text-3xl md:text-5xl font-display text-foreground">
            Why GCC Expansion Is Different
          </h2>
          <p className="mt-4 text-foreground/65 text-lg leading-relaxed">
            Copying your home-market model into the GCC is the most common — and most expensive — expansion mistake.
            Every market in the region runs on its own regulatory, ownership, and operational logic.
          </p>
        </header>
        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {DIFFERENCES.map((d) => (
            <article key={d.t} className="p-5 rounded-2xl glass">
              <Layers className="h-5 w-5 text-primary/80" aria-hidden />
              <h3 className="mt-3 text-base font-display text-foreground">{d.t}</h3>
              <p className="mt-2 text-sm text-foreground/65 leading-relaxed">{d.d}</p>
            </article>
          ))}
        </div>
      </section>

      {/* WHY BUSINESSES EXPAND INTO THE GCC */}
      <section className="container-rb py-14 md:py-20" aria-labelledby="why-expand">
        <header className="max-w-3xl">
          <p className="text-xs tracking-[0.2em] uppercase text-foreground/55">The Opportunity</p>
          <h2 id="why-expand" className="mt-3 text-3xl md:text-5xl font-display text-gradient">
            Why Businesses Expand Into The GCC
          </h2>
          <p className="mt-4 text-foreground/65 text-lg leading-relaxed">
            Ten structural reasons serious operators commit to building in the region — not as a market, as a regional platform.
          </p>
        </header>
        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {REASONS.map((r, i) => (
            <article key={r.t} className="group p-6 rounded-2xl glass hover:shadow-[var(--shadow-lift)] transition-all">
              <span className="text-[10px] tracking-[0.2em] uppercase text-foreground/40">
                R.{String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 text-lg font-display text-foreground">{r.t}</h3>
              <p className="mt-2 text-sm text-foreground/70 leading-relaxed">{r.d}</p>
            </article>
          ))}
        </div>
      </section>

      {/* WHICH GCC MARKET */}
      <section className="container-rb py-14 md:py-20" aria-labelledby="which-market">
        <header className="max-w-3xl">
          <p className="text-xs tracking-[0.2em] uppercase text-foreground/55">The First Strategic Choice</p>
          <h2 id="which-market" className="mt-3 text-3xl md:text-5xl font-display text-foreground">
            Which GCC Market Is Right For You?
          </h2>
          <p className="mt-4 text-foreground/65 text-lg leading-relaxed">
            Six distinct markets. Each with its own scale, regulatory environment, and best-fit business profile.
            Sequence them, do not scatter into them.
          </p>
        </header>

        <div className="mt-10 grid md:grid-cols-2 gap-5">
          {MARKETS.map((m) => (
            <article key={m.code} className="p-6 rounded-2xl glass hover:shadow-[var(--shadow-lift)] transition-all">
              <div className="flex items-center justify-between">
                <div className="text-[10px] tracking-[0.22em] uppercase text-primary/80">{m.code}</div>
                <Globe2 className="h-4 w-4 text-foreground/40" aria-hidden />
              </div>
              <h3 className="mt-2 text-xl font-display text-foreground">{m.name}</h3>
              <dl className="mt-4 space-y-2.5 text-sm">
                <div>
                  <dt className="text-[10px] tracking-[0.18em] uppercase text-foreground/45">Market Size</dt>
                  <dd className="mt-0.5 text-foreground/75">{m.size}</dd>
                </div>
                <div>
                  <dt className="text-[10px] tracking-[0.18em] uppercase text-foreground/45">Ease Of Entry</dt>
                  <dd className="mt-0.5 text-foreground/75">{m.ease}</dd>
                </div>
                <div>
                  <dt className="text-[10px] tracking-[0.18em] uppercase text-foreground/45">Strategic Advantage</dt>
                  <dd className="mt-0.5 text-foreground/75">{m.advantage}</dd>
                </div>
                <div>
                  <dt className="text-[10px] tracking-[0.18em] uppercase text-foreground/45">Best Suited For</dt>
                  <dd className="mt-0.5 text-foreground/75">{m.best}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </section>

      {/* THE GCC EXPANSION INFRASTRUCTURE FRAMEWORK */}
      <section className="container-rb py-14 md:py-20" aria-labelledby="framework">
        <header className="max-w-3xl">
          <p className="text-xs tracking-[0.2em] uppercase text-foreground/55">The Infrastructure Map</p>
          <h2 id="framework" className="mt-3 text-3xl md:text-5xl font-display text-gradient">
            The GCC Expansion Infrastructure Framework
          </h2>
          <p className="mt-4 text-foreground/65 text-lg leading-relaxed">
            Seven load-bearing layers. Designed together, sequenced together, operated together — across every market in your regional footprint.
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

      {/* COMMON EXPANSION MISTAKES */}
      <section className="container-rb py-14 md:py-20" aria-labelledby="mistakes">
        <header className="max-w-3xl">
          <p className="text-xs tracking-[0.2em] uppercase text-foreground/55">The Hidden Cost</p>
          <h2 id="mistakes" className="mt-3 text-3xl md:text-5xl font-display text-foreground">
            Common Expansion Mistakes
          </h2>
          <p className="mt-4 text-foreground/65 text-lg leading-relaxed">
            Almost every failed GCC expansion can be traced back to the same eight infrastructure errors.
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

      {/* UAE AS A GCC LAUNCHPAD */}
      <section className="container-rb py-14 md:py-20" aria-labelledby="uae-launchpad">
        <div className="rounded-3xl glass p-8 md:p-12 relative overflow-hidden">
          <div
            className="absolute -top-24 -left-24 w-80 h-80 rounded-full blur-3xl opacity-40"
            style={{ background: "var(--gradient-berry)" }}
            aria-hidden
          />
          <div className="relative grid lg:grid-cols-[1.2fr_1fr] gap-10 items-start">
            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-foreground/55">The Regional Platform</p>
              <h2 id="uae-launchpad" className="mt-3 text-3xl md:text-5xl font-display text-foreground">
                UAE As A GCC Launchpad
              </h2>
              <p className="mt-4 text-foreground/70 text-lg leading-relaxed">
                Most international operators expanding into the GCC begin in the UAE — not because it is the easiest
                market to enter, but because it is the cleanest platform from which to operate into every other one.
              </p>
              <p className="mt-3 text-foreground/65 leading-relaxed">
                A well-designed UAE regional structure compresses the most decisions into the most credible posture:
                holding architecture, banking, treaty access, talent visas, and the substance regulators across the
                region recognise.
              </p>
            </div>
            <ul className="grid sm:grid-cols-2 gap-3">
              {[
                "Connectivity to Africa, Asia & Europe",
                "Mature free-zone infrastructure",
                "Deep multinational business ecosystem",
                "Direct regional market access",
                "Global talent pool & Golden Visa",
                "Sophisticated investment climate",
                "Trusted global positioning",
                "Banking depth for regional flows",
              ].map((x) => (
                <li key={x} className="flex items-start gap-3 p-4 rounded-xl bg-card/60 border border-border/50">
                  <CheckCircle2 className="h-5 w-5 mt-0.5 shrink-0 text-primary" />
                  <span className="text-sm text-foreground/80">{x}</span>
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
            Built for organisations already operating — and ready to build a serious regional presence.
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

      {/* COST OF WEAK EXPANSION INFRASTRUCTURE */}
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
              The Cost Of Weak Expansion Infrastructure
            </h2>
            <p className="mt-4 text-foreground/70 text-lg leading-relaxed">
              Weak expansion infrastructure rarely fails loudly. It compounds — across every quarter,
              every hire, every contract, every investor conversation.
            </p>
          </div>
          <div className="relative mt-8 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              "Failed market-entry attempts",
              "Restructuring costs and downtime",
              "Missed regional opportunities",
              "Operational inefficiencies",
              "Brand dilution across markets",
              "Market-entry delays",
              "Investor concerns during diligence",
              "Leadership distraction from core growth",
            ].map((x) => (
              <div key={x} className="p-5 rounded-2xl bg-card/80 border border-border/50">
                <AlertTriangle className="h-5 w-5 text-destructive" aria-hidden />
                <p className="mt-3 text-sm text-foreground/80 leading-relaxed">{x}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUESTIONS BUSINESSES ASK — short answer blocks */}
      <section className="container-rb py-14 md:py-20" aria-labelledby="short-questions">
        <header className="max-w-3xl">
          <p className="text-xs tracking-[0.2em] uppercase text-foreground/55">Decision Inputs</p>
          <h2 id="short-questions" className="mt-3 text-3xl md:text-5xl font-display text-gradient">
            Questions Every Business Asks Before GCC Expansion
          </h2>
        </header>
        <div className="mt-10 grid md:grid-cols-2 gap-4">
          {SHORT_QUESTIONS.map((f) => (
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
                <Sparkles className="h-3 w-3" /> Expand Into GCC Blueprint
              </div>
              <h2 className="mt-4 text-3xl md:text-5xl font-display leading-[1.05]">
                Map The Infrastructure Your Expansion Needs
              </h2>
              <p className="mt-4 text-base md:text-lg text-primary-foreground/85 max-w-2xl leading-relaxed">
                A strategic blueprint designed to identify the corporate, financial, operational, and sovereign
                infrastructure your business may need before expanding into new GCC markets.
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
            <ul className="space-y-3" aria-label="Red Berry GCC expansion blueprint">
              {[
                "Market sequencing diagnosis",
                "Regional structure recommendation",
                "Cross-border financial layer review",
                "Operational readiness scorecard",
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


      {/* FAQ */}
      <section className="container-rb py-14 md:py-20" aria-labelledby="faq">
        <header className="max-w-3xl">
          <p className="text-xs tracking-[0.2em] uppercase text-foreground/55">Frequently Asked</p>
          <h2 id="faq" className="mt-3 text-3xl md:text-5xl font-display text-gradient">
            Everything Operators Ask About Expanding Into The GCC
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
            Tell Us Where You Want To Grow
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

export default ExpandIntoGccPage;
