import { Link } from "react-router-dom";
import { SiteLayout } from "@/components/site/SiteLayout";
import { FreedomHeroArt } from "@/components/freedom/FreedomHeroArt";
import {
  ArrowRight, ArrowUpRight, CheckCircle2, AlertTriangle, Sparkles,
  Globe2, Compass, Plane, Building2, Briefcase, TrendingUp, Award, Users,
} from "lucide-react";
import {
  Accordion, AccordionItem, AccordionTrigger, AccordionContent,
} from "@/components/ui/accordion";
import { SEOHead } from "@/components/common/SEOHead";
const FAQS: { q: string; a: string }[] = [
  { q: "What is the UAE Golden Visa?", a: "The UAE Golden Visa is a long term residency category designed for qualifying investors, entrepreneurs, business owners, exceptional talent, and specialised professionals. It offers multi year stability and the right to live, work, and build in the UAE without the constraints of standard short term residency." },
  { q: "Who is the UAE Golden Visa designed for?", a: "It is designed for ambitious people with a long term relationship to the country. Investors, founders, business owners, property investors, executives, doctors, scientists, creatives, and specialised professionals all have established pathways into the programme." },
  { q: "How long does a UAE Golden Visa last?", a: "Most Golden Visa categories are issued for five or ten year periods and are renewable. The longer horizon is one of the central reasons ambitious people choose it over standard residency routes." },
  { q: "What are the main benefits of the UAE Golden Visa?", a: "Long term stability, the right to sponsor immediate family, the ability to remain outside the UAE for extended periods without losing status, broader business and investment latitude, and a stronger long term platform for life and ventures inside the country." },
  { q: "Can entrepreneurs qualify for Golden Visa?", a: "Yes. Founders with credible ventures, qualifying turnover, or recognised innovation profiles have an established pathway. The right structure around the business is often what determines how cleanly the application moves." },
  { q: "Can business owners qualify for Golden Visa?", a: "Yes. Business owners with a qualifying investment, recognised commercial presence, or strategic value to the UAE economy can pursue the route. The structure of the company itself often becomes part of the conversation." },
  { q: "Can investors qualify for Golden Visa?", a: "Yes. Investors with qualifying capital deployment into real estate, public funds, or recognised investment instruments have a defined pathway. The investment must meet category specific thresholds and be held under the right structure." },
  { q: "Can property investors qualify for Golden Visa?", a: "Yes. Property investors who hold qualifying UAE real estate above the relevant threshold are one of the most established categories under the programme." },
  { q: "Can professionals qualify for Golden Visa?", a: "Yes. Specialised professionals in priority sectors — medicine, science, engineering, technology, education, the arts — can qualify against criteria built around qualifications, salary, and contribution." },
  { q: "Can family members be included on a Golden Visa?", a: "Yes. The principal holder can sponsor spouse and children, and in many cases parents, under the same long horizon. This is one of the most strategically valuable features of the programme." },
  { q: "Is the UAE Golden Visa worth it?", a: "For ambitious people building a long term relationship with the UAE — through business, investment, or career — the Golden Visa is rarely a question of cost. It is a question of platform. The right pathway becomes the foundation that supports years of decisions." },
  { q: "How is the Golden Visa different from standard UAE residency?", a: "Standard residency is typically tied to a single employer or sponsor and runs in shorter cycles. The Golden Visa is held in the individual's own name, runs across five or ten year horizons, and decouples residency from a single relationship." },
  { q: "Does the Golden Visa allow me to start a business?", a: "Yes. Holders have significant flexibility to establish, own, and operate ventures across the UAE, subject to the standard licensing framework. For founders, this changes how confidently they can build for the long term." },
  { q: "Does the Golden Visa support regional expansion?", a: "It strengthens it. A stable, long horizon UAE base makes it easier to expand into Saudi Arabia, Qatar, and the wider GCC with credibility, banking continuity, and a coherent regional footprint." },
  { q: "What is the difference between Golden Visa and citizenship?", a: "Golden Visa is long term residency — the right to live, work, and build in the UAE for an extended horizon. Citizenship is a separate, much narrower category. Most ambitious people achieve their long term goals through layered residencies rather than chasing citizenship." },
  { q: "How long does the Golden Visa process take?", a: "Timelines vary by category and by how well the underlying structure is prepared. A well documented application under the right pathway is typically materially faster than a rushed or poorly framed one." },
  { q: "Can I keep my current nationality?", a: "Yes. The Golden Visa is a residency, not a citizenship. There is no requirement to renounce or change nationality, and most holders retain full standing in their home country." },
  { q: "Does Golden Visa give me freedom to travel?", a: "It strengthens travel flexibility. A stable long term UAE residency, combined with the right financial and business structure, is one of the cleanest platforms in the world for international mobility." },
  { q: "Can I leave the UAE for long periods on a Golden Visa?", a: "Yes. Unlike standard residency, the Golden Visa is not voided by extended absences from the country, which is a meaningful advantage for people building international lives." },
  { q: "What investment thresholds qualify for Golden Visa?", a: "Thresholds vary by category and are updated periodically. Real estate, public investment funds, and direct business investment all have defined entry points. Structure matters as much as amount." },
  { q: "How does Golden Visa support investment activity?", a: "It gives investors the long horizon their portfolios require — multi year residency, banking continuity, and the ability to hold UAE assets under their own name with confidence and credibility." },
  { q: "Can my Golden Visa support my children's education?", a: "Yes. Children sponsored under a Golden Visa have full access to UAE schools and the broader educational ecosystem, including international curricula and pathways to leading global universities." },
  { q: "Is the Golden Visa available outside Dubai?", a: "Yes. The Golden Visa is a federal programme available across the UAE, including Abu Dhabi, Sharjah, and the other Emirates. The pathway you choose may influence where the application is processed." },
  { q: "Can I apply for Golden Visa if I already live in the UAE?", a: "Yes. Many existing residents transition from standard residency into Golden Visa once their profile, business, or investment position fits a qualifying category." },
  { q: "How do successful people structure a move to the UAE?", a: "They sequence it. The right business structure, the right residency category, the right banking foundation, and the right family arrangements are designed together rather than handled piece by piece after arrival." },
  { q: "Does Golden Visa support hospitality entrepreneurs?", a: "Yes. Founders building restaurants, hotels, and experiential brands often pursue Golden Visa as part of a wider ventures structure that anchors the operating company, intellectual property, and long term presence in the UAE." },
  { q: "Can frequent international travellers benefit from Golden Visa?", a: "Yes. Frequent travellers who want a credible, stable base without being tied to a single employer often use the Golden Visa as the anchor for an international life that runs across multiple cities." },
  { q: "How does Golden Visa improve banking access?", a: "Long horizon residency improves banking, credit, and wealth services access significantly. Banks prefer stable, well documented, long term relationships, and the Golden Visa supports exactly that profile." },
  { q: "What documents are typically required?", a: "Requirements vary by pathway but typically include identity, qualifications, financial evidence, business or investment documentation, and supporting structure documents. A well prepared file is materially more efficient than a reactive one." },
  { q: "Why work with Red Berry on a Golden Visa pathway?", a: "Most providers process visas. Red Berry designs the infrastructure around the visa — business structure, residency strategy, banking foundation, and long term positioning — so the Golden Visa becomes part of a coherent platform rather than a single document." },
];

