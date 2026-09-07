import { Link } from "react-router-dom";
import { SiteLayout } from "@/components/site/SiteLayout";
import { HospitalityHeroArt } from "@/components/hospitality/HospitalityHeroArt";
import {
  ArrowRight, ArrowUpRight, CheckCircle2, AlertTriangle, Sparkles,
  Utensils, Hotel, Palmtree, MapPin, Building2, Briefcase, TrendingUp, Award, Users, Compass, Star,
} from "lucide-react";
import {
  Accordion, AccordionItem, AccordionTrigger, AccordionContent,
} from "@/components/ui/accordion";
import { SEOHead } from "@/components/common/SEOHead";
const FAQS: { q: string; a: string }[] = [
  { q: "Is the UAE a good place to launch a hospitality venture?", a: "The UAE is one of the most active hospitality markets in the world. International visitors, mature tourism infrastructure, strong government backing, and a high spending domestic audience combine to make it a serious launchpad for restaurants, hotels, resorts, and experiential ventures." },
  { q: "How large is the UAE hospitality sector?", a: "Hospitality is one of the largest contributors to the UAE economy, supported by tens of millions of annual international visitors, leading global airline hubs, and a national strategy that treats tourism and experience as a long term economic pillar." },
  { q: "What hospitality businesses perform best in the UAE?", a: "Concepts with a clear identity perform best. Differentiated restaurants, lifestyle and boutique hotels, resort and wellness ventures, and experience driven destinations all have strong precedent. Generic concepts struggle. Strong identity, supported by good operating structure, wins." },
  { q: "How do I structure a hospitality business in the UAE?", a: "Structure depends on the model. Restaurants, hotels, resorts, and tourism operators each carry different licensing, operational, and capital implications. A well designed structure separates the brand, the operating company, and the investment vehicle so each can grow independently." },
  { q: "How much investment does a hospitality venture require?", a: "It varies widely. A focused restaurant concept is materially different to a destination resort. The more meaningful question is what the venture needs to operate confidently from day one — capital, runway, operational depth, and the right structure behind the brand." },
  { q: "How long does it take to launch a hospitality venture?", a: "A focused F&B concept can launch in months. A hotel or resort is a multi year programme. In both cases, the time invested in structure and planning before opening is the strongest predictor of how the venture performs after opening." },
  { q: "What are the biggest risks in hospitality?", a: "The most common risks are weak operating structure, underestimated capital requirements, brand inconsistency, leadership gaps, and growth attempted before the foundation is ready. Almost every one of these is an infrastructure failure, not a market failure." },
  { q: "How do successful hospitality brands scale?", a: "They scale because the first venue was designed to be scalable. Brand systems, operational playbooks, financial visibility, and an ownership structure built for expansion are decided long before the second location is opened." },
  { q: "Can international hospitality brands enter the UAE?", a: "Yes. The UAE is one of the most welcoming markets in the world for international brands, with established routes for franchise, joint venture, and direct entry. The right local structure is what determines whether entry becomes a platform or a single venue." },
  { q: "How do I build a sustainable hospitality business?", a: "Sustainable hospitality is built on three things — a concept guests genuinely care about, an operation that consistently delivers it, and a financial structure that can absorb cycles. Anything missing from those three becomes a fragility later." },
  { q: "What licences does a hospitality venture need?", a: "Licensing depends on the model, the location, and whether the venture operates on mainland or in a free zone. Red Berry sequences the licensing as part of a wider venture structure rather than as a stand alone exercise." },
  { q: "Should I open in Dubai or another Emirate?", a: "Dubai concentrates international demand and brand visibility. Abu Dhabi, Ras Al Khaimah, Sharjah, and the northern Emirates each have meaningful hospitality positioning of their own. The right location is the one that matches the concept, not the loudest market." },
  { q: "Is mainland or free zone better for hospitality?", a: "It depends on the model. Customer facing venues typically operate under mainland or specific hospitality frameworks, while brand vehicles, holding companies, and intellectual property can sit more efficiently inside free zone structures. Most credible ventures use both, deliberately." },
  { q: "How important is brand to a hospitality venture?", a: "Brand is one of the few things in hospitality that compounds. Operations decay, locations change, teams move. A clearly built brand keeps producing returns long after the launch, and is often the single most valuable asset on the cap table." },
  { q: "What does operational infrastructure mean in hospitality?", a: "It is the set of systems that turn a concept into a consistent guest experience — staffing, training, supply chains, technology, service standards, and financial controls. It is invisible to the guest and decisive to the result." },
  { q: "How do I plan finances for a hospitality venture?", a: "Plan for the launch, the ramp, and the first cycle. A meaningful share of hospitality failures are not concept failures — they are working capital failures. Realistic projections, clear visibility, and a structure that supports honest reporting are the foundation." },
  { q: "Can a hospitality venture attract investors?", a: "Yes. Investors are active across UAE hospitality, particularly in differentiated concepts, scalable brands, and ventures with strong operating discipline. A clean structure, credible operating plan, and clear path to scale are what separate fundable ventures from unfundable ones." },
  { q: "How do I protect my hospitality concept?", a: "Through structure. Holding the brand, intellectual property, and operating company in the right vehicles, with the right agreements between them, protects the concept from operational shocks and makes it easier to license, franchise, or expand later." },
  { q: "How do I open a restaurant in the UAE?", a: "A serious restaurant launch requires a clear concept, the right legal structure, a workable location strategy, an operational model that can be staffed and trained, financial planning across the first cycle, and a brand framework that can outlive any single venue." },
  { q: "How do I open a hotel in the UAE?", a: "Hotels are long horizon ventures involving real estate, licensing, operating model selection, brand strategy, capital structure, and partnerships. The earlier the venture architecture is designed, the cleaner the construction and opening phases tend to run." },
  { q: "How do I open a resort in the UAE?", a: "Resorts combine real estate, hospitality, and destination thinking. They demand a clear positioning, a thoughtful capital structure, operational depth, and a long view of how the asset matures over time." },
  { q: "How do I start a tourism company?", a: "Tourism ventures range from inbound operators to experience providers to destination management companies. Each has its own licensing path and operating model. The right structure depends on what kind of tourism business is being built — and where it intends to grow." },
  { q: "How does Red Berry support hospitality entrepreneurs?", a: "Red Berry designs the infrastructure behind the venture — corporate structure, financial visibility, operational and brand readiness, investor and partner architecture, and the wider platform a hospitality business needs to operate confidently and scale credibly." },
  { q: "Can I franchise a UAE hospitality brand?", a: "Yes. Franchising is a credible expansion path, both into the UAE from abroad and outward from the UAE into the wider region and beyond. It requires a brand built deliberately for franchise, supported by the right legal and operational structure." },
  { q: "How do hospitality groups expand across the GCC?", a: "Through deliberate structure. A clear UAE platform, scalable brand systems, regional licensing strategy, and partnerships with credible operators in each market. Expansion that runs on the same architecture in every country is materially easier to manage than one rebuilt each time." },
  { q: "What hospitality trends are shaping the UAE market?", a: "Lifestyle hotels, wellness driven resorts, experience economy ventures, regional cuisine restaurants, and concepts that fuse hospitality with culture, design, or events. The market rewards distinct point of view over generic execution." },
  { q: "How do I make my hospitality venture stand out?", a: "Be unmistakable. The strongest UAE hospitality brands are the ones that could not be confused with anything else — clear identity, distinctive guest experience, and operational consistency that protects the concept at scale." },
  { q: "Can hospitality ventures access Golden Visa pathways?", a: "Yes. Hospitality founders and investors often qualify for long term residency under business, investor, or talent pathways. The right venture structure can support the application rather than complicate it." },
  { q: "Do I need a local partner for hospitality?", a: "It depends on the legal vehicle and the model. Many hospitality ventures can be fully foreign owned today. The deeper question is whether a local partner adds strategic value to the venture, not whether one is legally required." },
  { q: "How do I prepare a hospitality venture for investors?", a: "Investors look at concept clarity, operating discipline, financial visibility, growth potential, and structural credibility. A venture that has been architected from the start is materially easier to back than one being tidied up under pressure." },
  { q: "What is venture architecture in hospitality?", a: "It is the practice of designing the company, brand, operations, financials, and growth path of a hospitality venture as one coordinated system — instead of stacking decisions on top of each other and hoping they hold." },
];

const PEOPLE_ASK = [
  { q: "Is UAE a good place to launch a hospitality venture?", a: "The UAE combines international tourism volume, strong government backing for the sector, and a high spending domestic audience. For differentiated concepts with serious operating discipline, it is one of the most credible launchpads in the world." },
  { q: "How large is the UAE hospitality sector?", a: "Hospitality is one of the largest contributors to the UAE economy, supported by tens of millions of annual visitors and a national strategy that treats tourism as a long term pillar." },
  { q: "What hospitality businesses perform best?", a: "Concepts with a clear identity — lifestyle hotels, differentiated restaurants, wellness resorts, and experience driven destinations. Generic concepts struggle. Identity plus operating discipline wins." },
  { q: "How do I structure a hospitality business?", a: "Separate the brand, the operating company, and the investment vehicle. Each can then grow, license, or attract capital on its own terms without compromising the others." },
  { q: "How much investment is required?", a: "It depends on the model. The deeper question is what the venture needs to operate confidently from day one — capital, runway, operational depth, and structure behind the brand." },
  { q: "How long does launch take?", a: "Focused F&B can launch in months. Hotels and resorts are multi year programmes. Time spent on structure before opening is the strongest predictor of post opening performance." },
  { q: "What are the biggest risks?", a: "Weak operating structure, undercapitalisation, brand inconsistency, leadership gaps, and growth attempted before the foundation is ready. Almost all of these are infrastructure failures." },
  { q: "How do successful hospitality brands scale?", a: "Because the first venue was designed to be scalable. Brand systems, operational playbooks, and ownership structures built for expansion are decided long before the second location opens." },
  { q: "Can international brands enter the UAE market?", a: "Yes. Franchise, joint venture, and direct entry are all established. The local structure is what determines whether entry becomes a single venue or a regional platform." },
  { q: "How do I build a sustainable hospitality business?", a: "Three foundations. A concept guests care about, an operation that consistently delivers it, and a financial structure that can absorb cycles. Anything missing becomes a fragility later." },
];