const FREEDOM_MEANS = [
  { icon: Plane, t: "Mobility", d: "The freedom to move with confidence — across borders, opportunities, and life stages — without unnecessary friction at every step." },
  { icon: Compass, t: "Opportunity", d: "Access to ventures, partners, capital, and markets that simply are not visible from a single country viewpoint." },
  { icon: Sparkles, t: "Choice", d: "Real options. The ability to make decisions because they fit your ambition, not because circumstances forced your hand." },
  { icon: Briefcase, t: "Business Flexibility", d: "Latitude to build, own, and operate ventures across jurisdictions with the right long term standing behind every move." },
  { icon: TrendingUp, t: "Investment Access", d: "Eligibility to participate in opportunities, markets, and structures reserved for credible long term residents." },
  { icon: Globe2, t: "Long Term Planning", d: "A horizon you can actually plan across. Stability is what turns ambition into compounding decisions." },
  { icon: Award, t: "Global Positioning", d: "A credible international platform that strengthens how you are perceived by banks, partners, and counterparties anywhere in the world." },
  { icon: Users, t: "Personal Independence", d: "Standing in your own name, not borrowed from a single employer or single arrangement. Independence is the quiet core of freedom." },
];

const WHY_UAE = [
  { t: "Strategic Location", d: "Sitting between Europe, Asia, and Africa, the UAE is the natural meeting point for global business, capital, and talent across three continents." },
  { t: "Global Connectivity", d: "Direct flights to almost everywhere that matters, world class digital infrastructure, and a time zone that overlaps with every major market in a single working day." },
  { t: "Business Ecosystem", d: "A regulated, transparent environment with mature free zones, mainland structures, and sector specific frameworks for finance, technology, and innovation." },
  { t: "Investment Environment", d: "A deep, liquid market for real estate, equities, and private capital. Combined with a stable currency, it remains one of the most credible investment platforms in the region." },
  { t: "Safety", d: "Consistently ranked among the safest countries in the world, with strong public order and modern institutions supporting daily life." },
  { t: "Infrastructure", d: "World class airports, ports, roads, healthcare, and digital systems make the UAE one of the easiest countries in the world to operate from." },
  { t: "Quality Of Life", d: "Modern cities, international communities, world class schools, and a lifestyle environment built around international families and professionals." },
  { t: "Economic Opportunity", d: "Diversified, growing, and globally connected — the UAE economy is structurally positioned for the next decade rather than the last one." },
  { t: "Long Term Vision", d: "Policy continuity, long horizon planning, and consistent investment in the foundations international residents and investors rely on." },
];