const WHY_SUCCEED_OR_FAIL = [
  { t: "Weak Foundations", d: "Ventures launched without coherent corporate, financial, or operational structure rarely outlast their first full cycle." },
  { t: "Poor Planning", d: "Hospitality is one of the least forgiving industries for assumption based plans. Realistic ramp, working capital, and seasonality are non negotiable." },
  { t: "Operational Complexity", d: "Service, supply, staffing, and standards must run together every day. Concepts that underestimate operational depth struggle to keep the original promise alive." },
  { t: "Underestimating Market Requirements", d: "Licensing, location strategy, demand patterns, and competitive intensity each carry their own gravity. None of them reward improvisation." },
  { t: "Scaling Challenges", d: "A venture designed for one location rarely scales cleanly. The architecture that supports two, five, or ten venues has to be decided early." },
  { t: "Financial Visibility Gaps", d: "Without honest, real time financial visibility, hospitality ventures discover problems too late to act on them. Good reporting is operational, not administrative." },
  { t: "Brand Inconsistency", d: "Inconsistent brand expression at the table, in the room, or across channels erodes the very thing the concept is selling." },
  { t: "Guest Experience Gaps", d: "Every gap between the promise and the experience is a future review. The strongest ventures close those gaps before opening, not after." },
];

const WHY_UAE = [
  { t: "Tourism Growth", d: "International visitor numbers continue to expand, supported by a national strategy that has placed tourism at the center of long term economic planning." },
  { t: "Government Vision", d: "Long term tourism, hospitality, and experience strategies give credible operators a clear horizon to plan against." },
  { t: "International Visitors", d: "A consistent inflow of high spending visitors from Europe, Asia, the GCC, and beyond — diverse, repeat, and increasingly experience led." },
  { t: "Hospitality Investment", d: "Private capital, institutional capital, and family offices remain consistently active across hospitality real estate, brands, and operating platforms." },
  { t: "Luxury Travel", d: "The UAE is one of the world's most established luxury destinations, with mature demand for premium hotels, restaurants, and experiences." },
  { t: "Business Travel", d: "A globally connected business hub generates a steady baseline of premium travellers across hotels, F&B, and corporate hospitality." },
  { t: "Events Ecosystem", d: "Year round international events, conferences, and cultural programmes create reliable demand cycles that strong ventures can plan around." },
  { t: "Future Growth Outlook", d: "Government targets, infrastructure investment, and new tourism corridors point to a market still expanding rather than maturing." },
];