const UNDERSTANDING = [
  { t: "What It Is", d: "A long term UAE residency, issued in the individual's own name, running across five or ten year cycles with renewable status — not tied to a single employer." },
  { t: "Who It Is Designed For", d: "Investors, entrepreneurs, business owners, property investors, exceptional talent, and qualified professionals contributing to the UAE economy." },
  { t: "Duration", d: "Issued for five or ten year periods depending on category, with renewal mechanics that turn long term presence into something predictable rather than uncertain." },
  { t: "Key Benefits", d: "Family inclusion, business latitude, investment access, banking continuity, and the freedom to remain outside the country for extended periods without losing status." },
  { t: "Who Can Qualify", d: "Several established categories exist. The right pathway depends on profile, ambition, and the structure already in place — not on a single fixed checklist." },
  { t: "Why It Differs From Standard Residency", d: "Standard residency is tied to a sponsor and shorter cycles. Golden Visa is held in your own name, runs across years, and decouples your standing from any single relationship." },
];

const PATHWAYS = [
  { icon: TrendingUp, t: "Investors", e: "Capital deployed into qualifying real estate, public investment funds, or recognised investment instruments above category thresholds.", a: "Long horizon, name in your own right, broader portfolio latitude." },
  { icon: Briefcase, t: "Entrepreneurs", e: "Founders with credible ventures, qualifying turnover, or recognised innovation profiles in priority sectors.", a: "Multi year stability, business latitude, easier capital and partner conversations." },
  { icon: Building2, t: "Business Owners", e: "Owners of qualifying commercial activity with strategic value to the UAE economy.", a: "Independent residency, regional credibility, stronger banking relationships." },
  { icon: Award, t: "Exceptional Talent", e: "Recognised excellence across sciences, arts, sports, culture, and innovation — qualified by official endorsement.", a: "Long term recognition, broad professional latitude, family inclusion." },
  { icon: Users, t: "Professionals", e: "Specialised professionals in priority sectors — medicine, science, engineering, technology, education — meeting qualification and contribution criteria.", a: "Stability beyond a single employer, family inclusion, long horizon planning." },
  { icon: Globe2, t: "Property Investors", e: "Holders of qualifying UAE real estate above the relevant threshold, under their own name.", a: "Long horizon residency anchored to a tangible asset, family inclusion, banking continuity." },
  { icon: Sparkles, t: "Innovation Leaders", e: "Founders, scientists, and creatives recognised for measurable contribution to UAE innovation, technology, or culture.", a: "Long term standing, signal value, easier collaboration across institutions." },
];

const FRAMEWORK = [
  { t: "Foundation", d: "A clear view of your profile, ambitions, and the structure already in place. The starting point of every credible plan." },
  { t: "Residency", d: "The right long term residency category, chosen against profile rather than convenience — the platform every other decision sits on." },
  { t: "Mobility", d: "A coordinated picture of how you travel, where you spend time, and how the structure supports an international rhythm of life." },
  { t: "Opportunity", d: "The business, investment, and professional doors that open once the underlying structure is in place and credible." },
  { t: "Investment Flexibility", d: "Latitude to deploy capital across real estate, equities, ventures, and structured opportunities under coherent ownership." },
  { t: "Global Positioning", d: "A credible, recognisable platform that improves how banks, partners, and counterparties engage with you anywhere in the world." },
  { t: "Long Term Freedom", d: "The quiet, compounding output of every layer beneath it. Freedom is the result of good infrastructure, not the absence of it." },
];

const OPPORTUNITIES = [
  { icon: Building2, t: "Business Ownership", d: "Latitude to establish, hold, and operate UAE ventures in your own name with long horizon standing behind the structure." },
  { icon: Globe2, t: "Regional Expansion", d: "A credible UAE base makes Saudi Arabia, Qatar, and the wider GCC materially more accessible — banking, structure, and presence all carry forward." },
  { icon: TrendingUp, t: "Investment Opportunities", d: "Access to UAE real estate, public funds, private ventures, and structured investments reserved for long term residents in good standing." },
  { icon: Briefcase, t: "Banking Relationships", d: "Long horizon residency unlocks deeper banking, credit, and wealth services access — banks reward stability and clean structure." },
  { icon: Compass, t: "Long Term Planning", d: "A planning horizon that spans years rather than renewal cycles. Decisions compound when the platform underneath stays stable." },
  { icon: Users, t: "Family Inclusion", d: "Spouse, children, and in many cases parents move under the same long horizon — a single coherent structure for the household." },
  { icon: Sparkles, t: "Lifestyle Flexibility", d: "A real base in one of the most globally connected cities in the world, without losing the freedom to spend time elsewhere." },
  { icon: Plane, t: "Global Mobility", d: "A stable UAE foundation combined with the right structure is one of the cleanest platforms in the world for an international rhythm of life." },
];

const COMPARISON = [
  { k: "Duration", g: "Five or ten year horizons, renewable.", s: "Typically tied to one or two year cycles." },
  { k: "Stability", g: "Held in your own name. Independent of any single sponsor.", s: "Tied to a specific employer or sponsor relationship." },
  { k: "Flexibility", g: "Long absences from the UAE do not void status.", s: "Extended absences can risk residency status." },
  { k: "Eligibility", g: "Category based — investors, founders, talent, professionals.", s: "Generally tied to employment, dependent, or commercial sponsorship." },
  { k: "Renewal", g: "Renewable against the same category profile.", s: "Renewed each cycle against the underlying sponsor relationship." },
  { k: "Business Implications", g: "Strong latitude to establish and operate ventures in your own name.", s: "More constrained by sponsor framework and shorter horizon." },
  { k: "Investment Implications", g: "Suited to long horizon capital deployment under coherent ownership.", s: "Works for short and medium term horizons, less suited to long term capital." },
  { k: "Long Term Planning", g: "A platform you can plan years against.", s: "A platform suited to shorter horizon planning." },
];