const FRAMEWORK = [
  { t: "Vision", d: "The clarity of what the venture is, who it is for, and why it deserves to exist in an already crowded market." },
  { t: "Concept Validation", d: "Testing the concept against demand, location, competition, and economics before significant capital is committed." },
  { t: "Market Positioning", d: "Defining where the venture sits in the wider hospitality landscape and what it owns that no one else does." },
  { t: "Foundation Build", d: "Corporate, legal, and licensing architecture designed for both day one operation and long term growth." },
  { t: "Operational Infrastructure", d: "The systems, standards, and people that turn a concept into a consistent guest experience, every shift, every day." },
  { t: "Financial Infrastructure", d: "Honest visibility, working capital design, and reporting structures that surface decisions before they become emergencies." },
  { t: "Growth Infrastructure", d: "Brand systems, ownership structures, and operating playbooks that make a second, third, and tenth location possible without rebuilding." },
  { t: "Guest Experience Excellence", d: "The daily craftsmanship that protects the promise of the brand inside every interaction with a guest." },
  { t: "Expansion Readiness", d: "Structural, brand, and capital readiness to enter new locations, new markets, and new formats without compromising the core." },
];

const MODELS = [
  { icon: Utensils, t: "Restaurants", d: "From standalone concepts to multi brand groups. Strong identity, disciplined operations, and a brand built for replication separate sustainable F&B from transient openings." },
  { icon: Hotel, t: "Hotels", d: "Lifestyle, boutique, business, or luxury. Each carries a different operating model, capital structure, and brand requirement — and rewards a different kind of architecture." },
  { icon: Palmtree, t: "Resorts", d: "Destination scale ventures combining real estate, hospitality, and experience. The decisions made before construction define how the asset performs for decades." },
  { icon: MapPin, t: "Tourism Companies", d: "Inbound operators, destination management companies, and experience providers — businesses built on systems, partnerships, and the strength of the network behind them." },
  { icon: Star, t: "Boutique Hospitality", d: "Small footprint, strong identity, and a level of curation generic operators cannot match. Often the most defensible positioning in saturated markets." },
  { icon: Award, t: "Luxury Experiences", d: "Concepts that compete on craftsmanship, story, and detail. The operating architecture has to match the promise, every single time." },
  { icon: Compass, t: "Travel Experiences", d: "Day, multi day, and signature itineraries built around what the UAE and GCC offer that no one else can replicate." },
  { icon: Building2, t: "Destination Ventures", d: "Mixed use hospitality, leisure, retail, and culture combined into a single coordinated destination — the most architecturally demanding model of all." },
  { icon: Users, t: "Event Hospitality", d: "Venues, concepts, and operations designed around the UAE's year round calendar of international events, conferences, and cultural programming." },
];

const INFRASTRUCTURE = [
  { icon: Building2, t: "Corporate Structure", d: "Brand, operating, real estate, and investment vehicles held separately and deliberately so each can grow on its own terms." },
  { icon: TrendingUp, t: "Financial Visibility", d: "Reporting, controls, and working capital design that surface decisions early enough to act on them rather than react to them." },
  { icon: Compass, t: "Operational Systems", d: "Service standards, training programmes, technology, and supply systems that hold the brand together across every venue and every shift." },
  { icon: Award, t: "Brand Protection", d: "Trademarks, ownership of the intellectual property, and clear agreements between brand and operations to keep the concept safe from operational shocks." },
  { icon: Users, t: "Staffing Readiness", d: "Leadership depth, succession, and operational bench strength so the venture is not dependent on a single individual to survive a bad week." },
  { icon: Sparkles, t: "Growth Planning", d: "Brand systems, ownership structures, and operating playbooks designed so the second venue does not require reinventing the first." },
  { icon: ArrowUpRight, t: "Expansion Strategy", d: "A coherent regional view — where to open next, in what order, under what model, and through whom — before the opportunity arrives." },
  { icon: AlertTriangle, t: "Risk Management", d: "Identification of the operational, financial, brand, and market risks the venture is exposed to, with structure built to absorb them rather than be defined by them." },
];