const MISTAKES = [
  "Choosing the wrong pathway against the actual profile",
  "Treating Golden Visa as paperwork rather than infrastructure",
  "Focusing on eligibility instead of long term objectives",
  "Building on weak underlying business or investment structure",
  "Reactive decisions made under deadline pressure",
  "Ignoring how residency interacts with banking and tax",
  "Underestimating the value of family inclusion",
  "Working without coordinated strategic advice",
];

const PEOPLE_ASK = [
  { q: "What are the benefits of UAE Golden Visa?", a: "Long horizon residency, family inclusion, business latitude, investment access, and a credible international platform held in your own name." },
  { q: "Who qualifies for Golden Visa?", a: "Investors, entrepreneurs, business owners, property investors, exceptional talent, and specialised professionals contributing to the UAE economy." },
  { q: "How long does Golden Visa last?", a: "Five or ten year cycles depending on category, renewable against the underlying profile." },
  { q: "Can business owners qualify?", a: "Yes. Owners of qualifying commercial activity with strategic value to the UAE economy can pursue an established pathway." },
  { q: "Can entrepreneurs qualify?", a: "Yes. Founders with credible ventures, qualifying turnover, or recognised innovation profiles have a defined route." },
  { q: "Can investors qualify?", a: "Yes. Capital deployed into qualifying real estate, public funds, or recognised investment instruments above category thresholds qualifies." },
  { q: "Can family members be included?", a: "Yes. The principal can sponsor spouse, children, and in many cases parents under the same long horizon." },
  { q: "What is the difference between Golden Visa and normal residency?", a: "Golden Visa is held in your own name and runs across multi year cycles. Standard residency is tied to a sponsor and runs in shorter cycles." },
  { q: "Can Golden Visa support business expansion?", a: "Yes. A long horizon UAE base meaningfully strengthens expansion into Saudi Arabia, Qatar, and the wider GCC." },
  { q: "Is UAE Golden Visa worth it?", a: "For ambitious people building a long term relationship with the UAE through business, investment, or career, the question is rarely cost. It is platform value over years." },
];

const AUDIENCES = [
  "Entrepreneurs", "Founders", "Investors", "Business Owners",
  "Property Investors", "High Net Worth Individuals", "Hospitality Entrepreneurs",
  "Global Professionals", "Frequent International Travellers", "People Building International Lives",
];


function IncreaseGlobalFreedomPage() {
  return (
    <SiteLayout>
      {/* HERO */}
      <SEOHead
        title="Increase Global Freedom | Red Berry"
        description="Freedom of movement is engineered. Residency, second citizenship and tax positioning in the UAE, built to widen where you can live, bank and travel."
        url="https://redberry.ae/increase-global-freedom"
      />
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 blueprint-grid opacity-60 pointer-events-none" aria-hidden />
        <div className="container-rb pt-14 md:pt-20 pb-12 md:pb-16 relative">
          <nav aria-label="Breadcrumb" className="text-xs text-foreground/55 flex items-center gap-2">
            <Link to="/" className="hover:text-foreground">Red Berry</Link>
            <span>/</span>
            <Link to="/ambitions" className="hover:text-foreground">Ambitions</Link>
            <span>/</span>
            <span className="text-foreground/80">Increase Global Freedom</span>
          </nav>

          <div className="mt-6 grid lg:grid-cols-[1.45fr_1fr] gap-10 items-start">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-[10px] tracking-[0.22em] uppercase text-foreground/70">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--berry)" }} />
                UAE Golden Visa & Strategic Residency
              </div>
              <h1 className="mt-5 text-4xl md:text-6xl font-display leading-[1.05] text-gradient speakable">
                Build A Life With More Freedom To Move, Invest, And Grow
              </h1>
              <p className="mt-5 text-lg md:text-xl text-foreground/75 max-w-2xl leading-relaxed speakable">
                The UAE Golden Visa is not simply a residency document. For ambitious founders, investors, and professionals, it can become the foundation for greater mobility, opportunity, and long term strategic freedom.
              </p>
              <p className="mt-3 text-base md:text-lg text-foreground/65 max-w-2xl leading-relaxed">
                Red Berry helps people build the infrastructure behind that freedom.
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
              <FreedomHeroArt />
            </div>
          </div>
        </div>
      </section>

      {/* WHAT GLOBAL FREEDOM MEANS */}
      <section className="container-rb py-14 md:py-20" aria-labelledby="freedom-means">
        <header className="max-w-3xl">
          <p className="text-xs tracking-[0.2em] uppercase text-foreground/55">Sovereign Freedom</p>
          <h2 id="freedom-means" className="mt-3 text-3xl md:text-5xl font-display text-foreground">
            What Does Global Freedom Actually Mean?
          </h2>
          <p className="mt-4 text-foreground/65 text-lg leading-relaxed">
            Freedom is not a destination. It is the quiet output of better structure. For ambitious people, global freedom is the ability to make decisions because they fit your ambition — not because circumstances have forced your hand.
          </p>
        </header>
        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {FREEDOM_MEANS.map((f) => (
            <article key={f.t} className="p-5 rounded-2xl glass hover:shadow-[var(--shadow-lift)] transition-all">
              <span className="grid place-items-center w-10 h-10 rounded-xl border border-border/60 bg-card text-primary">
                <f.icon className="h-5 w-5" aria-hidden />
              </span>
              <h3 className="mt-4 text-base font-display text-foreground">{f.t}</h3>
              <p className="mt-2 text-sm text-foreground/65 leading-relaxed">{f.d}</p>
            </article>
          ))}
        </div>
      </section>

      {/* WHY AMBITIOUS PEOPLE CHOOSE THE UAE */}
      <section className="container-rb py-14 md:py-20" aria-labelledby="why-uae">
        <header className="max-w-3xl">
          <p className="text-xs tracking-[0.2em] uppercase text-foreground/55">The Platform</p>
          <h2 id="why-uae" className="mt-3 text-3xl md:text-5xl font-display text-gradient">
            Why Ambitious People Choose The UAE
          </h2>
          <p className="mt-4 text-foreground/65 text-lg leading-relaxed">
            The UAE is not chosen because it is convenient. It is chosen because it works. A combination of geography, infrastructure, regulatory clarity, and long term vision has made it one of the most credible operating platforms in the world for ambitious lives and ventures.
          </p>
        </header>
        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {WHY_UAE.map((w) => (
            <article key={w.t} className="p-6 rounded-2xl glass hover:shadow-[var(--shadow-lift)] transition-all">
              <h3 className="text-lg font-display text-foreground">{w.t}</h3>
              <p className="mt-2 text-sm text-foreground/70 leading-relaxed">{w.d}</p>
            </article>
          ))}
        </div>
      </section>

      {/* UNDERSTANDING UAE GOLDEN VISA */}
      <section className="container-rb py-14 md:py-20" aria-labelledby="understanding">
        <div className="rounded-3xl glass p-8 md:p-12 relative overflow-hidden">
          <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full blur-3xl opacity-40" style={{ background: "var(--gradient-berry)" }} aria-hidden />
          <div className="relative max-w-3xl">
            <p className="text-xs tracking-[0.2em] uppercase text-foreground/55">Educational Foundation</p>
            <h2 id="understanding" className="mt-3 text-3xl md:text-5xl font-display text-foreground">
              Understanding The UAE Golden Visa
            </h2>
            <p className="mt-4 text-foreground/70 text-lg leading-relaxed">
              The Golden Visa is one of the most strategically significant residency programmes in the world. Before considering any pathway, it is worth understanding what it actually is, who it is designed for, and how it differs from the residency most people are familiar with.
            </p>
          </div>
          <div className="relative mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {UNDERSTANDING.map((u) => (
              <div key={u.t} className="p-5 rounded-2xl bg-card/70 border border-border/50">
                <Award className="h-5 w-5 text-primary/80" aria-hidden />
                <h3 className="mt-3 text-base font-display text-foreground">{u.t}</h3>
                <p className="mt-2 text-sm text-foreground/70 leading-relaxed">{u.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GOLDEN VISA PATHWAYS */}
      <section className="container-rb py-14 md:py-20" aria-labelledby="pathways">
        <header className="max-w-3xl">
          <p className="text-xs tracking-[0.2em] uppercase text-foreground/55">Routes Into The Programme</p>
          <h2 id="pathways" className="mt-3 text-3xl md:text-5xl font-display text-foreground">
            Golden Visa Pathways
          </h2>
          <p className="mt-4 text-foreground/65 text-lg leading-relaxed">
            Several established categories exist. The right pathway is the one that matches the profile you already have — investor, founder, operator, or specialist — and the long term life you are building behind it.
          </p>
        </header>
        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {PATHWAYS.map((p) => (
            <article key={p.t} className="p-6 rounded-2xl glass hover:shadow-[var(--shadow-lift)] transition-all">
              <span className="grid place-items-center w-10 h-10 rounded-xl border border-border/60 bg-card text-primary">
                <p.icon className="h-5 w-5" aria-hidden />
              </span>
              <h3 className="mt-4 text-lg font-display text-foreground">{p.t}</h3>
              <div className="mt-3">
                <div className="text-[10px] tracking-[0.18em] uppercase text-foreground/45">Eligibility</div>
                <p className="mt-1 text-sm text-foreground/70 leading-relaxed">{p.e}</p>
              </div>
              <div className="mt-3">
                <div className="text-[10px] tracking-[0.18em] uppercase text-foreground/45">Strategic Advantages</div>
                <p className="mt-1 text-sm text-foreground/70 leading-relaxed">{p.a}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* SOVEREIGN FREEDOM FRAMEWORK */}
      <section className="container-rb py-14 md:py-20" aria-labelledby="framework">
        <header className="max-w-3xl">
          <p className="text-xs tracking-[0.2em] uppercase text-foreground/55">The Architecture</p>
          <h2 id="framework" className="mt-3 text-3xl md:text-5xl font-display text-gradient">
            The Sovereign Freedom Framework
          </h2>
          <p className="mt-4 text-foreground/65 text-lg leading-relaxed">
            Seven sequential layers, designed and operated together. Each layer builds on the one beneath it. The output is freedom that compounds over years rather than freedom that resets every renewal cycle.
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

      {/* OPPORTUNITIES UNLOCKED */}
      <section className="container-rb py-14 md:py-20" aria-labelledby="opportunities">
        <header className="max-w-3xl">
          <p className="text-xs tracking-[0.2em] uppercase text-foreground/55">The Outcomes</p>
          <h2 id="opportunities" className="mt-3 text-3xl md:text-5xl font-display text-foreground">
            What Opportunities Does Golden Visa Unlock?
          </h2>
          <p className="mt-4 text-foreground/65 text-lg leading-relaxed">
            The Golden Visa is the platform, not the prize. The real value sits in what becomes possible once the long horizon residency is in place and the surrounding infrastructure is designed against it.
          </p>
        </header>
        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {OPPORTUNITIES.map((o) => (
            <article key={o.t} className="p-5 rounded-2xl glass hover:shadow-[var(--shadow-lift)] transition-all">
              <o.icon className="h-5 w-5 text-primary/80" aria-hidden />
              <h3 className="mt-3 text-base font-display text-foreground">{o.t}</h3>
              <p className="mt-2 text-sm text-foreground/65 leading-relaxed">{o.d}</p>
            </article>
          ))}
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="container-rb py-14 md:py-20" aria-labelledby="comparison">
        <header className="max-w-3xl">
          <p className="text-xs tracking-[0.2em] uppercase text-foreground/55">Side By Side</p>
          <h2 id="comparison" className="mt-3 text-3xl md:text-5xl font-display text-gradient">
            Golden Visa vs Standard Residency
          </h2>
          <p className="mt-4 text-foreground/65 text-lg leading-relaxed">
            The two routes are often confused. They are not the same thing, and the difference matters across years rather than weeks.
          </p>
        </header>
        <div className="mt-10 rounded-2xl glass overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-[1.1fr_1.4fr_1.4fr] text-sm">
            <div className="hidden md:block p-4 bg-card/60 text-[10px] tracking-[0.2em] uppercase text-foreground/55">Dimension</div>
            <div className="hidden md:block p-4 bg-card/60 text-[10px] tracking-[0.2em] uppercase text-primary">Golden Visa</div>
            <div className="hidden md:block p-4 bg-card/60 text-[10px] tracking-[0.2em] uppercase text-foreground/55">Standard Residency</div>
            {COMPARISON.map((c, i) => (
              <div key={c.k} className={`contents`}>
                <div className={`p-4 border-t border-border/40 font-display text-foreground ${i === 0 ? "md:border-t-0" : ""}`}>{c.k}</div>
                <div className={`p-4 border-t border-border/40 text-foreground/80 leading-relaxed ${i === 0 ? "md:border-t-0" : ""}`}>{c.g}</div>
                <div className={`p-4 border-t border-border/40 text-foreground/65 leading-relaxed ${i === 0 ? "md:border-t-0" : ""}`}>{c.s}</div>
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
              Common Mistakes People Make
            </h2>
            <p className="mt-4 text-foreground/70 text-lg leading-relaxed">
              Most Golden Visa mistakes are not eligibility mistakes. They are infrastructure mistakes — decisions made in isolation that quietly weaken the platform the residency is supposed to sit on.
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

      {/* QUESTIONS PEOPLE ASK BEFORE APPLYING */}
      <section className="container-rb py-14 md:py-20" aria-labelledby="people-ask">
        <header className="max-w-3xl">
          <p className="text-xs tracking-[0.2em] uppercase text-foreground/55">Decision Inputs</p>
          <h2 id="people-ask" className="mt-3 text-3xl md:text-5xl font-display text-gradient">
            Questions People Ask Before Applying
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
                <Sparkles className="h-3 w-3" /> Global Freedom Blueprint
              </div>
              <h2 className="mt-4 text-3xl md:text-5xl font-display leading-[1.05]">
                Map The Pathway That Supports Your Ambitions
              </h2>
              <p className="mt-4 text-base md:text-lg text-primary-foreground/85 max-w-2xl leading-relaxed">
                A strategic blueprint designed to identify the residency, mobility, investment, and infrastructure pathways that may support your ambitions.
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
            <ul className="space-y-3" aria-label="Red Berry global freedom blueprint">
              {[
                "Residency category diagnosis",
                "Pathway fit against profile",
                "Mobility and second residency review",
                "Business and investment alignment",
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
            Built for the people who are no longer asking whether to expand their freedom, but how to build it deliberately.
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
            Everything People Ask About UAE Golden Visa
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
            Build More Freedom Into Your Future
          </h2>
          <p className="mt-4 text-foreground/70 text-lg max-w-2xl mx-auto leading-relaxed">
            Tell us what opportunities you want to unlock and we will show you the infrastructure that supports them.
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

export default IncreaseGlobalFreedomPage;