const MISTAKES = [
  "Entering the wrong market for the concept",
  "Weak financial controls and unclear working capital",
  "Poor operational planning behind a strong front of house",
  "Insufficient infrastructure for the scale being attempted",
  "Brand inconsistency between launch and daily operation",
  "Growth attempted without the structure to support it",
  "Reactive decision making in cycles that punish improvisation",
  "Misaligned investment expectations between founders and partners",
];

const AUDIENCES = [
  "Hospitality Entrepreneurs", "Restaurant Founders", "Hotel Investors", "Resort Developers",
  "Tourism Business Owners", "Luxury Experience Creators", "Hospitality Groups",
  "International Hospitality Brands", "Investors Entering Tourism", "Entrepreneurs Entering UAE Hospitality",
];


function BuildHospitalityVenturePage() {
  return (
    <SiteLayout>
      <SEOHead
        title="Build a Hospitality Venture in the UAE | Red Berry"
        description="Hospitality in the UAE rewards operators who structure early. Licensing, permits, ownership and compliance built for a venture meant to last."
      url="https://redberry.ae/build-a-hospitality-venture"
      />
      {/* HERO */}

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 blueprint-grid opacity-60 pointer-events-none" aria-hidden />
        <div className="container-rb pt-14 md:pt-20 pb-12 md:pb-16 relative">
          <nav aria-label="Breadcrumb" className="text-xs text-foreground/55 flex items-center gap-2">
            <Link to="/" className="hover:text-foreground">Red Berry</Link>
            <span>/</span>
            <Link to="/ambitions" className="hover:text-foreground">Ambitions</Link>
            <span>/</span>
            <span className="text-foreground/80">Build A Hospitality Venture</span>
          </nav>

          <div className="mt-6 grid lg:grid-cols-[1.45fr_1fr] gap-10 items-start">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-[10px] tracking-[0.22em] uppercase text-foreground/70">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--berry)" }} />
                Hospitality Infrastructure & Venture Architecture
              </div>
              <h1 className="mt-5 text-4xl md:text-6xl font-display leading-[1.05] text-gradient speakable">
                Great Hospitality Begins Long Before The First Guest Arrives
              </h1>
              <p className="mt-5 text-lg md:text-xl text-foreground/75 max-w-2xl leading-relaxed speakable">
                Behind every memorable hospitality venture is a structure capable of carrying the vision. Red Berry helps entrepreneurs, investors, and hospitality brands build the infrastructure ambitious ventures need to succeed in the UAE and GCC.
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
                  to={`/about/${"contact"}`}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl glass font-medium text-foreground hover:bg-foreground/5 transition-colors"
                >
                  Talk To An Advisor
                </Link>
              </div>
            </div>

            <div className="relative self-stretch flex items-stretch min-h-[320px] sm:min-h-[420px] lg:min-h-[560px] animate-float-soft">
              <HospitalityHeroArt />
            </div>
          </div>
        </div>
      </section>

      {/* WHY SUCCEED OR FAIL */}
      <section className="container-rb py-14 md:py-20" aria-labelledby="succeed-or-fail">
        <header className="max-w-3xl">
          <p className="text-xs tracking-[0.2em] uppercase text-foreground/55">The Real Question</p>
          <h2 id="succeed-or-fail" className="mt-3 text-3xl md:text-5xl font-display text-foreground">
            Why Hospitality Ventures Succeed Or Fail
          </h2>
          <p className="mt-4 text-foreground/65 text-lg leading-relaxed">
            Hospitality is one of the most infrastructure dependent industries in the world. The ventures that succeed are almost always the ones built deliberately. The ventures that fail are rarely failures of vision — they are failures of structure.
          </p>
        </header>
        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {WHY_SUCCEED_OR_FAIL.map((w) => (
            <article key={w.t} className="p-5 rounded-2xl glass hover:shadow-[var(--shadow-lift)] transition-all">
              <AlertTriangle className="h-5 w-5 text-destructive" aria-hidden />
              <h3 className="mt-3 text-base font-display text-foreground">{w.t}</h3>
              <p className="mt-2 text-sm text-foreground/65 leading-relaxed">{w.d}</p>
            </article>
          ))}
        </div>
      </section>

      {/* WHY UAE */}
      <section className="container-rb py-14 md:py-20" aria-labelledby="why-uae">
        <header className="max-w-3xl">
          <p className="text-xs tracking-[0.2em] uppercase text-foreground/55">The Market</p>
          <h2 id="why-uae" className="mt-3 text-3xl md:text-5xl font-display text-gradient">
            Why The UAE Is A Hospitality Opportunity
          </h2>
          <p className="mt-4 text-foreground/65 text-lg leading-relaxed">
            The UAE is one of the most compelling hospitality markets in the world. Tourism volume, government vision, and a sophisticated audience combine to create a launchpad few other markets can match.
          </p>
        </header>
        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {WHY_UAE.map((w) => (
            <article key={w.t} className="p-5 rounded-2xl glass hover:shadow-[var(--shadow-lift)] transition-all">
              <h3 className="text-base font-display text-foreground">{w.t}</h3>
              <p className="mt-2 text-sm text-foreground/70 leading-relaxed">{w.d}</p>
            </article>
          ))}
        </div>
      </section>

      {/* VENTURE ARCHITECTURE FRAMEWORK */}
      <section className="container-rb py-14 md:py-20" aria-labelledby="framework">
        <header className="max-w-3xl">
          <p className="text-xs tracking-[0.2em] uppercase text-foreground/55">The Architecture</p>
          <h2 id="framework" className="mt-3 text-3xl md:text-5xl font-display text-gradient">
            The Venture Architecture Framework
          </h2>
          <p className="mt-4 text-foreground/65 text-lg leading-relaxed">
            Nine sequential layers, designed and operated together. Each layer builds on the one beneath it. The output is a hospitality venture that opens with intent and grows on purpose rather than by accident.
          </p>
        </header>
        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FRAMEWORK.map((l, i) => (
            <article key={l.t} className="group p-6 rounded-2xl glass hover:shadow-[var(--shadow-lift)] transition-all">
              <div className="flex items-center justify-between">
                <span
                  className="grid place-items-center w-10 h-10 rounded-xl border border-border/60 bg-card font-display text-sm"
                  style={{ color: i % 2 ? "var(--azure)" : "var(--berry)" }}
                >
                  {String(i + 1).padStart(2, "0")}
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

      {/* CHOOSING THE MODEL */}
      <section className="container-rb py-14 md:py-20" aria-labelledby="models">
        <header className="max-w-3xl">
          <p className="text-xs tracking-[0.2em] uppercase text-foreground/55">The Models</p>
          <h2 id="models" className="mt-3 text-3xl md:text-5xl font-display text-foreground">
            Choosing The Right Hospitality Model
          </h2>
          <p className="mt-4 text-foreground/65 text-lg leading-relaxed">
            Every hospitality model carries its own economics, operating depth, and capital profile. The right model is rarely the most fashionable one — it is the one the founder can build, run, and scale credibly over years.
          </p>
        </header>
        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {MODELS.map((m) => (
            <article key={m.t} className="p-6 rounded-2xl glass hover:shadow-[var(--shadow-lift)] transition-all">
              <span className="grid place-items-center w-10 h-10 rounded-xl border border-border/60 bg-card text-primary">
                <m.icon className="h-5 w-5" aria-hidden />
              </span>
              <h3 className="mt-4 text-lg font-display text-foreground">{m.t}</h3>
              <p className="mt-2 text-sm text-foreground/70 leading-relaxed">{m.d}</p>
            </article>
          ))}
        </div>
      </section>

      {/* INFRASTRUCTURE BEHIND GREAT HOSPITALITY */}
      <section className="container-rb py-14 md:py-20" aria-labelledby="infrastructure">
        <div className="rounded-3xl glass p-8 md:p-12 relative overflow-hidden">
          <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full blur-3xl opacity-40" style={{ background: "var(--gradient-berry)" }} aria-hidden />
          <div className="relative max-w-3xl">
            <p className="text-xs tracking-[0.2em] uppercase text-foreground/55">The Substrate</p>
            <h2 id="infrastructure" className="mt-3 text-3xl md:text-5xl font-display text-foreground">
              The Infrastructure Behind Great Hospitality
            </h2>
            <p className="mt-4 text-foreground/70 text-lg leading-relaxed">
              Guests experience the front of house. Investors return for what sits behind it. The strongest hospitality ventures treat infrastructure as a competitive advantage, not a cost line — because it is.
            </p>
          </div>
          <div className="relative mt-10 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {INFRASTRUCTURE.map((it) => (
              <div key={it.t} className="p-5 rounded-2xl bg-card/70 border border-border/50">
                <it.icon className="h-5 w-5 text-primary/80" aria-hidden />
                <h3 className="mt-3 text-base font-display text-foreground">{it.t}</h3>
                <p className="mt-2 text-sm text-foreground/70 leading-relaxed">{it.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMMON MISTAKES */}
      <section className="container-rb py-14 md:py-20">
        <div className="rounded-3xl glass p-8 md:p-12 relative overflow-hidden">
          <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full blur-3xl opacity-40" style={{ background: "var(--gradient-berry)" }} aria-hidden />
          <div className="relative max-w-3xl">
            <p className="text-xs tracking-[0.2em] uppercase text-foreground/55">What To Avoid</p>
            <h2 className="mt-3 text-3xl md:text-5xl font-display text-foreground">
              Common Hospitality Mistakes
            </h2>
            <p className="mt-4 text-foreground/70 text-lg leading-relaxed">
              Most hospitality failures look like operating failures and are actually structural. The mistakes below tend to be invisible until the venture is already in the middle of them.
            </p>
          </div>
          <div className="relative mt-8 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {MISTAKES.map((m) => (
              <div key={m} className="p-5 rounded-2xl bg-card/80 border border-border/50">
                <AlertTriangle className="h-5 w-5 text-destructive" aria-hidden />
                <p className="mt-3 text-sm text-foreground/80 leading-relaxed">{m}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUESTIONS ENTREPRENEURS ASK */}
      <section className="container-rb py-14 md:py-20" aria-labelledby="people-ask">
        <header className="max-w-3xl">
          <p className="text-xs tracking-[0.2em] uppercase text-foreground/55">Decision Inputs</p>
          <h2 id="people-ask" className="mt-3 text-3xl md:text-5xl font-display text-gradient">
            Questions Hospitality Entrepreneurs Ask
          </h2>
        </header>
        <div className="mt-10 grid md:grid-cols-2 gap-4">
          {PEOPLE_ASK.map((f) => (
            <article key={f.q} className="p-6 rounded-2xl glass">
              <h3 className="text-base font-display text-foreground">{f.q}</h3>
              <p className="mt-2 text-sm text-foreground/70 leading-relaxed">{f.a}</p>
            </article>
          ))}
        </div>
      </section>

      {/* BLUEPRINT */}
      <section className="container-rb py-14 md:py-20">
        <div
          className="rounded-3xl p-8 md:p-12 relative overflow-hidden text-primary-foreground"
          style={{ background: "var(--gradient-berry)" }}
        >
          <div className="absolute inset-0 blueprint-grid opacity-20 pointer-events-none" aria-hidden />
          <div className="relative grid lg:grid-cols-[1.4fr_1fr] gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-[10px] tracking-[0.22em] uppercase">
                <Sparkles className="h-3 w-3" /> Hospitality Venture Blueprint
              </div>
              <h2 className="mt-4 text-3xl md:text-5xl font-display leading-[1.05]">
                Map The Infrastructure Behind Your Venture
              </h2>
              <p className="mt-4 text-base md:text-lg text-primary-foreground/85 max-w-2xl leading-relaxed">
                A strategic blueprint designed to identify the infrastructure your hospitality venture may need before significant capital is committed.
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
                  to={`/about/${"contact"}`}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 border border-white/20 font-medium hover:bg-white/20 transition-colors"
                >
                  Talk To An Advisor
                </Link>
              </div>
            </div>
            <ul className="space-y-3" aria-label="Red Berry hospitality blueprint">
              {[
                "Concept and model diagnosis",
                "Corporate and operational structure review",
                "Financial and investment readiness",
                "Brand and growth architecture",
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
            For the people who are not asking how to register a company. They are asking how to build something guests remember and investors back.
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
            Everything People Ask About Hospitality In The UAE
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
            Tell Us What Hospitality Experience You Want To Build
          </h2>
          <p className="mt-4 text-foreground/70 text-lg max-w-2xl mx-auto leading-relaxed">
            We will show you the infrastructure required to bring it to life.
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
              to={`/about/${"contact"}`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl glass font-medium text-foreground hover:bg-foreground/5 transition-colors"
            >
              Talk To An Advisor
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

export default BuildHospitalityVenturePage;
